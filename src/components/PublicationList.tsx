import type { BL } from '../types/i18n';

export interface Publication {
    id: string;
    title: BL;
    authors: BL;
    journal: BL;
    attributes: BL;
    url?: string;
}

interface YearGroup {
    year: number;
    items: Publication[];
}

export const publications: YearGroup[] = [
    {
        year: 2026,
        items: [
            {
                id: "multi-projector-calibration-cvpr2026",
                title: "Breaking the Scalability Limit of Multi-projector Calibration with Embedded Cameras",
                authors: "Takumi Kawano, Kohei Miura, Daisuke Iwai",
                journal: "The IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) 2026",
                attributes: "Main (Oral, 141/16092 < 1.0%), Peer-reviewed",
                url: "https://openaccess.thecvf.com/content/CVPR2026/html/Kawano_Breaking_the_Scalability_Limit_of_Multi-Projector_Calibration_with_Embedded_Cameras_CVPR_2026_paper.html",
            },
            {
                id: "blur-filter-ahs2026",
                title: "Preliminary Study on a Real-time CSF-based Blur Filter for Unobtrusively Saliency-modulated Augmented Reality",
                authors: "Kohei Miura, Seiya Mori, Hiroki Kusuyama, Masaki Takeuchi, Yoshihiro Yokoyama, Yuto Fukui, and Takashi Amesaka",
                journal: "Augmented Humans 2026 (AHs '26)",
                attributes: "Poster (82/116 = 71%), Peer-reviewed",
                url: "https://doi.org/10.1145/3795011.3797359",
            },
            {
                id: "walking-guidance-blur-ahs2026",
                title: "A Pilot Study for Walking Direction Guidance using Subtle Blur Effects",
                authors: "Yoshihiro Yokoyama*, Stephan Kingsbery*, Masaki Takeuchi, Hiroki Kusuyama, Yuto Fukui, Kohei Miura, Seiya Mori, and Takashi Amesaka",
                journal: "Augmented Humans 2026 (AHs '26)",
                attributes: "Poster (82/116 = 71%), Peer-reviewed",
                url: "https://doi.org/10.1145/3795011.3797379",
            },
            {
                id: "thermal-hoi-spie2026",
                title: "Exploring thermal contact potentials for Hand-Object Interaction refinement",
                authors: "Kohei Miura and Daisuke Iwai",
                journal: "SPIE Photonics West (Optical Architectures for Displays and Sensing in Augmented, Virtual, and Mixed Reality (AR, VR, MR) VII)",
                attributes: "Oral Presentation, Peer-reviewed",
                url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13821/1382109/Exploring-thermal-contact-potentials-for-handobject-interaction-refinement/10.1117/12.3078027.short",
            },
            {
                id: "gloss-perception-spie2026",
                title: "Effects of view-dependent highlights and specular intensity on gloss perception in projection mapping",
                authors: "Masaki Takeuchi, Kohei Miura, Daisuke Iwai",
                journal: "SPIE Photonics West (Optical Architectures for Displays and Sensing in Augmented, Virtual, and Mixed Reality (AR, VR, MR) VII)",
                attributes: "Oral Presentation, Peer-reviewed",
                url: "https://www.spiedigitallibrary.org/conference-proceedings-of-spie/13821/1382107/Effects-of-view-dependent-highlights-and-specular-intensity-on-gloss/10.1117/12.3078780.short",
            },
        ],
    },
    {
        year: 2024,
        items: [
            {
                id: "soft-object-contact-siggraph-asia2024",
                title: "3D Reconstruction of a Soft Object Surface and Contact Areas in Hand-Object Interactions",
                authors: "Kohei Miura, Daisuke Iwai, Kosuke Sato",
                journal: "SIGGRAPH Asia 2024 Posters",
                attributes: "Poster, Peer-reviewed",
                url: "https://dl.acm.org/doi/full/10.1145/3681756.3697895",
            },
            {
                id: "casper-dpm-siggraph-asia2024",
                title: "Casper DPM: Cascaded Perceptual Dynamic Projection Mapping onto Hands",
                authors: "Yotam Erel, Or Kozlovsky-Mordenfeld, Hiroki Kusuyama, Kohei Miura, Daisuke Iwai, Kosuke Sato, Amit H. Bermano",
                journal: "SIGGRAPH Asia 2024 Emerging Technologies",
                attributes: "Emerging Technologies (Demonstration), Peer-reviewed",
                url: "https://dl.acm.org/doi/full/10.1145/3681755.3688952",
            },
            {
                id: "intellicid-uist2024",
                title: "IntelliCID: Intelligent Caustics Illumination Device",
                authors: "Shun Hanai* and Kohei Miura*",
                journal: "Adjunct Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology (UIST '24 Adjunct)",
                attributes: "Student Innovation Contest (Demonstration), Peer-reviewed",
                url: "https://dl.acm.org/doi/abs/10.1145/3672539.3686733",
            },
            {
                id: "remake-player-experience-cog2024",
                title: "Factors of player experience in describing the relationship between remade and original works",
                authors: "Takumi Yokosaka, Kohei Miura, Yuko Isogaya, Tomoko Ohtani, Kazushi Maruya",
                journal: "Proceedings of the IEEE 6th Conference on Games (IEEE CoG 2024)",
                attributes: "Short Paper, Peer-reviewed",
                url: "https://ieeexplore.ieee.org/abstract/document/10645618",
            },
        ],
    },
];
