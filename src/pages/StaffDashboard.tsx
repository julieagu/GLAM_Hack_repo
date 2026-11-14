// Desktop staff dashboard (Paper: Desktop – Staff › Dashboard – Artwork (Tulipes) v2).
// Foundation only — layout bands are in place, content still to build.
const bands = [
  { cls: "bg-mint", title: "Tulipes", note: "Artwork band · full width" },
];

export default function StaffDashboard() {
  return (
    <div className="min-h-dvh bg-white">
      <header className="flex h-18 items-center justify-between border-b border-ink px-6">
        <img src={`${import.meta.env.BASE_URL}skkg-logo.svg`} alt="SKKG" width={160} height={26} />
        <nav className="flex gap-1 rounded-pill border border-ink p-1 text-caption">
          <span className="rounded-pill bg-ink px-4 py-1.5 text-white">Artwork</span>
          <span className="px-4 py-1.5">Artothek overview</span>
        </nav>
        <span className="text-caption text-ink-muted">Staff</span>
      </header>
      <main className="mx-auto max-w-desktop">
        {bands.map((b) => (
          <section key={b.title} className={`${b.cls} px-8 py-10`}>
            <p className="text-caption text-mint-900">{b.note}</p>
            <h1 className="text-hero font-light tracking-hero">{b.title}</h1>
          </section>
        ))}
        <div className="grid grid-cols-2">
          <section className="min-h-80 bg-orange p-8">
            <h2 className="text-display font-light tracking-tight">Social impact</h2>
          </section>
          <section className="min-h-80 bg-blue p-8">
            <h2 className="text-display font-light tracking-tight">Conservation</h2>
          </section>
        </div>
        <section className="p-8">
          <h2 className="text-display font-light tracking-tight">Loans of Tulipes</h2>
          <p className="text-caption text-ink-muted">2 loans · 6 waiting · 6 months each</p>
        </section>
      </main>
    </div>
  );
}
