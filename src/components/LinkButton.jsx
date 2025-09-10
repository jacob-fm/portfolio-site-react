export default function LinkButton({ children, route }) {
  return (
    <a
      className="flex w-40 p-2 mx-auto my-5 justify-center rounded-lg bg-linear-to-r from-primary to-primary-dark text-white shadow-md transform transition-all duration-200 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-lg hover:from-pink-700 hover:to-pink-900 active:from-amber-200 active:to-amber-400 active:text-black"
      href={route}
    >
      {children}
    </a>
  );
}
