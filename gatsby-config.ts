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
  plugins: ["gatsby-plugin-postcss", `gatsby-plugin-react-helmet`]
};

export default config;
