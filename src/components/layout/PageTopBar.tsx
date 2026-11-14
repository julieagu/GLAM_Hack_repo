import { Link } from "react-router";

/** Area pages: «← Home» back link over a 1px ink rule. */
export function PageTopBar({ backTo = "/", backLabel = "Home" }: { backTo?: string; backLabel?: string }) {
  return (
    <div className="px-6 pt-4">
      <div className="border-b border-ink pb-3">
        <Link to={backTo} className="text-body hover:underline">
          ← {backLabel}
        </Link>
      </div>
    </div>
  );
}

/** Page title block under the top bar: Display 48 + lead. */
export function PageTitle({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="flex flex-col gap-2 px-6 pt-6 pb-10">
      <h1 className="text-display font-light tracking-tight">{title}</h1>
      {lead && <p className="text-lead text-area-ink">{lead}</p>}
    </div>
  );
}
