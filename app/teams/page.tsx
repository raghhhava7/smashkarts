"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TeamCard from "@/components/TeamCard";
import AddMemberDialog from "@/components/AddMemberDialog";
import ShuffleHistoryDialog from "@/components/ShuffleHistoryDialog";
import LetterGlitch from "@/components/LetterGlitch";
import { Member } from "@/types";

export default function TeamsPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [teamA, setTeamA] = useState<Member[]>([]);
  const [teamB, setTeamB] = useState<Member[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [movingMembers, setMovingMembers] = useState<{id: string, fromTeam: 'A' | 'B', toTeam: 'A' | 'B'}[]>([]);

  // Fetch members from database
  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const shuffleTeams = () => {
    const shuffled = [...members].sort(() => Math.random() - 0.5);
    const mid = Math.ceil(shuffled.length / 2);
    setTeamA(shuffled.slice(0, mid));
    setTeamB(shuffled.slice(mid));
  };

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setIsShuffling(false);
      
      const shuffled = [...members].sort(() => Math.random() - 0.5);
      const mid = Math.ceil(shuffled.length / 2);
      const newTeamA = shuffled.slice(0, mid);
      const newTeamB = shuffled.slice(mid);

      const moving: {id: string, fromTeam: 'A' | 'B', toTeam: 'A' | 'B'}[] = [];
      
      newTeamA.forEach(member => {
        const wasInTeamB = teamB.some(m => m.id === member.id);
        if (wasInTeamB) {
          moving.push({ id: member.id, fromTeam: 'B', toTeam: 'A' });
        }
      });
      
      newTeamB.forEach(member => {
        const wasInTeamA = teamA.some(m => m.id === member.id);
        if (wasInTeamA) {
          moving.push({ id: member.id, fromTeam: 'A', toTeam: 'B' });
        }
      });
      
      setMovingMembers(moving);
      
      setTimeout(() => {
        setTeamA(newTeamA);
        setTeamB(newTeamB);
        
        // Save shuffle to history with local machine time
        fetch('/api/shuffle-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            teamA: newTeamA, 
            teamB: newTeamB,
            timestamp: new Date().toISOString()
          }),
        }).catch(err => console.error('Error saving shuffle history:', err));
        
        setTimeout(() => {
          setMovingMembers([]);
        }, 1500);
      }, 100);
    }, 3000);
  };

  useEffect(() => {
    if (members.length > 0) {
      shuffleTeams();
    }
  }, [members]);

  const handleUpdateMember = async (id: string, newName: string) => {
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      
      if (res.ok) {
        const updated = await res.json();
        setMembers((prev) =>
          prev.map((member) =>
            member.id === id ? { ...member, name: updated.name, avatar: updated.avatar } : member
          )
        );
      }
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  const handleAddMember = async (name: string) => {
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      
      if (res.ok) {
        const newMember = await res.json();
        setMembers((prev) => [...prev, newMember]);
      }
    } catch (error) {
      console.error('Error adding member:', error);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setMembers((prev) => prev.filter((member) => member.id !== id));
      }
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-black">
        <LetterGlitch
          glitchColors={['#8b5cf6', '#ec4899', '#22d3ee']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12 px-4">
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-white glow-text" style={{ textShadow: '0 0 20px #fff, 0 0 40px #fff, 0 0 60px #8b5cf6, 0 0 80px #8b5cf6' }}>
            TEAM ASSIGNER
          </h1>
          <p className="font-rajdhani text-white text-sm sm:text-base md:text-lg" style={{ textShadow: '0 0 10px #fff, 0 0 20px #fff' }}>Randomly split your squad into balanced teams</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
          <Button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isShuffling ? "Shuffling..." : "Shuffle Teams"}
          </Button>
          <Button
            onClick={() => setIsDialogOpen(true)}
            disabled={isShuffling}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Member
          </Button>
          <Button
            onClick={() => setIsHistoryOpen(true)}
            disabled={isShuffling}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View History
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4">
          <TeamCard
            teamName="TEAM A"
            members={teamA}
            color="cyan"
            onUpdateMember={handleUpdateMember}
            onDeleteMember={handleDeleteMember}
            movingMembers={movingMembers}
            teamId="A"
          />
          <TeamCard
            teamName="TEAM B"
            members={teamB}
            color="pink"
            onUpdateMember={handleUpdateMember}
            onDeleteMember={handleDeleteMember}
            movingMembers={movingMembers}
            teamId="B"
          />
        </div>

        <div className="mt-6 sm:mt-8 text-center text-slate-400 text-sm sm:text-base px-4">
          <p>Total Members: {members.length} | Team A: {teamA.length} | Team B: {teamB.length}</p>
        </div>
      </div>

      {isShuffling && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative h-48 mb-8 flex items-center justify-center gap-8">
              <div className="dice-container animate-dice-fall-1">
                <div className="dice animate-dice-roll">
                  <div className="dice-face dice-front bg-gradient-to-br from-purple-500 to-pink-500">
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-back bg-gradient-to-br from-purple-500 to-pink-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-right bg-gradient-to-br from-purple-500 to-pink-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-left bg-gradient-to-br from-purple-500 to-pink-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-top bg-gradient-to-br from-purple-500 to-pink-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-bottom bg-gradient-to-br from-purple-500 to-pink-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                </div>
              </div>
              
              <div className="dice-container animate-dice-fall-2">
                <div className="dice animate-dice-roll-reverse">
                  <div className="dice-face dice-front bg-gradient-to-br from-cyan-500 to-blue-500">
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-back bg-gradient-to-br from-cyan-500 to-blue-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-right bg-gradient-to-br from-cyan-500 to-blue-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-left bg-gradient-to-br from-cyan-500 to-blue-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-top bg-gradient-to-br from-cyan-500 to-blue-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                  <div className="dice-face dice-bottom bg-gradient-to-br from-cyan-500 to-blue-500">
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                    <div className="dice-dot"></div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text mb-2">
              SHUFFLING TEAMS
            </h2>
            <p className="font-rajdhani text-purple-300 text-sm sm:text-base animate-pulse">
              Rolling the dice...
            </p>
          </div>
        </div>
      )}

      <AddMemberDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddMember={handleAddMember}
      />

      <ShuffleHistoryDialog
        open={isHistoryOpen}
        onOpenChange={setIsHistoryOpen}
      />
    </div>
  );
}
