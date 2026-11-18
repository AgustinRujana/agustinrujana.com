// Cloudflare Worker in front of Cloud Run: serves agustinrujana.com without a Google load balancer.
// Every request is forwarded to the Cloud Run service; http and www redirect to https://<bare domain>.
// Deploy: cd deploy/cloudflare && npx wrangler deploy
const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.protocol === "http:" || url.hostname === `www.${env.PUBLIC_HOST}`) {
      url.protocol = "https:";
      url.hostname = env.PUBLIC_HOST;
      return Response.redirect(url.toString(), 301);
    }
    const target = new URL(url.pathname + url.search, env.ORIGIN);
    const headers = new Headers(request.headers);
    headers.set("x-forwarded-host", env.PUBLIC_HOST);
    headers.set("x-forwarded-proto", "https");
    return fetch(target, { method: request.method, headers, body: request.body, redirect: "manual" });
  },
};

export default worker;
