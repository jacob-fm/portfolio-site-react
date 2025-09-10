import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bopmatch from "../routes/Bopmatch.jsx";
import MIDI from "../routes/MIDI.jsx";
import AlienEgg from "../routes/AlienEgg.jsx";
import Avid from "../routes/Avid.jsx";
import Amoriem from "../routes/Amoriem.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // TODO: Create 404 page
    // errorElement: <NotFoundPage />,
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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
