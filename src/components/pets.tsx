import type { SVGProps } from "react";

export type Pet = "cat" | "dog";

const INK = "#1d1b3a";

function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke={INK}
      strokeWidth={3}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function CatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path
        d="M10 26 L12 6 L26 15 Q32 13 38 15 L52 6 L54 26 Q58 32 56 40 Q52 56 32 56 Q12 56 8 40 Q6 32 10 26Z"
        fill="#ff9a3c"
      />
      <path d="M14 14 L15 22 L21 18Z" fill="#ffb3b3" stroke="none" />
      <path d="M50 14 L49 22 L43 18Z" fill="#ffb3b3" stroke="none" />
      <path d="M32 19 v6 M26 20 l1 5 M38 20 l-1 5" strokeWidth={2.5} />
      <ellipse cx="23" cy="34" rx="3" ry="4" fill={INK} stroke="none" />
      <ellipse cx="41" cy="34" rx="3" ry="4" fill={INK} stroke="none" />
      <path d="M29 41 h6 l-3 3.5Z" fill="#ff6b8b" strokeWidth={2} />
      <path d="M32 44.5 v2 M32 46.5 q-3 3 -6 1 M32 46.5 q3 3 6 1" strokeWidth={2} />
      <path d="M6 40 L18 42 M6 47 L18 45 M58 40 L46 42 M58 47 L46 45" strokeWidth={2} />
    </Base>
  );
}

export function DogIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path
        d="M16 14 Q4 16 6 38 Q8 47 17 41 Q19 27 19 18Z"
        fill="#7a4a2b"
      />
      <path
        d="M48 14 Q60 16 58 38 Q56 47 47 41 Q45 27 45 18Z"
        fill="#7a4a2b"
      />
      <path
        d="M32 9 Q51 9 52 30 Q54 54 32 56 Q10 54 12 30 Q13 9 32 9Z"
        fill="#f2c48d"
      />
      <circle cx="41" cy="29" r="6.5" fill="#7a4a2b" stroke="none" />
      <ellipse cx="32" cy="44" rx="11" ry="8" fill="#fff1dd" strokeWidth={2.5} />
      <circle cx="24" cy="30" r="3" fill={INK} stroke="none" />
      <circle cx="41" cy="30" r="3" fill={INK} stroke="none" />
      <path d="M26 38 Q32 35 38 38 Q38 43 32 44 Q26 43 26 38Z" fill={INK} />
      <path d="M32 44 v3 M32 47 q-4 3 -7 0 M32 47 q4 3 7 0" strokeWidth={2} />
      <path d="M30 49 q2.5 7 5.5 0Z" fill="#ff6b8b" strokeWidth={2} />
    </Base>
  );
}

export function BoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <g transform="rotate(-35 32 32)" fill="#fff6e5">
        <rect x="12" y="27" width="40" height="10" />
        <circle cx="12" cy="25" r="6" />
        <circle cx="12" cy="39" r="6" />
        <circle cx="52" cy="25" r="6" />
        <circle cx="52" cy="39" r="6" />
        <rect x="10" y="28.6" width="44" height="6.8" fill="#fff6e5" stroke="none" />
      </g>
    </Base>
  );
}

export function PetIcon({ pet, ...props }: { pet: Pet } & SVGProps<SVGSVGElement>) {
  return pet === "cat" ? <CatIcon {...props} /> : <DogIcon {...props} />;
}

export function PawIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <ellipse cx="16" cy="21" rx="7" ry="5.5" fill="currentColor" />
      <ellipse cx="8" cy="13" rx="2.8" ry="3.8" fill="currentColor" />
      <ellipse cx="14" cy="8.5" rx="2.8" ry="3.8" fill="currentColor" />
      <ellipse cx="20" cy="8.5" rx="2.8" ry="3.8" fill="currentColor" />
      <ellipse cx="26" cy="13" rx="2.8" ry="3.8" fill="currentColor" />
    </svg>
  );
}
