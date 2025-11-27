"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TeamCard from "@/components/TeamCard";
import AddMemberDialog from "@/components/AddMemberDialog";
import LetterGlitch from "@/components/LetterGlitch";
import { Member } from "@/types";

const DEFAULT_MEMBERS: Member[] = [
  { id: "1", name: "HARI", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HARI&gender=male" },
  { id: "2", name: "RAGHAVA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RAGHAVA&gender=male" },
  { id: "3", name: "BHAVESH", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BHAVESH&gender=male" },
  { id: "4", name: "TEJA", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TEJA&gender=male" },
  { id: "5", name: "SHYAM", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SHYAM&gender=male" },
  { id: "6", name: "VENKATESH", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=VENKATESH&gender=male" },
];

export default function TeamsPage() {
  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS);
  const [teamA, setTeamA] = useState<Member[]>([]);
  const [teamB, setTeamB] = useState<Member[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
      setIsAnimating(true);
      setTimeout(() => {
        shuffleTeams();
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }, 100);
    }, 3000);
  };

  useEffect(() => {
    shuffleTeams();
  }, [members]);

  const handleUpdateMember = (id: string, newName: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, name: newName } : member
      )
    );
  };

  const handleAddMember = (name: string) => {
    const newMember: Member = {
      id: Date.now().toString(),
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}&gender=male`,
    };
    setMembers((prev) => [...prev, newMember]);
    setIsDialogOpen(false);
  };

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
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text">
            TEAM ASSIGNER
          </h1>
          <p className="font-rajdhani text-purple-300 text-sm sm:text-base md:text-lg">Randomly split your squad into balanced teams</p>
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4">
          <div className={`transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95 translate-x-10' : 'opacity-100 scale-100 translate-x-0'}`}>
            <TeamCard
              teamName="TEAM A"
              members={teamA}
              color="cyan"
              onUpdateMember={handleUpdateMember}
            />
          </div>
          <div className={`transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95 -translate-x-10' : 'opacity-100 scale-100 translate-x-0'}`}>
            <TeamCard
              teamName="TEAM B"
              members={teamB}
              color="pink"
              onUpdateMember={handleUpdateMember}
            />
          </div>
        </div>

        <div className="mt-6 sm:mt-8 text-center text-slate-400 text-sm sm:text-base px-4">
          <p>Total Members: {members.length} | Team A: {teamA.length} | Team B: {teamB.length}</p>
        </div>
      </div>

      {isShuffling && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-transparent border-t-pink-500 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-4 border-4 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDuration: '0.6s' }}></div>
            </div>
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent glow-text mb-2">
              SHUFFLING TEAMS
            </h2>
            <p className="font-rajdhani text-purple-300 text-sm sm:text-base animate-pulse">
              Randomizing assignments...
            </p>
          </div>
        </div>
      )}

      <AddMemberDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddMember={handleAddMember}
      />
    </div>
  );
}
