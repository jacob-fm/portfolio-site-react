import blogMetadata from "virtual:blog-metadata";

const modules = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data = {};
  let currentKey = null;

  for (const line of frontmatter.split("\n")) {
    // Check for YAML multi-line list item (e.g. "  - value")
    const listMatch = line.match(/^\s+-\s+(.+)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(listMatch[1].trim());
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    currentKey = key;

    // Parse arrays like ["tag1", "tag2"]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else if (value === "") {
      // Empty value — may be followed by multi-line list items
      value = "";
    } else {
      // Strip surrounding quotes
      value = value.replace(/^["']|["']$/g, "");
    }

    data[key] = value;
  }

  return { data, content };
}

function parsePosts() {
  const seenSlugs = new Set();

  return Object.entries(modules).map(([filePath, raw]) => {
    const { data, content } = parseFrontmatter(raw);

    const fileName = filePath.split("/").pop().replace(/\.md$/, "");

    const title = data.title || fileName;

    const date =
      data.date ||
      blogMetadata[filePath]?.birthtime?.slice(0, 10) ||
      new Date().toISOString().slice(0, 10);

    let slug;
    if (data.slug) {
      slug = data.slug;
    } else {
      const base = fileName.toLowerCase().replace(/\s+/g, "-");
      slug = base;
      let counter = 2;
      while (seenSlugs.has(slug)) {
        slug = `${base}-${counter}`;
        counter++;
      }
    }
    seenSlugs.add(slug);

    return {
      slug,
      title,
      date,
      tags: (data.tags || []).filter((t) => t.toLowerCase() !== "blog"),
      description: data.description || "",
      content,
    };
  });
}

export function getAllPosts(ascending = false) {
  const posts = parsePosts();
  posts.sort((a, b) => {
    const diff = new Date(b.date) - new Date(a.date);
    return ascending ? -diff : diff;
  });
  return posts;
}

export function getPostBySlug(slug) {
  return parsePosts().find((p) => p.slug === slug) || null;
}

export function getAllTags() {
  const tags = new Set();
  parsePosts().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return [...tags].sort();
}
