import ThumbnailCard from "../components/ThumbnailCard";
import AnimatedBackground from "../components/AnimatedBackground";
import "./style.css";

function App() {
  const thumbnails = [
    {
      title: "BopMatch",
      route: "/bopmatch",
      image: "/media/bopmatch/bopmatch_thumbnail.png",
      badges: ["JavaScript", "React", "Supabase", "Vite", "Netlify"],
    },
    {
      title: '"Alien Egg" Sculpture',
      route: "alien-egg",
      image: "/media/alien_egg/brain_rock_thumbnail.png",
      badges: ["Arduino", "Sculpture"],
    },
    {
      title: '"Nigunim"',
      route: "/nigunim",
      image: "/media/nigunim/thumbnail.JPG",
      badges: ["Music", "Video Art"],
    },
    {
      title: "MIDI Signal Augmenter",
      route: "/midi",
      image: "/media/midi_thumbnail.png",
      badges: ["SuperCollider"],
    },
    {
      title: "Yale Collections: 18th Century Chinese Gaming Tokens",
      route: "/tokens",
      image: "/media/gaming_counters/gaming_counters_thumbnail.png",
      badges: ["Branding", "Poster Design"],
    },
    // {
    //   title: "AVID Fitness",
    //   route: "/avid",
    //   image: "/media/avid/avid_thumbnail.jpg",
    //   badges: ["Branding", "Logo Design", "WordPress"],
    // },
    // {
    //   title: "Amoriem Labs",
    //   route: "/amoriem",
    //   image: "/media/amoriem/amoriem_thumbnail.jpg",
    //   badges: ["Branding", "Logo Design"],
    // },
    {
      title: "Miscellaneous Design Work",
      route: "/misc-design",
      image: "/media/misc_thumbnail.png",
    },
  ];

  return (
    <>
      <AnimatedBackground />
      <div id="title-block" className="w-full text-center my-8">
        <h1 className="text-4xl">Jacob Feit Mann</h1>
        <h2 className="text-2xl text-stone-600 font-light">
          Software Engineer & Artist
        </h2>
      </div>
      <div className="flex w-full justify-center gap-6 mb-8" id="contact-icons">
        <a href="https://www.instagram.com/i.love.kishka/" target="_blank">
          <i className="fa-brands fa-instagram text-2xl md:text-4xl text-primary"></i>
        </a>
        <a href="https://github.com/jacob-fm" target="_blank">
          <i className="fa-brands fa-github text-2xl md:text-4xl text-primary"></i>
        </a>
        <a href="mailto:ja%63ob%66e%69t%6Dann@gm%61%69l.com">
          <i className="fa-regular fa-envelope text-2xl md:text-4xl text-primary"></i>
        </a>
      </div>
      <div className="flex flex-col gap-7 mx-auto max-w-160">
        {thumbnails.map((t, idx) => (
          <ThumbnailCard {...t} key={idx} />
        ))}
      </div>
      {/* <script type="module" src="/src/main.js"></script> */}
    </>
  );
}

export default App;
