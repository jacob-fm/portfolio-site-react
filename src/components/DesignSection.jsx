import DesignThumbnail from "./DesignThumbnail";
import ProjectOverlay from "./ProjectOverlay";

const DesignSection = () => {
  return (
    <section id="design-work-section">
      <div className="section-heading">
        <h2>Design Work</h2>
      </div>
      <div className="gallery">
        <DesignThumbnail
          imageSrc="/media/avid/avid_thumbnail.jpg"
          imageAlt="AVID Fitness Logo"
          onClick={() => window.showOverlay("avid-overlay")}
        />
        <ProjectOverlay
          id="avid-overlay"
          title="AVID Fitness - Branding and Website"
          onClose={() => window.hideOverlay("avid-overlay")}
        >
          <p>
            AVID's greatest asset was its strong sense of community, so while we
            experimented with some pretty "out-there" ideas for the rebrand, the
            owner, Avi, and I decided on a new logo that kept some attributes of
            the old one, but with a more energetic and sleeker feeling.
          </p>
          <h3>Logo and Branding</h3>
          <p>
            AVID's greatest asset is its strong sense of community, so while we
            experimented with some pretty "out-there" ideas for the rebrand, the
            owner, Avi, and I decided on a new logo that kept some attributes of
            the old one, but with a more energetic and sleeker feeling.
          </p>
          <div className="grid two-columns contain-img-height-180">
            <figure>
              <img
                src="/media/avid/old_avid_logo.jpeg"
                alt="Old AVID Fitness logo"
                loading="lazy"
              />
              <figcaption>Old logo</figcaption>
            </figure>
            <figure>
              <img
                src="/media/avid/blue_on_white.jpg"
                alt="New AVID Fitness logo, white on blue background"
                loading="lazy"
              />
              <figcaption>New logo</figcaption>
            </figure>
          </div>
          <figure>
            <div className="grid funky-grid-1">
              <img src="/media/avid/profile_pic_2.png" loading="lazy" />
              <img src="/media/avid/post1.png" loading="lazy" />
              <img src="/media/avid/story1.png" loading="lazy" />
              <img src="/media/avid/post4.png" loading="lazy" />
              <img src="/media/avid/multi-image.png" loading="lazy" />
              <img src="/media/avid/post2.png" loading="lazy" />
            </div>
            <figcaption>
              Social media templates and brand assets
            </figcaption>
          </figure>
          <h3>Website</h3>
          <a href="https://avidstrong.com" target="_blank">
            avidstrong.com
          </a>
          <p>
            I built AVID’s website with WordPress, using a theme called GoFiz. I
            customized the theme to fit the branding we had created in the first
            step, keeping in mind the themes of community, energy, and
            motivation which were core to the business.
          </p>
          <p>
            AVID uses a software called MindBody which takes care of tracking
            customer information: class enrollments, payment info, etc. I
            customized MindBody’s web widgets to match the brand, and embedded
            them the HTML of the site.
          </p>
          <div className="centered-column">
            <img
              src="/media/avid/homepage_screenshot.jpg"
              alt="AVID Homepage"
              loading="lazy"
            />
            <img
              src="/media/avid/contact_screenshot.jpg"
              alt="AVID Contact Form"
              loading="lazy"
            />
            <img
              src="/media/avid/classes_screenshot.jpg"
              alt="AVID CLasses Widget using MindBody"
              loading="lazy"
            />
          </div>
        </ProjectOverlay>

        <DesignThumbnail
          imageSrc="/media/amoriem/amoriem_thumbnail.jpg"
          imageAlt="Amoriem Labs Logo"
          onClick={() => window.showOverlay("amoriem-overlay")}
        />
        <ProjectOverlay
          id="amoriem-overlay"
          title="Amoriem Labs - Logo and Branding"
          onClose={() => window.hideOverlay("amoriem-overlay")}
        >
          <p>
            <a href="https://amoriem-labs.github.io/index.html">Amoriem Labs</a>
            is the undergraduate game development club at Yale University.
            Before I was project manager as a junior, I started as a first-year
            designing logos and UI elements. Amoriem’s name comes from the first
            game produced by its members. From Amoriem’s website:
          </p>
          <blockquote cite="https://amoriem-labs.github.io/about.html">
            The name is an anagram of memoria ("memory" in Latin), and includes
            the words amor ("love" in Spanish) and mori ("to die" in Latin).”
          </blockquote>
          <p>
            While my design philosophy is usually about emphasizing aesthetics
            and tone over gimmicks and “visual puns”, I decided to go against
            that guideline in creating the symbol used in the logo. In the
            landscape orientation, it resembles the buttons and D-pad of a
            typical gamepad layout. When rotated to the portrait orientation, it
            resembles (albeit abstractly) a skull with a heart on the forehead -
            a nod to the etymology of the group’s name.
          </p>
          <div className="grid two-columns">
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
            When choosing the brand colors, I first considered using
            <a href="https://yaleidentity.yale.edu/core-identity-elements/yale-colors">
              Yale’s signature blue
            </a>
            , but decided against it. Many clubs at Yale use those colors, so I
            figured that in order for our flyers and such to stand out, we would
            need to go a different route. I went with colors that were vibrant,
            exciting, and a bit unconventional to reflect the enthusiasm and
            slight avante-garde bent to the club’s game development ethos.
          </p>
          <p>
            Since my time with the club, the logo has been updated and
            streamlined - and I have to admit, while the skull imagery has been
            lost, the new logo is a fair bit cleaner and easier to read.
            Nevertheless, I’m happy with the original version, and glad to see
            that its DNA is still there.
          </p>
          <figure>
            <img
              className="img-height-180"
              src="/media/amoriem/new_logo.png"
              alt="Amoriem Labs' new logo"
              loading="lazy"
            />
            <figcaption>The new logo</figcaption>
          </figure>
        </ProjectOverlay>

        <DesignThumbnail
          imageSrc="/media/gaming_counters/gaming_counters_thumbnail.png"
          imageAlt="Gaming Counters Collection Postcard"
          onClick={() => window.showOverlay("gaming-counters-overlay")}
        />
        <ProjectOverlay
          id="gaming-counters-overlay"
          title="Yale Collections: 18th Century Chinese Gaming Tokens"
          onClose={() => window.hideOverlay("gaming-counters-overlay")}
        >
          <p>
            In the fall of my junior year of college, I took a course called
            Graphic Design Methodologies. One of the larger projects we were
            asked to produce was to produce a set of promotional materials for a
            hypothetical exhibition of something from
            <a href="https://www.yale.edu/collections" target="_blank">
              the Yale Collections.
            </a>
            After some digging, I came across a collection of Chinese
            mother-of-pearl gaming counters from the 18th and 19th centuries. If
            you’re interested in learning about the history of these pieces, I
            highly recommend reading more about it here:
            <a
              href="https://hdl.handle.net/10079/fa/beinecke.gamingcounters"
              target="_blank"
            >
              https://hdl.handle.net/10079/fa/beinecke.gamingcounters
            </a>
          </p>
          <p>
            At first, I was unsure how I would entice people to come view the
            exhibition. There were many potential angles of attack. I thought,
            for instance, that I might try to create materials that emphasized
            the multi-cultural history of these artifacts, which originated in
            China but mainly used in the West. But considering the wide array of
            materials I was to produce, and thinking about the hypothetical
            audience of these materials (busy college students barely glancing
            at bulletin boards), I decided on a more sensational approach. When
            I had initially visited the
            <a href="https://beinecke.library.yale.edu/" target="_blank">
              Beinecke Library
            </a>
            to view the collection and take photos, I was interested in the
            unique shapes of many of the tokens, and in the iridescence of the
            mother-of-pearl surface. I decided to see what I could do to
            emphasize these qualities. Iridescence is a hard thing to capture in
            a static photo, since its effect is only noticed when a surface is
            viewed from a variety of angles.
          </p>
          <p>
            We were asked to produce a series of flyers, postcards, promotional
            instagram posts, and finally a mockup of an installation to be shown
            along with the artifacts.
          </p>
          <h3>Postcards</h3>
          <div className="grid two-columns mb">
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
          <h3>Flyers</h3>
          <div className="centered-row mb">
            <img
              src="/media/gaming_counters/flyer1.png"
              alt="Promotional flyer 1"
              loading="lazy"
            />
            <img
              src="/media/gaming_counters/flyer2.png"
              alt="Promotional flyer 2"
              loading="lazy"
            />
            <img
              src="/media/gaming_counters/flyer3.png"
              alt="Promotional flyer 3"
              loading="lazy"
            />
          </div>
          <h3>Installation Mockup</h3>
          <p>
            I created a video showing what it might look like to have a blown-up
            image of one of the tokens, with a lenticular effect, such that at
            certain angles, an image of the family who owned this token would
            appear.
          </p>
          <div className="centered-row">
            <video loop autoPlay>
              <source
                src="/media/gaming_counters/beinecke_exhibition.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </ProjectOverlay>

        <DesignThumbnail
          imageSrc="/media/grit/grit_thumbnail.jpg"
          imageAlt="GRIT Logo"
          onClick={() => window.showOverlay("grit-overlay")}
        />
        <ProjectOverlay
          id="grit-overlay"
          title="GRIT - Logo"
          onClose={() => window.hideOverlay("grit-overlay")}
        >
          <p>
            I started to see a lot of graphic design content on social media,
            and felt inspired to practice some new techniques. I wanted to try
            my hand at creating a wordmark for a logo from scratch - that is, by
            constructing the letters myself rather than using a pre-existing
            typeface. In order to do that, I created a grid system and a set of
            rules that each letter would follow. One rule (or guideline, really)
            was that each letter should have at least one segment where its
            outline extended past the corner.
          </p>
          <figure>
            <img
              className="img-height-220"
              src="/media/grit/grid_system.jpg"
              alt="Underlying grid structure of GRIT logo"
              loading="lazy"
            />
          </figure>
          <p>
            In keeping with the theme suggested by the word ‘grit’, and again
            inspired by trends on social media, I worked with some texture
            assets to get an effect that I thought worked well.
          </p>
          <div className="centered-row">
            <figure>
              <img
                src="/media/grit/first_texture.jpg"
                alt="An early attempt at using texture for the GRIT logo"
                loading="lazy"
              />
              <figcaption>Early attempt at incorporating texture</figcaption>
            </figure>
            <figure>
              <img
                src="/media/grit/grit_thumbnail.jpg"
                alt="Final GRIT logo"
                loading="lazy"
              />
              <figcaption>Final result</figcaption>
            </figure>
          </div>
        </ProjectOverlay>

        <DesignThumbnail
          imageSrc="/media/nmg/nmg_thumbnail.png"
          imageAlt="New Matrix Group Logo"
          onClick={() => window.showOverlay("nmg-overlay")}
        />
        <ProjectOverlay
          id="nmg-overlay"
          title="New Matrix Group - Logo"
          onClose={() => window.hideOverlay("nmg-overlay")}
        >
          <p>
            While helping build some of the underlying data pipelines for a
            business intelligence startup, I decided to take a bit of time to
            create a logo for the company, since we did not have one yet. I
            wanted to match the tone of our pitches to potential clients. Many
            of the clients were mid-size clothing retailers that had been using
            the same business intelligence solutions for many years, so we
            wanted to emphasize that with our solutions, we could provide easier
            access and deeper insights into a company’s accounting and sales
            statistics.
          </p>
          <div className="centered-column contain-img-height-180">
            <img
              src="/media/nmg/nmg_thumbnail.png"
              alt="New Matrix Group logo, condensed"
              loading="lazy"
            />
            <img
              src="/media/nmg/nmg_large_with_bg.png"
              alt="New Matrix Group logo, extended"
              loading="lazy"
            />
          </div>
        </ProjectOverlay>

        <DesignThumbnail
          imageSrc="/media/cupcakes_thumbnail.png"
          imageAlt="Afternoon Cupcakes Logo"
          onClick={() => window.showOverlay("cupcakes-overlay")}
        />
        <ProjectOverlay
          id="cupcakes-overlay"
          title="Afternoon Cupcakes - Logo"
          onClose={() => window.hideOverlay("cupcakes-overlay")}
        >
          <p>
            As an exercise, I challenged myself to make a logo for a bakery, and
            came up with this. I did this back in high school, but I still think
            it's cute. I remember being pleased with the font at the time (Abril
            Fatface if you're curious).
          </p>
          <div className="centered-column contain-img-height-440">
            <img
              src="/media/cupcakes_thumbnail.png"
              alt="Afternoon Cupcakes Logo"
              loading="lazy"
            />
          </div>
        </ProjectOverlay>
      </div>
    </section>
  );
};

export default DesignSection;
