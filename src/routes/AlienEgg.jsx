import ProjectPage from "../components/ProjectPage";
import LinkButton from "../components/LinkButton";
export default function AlienEgg() {
  return (
    <ProjectPage title="&quot;Alien Egg&quot; Sculpture">
      <LinkButton route="https://github.com/material-kish/arduino_gold">
        <i className="fa-brands fa-github"></i>Github Repo
      </LinkButton>
      <p>
        I built this sculpture for an exhibition of artwork by Yale college
        seniors. I had no prior experience with any of the materials I used - I
        had never made anything with clay, and more technically challenging, I
        had never built a physical circuit before or had any experience
        with&nbsp;
        <a href="https://en.wikipedia.org/wiki/Arduino" target="_blank">
          Arduinos
        </a>
        .
      </p>
      <p>
        I went into the project a bit unsure of what I was going to build, but
        after a few sessions at the pottery studio, and several all-nighters at
        the maker-space on campus, the project started to take literal and
        conceptual shape.
      </p>
      <p>
        What I ended up making was a small clay vessel, about the size of a
        football, with many holes along the surface. I crammed a bunch of LED
        strips inside, connected via an Arduino circuit to an ultrasonic sensor.
      </p>
      <figure>
        <img
          src="/media/alien_egg/wide_angle.jpg"
          alt="Wide angle shot of the Alien Egg sculpture in the gallery"
        />
        <figcaption>
          The egg sitting in its enclave
        </figcaption>
      </figure>
      <p>
        I placed the sculpture on a pedestal, tucked away under the staircase in
        one of the showrooms of the gallery. As members of the audience
        approached the sculpture, the ultrasonic sensor would read the distance
        to the nearest person. This information was fed through the circuit such
        that as people approached the sculpture, the LED strips would shine
        brighter, and as they moved away, the lights would dim.
      </p>
      <img
        src="/media/alien_egg/close_up.jpg"
        alt="Close-up shot of Alien Egg sculpture"
      />
      <div className="space-y-2 flex flex-col ">
        <video preload="none" controls loop muted className="aspect-video">
          <source src="/media/alien_egg/demonstration.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <figcaption>
          Video of the sculpture in action
        </figcaption>
      </div>
    </ProjectPage>
  );
}
