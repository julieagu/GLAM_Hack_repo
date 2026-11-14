import { createBrowserRouter, RouterProvider } from "react-router";
import About from "@/pages/About";
import ArtworkInfo from "@/pages/ArtworkInfo";
import Conservation from "@/pages/Conservation";
import Conversations from "@/pages/Conversations";
import CreativeCamera from "@/pages/CreativeCamera";
import DesignSystem from "@/pages/DesignSystem";
import ErrorPage from "@/pages/ErrorPage";
import FeelingsSurvey from "@/pages/FeelingsSurvey";
import Home from "@/pages/Home";
import InstagramRedirect from "@/pages/InstagramRedirect";
import LoanSurvey from "@/pages/LoanSurvey";
import Placeholder from "@/pages/Placeholder";
import SensorSetup from "@/pages/SensorSetup";
import SocialImpact from "@/pages/SocialImpact";
import StaffArtwork from "@/pages/StaffArtwork";
import StaffOverview from "@/pages/StaffOverview";
import Stories from "@/pages/Stories";

const router = createBrowserRouter(
  [
    {
      // Any screen that crashes shows ErrorPage (with Reload) instead of the raw router error.
      errorElement: <ErrorPage />,
      children: [
        // Borrower app (mobile)
        { path: "/", element: <Home /> },
        { path: "/artwork", element: <ArtworkInfo /> },
        { path: "/artwork/feedback", element: <LoanSurvey /> },
        { path: "/conservation", element: <Conservation /> },
        { path: "/conservation/setup", element: <SensorSetup /> },
        { path: "/social", element: <SocialImpact /> },
        { path: "/social/conversations", element: <Conversations /> },
        { path: "/social/stories", element: <Stories /> },
        { path: "/social/feelings", element: <FeelingsSurvey /> },
        { path: "/social/creativity-work/camera", element: <CreativeCamera /> },
        { path: "/social/instagram", element: <InstagramRedirect /> },
        { path: "/contact", element: <Placeholder title="Contact" /> },
        // Q&A lives on opendata.ch (footer link opens it in a new tab).
        { path: "/about", element: <About /> },
        // Staff dashboard (desktop + mobile), opened from the footer «Dashboard» tab
        { path: "/staff", element: <StaffOverview /> },
        { path: "/staff/artworks", element: <StaffArtwork /> },
        // Dev
        { path: "/design-system", element: <DesignSystem /> },
        { path: "*", element: <Placeholder title="Not found" /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

export default function App() {
  return <RouterProvider router={router} />;
}
