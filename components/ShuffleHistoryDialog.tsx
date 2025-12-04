"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ShuffleRecord {
  id: number;
  team_a: string;
  team_b: string;
  created_at: string;
}

interface ShuffleHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ShuffleHistoryDialog({ open, onOpenChange }: ShuffleHistoryDialogProps) {
  const [history, setHistory] = useState<ShuffleRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/shuffle-history');
      const data = await res.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchHistory();
    }
  }, [open]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Invalid Date';
    // Use local machine time directly
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = days[date.getDay()];
    const dateNum = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    return `${day}, ${dateNum} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
  };

  const parseTeam = (teamStr: string): string[] => {
    try {
      const parsed = JSON.parse(teamStr);
      return parsed.map((m: { name: string }) => m.name);
    } catch {
      return [];
    }
  };

  const isSaturday = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;
    return date.getDay() === 6;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-purple-500/50 text-white max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Shuffle History
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {isLoading ? (
            <p className="text-center text-slate-400 py-8">Loading...</p>
          ) : history.length === 0 ? (
            <p className="text-center text-slate-400 py-8">No shuffle history yet</p>
          ) : (
            history.map((record) => {
              const saturday = isSaturday(record.created_at);
              return (
              <div
                key={record.id}
                className={`p-4 rounded-lg border ${
                  saturday 
                    ? 'bg-yellow-500/10 border-yellow-500/50 ring-2 ring-yellow-500/30' 
                    : 'bg-slate-800/50 border-purple-500/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {saturday && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-yellow-500 text-black rounded">
                      🏆 GAME DAY
                    </span>
                  )}
                  <p className={`text-sm ${saturday ? 'text-yellow-300 font-semibold' : 'text-purple-300'}`}>
                    {formatDate(record.created_at)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-cyan-400 font-semibold mb-1">Team A</p>
                    <div className="flex flex-wrap gap-1">
                      {parseTeam(record.team_a).map((name, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-cyan-500/20 rounded border border-cyan-500/30"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-pink-400 font-semibold mb-1">Team B</p>
                    <div className="flex flex-wrap gap-1">
                      {parseTeam(record.team_b).map((name, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs bg-pink-500/20 rounded border border-pink-500/30"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );})
          )}
        </div>

        <div className="pt-4 border-t border-slate-700">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
