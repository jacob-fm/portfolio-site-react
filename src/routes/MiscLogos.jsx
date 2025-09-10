import ProjectPage from "../components/ProjectPage";

export default function MiscLogos() {
  return (
    <ProjectPage title="Misc. Logo Designs">
      <h2>New Matrix Group</h2>
      <p>
        While helping build some of the underlying data pipelines for a business
        intelligence startup, I decided to take a bit of time to create a logo
        for the company, since we did not have one yet. I wanted to match the
        tone of our pitches to potential clients. Many of the clients were
        mid-size clothing retailers that had been using the same business
        intelligence solutions for many years, so we wanted to emphasize that
        with our solutions, we could provide easier access and deeper insights
        into a company’s accounting and sales statistics.
      </p>
      <div className="space-y-4">
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

      <h2>GRIT</h2>
      <p>
        I started to see a lot of graphic design content on social media, and
        felt inspired to practice some new techniques. I wanted to try my hand
        at creating a wordmark for a logo from scratch - that is, by
        constructing the letters myself rather than using a pre-existing
        typeface. In order to do that, I created a grid system and a set of
        rules that each letter would follow. One rule (or guideline, really) was
        that each letter should have at least one segment where its outline
        extended past the corner.
      </p>
      <figure>
        <img
          src="/media/grit/grid_system.jpg"
          alt="Underlying grid structure of GRIT logo"
          loading="lazy"
        />
      </figure>
      <p>
        In keeping with the theme suggested by the word ‘grit’, and again
        inspired by trends on social media, I worked with some texture assets to
        get an effect that I thought worked well.
      </p>
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

      <h2>Afternoon Cupcakes</h2>
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
    </ProjectPage>
  );
}
