import ProjectPage from "../../components/ProjectPage";

export default function PointCloudParties() {
  const images = [
    "/media/pointcloud/pink_wall.jpg",
    "/media/pointcloud/chris_fisheye_1.jpg",
    "/media/pointcloud/crowd_shot_hero.webp",
    "/media/pointcloud/green_fisheye.jpg",
    "/media/pointcloud/green_screen_close_up.jpg",
    "/media/pointcloud/jacob_on_stage.jpeg",
    "/media/pointcloud/ian_spinning.jpg",
    "/media/pointcloud/jacob_w_mic.jpg",
  ];
  return (
    <ProjectPage title="Point Cloud Parties">
      {/* use first image as hero sorta thing */}
      <div className="object-fill md:h-120 overflow-hidden ">
        <img src={images[0]} />
      </div>
      {/* description */}
      <div className="flex flex-col gap-3">
        <p>
          In 2026 I bought an Xbox Kinect camera for $25 from a guy on
          Craigslist. Using TouchDesigner, I started experimenting with the
          Kinect's infrared sensor to capture real-time{" "}
          <a href="https://en.wikipedia.org/wiki/Point_cloud" target="_blank">
            point clouds
          </a>{" "}
          of partygoers, applying various effects, and then projecting the
          output on walls surrounding a dance floor.
        </p>
        <p>
          Later, I combined this setup with live VJing using Resolume Arena to
          create pseudo-green screen compositions, with the added fun of being
          able to manipulate the 3D representation of the dancers (e.g. panning
          the camera) either manually through a MIDI controller or synced to a
          signal such as audio input or a song's tempo.
        </p>
      </div>
      <figure>
        <img src="/media/pointcloud/TD_network.png" />
        <figcaption>Screenshot of my TouchDesigner network</figcaption>
      </figure>
      <figure>
        <img src="/media/pointcloud/ui_window.png" />
        <figcaption>
          The UI panel I created in TD to use during performances
        </figcaption>
      </figure>
      {/* masonry layout */}
      <div className="mt-6 mx-auto columns-[360px] gap-2">
        {images.slice(1).map((image) => (
          <img
            src={image}
            key={image}
            className="w-full mb-2 break-inside-avoid"
          />
        ))}
      </div>
    </ProjectPage>
  );
}
