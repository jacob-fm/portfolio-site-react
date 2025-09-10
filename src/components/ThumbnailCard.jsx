export default function ThumbnailCard({ title, image }) {
  return (
    <div className="h-50 shadow-2xl border border-solid border-primary">
      {/* <h2>{title}</h2> */}
      <img src={image} className="object-cover h-full w-full" />
    </div>
  );
}
