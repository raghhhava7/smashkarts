"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Member } from "@/types";

interface MemberItemProps {
  member: Member;
  color: "cyan" | "pink";
  onUpdateName: (newName: string) => void;
}

export default function MemberItem({ member, color, onUpdateName }: MemberItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(member.name);

  const handleSave = () => {
    if (editName.trim()) {
      onUpdateName(editName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(member.name);
    setIsEditing(false);
  };

  const bgColor = color === "cyan" ? "bg-cyan-500/10" : "bg-pink-500/10";
  const borderColor = color === "cyan" ? "border-cyan-500/30" : "border-pink-500/30";
  const hoverBorder = color === "cyan" ? "hover:border-cyan-400/50" : "hover:border-pink-400/50";

  return (
    <div className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg ${bgColor} border ${borderColor} ${hoverBorder} transition-all duration-300 hover:scale-[1.02]`}>
      <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-purple-500/50 flex-shrink-0">
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      {isEditing ? (
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="bg-slate-800/50 border-purple-500/50 text-white text-sm sm:text-base"
            autoFocus
          />
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-green-600 hover:bg-green-500 px-3 flex-1 sm:flex-none"
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              size="sm"
              variant="outline"
              className="border-slate-600 px-3 flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <span className="flex-1 text-white font-medium text-sm sm:text-base truncate">{member.name}</span>
          <Button
            onClick={() => setIsEditing(true)}
            size="sm"
            variant="ghost"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 text-xs sm:text-sm flex-shrink-0"
          >
            Edit
          </Button>
        </>
      )}
    </div>
  );
}
