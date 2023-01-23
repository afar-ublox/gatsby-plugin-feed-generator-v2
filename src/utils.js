import { Feed } from "feed";
import urlJoin from "url-join";

const buildFeed = ({ site, items, name, addToHeader, path, options = {} }) => {
  const { siteUrl, description, title, author } = site.siteMetadata;
  const feed = new Feed({
    title: title,
    description: description,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${author}`,
    id: siteUrl,
    link: siteUrl,
    type: "application/rss+xml",
    // image: urlJoin(siteUrl, 'image.png'),
    favicon: urlJoin(siteUrl, "favicon.ico"),
    generator: "GatsbyJS",
    feedLinks: {
      json: urlJoin(siteUrl, name).replace(/\/+$/, "") + ".json",
      rss: urlJoin(siteUrl, name).replace(/\/+$/, "") + ".xml",
    },
    author: {
      name: author,
    },
    ...options,
  });

  for (let item of items) {
    const { title, url, date, image, html, excerpt = "", ...rest } = item;
    const d = typeof date === "object" ? date : new Date(date);
    if (title && d && d != "Invalid Date") {
      feed.addItem({
        title,
        link: url,
        description: excerpt,
        content: html,
        image:image,
        id: url,
        date: d != "Invalid Date" ? d : new Date(),
        ...rest,
      });
    }
  }
  return feed;
};

export { buildFeed };
