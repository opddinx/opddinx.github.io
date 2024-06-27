import { CreateWebpackConfigArgs } from 'gatsby';

export const onCreateWebpackConfig = ({ actions, loaders, stage }: CreateWebpackConfigArgs) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.(vert|frag)$/,
                    use: 'raw-loader',
                },
            ],
        },
    });
};