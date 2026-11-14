// Illustrations from the Paper setup screens (Mobile/Conservation/Setup 1 & 2).

/** Small sensor with signal waves — «Place the sensor» hint, care guide empty state. */
export function SensorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-2 -2 52 52" aria-hidden="true" className="shrink-0">
      <rect x="8" y="8" width="32" height="32" rx="9" fill="var(--color-blue-200)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="5" fill="var(--color-blue-500)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <path d="M33 4c3 1.5 5.5 4 7 7M36 0.8c4 2 7.2 5.2 9.2 9.2" fill="none" stroke="var(--color-blue-700)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Pairing rings around the sensor. `searching` pulses the rings. */
export function PairingIllustration({ searching }: { searching: boolean }) {
  return (
    <svg viewBox="0 0 220 220" className="h-auto w-full max-w-55" aria-hidden="true">
      <circle cx="110" cy="110" r="104" fill="none" stroke="#00000026" className={searching ? "animate-pulse" : undefined} />
      <circle cx="110" cy="110" r="78" fill="none" stroke="#00000040" className={searching ? "animate-pulse [animation-delay:300ms]" : undefined} />
      <circle cx="110" cy="110" r="52" fill="var(--color-blue-200)" stroke="var(--color-ink)" />
      <rect x="88" y="88" width="44" height="44" rx="12" fill="var(--color-white)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <circle cx="110" cy="110" r="7" fill="var(--color-blue-500)" stroke="var(--color-ink)" strokeWidth="1.5" />
      <circle cx="182" cy="56" r="5" fill="var(--color-ink)" />
      <circle cx="34" cy="150" r="3.5" fill="#00000080" />
    </svg>
  );
}
