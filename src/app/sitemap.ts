import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://columbusichiba.com",
      lastModified: new Date(),
    },
    {
      url: "https://columbusichiba.com/how-to-use",
      lastModified: new Date(),
    },
  ];
}