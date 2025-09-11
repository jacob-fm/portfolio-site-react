import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h2 className="text-xl text-center my-5">
        Sorry, this page does not exist
      </h2>
      <Link
        to="/"
        className="w-min mx-auto flex items-center justify-center mt-5 gap-1.5 py-2 px-4 text-lg text-primary border border-primary rounded-lg hover:text-pink-500 hover:border-pink-500 active:text-blue-700 active:border-blue-700"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>Home</span>
      </Link>
    </>
  );
}
