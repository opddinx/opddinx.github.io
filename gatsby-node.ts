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
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /react-cytoscapejs/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
};