// The ITP blog (Quartz) emits relative asset paths like ./index-abc.css. Served at
// /blog/ those resolve to /blog/index-abc.css and hit the proxy; served at bare /blog
// they resolve against the site root and fall through to the SPA, so the page renders
// unstyled. The redirect engine can't fix this — it normalizes /blog and /blog/ to the
// same path, so a "/blog" -> "/blog/" rule matches its own target and loops forever.
// An edge function sees the raw pathname and can tell them apart.
// Returning nothing hands the request to the redirect engine untouched; calling
// context.next() here instead makes the upstream proxy 400.
export default async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/blog") {
    url.pathname = "/blog/";
    return Response.redirect(url.toString(), 301);
  }
};

export const config = { path: "/blog", excludedPath: "/blog/*" };
