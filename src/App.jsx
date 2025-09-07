import DesignSection from "./components/DesignSection";
import ProgrammingSection from "./components/ProgrammingSection";
import "./style.css";

function App() {
  window.showOverlay = function (overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = "flex";
    document.body.classList.add("overlay-active"); // Add class when showing overlay
  };

  window.hideOverlay = function (overlayId) {
    const overlay = document.getElementById(overlayId);
    overlay.style.display = "none";
    document.body.classList.remove("overlay-active"); // Remove class when hiding overlay
  };

  // Add click event listener to all overlay containers
  document.querySelectorAll(".project-overlay").forEach((overlay) => {
    overlay.addEventListener("click", function (event) {
      // If the click is directly on the overlay (not its children)
      if (event.target === overlay) {
        window.hideOverlay(overlay.id);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      // Find all visible overlays and hide them
      document.querySelectorAll(".project-overlay").forEach((overlay) => {
        if (overlay.style.display !== "none") {
          window.hideOverlay(overlay.id);
        }
      });
    }
  });

  return (
    <>
      <div id="title-block" className="w-full text-center my-6">
        <h1 className="text-4xl">Jacob Feit Mann</h1>
        <h2 className="text-2xl text-stone-600 font-light">
          Developer and Designer
        </h2>
      </div>
      <div className="centered-column" id="main-links">
        <a href="#programming-work-section">
          <h2>– Programming Work –</h2>
        </a>
        <a href="#design-work-section">
          <h2>– Design Work –</h2>
        </a>
      </div>
      <div className="mt mb" id="contact-icons">
        <a href="https://www.instagram.com/i.love.kishka/" target="_blank">
          <i className="fa-brands fa-instagram"></i>
        </a>
        <a href="https://github.com/jacob-fm" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="mailto:ja%63ob%66e%69t%6Dann@gm%61%69l.com">
          <i className="fa-regular fa-envelope"></i>
        </a>
      </div>
      <div className="centered-row mt mb-4">
        <a href="#design-work-section">
          <svg
            width="93"
            height="42"
            viewBox="0 0 93 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M93 0C78.8164 6.65854 49.1244 24.3805 43.8247 42C37.2 24.8415 22.6767 10.5 0 0C19.3644 -4.00542e-05 35.1616 12.1219 43.8247 25.0975C53.6088 11.5756 80.6849 0.853658 93 0Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
      <ProgrammingSection />
      <DesignSection />
      <div className="section-heading">
        <h2>Contact</h2>
      </div>
      <div className="contact-section mb">
        <a
          href="mailto:ja%63ob%66e%69t%6Dann@gm%61%69l.com"
          target="_blank"
          className="contact-detail"
        >
          <i className="fa-regular fa-envelope"></i>
          <h3>ja&#99;obfeitm&#97;nn&#64;gmail&#46;com</h3>
        </a>
        <a
          href="https://www.instagram.com/i.love.kishka/"
          target="_blank"
          className="contact-detail"
        >
          <i className="fa-brands fa-instagram"></i>
          <h3>@i.love.kishka</h3>
        </a>
        <a
          href="https://github.com/jacob-fm"
          target="_blank"
          className="contact-detail"
        >
          <i className="fa-brands fa-github"></i>
          <h3>github.com/jacob-fm</h3>
        </a>
      </div>
      <script type="module" src="/src/main.js"></script>
    </>
  );
}

export default App;
