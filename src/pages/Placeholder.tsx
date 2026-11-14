import { Link } from "react-router";
import { FooterTabs, MobileScreen, PageTitle, PageTopBar } from "@/components/layout";

/** Stand-in for screens that are designed but not built yet. */
export default function Placeholder({ title }: { title: string }) {
  return (
    <MobileScreen footer={<FooterTabs />}>
      <PageTopBar />
      <PageTitle title={title} lead="Coming soon." />
      <p className="px-6 text-caption text-ink-muted">
        This screen is not built yet. <Link to="/" className="underline">Back to home</Link>
      </p>
    </MobileScreen>
  );
}
