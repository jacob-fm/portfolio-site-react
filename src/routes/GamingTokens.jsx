import ProjectPage from "../components/ProjectPage";

export default function GamingTokens() {
  return (
    <ProjectPage title="Yale Collections: 18th Century Chinese Gaming Tokens">
      <p>
        In the fall of my junior year of college, I took a course called Graphic
        Design Methodologies. One of the larger projects we were asked to
        produce was to produce a set of promotional materials for a hypothetical
        exhibition of something from&nbsp;
        <a href="https://www.yale.edu/collections" target="_blank">
          the Yale Collections.&nbsp;
        </a>
        After some digging, I came across a collection of Chinese
        mother-of-pearl gaming counters from the 18th and 19th centuries. If
        you’re interested in learning about the history of these pieces, you can
        read more&nbsp;
        <a
          href="https://hdl.handle.net/10079/fa/beinecke.gamingcounters"
          target="_blank"
        >
          here
        </a>
        .
      </p>

      <p>
        We were asked to produce a series of flyers, postcards, promotional
        instagram posts, and finally a mockup of an installation to be shown
        along with the artifacts.
      </p>
      <h2>Installation Mockup</h2>
      <p>
        I created a video showing what it might look like to have a blown-up
        image of one of the tokens, with a lenticular effect, such that at
        certain angles, an image of the family who owned this token would
        appear.
      </p>
      <div>
        <video loop autoPlay>
          <source
            src="/media/gaming_counters/beinecke_exhibition.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <h2>Postcards</h2>
      <div className="space-y-4 mb-7 grid md:grid-cols-2 md:space-y-0 md:gap-3 ">
        <img
          src="/media/gaming_counters/postcard1.1.png"
          alt="First version of promotional postcard, 1/2"
          loading="lazy"
        />
        <img
          src="/media/gaming_counters/postcard2.1.png"
          alt="First version of promotional postcard, 2/2"
          loading="lazy"
        />
        <img
          src="/media/gaming_counters/postcard1.3.png"
          alt="Second version of promotional postcard, 1/2"
          loading="lazy"
        />
        <img
          src="/media/gaming_counters/postcard2.3.png"
          alt="Second version of promotional postcard, 2/2"
          loading="lazy"
        />
      </div>
      <h2>Flyers</h2>
      <div className="flex flex-wrap">
        <img
          className="w-sm mx-auto"
          src="/media/gaming_counters/flyer1.png"
          alt="Promotional flyer 1"
          loading="lazy"
        />
        <img
          className="w-sm mx-auto"
          src="/media/gaming_counters/flyer2.png"
          alt="Promotional flyer 2"
          loading="lazy"
        />
        <img
          className="w-sm mx-auto"
          src="/media/gaming_counters/flyer3.png"
          alt="Promotional flyer 3"
          loading="lazy"
        />
      </div>
    </ProjectPage>
  );
}
