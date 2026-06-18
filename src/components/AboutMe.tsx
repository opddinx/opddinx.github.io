import type { BL } from '../types/i18n';

export const ABOUT_DATA = {
    xrgroupUrl: 'https://www.xr.sys.es.osaka-u.ac.jp/',
    heroIntro: {
        en: 'I am a PhD student at XR Group at the University of Osaka, majoring in Computer Vision, Graphics, Interaction for better understanding of human.',
        ja: '大阪大学大学院基礎工学研究科博士後期課程、XR Group に所属。コンピュータビジョン、グラフィクス、インタラクションを介した人の研究を行っています。',
    } satisfies BL,
    bio: {
        en: 'I study human subjective experience as an interplay between perception, interpretation, thought, and expression. My work develops external computational media that capture, modulate/edit, and display this interplay through computer vision, computer graphics, and human-computer interaction. I implement these ideas as novel capture/display systems and experimental experiences. Beyond technical functionality, I view humans and creative artifacts as socially and culturally situated entities whose meanings evolve through use, interpretation, and communication. Through this perspective, I explore how technology can expand the possibilities of expression, interpretation, and communication.',
        ja: '人の主観体験を「知覚・解釈・思考・表現が相互に影響し合うプロセス」として捉え、そのプロセスにおいて外部から計測・変調/編集・提示を担う計算メディアを研究しています。コンピュータビジョン、グラフィクス、インタラクションを横断し、新しいキャプチャ／ディスプレイシステムや実験的体験として実装することを目指しています。また、人間やその創作物を社会や文化の中で意味を変えながら生きる存在として捉え、技術が表現・解釈・コミュニケーションのあり方をどのように拡張しうるかにも関心があります。',
    } satisfies BL,
    interests: {
        en: 'Computer Vision, Computer Graphics, Geometry Processing, Machine Learning, Human-Computer Interaction, Fabrication, Physics Simulation, XR/AR/VR, Cognitive Science',
        ja: 'コンピュータビジョン、グラフィクス、形状処理、機械学習、ヒューマンコンピュータインタラクション、ファブリケーション、物理シミュレーション、XR/AR/VR、認知科学',
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
