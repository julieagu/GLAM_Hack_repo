import { createBrowserRouter, RouterProvider } from "react-router";
import ArtworkInfo from "@/pages/ArtworkInfo";
import Conservation from "@/pages/Conservation";
import Conversations from "@/pages/Conversations";
import DesignSystem from "@/pages/DesignSystem";
import Home from "@/pages/Home";
import Placeholder from "@/pages/Placeholder";
import SocialImpact from "@/pages/SocialImpact";
import StaffDashboard from "@/pages/StaffDashboard";

const router = createBrowserRouter([
  // Borrower app (mobile)
  { path: "/", element: <Home /> },
  { path: "/artwork", element: <ArtworkInfo /> },
  { path: "/conservation", element: <Conservation /> },
  { path: "/social", element: <SocialImpact /> },
  { path: "/social/conversations", element: <Conversations /> },
  { path: "/contact", element: <Placeholder title="Contact" /> },
  { path: "/qa", element: <Placeholder title="Q&A" /> },
  { path: "/about", element: <Placeholder title="About" /> },
  // Staff (desktop)
  { path: "/staff", element: <StaffDashboard /> },
  // Dev
  { path: "/design-system", element: <DesignSystem /> },
  { path: "*", element: <Placeholder title="Not found" /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
