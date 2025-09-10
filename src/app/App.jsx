import DesignSection from "../components/DesignSection";
import ProgrammingSection from "../components/ProgrammingSection";
import ThumbnailCard from "../components/ThumbnailCard";
import "./style.css";

function App() {
  const thumbnails = [
    {
      title: "BopMatch",
      route: "/bopmatch",
      image: "/media/bopmatch/bopmatch_thumbnail.png",
    },
    {
      title: "Alien Egg Sculpture",
      route: "alien-egg",
      image: "/media/alien_egg/brain_rock_thumbnail.png",
    },
    {
      title: "MIDI Signal Augmenter",
      route: "/midi",
      image: "/media/midi_thumbnail.png",
    },
    {
      title: "AVID Fitness",
      route: "/avid",
      image: "/media/avid/avid_thumbnail.jpg",
    },
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
          <i className="fa-brands fa-instagram text-2xl text-primary">
          </i>
        </a>
        <a href="https://github.com/jacob-fm" target="_blank">
          <i className="fa-brands fa-github text-2xl text-primary"></i>
        </a>
        <a href="mailto:ja%63ob%66e%69t%6Dann@gm%61%69l.com">
          <i className="fa-regular fa-envelope text-2xl text-primary"></i>
        </a>
      </div>
      <div className="flex flex-col gap-7 mx-auto max-w-160">
        {thumbnails.map((t, idx) => <ThumbnailCard {...t} key={idx} />)}
      </div>
      {/* <script type="module" src="/src/main.js"></script> */}
    </>
  );
}

export default App;
