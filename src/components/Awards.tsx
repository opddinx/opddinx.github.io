import type { BL } from '../types/i18n';

interface Award {
    title: BL;
    givenby: BL;
    time: BL;
    description: BL;
}

export const awards: Award[] = [
    {
        title: {
                en: "Outstanding Student Award in the Division of System Science and Applied Informatics (Magna cum laude)",
                ja: 'システム科学領域賞（次席）',
        },
        givenby: {
                en: "Graduate School of Engineering Science, the University of Osaka",
                ja: '大阪大学大学院基礎工学研究科',
        },
        time: "Mar. 2025",
        description: {
                en: "Awarded for the outstanding achievements in academic performance and research activities during the Master's program",
                ja: '修士課程における学業成績と研究活動において優れた成果を収めたため授与',
        },
    },
    {
        title: "Best Student Demo in Show Award (1/18)",
        givenby: "The 17th ACM SIGGRAPH Conference and Exhibition on Computer Graphics and Interactive Techniques in Asia (SIGGRAPH Asia 2024)",
        time: "Dec. 2024",
        description: "Awarded for the students' demonstration of the research titled 'Casper DPM: Cascaded Perceptual Dynamic Projection Mapping onto Hands' as co-author",
    },
    {
        title: {
                en: "Student Presentation Award (Domestic Conference)",
                ja: '学生発表賞',
        },
        givenby: {
                en: "The 67th Conference of the Institute of Systems, Control and Information Engineers",
                ja: '第67回システム制御情報学会（SCI\'23）',
        },
        time: "May 2023",
        description: {
                en: "Awarded for the students' presentation of the research titled '3D Reconstruction of Hand Work Using Multiple RGB-D Cameras and Thermal Cameras'",
                ja: '研究発表「複数のRGB-Dカメラと熱カメラを用いた手作業の三次元復元」に対して授与',
        },
    },
];

