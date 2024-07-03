import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Kohei MIURA - opddinx personal website`,
    siteUrl: `https://opddinx.github.io/`,
    description:
      "Hogwarts Potions master, Head of Slytherin house and former Death Eater.",
    twitterUsername: "@opddinx",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-postcss", `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-8JW0PZKDZR"],  // 控えておいた、測定IDを記載します。
        pluginConfig: {
          head: true  // headタグに記載されるようにコンフィグを設定します。
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `GFS Didot\:400`, // Replace with your chosen font
          `Vollkorn\:400,400i,700`, // You can add multiple fonts
          `STIX Two Text\:400,400i,700`, // You can add multiple fonts
          `source sans pro\:300,400,400i,700` // You can add multiple fonts
        ],
        display: 'swap'
      }
    }
  ]
};

export default config;
