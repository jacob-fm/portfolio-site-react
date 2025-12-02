import ProjectPage from "../components/ProjectPage";

export default function Nigunim() {
  return (
    <ProjectPage title='"Nigunim"'>
      <iframe
        src="https://www.youtube.com/embed/YtC4rZa81dY"
        className="aspect-video"
      ></iframe>
      <p>
        "Nigunim" was an audiovisual installtion I created for the Blanksteen
        Fellowship, at the Joseph Slifka Center for Jewish Life at Yale in 2023.
        I, along with the rest of the cohort, were given the phrase "How does
        speech become violence?" as a prompt for our work. I was inspired to
        create a pair of songs similar to the "nigunim" I grew up with. For each
        song, I created a video using a program called{" "}
        <a href="https://www.ebosuite.com/">EboSuite</a> which can generate
        shaders that react to audio information.
      </p>
      <p>An excerpt from my artist statement:</p>
      <blockquote className="bg-bg-dark">
        <p>
          When approaching the themes of speech and violence, I dug in to find
          something that spoke to me in relation to what l've made in the past.
          I thought about violence due to lack of speech, and the frustration
          and anger that can arise when words fail. I thought back to my days in
          summer camp; in particular, I remembered debates with a friend on
          whether the nigunim (tunes) we sang on Shabbat were better with or
          without lyrics.
        </p>
        <br />
        <p>
          My friend argued that when we sang the tunes without words, we were
          tapping into something deeper and truer than what our words could say.
          At the time I thought it was nonsensical and silly. Looking back, I'm
          not so sure. This piece was an opportunity to take what l've learned
          about music production to explore and compose nigunim that make use of
          modern electronic instrumentation while incorporating the meditative,
          trance-like qualities of a wordless nigun. I used the accompanying
          visuals to transform a purely auditory experience into an even more
          immersive atmosphere.
        </p>
      </blockquote>
      <h2 className="mt-6 mb-2">Some clips from the installation</h2>
      <p className="text-center mb-4">
        <i>(Muted by default)</i>
      </p>
      <video preload="none" controls loop muted className="aspect-video w-full">
        <source src="/media/nigunim/pink.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video preload="none" controls loop muted className="aspect-video w-full">
        <source src="/media/nigunim/green.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </ProjectPage>
  );
}
