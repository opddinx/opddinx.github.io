import { CreateWebpackConfigArgs } from 'gatsby';

export const onCreateWebpackConfig = ({ actions, loaders, stage }: CreateWebpackConfigArgs) => {
    if (stage === 'build-html' || stage === 'develop-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /naughty-module/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }
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