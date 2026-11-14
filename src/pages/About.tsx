// About: project description + team. Pink (Artothek highlight) theme via data-area="about".
import { MobileScreen, PageTitle, PageTopBar } from "@/components/layout";
import { Icon, SectionHeader } from "@/components/ui";
import { project, team } from "@/data/team";
import { teamPhoto } from "@/lib/assetImages";

/** LinkedIn link, or a dashed placeholder pill until the URL is filled in /data/team.ts. */
function LinkedInLink({ name, url }: { name: string; url: string }) {
  const cls = "inline-flex h-8 items-center gap-1.5 self-start rounded-pill border border-ink px-3 text-caption";
  return url ? (
    <a href={url} target="_blank" rel="noreferrer" className={`${cls} hover:bg-ink/5`} aria-label={`${name} on LinkedIn (opens in a new tab)`}>
      <Icon name="linkedin" size={16} /> LinkedIn ↗
    </a>
  ) : (
    <span className={`${cls} border-dashed text-ink-muted`} aria-disabled="true" title="LinkedIn link coming soon">
      <Icon name="linkedin" size={16} /> LinkedIn
    </span>
  );
}

/** Website link, or a dashed placeholder pill until the URL is filled in /data/team.ts. */
function WebsiteLink({ name, url }: { name: string; url: string }) {
  const cls = "inline-flex h-8 items-center gap-1.5 self-start rounded-pill border border-ink px-3 text-caption";
  return url ? (
    <a href={url} target="_blank" rel="noreferrer" className={`${cls} hover:bg-ink/5`} aria-label={`${name}'s website (opens in a new tab)`}>
      <Icon name="globe" size={16} /> Website ↗
    </a>
  ) : (
    <span className={`${cls} border-dashed text-ink-muted`} aria-disabled="true" title="Website link coming soon">
      <Icon name="globe" size={16} /> Website
    </span>
  );
}

function TeamMember({ name, role, bio, linkedin, website }: (typeof team)[number]) {
  const photo = teamPhoto(name);
  return (
    <li className="flex flex-col gap-2.5">
      {photo ? (
        <img src={photo} alt={name} className="aspect-square w-full rounded-pill border border-ink object-cover" />
      ) : (
        // Placeholder until src/assets/team/<name>.jpg exists.
        <div
          className="flex aspect-square w-full items-center justify-center rounded-pill border border-dashed border-ink bg-pink-soft text-display font-light"
          role="img"
          aria-label={`Photo of ${name} (placeholder)`}
        >
          {name[0]}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        <span className="text-lead">{name}</span>
        <span className="text-micro font-medium tracking-wide">{role}</span>
        <p className="text-caption leading-5 text-area-ink">{bio}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <LinkedInLink name={name} url={linkedin} />
        {website !== undefined && <WebsiteLink name={name} url={website} />}
      </div>
    </li>
  );
}

export default function About() {
  return (
    <div data-area="about">
      <MobileScreen>
        <PageTopBar />
        <PageTitle title="Welcome Home" lead={project.event} />

        <section className="flex flex-col gap-3 px-6 pb-10" aria-labelledby="project">
          <SectionHeader title="The Life of an Artwork" className="[&>div]:pb-0" />

          {project.description.map((p) => (
            <p key={p} className="text-body">
              {p}
            </p>
          ))}
        </section>

        <section className="flex flex-col gap-4 px-6 pb-10" aria-label="Team">
          <SectionHeader title="The team" className="[&>div]:pb-0" />
          <ul className="grid grid-cols-2 gap-x-3 gap-y-6">
            {team.map((m) => (
              <TeamMember key={m.name} {...m} />
            ))}
          </ul>
        </section>
      </MobileScreen>
    </div>
  );
}
