import ProjectPage from "../components/ProjectPage";
import LinkButton from "../components/LinkButton";
export default function Bopmatch() {
  return (
    <ProjectPage title="BopMatch">
      <LinkButton route="https://bopmatch.com">
        <i className="fa-solid fa-gamepad "></i>Play BopMatch
      </LinkButton>
      <LinkButton route="https://github.com/jacob-fm/spotify-guesser">
        <i className="fa-brands fa-github "></i>
        Github Repo
      </LinkButton>
      <video preload="auto" controls loop muted className="aspect-video">
        <source src="/media/bopmatch/bopmatch.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>
        In BopMatch, players are shown a <i>target artist</i> and are tasked
        with choosing another musician or band who they think will have
        equivalent <i>popularity.</i> The closer the two are in popularity, the
        higher the score.
      </p>
      <p>
        <i>Popularity</i> is a statistic available via the{" "}
        <a href="https://developer.spotify.com/documentation/web-api">
          Spotify Web API
        </a>
        , which I also pull from to allow players to search for and select any
        musician on Spotify.
      </p>
      <p>
        BopMatch was built using React and Vite on the front-end, and Supabase
        for the backend.
      </p>
      <h2>Backstory and More Thoughts</h2>
      <p>
        The idea for BopMatch came from a game my brothers and I would play in
        the car during road trips. One person would give a target artist, and
        the others would each make a guess as to who would be closest in monthly
        listener count. Whoever guessed the closest would choose the target for
        the next round.
      </p>
      <p>
        BopMatch uses a <i>popularity score</i> rather than monthly listener
        count for two reasons: First, for some reason, Spotify does not expose
        monthly listener count via their API. I don't know why this is, since
        users can view this easily in the app. Second: the popularity score is
        linear, from 1-100, which makes my life easy. If I were to use monthly
        listener count, I'd have the issue where artists at the top of the
        charts would have differeces of millions of monthly listeners between
        them, while less popular artists would differ only by a few hundred or
        thousand. Using a linear score means I don't have to worry about
        compensating for this imbalance.
      </p>
      <p>
        It's been interesting to think about making a game out of very simple
        parts. I take some publicly available data, and build a frame around it
        that makes it a game.
      </p>
      <p>
        It's also interesting to think about who's actually <i>good</i> at
        BopMatch. Since the popularity scores are fetched live from the Spotify
        API, they can change from one day to the next. So to be consistenly good
        at the game is not just a matter of familiary with a lot of music, but
        an active antenna towards music culture.
      </p>
    </ProjectPage>
  );
}
