import ProjectPage from "../../components/ProjectPage";

export default function PointCloudParties() {
  const images = [
    "/media/pointcloud/chris_fisheye_1.jpg",
    "/media/pointcloud/crowd_shot_hero.webp",
    "/media/pointcloud/green_fisheye.jpg",
    "/media/pointcloud/green_screen_close_up.jpg",
    "/media/pointcloud/ian_spinning.jpg",
    "/media/pointcloud/jacob_w_mic.jpg",
    "/media/pointcloud/pink_wall.jpg",
  ];
  return (
    <ProjectPage title="Point Cloud Parties">
      <div className="mt-6 mx-auto px-6 columns-[300px] gap-2">
        {images.map((image) => (
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
