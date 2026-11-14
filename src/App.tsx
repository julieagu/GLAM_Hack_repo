import { createBrowserRouter, RouterProvider } from "react-router";
import ArtworkInfo from "@/pages/ArtworkInfo";
import Conservation from "@/pages/Conservation";
import Conversations from "@/pages/Conversations";
import CreativeCamera from "@/pages/CreativeCamera";
import DesignSystem from "@/pages/DesignSystem";
import ErrorPage from "@/pages/ErrorPage";
import Home from "@/pages/Home";
import InstagramRedirect from "@/pages/InstagramRedirect";
import LoanSurvey from "@/pages/LoanSurvey";
import Placeholder from "@/pages/Placeholder";
import SensorSetup from "@/pages/SensorSetup";
import SocialImpact from "@/pages/SocialImpact";
import StaffDashboard from "@/pages/StaffDashboard";
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
        { path: "/social/creativity-work/camera", element: <CreativeCamera /> },
        { path: "/social/instagram", element: <InstagramRedirect /> },
        { path: "/contact", element: <Placeholder title="Contact" /> },
        { path: "/qa", element: <Placeholder title="Q&A" /> },
        { path: "/about", element: <Placeholder title="About" /> },
        // Staff (desktop)
        { path: "/staff", element: <StaffDashboard /> },
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
