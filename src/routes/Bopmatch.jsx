import LinkButton from "../components/LinkButton";
export default function Bopmatch() {
  return (
    <>
      <h1 className="text-2xl text-center">BopMatch</h1>
      <hr className="m-6"></hr>
      <LinkButton route="https://bopmatch.com">Play BopMatch!</LinkButton>
      <p>
        In BopMatch, players are shown a <i>target artist</i>{" "}
        and are tasked with choosing another musician or band who they think
        will have equivalent <i>popularity.</i>{" "}
        The closer the two are in popularity, the higher the score.
      </p>
      <p>
        <i>Popularity</i> is a statistic available via the{" "}
        <a href="https://developer.spotify.com/documentation/web-api">
          Spotify Web API
        </a>, which I also pull from to allow players to search for and select
        any musician on Spotify.
      </p>
      <p>
        BopMatch was built using React and Vite on the front-end, and Supabase
        for the backend.
      </p>
      <figure>
        <img
          src="/media/bopmatch/homepage.png"
          alt="Screenshot of BopMatch"
        />
      </figure>
    </>
  );
}
