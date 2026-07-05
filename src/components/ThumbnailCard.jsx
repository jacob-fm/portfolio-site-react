import { Link } from "react-router-dom";
import { playHoverNote } from "../lib/hoverSound";

export default function ThumbnailCard({ title, route, image, badges, index }) {
  return (
    <Link to={route}>
      <div
        onMouseEnter={() => playHoverNote(index)}
        className="group border border-solid border-primary hover:border-hover shadow-lg transform transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-xl"
      >
        <div className="h-50 md:h-60 ">
          <img src={image} className="object-cover h-full w-full" />
        </div>
        <div className="flex flex-col bg-bg text-primary group-hover:text-hover transition-colors duration-200">
          <h2 className="text-center text-xl my-1 font-heading">{title}</h2>
          <div className="flex space-x-1.5 justify-center">
            {badges?.map((b, idx) => (
              <span
                key={idx}
                className="mb-1.5 text-xs px-1 border border-primary group-hover:border-hover rounded-lg transition-colors duration-200"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
