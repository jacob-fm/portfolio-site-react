import ProjectPage from "../../components/ProjectPage";
import LinkButton from "../../components/LinkButton";

export default function ThirdStrikeGallery() {
  return (
    <ProjectPage title="Third Strike Gallery">
      <blockquote className="bg-bg-dark">
        <b>NOTE</b>: This is a work in progress. A number of features have yet
        to be fleshed out. In particular, the "practice mode" has only been
        partially ipmlemented for Akuma, and has yet to be implemented at all
        for the other characters.
      </blockquote>
      <LinkButton route="https://third-strike-gallery.vercel.app/">
        <i className="fa-solid fa-gamepad "></i>
        Check out the site
      </LinkButton>
      <p>
        I wanted to learn a bit about Three.js, and rather than make a landing
        page for a fake Saas company, I thought I'd do something fun, and
        recreate the character select screen from{" "}
        <a href="https://en.wikipedia.org/wiki/Evo_Moment_37" target="_blank">
          Street Figher 3: Third Strike
        </a>{" "}
        in a more modern style. While the game is older than I am, it still has
        an active player base, and I have had a lot of fun occasionally playing
        around with it using emulators.
      </p>
      <div className="space-y-2 flex flex-col ">
        <video preload="auto" loop muted autoPlay className="aspect-video">
          <source
            src="/media/third-strike-gallery/recording.mp4"
            type="video/mp4"
            aria-label="Recording of a user interacting with the site"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2>Process</h2>
      <p>
        I had a fun time putting together a moodboard using screnshots from the
        original Third Strike as well as other games. I had in mind that I
        needed to create the character select page, as well as some other page
        to navigate to when a character was clicked.
      </p>
      <figure className="flex flex-col items-center bg-bg-dark pt-4 pb-2">
        <img
          src="/media/third-strike-gallery/moodboard.png"
          aria-label="Moodboard"
          className="w-[80%]"
        />
        <figcaption>Moodboard</figcaption>
      </figure>
      <p>
        I spent a good chunk of time prototyping the layout. Even though I had
        the layout from the original game to use as a starting point, I wanted
        to consider a number of options. I also wanted to try out using
        MCP-empowered design tools like{" "}
        <a href="https://paper.design/" target="_blank">
          Paper
        </a>
        , so I took this as an opportunity to do so.
      </p>
      <p>My mockup process:</p>
      <ul className="list-disc list-inside">
        <li>
          Block out a basic layout idea in{" "}
          <a href="https://excalidraw.com/" target="_blank">
            Excalidraw
          </a>
        </li>
        <li>
          Feed the screenshot to Claude and have it use the Paper MCP to create
          the layout in HTML
        </li>
        <li>Review, redesign, and go again</li>
      </ul>
      <div className="flex flex-col bg-primary-light py-4">
        <figure className="flex flex-col items-center ">
          <img
            src="/media/third-strike-gallery/wireframes.png"
            aria-label="Wireframes"
            className="w-[80%]"
          />
          <figcaption className="text-bg">Wireframes</figcaption>
        </figure>
        <figure className="flex flex-col items-center justify-center ">
          <img
            src="/media/third-strike-gallery/paper.png"
            aria-label="Paper mockups"
            className="w-[80%]"
          />
          <figcaption className="text-bg">Paper mockups</figcaption>
        </figure>
      </div>
      <i>
        Frankly, my review at this time is that while it was kind of exciting to
        watch Paper generate things, it wasn't all that helpful.
      </i>
    </ProjectPage>
  );
}
