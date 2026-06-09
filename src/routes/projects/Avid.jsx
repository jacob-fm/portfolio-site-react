import LinkButton from "../../components/LinkButton";
import ProjectPage from "../../components/ProjectPage";

const images = [
  "icon.png",
  "classes_screenshot.jpg",
  "contact_screenshot.jpg",
  "avid_thumbnail.png",
  "profile_pic_2.png",
  "story1.png",
  "story3.png",
  "color.png",
  "homepage_screenshot.jpg",
  "blue_on_white.jpg",
  "post4.png",
  "post2.png",
  "post1.png",
];

export default function Avid() {
  return (
    <ProjectPage title="AVID Fitness">
      <p>
        Brand identity, social media assets, and web design for a local gym.
      </p>

      <div className="mt-6 mx-auto columns-[360px] gap-4">
        {images.map((image) => (
          <img
            src={`/media/avid/${image}`}
            key={image}
            className="w-full mb-4 break-inside-avoid"
          />
        ))}
      </div>
    </ProjectPage>
  );
}
