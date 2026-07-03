import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PointCloudParties from "../routes/projects/PointCloudParties.jsx";
import Bopmatch from "../routes/projects/Bopmatch.jsx";
import MIDI from "../routes/projects/MIDI.jsx";
import AlienEgg from "../routes/projects/AlienEgg.jsx";
import Avid from "../routes/projects/Avid.jsx";
import Amoriem from "../routes/projects/Amoriem.jsx";
import GamingTokens from "../routes/projects/GamingTokens.jsx";
import MiscDesign from "../routes/projects/MiscDesign.jsx";
import NotFoundPage from "../routes/NotFoundPage.jsx";
import Nigunim from "../routes/projects/Nigunim.jsx";
import Blog from "../routes/Blog.jsx";
import BlogPost from "../routes/BlogPost.jsx";
import Strudel from "../routes/Strudel.jsx";
import Umbral from "../routes/projects/Umbral.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: better 404 page
    errorElement: <NotFoundPage />,
  },
  {
    path: "/umbral",
    element: <Umbral />,
  },
  {
    path: "/pointcloud",
    element: <PointCloudParties />,
  },
  {
    path: "/bopmatch",
    element: <Bopmatch />,
  },
  {
    path: "/alien-egg",
    element: <AlienEgg />,
  },
  {
    path: "/midi",
    element: <MIDI />,
  },
  {
    path: "/avid",
    element: <Avid />,
  },
  {
    path: "/amoriem",
    element: <Amoriem />,
  },
  {
    path: "/tokens",
    element: <GamingTokens />,
  },
  {
    path: "/nigunim",
    element: <Nigunim />,
  },
  {
    path: "/misc-design",
    element: <MiscDesign />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "/strudel",
    element: <Strudel />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
