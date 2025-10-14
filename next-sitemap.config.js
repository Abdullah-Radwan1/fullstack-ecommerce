/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "fullstack-ecommerce-flax.vercel.app", // <-- replace with your real domain
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: "./public", // sitemap files go here
  generateIndexSitemap: true,
};
