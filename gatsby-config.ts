import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Kohei MIURA - opddinx personal website`,
    siteUrl: `https://opddinx.github.io/`,
    description:
      "PhD student at XRGroup, UOsaka. Computer Vision, Graphics, Interaction.",
    twitterUsername: "@opddinx",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-8JW0PZKDZR"],
        pluginConfig: {
          head: true,
        }
      }
    },
  ]
};

export default config;
