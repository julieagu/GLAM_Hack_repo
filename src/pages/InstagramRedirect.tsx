import { Link } from "react-router";
import { MobileScreen } from "@/components/layout";
import { Icon } from "@/components/ui";
import { instagram } from "@/data/mock";

/**
 * «Follow @artothek»: shows the redirect screen only.
 * The Artothek Instagram account isn't live yet, so nothing opens Instagram.
 * TODO: when the account is live, redirect after a short delay:
 *   useEffect(() => { const t = setTimeout(() => location.assign(instagram.url), 1500); return () => clearTimeout(t); }, []);
 */
export default function InstagramRedirect() {
  return (
    <MobileScreen area="social" className="h-dvh">
      <div className="m-auto flex flex-col items-center gap-5 px-6 text-center" role="status" aria-live="polite">
        <span className="flex size-16 animate-pulse items-center justify-center rounded-pill bg-ink text-area motion-reduce:animate-none">
          <Icon name="instagram" size={28} />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-headline font-light">Redirecting to Instagram …</h1>
          <p className="text-body text-area-ink">Taking you to @{instagram.handle}</p>
        </div>
        <Link to="/social" className="text-caption underline underline-offset-4">
          Back to Social impact
        </Link>
      </div>
    </MobileScreen>
  );
}
