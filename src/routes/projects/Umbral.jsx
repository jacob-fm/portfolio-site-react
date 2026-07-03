import ProjectPage from "../../components/ProjectPage";

export default function Umbral() {
  return (
    <ProjectPage title="Umbral">
      <div className="relative group w-fit">
        <img src="/media/umbral/snapshot.jpeg" />
        <div className="absolute inset-0 flex items-center justify-center opacity-100 bg-black/40 transition-opacity pointer-events-none md:opacity-0 md:group-hover:opacity-100">
          <a
            href="https://haumbral.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary-dark text-bg-dark font-semibold rounded-lg shadow-lg pointer-events-auto"
          >
            Visit haumbral.com
          </a>
        </div>
      </div>
      <p>
        Umbral is a clothing brand founded by my friend Josue Miranda, who is
        currently pursuing a Masters in Architecture at Pratt. Umbral means
        "threshold" in Spanish; for Josue, who has a unique set of overlapping
        identities as a Mexican and an Orthodox Jew, Umbral exists as a canvas
        to work through the experience of being in between two worlds, or at the
        threshold.
      </p>
      <p>
        I initially agreed to help with a website for Umbral, which I built
        using Shopify's headless Hydrogen framework, TypeScript, React, and
        Tailwind. This lead to my further involvement in a number of creative
        and technical aspects of the brand.
      </p>
    </ProjectPage>
  );
}
