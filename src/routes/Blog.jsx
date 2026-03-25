import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, getAllTags } from "../lib/blog";

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [ascending, setAscending] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  const allTags = getAllTags();
  let posts = getAllPosts(ascending);

  if (activeTag) {
    posts = posts.filter((p) => p.tags.includes(activeTag));
  }

  return (
    <div className="max-w-200 mx-auto">
      <h1 className="text-2xl text-center mt-6">Blog</h1>
      <hr className="m-6" />

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <Link
          to="/"
          className="fixed top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-1.5 py-2 px-4 text-lg text-primary border border-primary rounded-lg hover:text-pink-500 hover:border-pink-500 active:text-blue-700 active:border-blue-700 bg-bg z-50"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span className="hidden sm:inline">Home</span>
        </Link>
        <button
          onClick={() => setAscending(!ascending)}
          className="text-sm py-1 px-3 border border-primary rounded-lg text-primary hover:text-hover hover:border-hover active:text-blue-700 active:border-blue-700 cursor-pointer"
        >
          {ascending ? "Oldest first" : "Newest first"}
        </button>

        {allTags.length > 0 && (
          <>
            <span className="text-stone-400">|</span>
            {allTags.length > 5 ? (
              <select
                value={activeTag || ""}
                onChange={(e) => setActiveTag(e.target.value || null)}
                className="text-sm py-1 px-3 border border-primary rounded-lg text-primary bg-bg cursor-pointer"
              >
                <option value="">All tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>#{tag}</option>
                ))}
              </select>
            ) : (
              allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`text-sm py-1 px-3 border border-primary rounded-lg cursor-pointer transition-colors ${activeTag === tag
                    ? "bg-primary text-white"
                    : "text-primary hover:text-hover hover:border-hover"
                    }`}
                >
                  #{tag}
                </button>
              ))
            )}
          </>
        )}
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <p className="text-center text-stone-500 my-16">Nothing here yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block p-5 border border-primary rounded-lg hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 bg-bg"
            >
              <h2 className="text-xl text-primary">{post.title}</h2>
              <p className="text-sm text-stone-500 mt-1">
                {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {post.description && (
                <p className="text-primary-dark mt-2">{post.description}</p>
              )}
              {post.tags.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
