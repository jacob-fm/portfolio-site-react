import { Link } from "react-router-dom";

export default function ThumbnailCard({ title, route, image }) {
  return (
    <Link
      to={route}
    >
      {/* <h2>{title}</h2> */}
      <div className="h-50 shadow-xl border border-solid border-primary">
        <img src={image} className="object-cover h-full w-full" />
      </div>
    </Link>
  );
}
