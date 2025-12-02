import { Link } from "react-router-dom";
import { useEffect } from "react";
import AnimatedBackground from "./AnimatedBackground";

export default function ProjectPage({ title, children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="project-page max-w-200 mx-auto">
      <AnimatedBackground mode="blue" />
      <h1 className="text-2xl text-center mt-6">{title}</h1>
      <hr className="m-6"></hr>
      <div className="space-y-4">{children}</div>
      <Link
        to="/"
        className="w-min mx-auto flex items-center justify-center mt-5 gap-1.5 py-2 px-4 text-lg text-primary border border-primary rounded-lg hover:text-pink-500 hover:border-pink-500 active:text-blue-700 active:border-blue-700"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>Home</span>
      </Link>
    </div>
  );
}
