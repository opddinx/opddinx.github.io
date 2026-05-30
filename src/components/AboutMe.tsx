import type { BL } from '../types/i18n';

export const ABOUT_DATA = {
    xrgroupUrl: 'https://www.xr.sys.es.osaka-u.ac.jp/',
    bio: {
        en: 'I study how humans perceive, feel, think, express, and interpret through the design of novel capture/display systems and experimental experiences. My goal is to reveal how subjective experience is formed and communicated, and to translate this understanding into new forms of human-computer interaction and expressive media.',
        ja: '人間が知覚・感覚・思考・表現・解釈する方法を、新しいキャプチャ/ディスプレイシステムと実験的体験のデザインを通じて研究しています。主観的体験がどのように形成・伝達されるかを明らかにし、その理解を人間とコンピュータの新たなインタラクションと表現メディアへと昇華させることを目指しています。',
    } satisfies BL,
    interests: {
        en: 'Computer Vision, Computer Graphics, Geometry Processing, Machine Learning, Human-Computer Interaction, Fabrication, Physics Simulation, XR/AR/VR, Cognitive Science',
        ja: 'コンピュータビジョン、コンピュータグラフィックス、形状処理、機械学習、ヒューマンコンピュータインタラクション、ファブリケーション、物理シミュレーション、XR/AR/VR、認知科学',
    } satisfies BL,
    emails: ['miura.kohei.h75[at]ecs.osaka-u.ac.jp', 'opddinx[at]gmail.com'],
    affiliations: [
        {
            name: {
                en: 'Graduate School of Engineering Science, the University of Osaka',
                ja: '大阪大学大学院基礎工学研究科',
            } satisfies BL,
            url: 'https://www.es.osaka-u.ac.jp/en/',
        },
        {
            name: {
                en: 'Humanware Innovation Program, the University of Osaka',
                ja: '大阪大学ヒューマンウェアイノベーションプログラム',
            } satisfies BL,
            url: 'https://www.humanware.osaka-u.ac.jp/',
        },
    ],
};
