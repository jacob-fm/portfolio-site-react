import ProjectPage from "../components/ProjectPage";

export default function Amoriem() {
  return (
    <ProjectPage title="Amoriem Labs">
      <p>
        <a href="https://amoriem-labs.github.io/index.html">Amoriem Labs</a>
        &nbsp;is the undergraduate game development club at Yale University.
        Before I was project manager as a junior, I started as a first-year
        designing logos and UI elements. Amoriem’s name comes from the first
        game produced by its members. From Amoriem’s website:
      </p>
      <blockquote cite="https://amoriem-labs.github.io/about.html">
        The name is an anagram of memoria ("memory" in Latin), and includes the
        words amor ("love" in Spanish) and mori ("to die" in Latin).”
      </blockquote>
      <p>
        While my design philosophy is usually about emphasizing aesthetics and
        tone over gimmicks and “visual puns”, I decided to go against that
        guideline in creating the symbol used in the logo. In the landscape
        orientation, it resembles the buttons and D-pad of a typical gamepad
        layout. When rotated to the portrait orientation, it resembles (albeit
        abstractly) a skull with a heart on the forehead - a nod to the
        etymology of the group’s name.
      </p>
      <div>
        <img
          src="/media/amoriem/logo_landscape_icon.png"
          alt="Amoriem logo with icon in landscape orientation"
          loading="lazy"
        />
        <img
          src="/media/amoriem/logo_portrait_icon.png"
          alt="Amoriem logo with icon in portrait orientation"
          loading="lazy"
        />
      </div>
      <p>
        When choosing the brand colors, I first considered using&nbsp;
        <a href="https://yaleidentity.yale.edu/core-identity-elements/yale-colors">
          Yale’s signature blue
        </a>
        , but decided against it. Many clubs at Yale use those colors, so I
        figured that in order for our flyers and such to stand out, we would
        need to go a different route. I went with colors that were vibrant,
        exciting, and a bit unconventional to reflect the enthusiasm and slight
        avante-garde bent to the club’s game development ethos.
      </p>
      <p>
        Since my time with the club, the logo has been updated and streamlined -
        and I have to admit, while the skull imagery has been lost, the new logo
        is a fair bit cleaner and easier to read. Nevertheless, I’m happy with
        the original version, and glad to see that its DNA is still there.
      </p>
      <figure>
        <img
          src="/media/amoriem/new_logo.png"
          alt="Amoriem Labs' new logo"
          loading="lazy"
        />
        <figcaption>The new logo</figcaption>
      </figure>
    </ProjectPage>
  );
}
