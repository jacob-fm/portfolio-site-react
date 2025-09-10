export default function ProjectPage({ title, children }) {
  return (
    <>
      <h1 className="text-2xl text-center mt-6">{title}</h1>
      <hr className="m-6"></hr>
      <div className="space-y-2">{children}</div>
    </>
  );
}
