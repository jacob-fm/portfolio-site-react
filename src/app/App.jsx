import DesignSection from "../components/DesignSection";
import ProgrammingSection from "../components/ProgrammingSection";
import ThumbnailCard from "../components/ThumbnailCard";
import "./style.css";

function App() {
  // window.showOverlay = function (overlayId) {
  //   const overlay = document.getElementById(overlayId);
  //   overlay.style.display = "flex";
  //   document.body.classList.add("overlay-active"); // Add class when showing overlay
  // };
  //
  // window.hideOverlay = function (overlayId) {
  //   const overlay = document.getElementById(overlayId);
  //   overlay.style.display = "none";
  //   document.body.classList.remove("overlay-active"); // Remove class when hiding overlay
  // };
  //
  // // Add click event listener to all overlay containers
  // document.querySelectorAll(".project-overlay").forEach((overlay) => {
  //   overlay.addEventListener("click", function (event) {
  //     // If the click is directly on the overlay (not its children)
  //     if (event.target === overlay) {
  //       window.hideOverlay(overlay.id);
  //     }
  //   });
  // });
  //
  // document.addEventListener("keydown", function (event) {
  //   if (event.key === "Escape") {
  //     // Find all visible overlays and hide them
  //     document.querySelectorAll(".project-overlay").forEach((overlay) => {
  //       if (overlay.style.display !== "none") {
  //         window.hideOverlay(overlay.id);
  //       }
  //     });
  //   }
  // });

  const thumbnails = [
    { title: "BopMatch", image: "/media/bopmatch/bopmatch_thumbnail.png" },
  ];

  return (
    <>
      <div id="title-block" className="w-full text-center my-8">
        <h1 className="text-4xl">Jacob Feit Mann</h1>
        <h2 className="text-2xl text-stone-600 font-light">
          Developer and Designer
        </h2>
      </div>
      <div
        className="flex w-full justify-center gap-4 mb-8"
        id="contact-icons"
      >
        <a href="https://www.instagram.com/i.love.kishka/" target="_blank">
          <i className="fa-brands fa-instagram text-2xl"></i>
        </a>
        <a href="https://github.com/jacob-fm" target="_blank">
          <i className="fa-brands fa-github text-2xl"></i>
        </a>
        <a href="mailto:ja%63ob%66e%69t%6Dann@gm%61%69l.com">
          <i className="fa-regular fa-envelope text-2xl"></i>
        </a>
      </div>
      {thumbnails.map((t, idx) => (
        <ThumbnailCard title={t.title} image={t.image} key={idx} />
      ))}
      {/* <script type="module" src="/src/main.js"></script> */}
    </>
  );
}

export default App;
