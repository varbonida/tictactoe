import { Game } from "@/components/game";
import { CatIcon, DogIcon } from "@/components/pets";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-5 px-4 py-6 sm:py-8">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="flex items-center gap-3 font-display text-5xl leading-none text-cream [text-shadow:0_3px_0_var(--ink),0_-3px_0_var(--ink),3px_0_0_var(--ink),-3px_0_0_var(--ink),2px_2px_0_var(--ink),-2px_-2px_0_var(--ink),2px_-2px_0_var(--ink),-2px_2px_0_var(--ink)] sm:text-6xl">
          <CatIcon className="size-12 sm:size-16" />
          <span>vs</span>
          <DogIcon className="size-12 sm:size-16" />
        </h1>
        <p className="text-lg font-semibold text-ink">
          Tic-Tac-Toe. Three in a row wins the yard.
        </p>
      </header>
      <Game />
    </main>
  );
}
