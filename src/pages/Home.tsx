import { Link } from "react-router";
import { BrandHeader, FooterTabs, MobileScreen } from "@/components/layout";
import { Icon } from "@/components/ui";
import { featuredArtwork as art, type Area } from "@/data/mock";
import { useArtworkImages } from "@/lib/useArtworkImages";

const categories: { area: Area; to: string; title: string; subtitle: string }[] = [
  { area: "artwork", to: "/artwork", title: "Discover My Story", subtitle: "Get to know me and my history." },
  { area: "social", to: "/social", title: "Be Part of The Story", subtitle: "Your experiences, feeling and conversations" },
  { area: "conservation", to: "/conservation", title: "How to Take Care of Me", subtitle: "Help me stay safe and in good condition" },
];

export default function Home() {
  const [image] = useArtworkImages(art.title, 400);
  return (
    <MobileScreen footer={<FooterTabs />}>
      <BrandHeader title="Welcome Home…" tagline="The Life of an Artwork" />

      <section className="flex gap-4 px-6 pb-7" aria-label="Artwork summary">
        <div
          className="h-51 w-[155px] shrink-0 rounded-md bg-stone bg-cover bg-center"
          style={image ? { backgroundImage: `url(${image})` } : undefined}
          role="img"
          aria-label={`${art.title} by ${art.artist}`}
        />
        <div className="flex min-w-0 flex-col gap-3.5 pt-0.5">
          <h1 className="text-headline font-bold tracking-[-0.01em]">{art.title}</h1>
          <dl className="flex flex-col gap-3.5">
            {[
              ["Year", art.year],
              ["Artist", art.artist],
              ["Technique", art.technique],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-0.5">
                <dt className="text-micro tracking-wide text-ink-muted">{k}</dt>
                <dd className="text-body">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <nav className="flex flex-col gap-2.5 px-6 pb-6" aria-label="Sections">
        {categories.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            data-area={c.area}
            className="flex h-19 items-center justify-between rounded-md bg-area pr-3.5 pl-5 transition-[filter] hover:brightness-95"
          >
            <span className="flex flex-col gap-0.5">
              <span className="text-lead">{c.title}</span>
              <span className="text-micro text-area-ink">{c.subtitle}</span>
            </span>
            <span className="flex size-10 items-center justify-center">
              <Icon name="arrow-up-right" />
            </span>
          </Link>
        ))}
      </nav>
    </MobileScreen>
  );
}
