import { Link } from "react-router-dom";

export default function ThumbnailCard({ title, route, image, badges }) {
  return (
    <Link
      to={route}
    >
      <div className="border border-solid border-primary shadow-lg transform transition-all duration-200 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-xl">
        <div className="h-50 md:h-60 ">
          <img src={image} className="object-cover h-full w-full" />
        </div>
        <div className="flex flex-col bg-bg text-primary">
          <h2 className="text-center text-lg my-1">{title}</h2>
          <div className="flex space-x-1.5 justify-center">
            {badges?.map((b, idx) => (
              <span
                key={idx}
                className="mb-1.5 text-sm px-1 border border-primary rounded-lg"
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
