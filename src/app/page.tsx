import { Game } from "@/components/game";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 bg-gradient-to-br from-blue-50 to-red-50 px-4 py-10">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-slate-900">Tic-Tac-Toe</h1>
        <p className="mt-2 text-sm text-slate-600">
          Challenge your friends in this classic game!
        </p>
      </header>
      <Game />
      <p className="text-xs text-slate-500">
        Built with React 19, Next.js, Tailwind CSS, and shadcn/ui
      </p>
    </main>
  );
}
