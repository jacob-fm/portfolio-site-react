import ProjectPage from "../../components/ProjectPage";

function prependPath(file) {
  return `/media/new-matrix-group/${file}`;
}

// Setting flex-grow to the image's aspect ratio makes widths in a basis-0 row
// split proportionally, so every image renders at the same height
function growByAspectRatio(e) {
  e.currentTarget.style.flexGrow =
    e.currentTarget.naturalWidth / e.currentTarget.naturalHeight;
}

export default function NewMatrixGroup() {
  return (
    <ProjectPage title="New Matrix Group">
      <p>
        While helping build some of the underlying data pipelines for a business
        intelligence startup, I decided to take a bit of time to create a logo
        and brand identity for the company, since we did not have one yet. I
        wanted to match the tone of our pitches to potential clients. Many of
        the clients were mid-size clothing retailers that had been using the
        same business intelligence solutions for many years, so we wanted to
        emphasize that with our solutions, we could provide easier access and
        deeper insights into a company’s accounting and sales statistics.
      </p>

      <div className="flex flex-col md:flex-row gap-2">
        <img
          className="min-w-0 basis-0 grow"
          onLoad={growByAspectRatio}
          src={prependPath("thumbnail.png")}
          alt="New Matrix Group logo, condensed"
          loading="lazy"
        />
        <img
          className="min-w-0 basis-0 grow"
          onLoad={growByAspectRatio}
          src={prependPath("nmg_large_with_bg.png")}
          alt="New Matrix Group logo, extended"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <img
          className="min-w-0 basis-0 grow"
          onLoad={growByAspectRatio}
          src={prependPath("lavender2.png")}
          alt="New Matrix Group logo, extended"
          loading="lazy"
        />
        <img
          className="min-w-0 basis-0 grow"
          onLoad={growByAspectRatio}
          src={prependPath("lavender1.png")}
          alt="New Matrix Group logo, condensed"
          loading="lazy"
        />
      </div>

      <section className="bg-bg-dark p-6 flex flex-col gap-6">
        <h3 className="text-2xl text-center">Rejected versions</h3>
        <figure>
          <img
            src={prependPath("WIP/rejected_1.png")}
            className="h-80 mx-auto"
          />
          <figcaption className="mt-2">
            Here the basic idea for a shape with rounded corners was coming
            together, but the font and colors weren't quite there.
          </figcaption>
        </figure>
        <figure>
          <div className="flex flex-col md:flex-row gap-4">
            <img
              className="min-w-0 basis-0 grow"
              onLoad={growByAspectRatio}
              src={prependPath("/WIP/rejected_layout_1.png")}
            />
            <img
              className="min-w-0 basis-0 grow"
              onLoad={growByAspectRatio}
              src={prependPath("/WIP/rejected_layout_2.png")}
            />
          </div>
          <figcaption className="mt-2">
            A few sets of colors I tried out before landing on the final
            versions.
          </figcaption>
        </figure>
      </section>
    </ProjectPage>
  );
}
