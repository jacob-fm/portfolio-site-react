import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "../lib/blog";

export default function BlogPost() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-200 mx-auto text-center mt-20">
        <h1 className="text-2xl mb-4">Post not found</h1>
        <Link
          to="/blog"
          className="w-min mx-auto flex items-center justify-center gap-1.5 py-2 px-4 text-lg text-primary border border-primary rounded-lg hover:text-pink-500 hover:border-pink-500 active:text-blue-700 active:border-blue-700"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="project-page max-w-200 mx-auto">
      <h1 className="text-2xl text-center mt-6">{post.title}</h1>
      <p className="text-center text-stone-500 mt-2">
        {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      {post.tags.length > 0 && (
        <div className="flex justify-center gap-2 mt-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-2 py-0.5 border border-primary rounded-lg text-primary"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <hr className="m-6" />
      <div className="blog-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
      <Link
        to="/blog"
        className="w-min mx-auto flex items-center justify-center mt-8 mb-4 gap-1.5 py-2 px-4 text-lg text-primary border border-primary rounded-lg hover:text-pink-500 hover:border-pink-500 active:text-blue-700 active:border-blue-700"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>Blog</span>
      </Link>
    </div>
  );
}
