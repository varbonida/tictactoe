"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BoneIcon, PawIcon, PetIcon, type Pet } from "@/components/pets";

type Cell = Pet | null;

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

const PLURAL: Record<Pet, string> = { cat: "Cats", dog: "Dogs" };
const SINGULAR: Record<Pet, string> = { cat: "Cat", dog: "Dog" };
const other = (p: Pet): Pet => (p === "cat" ? "dog" : "cat");

function getWinningLine(board: Cell[]) {
  return (
    LINES.find(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]) ??
    null
  );
}

const emptyBoard = (): Cell[] => Array(9).fill(null);

export function Game() {
  const [board, setBoard] = useState<Cell[]>(emptyBoard);
  const [starter, setStarter] = useState<Pet>("cat");
  const [turn, setTurn] = useState<Pet>("cat");
  const [scores, setScores] = useState({ cat: 0, dog: 0, draws: 0 });

  const line = getWinningLine(board);
  const winner = line ? (board[line[0]] as Pet) : null;
  const isDraw = !winner && board.every(Boolean);
  const over = !!winner || isDraw;

  function play(i: number) {
    if (board[i] || over) return;
    const next = board.slice();
    next[i] = turn;
    setBoard(next);

    if (getWinningLine(next)) {
      setScores((s) => ({ ...s, [turn]: s[turn] + 1 }));
    } else if (next.every(Boolean)) {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    } else {
      setTurn(other(turn));
    }
  }

  function newGame() {
    const next = other(starter);
    setStarter(next);
    setTurn(next);
    setBoard(emptyBoard());
  }

  function resetScores() {
    setScores({ cat: 0, dog: 0, draws: 0 });
    setStarter("cat");
    setTurn("cat");
    setBoard(emptyBoard());
  }

  const status = winner
    ? `${PLURAL[winner]} win the yard!`
    : isDraw
      ? "Draw. Everybody naps."
      : `${SINGULAR[turn]}'s turn`;

  return (
    <section className="mx-auto grid w-full max-w-md gap-5 md:max-w-3xl md:grid-cols-[1.1fr_1fr] md:grid-rows-[auto_auto_1fr] md:gap-x-8">
      <div
        key={status}
        role="status"
        aria-live="polite"
        className={cn(
          "flex min-h-14 items-center justify-self-center md:col-start-2 md:row-start-1 md:self-start gap-3 rounded-full border-[3px] border-ink bg-cream py-1.5 pr-6 pl-2 font-display text-xl text-ink shadow-[0_8px_16px_-6px_rgb(29_27_58/0.4)]",
          "animate-[rise_0.35s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none",
        )}
      >
        {isDraw ? (
          <BoneIcon className="size-10" />
        ) : (
          <PetIcon pet={winner ?? turn} className="size-10" />
        )}
        <span>{status}</span>
      </div>

      <div className="w-full rounded-[2rem] border-[3px] border-ink bg-cream p-3 md:col-start-1 md:row-span-3 md:row-start-1 shadow-[0_22px_30px_-14px_rgb(29_27_58/0.55)]">
        <div className="grid grid-cols-3 gap-2.5">
          {board.map((cell, i) => {
            const winning = line?.includes(i);
            const row = Math.floor(i / 3) + 1;
            const col = (i % 3) + 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => play(i)}
                disabled={!!cell || over}
                aria-label={`Row ${row}, column ${col}, ${cell ? SINGULAR[cell] : "empty"}`}
                className={cn(
                  "group relative flex aspect-square items-center justify-center rounded-2xl border-[3px] border-ink bg-white p-2 transition-colors duration-200",
                  "enabled:cursor-pointer enabled:hover:bg-[#fff0cf] disabled:cursor-default",
                  winning && "bg-[#ffe27a]",
                )}
              >
                {cell ? (
                  <PetIcon
                    pet={cell}
                    className={cn(
                      "size-full animate-[pop_0.4s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none",
                      winning &&
                        "animate-[pop_0.4s_cubic-bezier(0.16,1,0.3,1)_both,hop_0.7s_cubic-bezier(0.16,1,0.3,1)_0.4s_3] motion-reduce:animate-none",
                    )}
                    style={winning ? { animationDelay: `0s, ${0.4 + (line!.indexOf(i)) * 0.12}s` } : undefined}
                  />
                ) : (
                  !over && (
                    <PetIcon
                      pet={turn}
                      className="size-full opacity-0 transition-opacity duration-200 group-hover:opacity-25 group-focus-visible:opacity-25"
                    />
                  )
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-3 md:col-start-2 md:row-start-2">
        <Tile label="Cats" value={scores.cat} tone="text-cat-text">
          <PetIcon pet="cat" className="size-9" />
        </Tile>
        <Tile label="Draws" value={scores.draws} tone="text-ink">
          <BoneIcon className="size-9" />
        </Tile>
        <Tile label="Dogs" value={scores.dog} tone="text-dog">
          <PetIcon pet="dog" className="size-9" />
        </Tile>
      </div>

      <div className="grid w-full grid-cols-[1.4fr_1fr] gap-3 md:col-start-2 md:row-start-3 md:self-start">
        <Button
          onClick={newGame}
          className="h-12 rounded-full border-[3px] border-ink bg-cat font-display text-lg text-ink shadow-[0_8px_14px_-6px_rgb(29_27_58/0.5)] transition-transform hover:bg-cat hover:brightness-105 active:translate-y-0.5"
        >
          New Game
        </Button>
        <Button
          variant="outline"
          onClick={resetScores}
          className="h-12 rounded-full border-[3px] border-ink bg-cream font-display text-base text-ink hover:bg-white"
        >
          Reset scores
        </Button>
      </div>

      {winner && <Confetti winner={winner} />}
    </section>
  );
}

function Tile({
  label,
  value,
  tone,
  children,
}: {
  label: string;
  value: number;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 rounded-2xl border-[3px] border-ink bg-cream px-2 py-2.5">
      {children}
      <span className={cn("font-display text-3xl leading-none tabular-nums", tone)}>{value}</span>
      <span className="text-sm font-semibold text-ink/80">{label}</span>
    </div>
  );
}

function Confetti({ winner }: { winner: Pet }) {
  const colors = winner === "cat" ? ["#ff8a1f", "#ffe27a", "#fff6e5"] : ["#8a5230", "#f2c48d", "#fff6e5"];
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden motion-reduce:hidden">
      {Array.from({ length: 22 }, (_, i) => (
        <PawIcon
          key={i}
          className="absolute top-0 animate-[fall_var(--dur)_cubic-bezier(0.3,0.1,0.6,1)_var(--delay)_both]"
          style={
            {
              left: `${(i * 37) % 100}%`,
              width: 18 + (i % 4) * 8,
              color: colors[i % colors.length],
              "--dur": `${2.4 + (i % 5) * 0.35}s`,
              "--delay": `${(i % 7) * 0.12}s`,
              "--spin": `${(i % 2 ? 1 : -1) * (180 + i * 20)}deg`,
              filter: "drop-shadow(0 1px 0 rgb(29 27 58 / 0.6))",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
