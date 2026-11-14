import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { MobileScreen } from "@/components/layout";
import { Button } from "@/components/ui";

/**
 * Shown when a screen crashes, instead of React Router's raw developer error.
 * In development this mostly happens after a hot code update on an open page — Reload fixes it.
 */
export default function ErrorPage() {
  const error = useRouteError();
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  const detail = error instanceof Error ? error.message : isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : null;

  return (
    <MobileScreen className="h-dvh">
      <div className="m-auto flex flex-col items-start gap-4 px-6" role="alert">
        <h1 className="text-display font-light tracking-tight">{notFound ? "Page not found" : "Something went wrong"}</h1>
        <p className="text-lead text-ink-muted">
          {notFound ? "This page doesn't exist (yet)." : "This screen couldn't load. Reloading usually fixes it."}
        </p>
        <div className="flex w-full flex-col gap-3 pt-2">
          {!notFound && (
            <Button block onClick={() => window.location.reload()}>
              Reload
            </Button>
          )}
          <Link to="/" className="flex h-12 items-center justify-center rounded-pill border border-ink text-body hover:bg-ink/5">
            Back to home
          </Link>
        </div>
        {import.meta.env.DEV && detail && <p className="pt-4 text-micro text-ink-muted">Developer info: {detail}</p>}
      </div>
    </MobileScreen>
  );
}
