import LinkButton from "../components/LinkButton";
import ProjectPage from "../components/ProjectPage";

export default function Avid() {
  return (
    <ProjectPage title="AVID Fitness Website and Branding">
      <p>
        AVID's greatest asset was its strong sense of community, so while we
        experimented with some pretty "out-there" ideas for the rebrand, the
        owner, Avi, and I decided on a new logo that kept some attributes of the
        old one, but with a more energetic and sleeker feeling.
      </p>
      <h2 className="text-xl mt-5 text-center">Logo and Branding</h2>
      <p>
        AVID's greatest asset is its strong sense of community, so while we
        experimented with some pretty "out-there" ideas for the rebrand, the
        owner, Avi, and I decided on a new logo that kept some attributes of the
        old one, but with a more energetic and sleeker feeling.
      </p>
      <div className="my-4 space-y-4">
        <figure className="flex flex-col justify-center">
          <img
            src="/media/avid/old_avid_logo.jpeg"
            alt="Old AVID Fitness logo"
            loading="lazy"
          />
          <figcaption>
            Old logo
          </figcaption>
        </figure>
        <figure>
          <img
            src="/media/avid/blue_on_white.jpg"
            alt="New AVID Fitness logo, white on blue background"
            loading="lazy"
          />
          <figcaption>
            New logo
          </figcaption>
        </figure>
      </div>
      <figure>
        <div className="space-y-2">
          <img src="/media/avid/profile_pic_2.png" loading="lazy" />
          <img src="/media/avid/post1.png" loading="lazy" />
          <img src="/media/avid/story1.png" loading="lazy" />
          <img src="/media/avid/post4.png" loading="lazy" />
          <img src="/media/avid/multi-image.png" loading="lazy" />
          <img src="/media/avid/post2.png" loading="lazy" />
        </div>
      </figure>
      <h2 className="text-xl mt-8 text-center">Website</h2>
      <LinkButton route="https://avidstrong.com">
        <i className="fa-solid fa-globe"></i>AVID Website
      </LinkButton>
      <p>
        I built AVID’s website with WordPress, using a theme called GoFiz. I
        customized the theme to fit the branding we had created in the first
        step, keeping in mind the themes of community, energy, and motivation
        which were core to the business.
      </p>
      <p>
        AVID uses a software called MindBody which takes care of tracking
        customer information: class enrollments, payment info, etc. I customized
        MindBody’s web widgets to match the brand, and embedded them the HTML of
        the site.
      </p>
      <div>
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
    </ProjectPage>
  );
}
