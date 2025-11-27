"use client";

import { Card } from "@/components/ui/card";
import { Member } from "@/types";
import MemberItem from "./MemberItem";

interface TeamCardProps {
  teamName: string;
  members: Member[];
  color: "cyan" | "pink";
  onUpdateMember: (id: string, newName: string) => void;
}

export default function TeamCard({ teamName, members, color, onUpdateMember }: TeamCardProps) {
  const glowClass = color === "cyan" ? "glow-box-cyan" : "glow-box-pink";
  const borderColor = color === "cyan" ? "border-cyan-500/50" : "border-pink-500/50";
  const gradientClass = color === "cyan" 
    ? "from-cyan-400 to-blue-400" 
    : "from-pink-400 to-rose-400";

  return (
    <Card className={`p-4 sm:p-6 bg-slate-900/80 backdrop-blur-xl ${borderColor} ${glowClass} transition-all duration-300 hover:scale-[1.02]`}>
      <h2 className={`font-orbitron text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent glow-text`}>
        {teamName}
      </h2>
      
      <div className="space-y-3 sm:space-y-4">
        {members.length === 0 ? (
          <p className="text-center text-slate-500 py-6 sm:py-8 text-sm sm:text-base">No members assigned</p>
        ) : (
          members.map((member) => (
            <MemberItem
              key={member.id}
              member={member}
              color={color}
              onUpdateName={(newName) => onUpdateMember(member.id, newName)}
            />
          ))
        )}
      </div>
      
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-700">
        <p className="text-center text-slate-400 text-sm sm:text-base">
          Members: <span className="font-bold text-white">{members.length}</span>
        </p>
      </div>
    </Card>
  );
}
