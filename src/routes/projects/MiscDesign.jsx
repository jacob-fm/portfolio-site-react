import ProjectPage from "../../components/ProjectPage";

export default function MiscDesign() {
  return (
    <ProjectPage title="Miscellaneous Design Work">
      <section className="bg-bg-dark px-4 pb-4 flex flex-col mb-8">
        <h2 className="text-2xl">Poster Designs</h2>
        <div className="mt-6 mx-auto columns-[360px] gap-4">
          <img
            src="/media/Personal-Library-Poster.png"
            className="min-w-0 basis-0 grow mb-4"
          />
          <img
            src="/media/WYBC_crush_poster.jpg"
            className="min-w-0 basis-0 grow mb-4"
          />
          <img
            src="/media/bayit_flyer.jpg"
            className="min-w-0 basis-0 grow mb-4"
          />
          <img
            src="/media/british-bake-off.jpg"
            className="min-w-0 basis-0 grow mb-4"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl">GRIT</h2>
        <p>
          I started to see a lot of graphic design content on social media, and
          felt inspired to practice some new techniques. I wanted to try my hand
          at creating a wordmark for a logo from scratch - that is, by
          constructing the letters myself rather than using a pre-existing
          typeface. In order to do that, I created a grid system and a set of
          rules that each letter would follow. One rule (or guideline, really)
          was that each letter should have at least one segment where its
          outline extended past the corner.
        </p>
        <figure className="flex justify-center">
          <img
            className="max-h-130"
            src="/media/grit/grid_system.jpg"
            alt="Underlying grid structure of GRIT logo"
            loading="lazy"
          />
        </figure>
        <p>
          In keeping with the theme suggested by the word ‘grit’, and again
          inspired by trends on social media, I worked with some texture assets
          to get an effect that I thought worked well.
        </p>
        <div className="grid grid-cols-2 gap-4">
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
      </section>

      <section className="bg-bg-dark p-4 flex flex-col gap-4 mb-8">
        <h2 className="text-2xl">Afternoon Cupcakes</h2>
        <p>
          As an exercise, I challenged myself to make a logo for a bakery, and
          came up with this. I did this back in high school, but I still think
          it's cute. I remember being pleased with the font at the time (Abril
          Fatface if you're curious).
        </p>
        <img
          className="max-h-130 mx-auto"
          src="/media/cupcakes_thumbnail.png"
          alt="Afternoon Cupcakes Logo"
          loading="lazy"
        />
      </section>
    </ProjectPage>
  );
}
