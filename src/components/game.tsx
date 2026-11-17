"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Player = "X" | "O";
type Cell = Player | null;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getWinningLine(board: Cell[]) {
  return (
    LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]) ??
    null
  );
}

const emptyBoard = (): Cell[] => Array(9).fill(null);

export function Game() {
  const [board, setBoard] = useState<Cell[]>(emptyBoard);
  const [turn, setTurn] = useState<Player>("X");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const line = getWinningLine(board);
  const winner = line ? board[line[0]] : null;
  const isDraw = !winner && board.every(Boolean);
  const over = !!winner || isDraw;

  function play(i: number) {
    if (board[i] || over) return;
    const next = board.slice();
    next[i] = turn;
    setBoard(next);

    const nextLine = getWinningLine(next);
    if (nextLine) {
      setScores((s) => ({ ...s, [turn]: s[turn] + 1 }));
    } else if (next.every(Boolean)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    } else {
      setTurn(turn === "X" ? "O" : "X");
    }
  }

  function newGame() {
    setBoard(emptyBoard());
    setTurn("X");
  }

  function resetAll() {
    newGame();
    setScores({ X: 0, O: 0, draws: 0 });
  }

  const status = winner
    ? `Player ${winner} wins!`
    : isDraw
      ? "It's a draw!"
      : `Player ${turn}'s turn`;
  const statusColor = winner === "O" || (!over && turn === "O")
    ? "text-red-600"
    : winner === "X" || (!over && turn === "X")
      ? "text-blue-600"
      : "text-amber-600";

  return (
    <div className="grid w-full max-w-3xl gap-4 md:grid-cols-[auto_1fr]">
      <Card className="self-start p-4">
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, i) => (
            <button
              key={i}
              type="button"
              onClick={() => play(i)}
              disabled={!!cell || over}
              aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ""}`}
              className={cn(
                "flex size-20 items-center justify-center rounded-lg border bg-white text-4xl font-bold shadow-sm transition-colors sm:size-[4.5rem] md:size-20",
                "enabled:hover:bg-slate-50 disabled:cursor-not-allowed",
                cell === "X" ? "text-blue-600" : "text-red-600",
                line?.includes(i) && "border-green-400 bg-green-50",
              )}
            >
              {cell}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <CardContent className="py-3 text-center">
            <p className={cn("text-xl font-semibold", statusColor)} aria-live="polite">
              {status}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Score Board</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-around pt-4">
            <Score label="Player X" value={scores.X} badge="border-blue-400 text-blue-600" num="text-blue-600" />
            <Score label="Draws" value={scores.draws} badge="border-amber-400 text-amber-600" num="text-amber-600" />
            <Score label="Player O" value={scores.O} badge="border-red-400 text-red-600" num="text-red-600" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={newGame}>New Game</Button>
          <Button variant="outline" onClick={resetAll}>
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}

function Score({
  label,
  value,
  badge,
  num,
}: {
  label: string;
  value: number;
  badge: string;
  num: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Badge variant="outline" className={badge}>
        {label}
      </Badge>
      <span className={cn("text-2xl font-bold", num)}>{value}</span>
    </div>
  );
}
