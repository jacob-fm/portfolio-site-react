import { Link } from "react-router-dom";
import ThumbnailCard from "../components/ThumbnailCard";
import { getAllPosts } from "../lib/blog";
import "./style.css";

function App() {
  const hasBlogPosts = getAllPosts().length > 0;

  const thumbnails = [
    {
      title: "Point Cloud Parties",
      route: "/pointcloud",
      image: "/media/pointcloud/pink_wall.jpg",
      badges: ["Interactive", "TouchDesigner", "Live Events", "Resolume"],
    },
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
      title: "Yale Collections: Gaming Tokens",
      route: "/tokens",
      image: "/media/gaming_counters/gaming_counters_thumbnail.png",
      badges: ["Branding", "Poster Design"],
    },
    {
      title: "AVID Fitness",
      route: "/avid",
      image: "/media/avid/avid_thumbnail.jpg",
      badges: ["Branding", "Logo Design", "WordPress"],
    },
    {
      title: "Amoriem Labs",
      route: "/amoriem",
      image: "/media/amoriem/amoriem_thumbnail.jpg",
      badges: ["Branding", "Logo Design"],
    },
    {
      title: "Miscellaneous Design Work",
      route: "/misc-design",
      image: "/media/misc_thumbnail.png",
    },
  ];

  const [featured, ...rest] = thumbnails;

  return (
    <div className="relative">
      {/* Desktop: top-right corner */}
      {hasBlogPosts && (
        <div className="hidden md:block fixed top-14 right-24 z-20">
          <Link
            to="/blog"
            className="flex items-center gap-1.5 py-2 px-4 text-lg text-primary border border-primary rounded-lg hover:text-hover hover:border-hover active:text-blue-700 active:border-blue-700"
          >
            <i className="fa-solid fa-pen-nib"></i>
            <span>Blog</span>
          </Link>
        </div>
      )}
      <div id="title-block" className="w-full text-center my-8">
        <h1 className="text-5xl mb-1 font-heading">Jacob Feit Mann</h1>
        <h2 className="text-2xl text-stone-600 font-light">
          Creative Technologist
        </h2>
      </div>
      <div className="flex w-full justify-center gap-6 mb-8" id="contact-icons">
        <a href="https://www.instagram.com/jacob.feit.mann/" target="_blank">
          <i className="fa-brands fa-instagram text-2xl md:text-4xl text-primary hover:text-hover"></i>
        </a>
        <a href="https://github.com/jacob-fm" target="_blank">
          <i className="fa-brands fa-github text-2xl md:text-4xl text-primary hover:text-hover"></i>
        </a>
        <a href="mailto:ja%63ob%66e%69t%6Dann@gm%61%69l.com">
          <i className="fa-regular fa-envelope text-2xl md:text-4xl text-primary hover:text-hover"></i>
        </a>
      </div>
      {/* Mobile: below contact icons */}
      {hasBlogPosts && (
        <div className="flex justify-center mb-8 md:hidden">
          <Link
            to="/blog"
            className="flex items-center gap-1.5 py-2 px-4 text-lg text-primary border border-primary rounded-lg hover:text-hover hover:border-hover active:text-blue-700 active:border-blue-700"
          >
            <i className="fa-solid fa-pen-nib"></i>
            <span>Blog</span>
          </Link>
        </div>
      )}
      <div className="mx-auto max-w-300 px-4 mb-10">
        <h3 className="text-stone-500 mb-3">Recent Work</h3>
        <Link to={featured.route}>
          <div className="border border-solid border-primary shadow-lg transform transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-xl flex flex-col md:flex-row">
            <div className="md:w-2/3 h-64 md:h-80">
              <img
                src={featured.image}
                className="object-cover h-full w-full"
              />
            </div>
            <div className="md:w-1/3 flex flex-col items-center justify-center bg-bg text-primary p-6">
              <h2 className="text-2xl font-heading mb-3">{featured.title}</h2>
              <div className="flex flex-wrap gap-1.5">
                {featured.badges?.map((b, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-1 border border-primary rounded-lg"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div
        className="grid gap-7 mx-auto max-w-300 px-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" }}
      >
        {rest.map((t, idx) => (
          <ThumbnailCard {...t} key={idx} />
        ))}
      </div>
      {/* <script type="module" src="/src/main.js"></script> */}
    </div>
  );
}

export default App;
