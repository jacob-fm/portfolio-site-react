import { Link } from "react-router-dom";

export default function ThumbnailCard({ title, route, image }) {
  return (
    <Link
      to={route}
    >
      {/* <h2>{title}</h2> */}
      <div className="h-50 md:h-60 shadow-lg border border-solid border-primary transform transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-xl">
        <img src={image} className="object-cover h-full w-full" />
        {/* TODO: add small badges to list technologies used  */}
      </div>
    </Link>
  );
}
