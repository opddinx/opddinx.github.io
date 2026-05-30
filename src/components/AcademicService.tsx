import type { BL } from '../types/i18n';

interface AcademicServiceItem {
    title: BL;
    time: BL;
    description: BL;
}

export const academicService: AcademicServiceItem[] = [
    {
        title: "Student Volunteer",
        time: "IEEE AIxVR 2026",
        description: "",
    },
    {
        title: "Reviewer",
        time: "IEEE VR workshop (VR-HSA 2026), ACM DIS 2026",
        description: "",
    },
    {
        title: "Student Assistant & Teaching Assistant",
        time: "Nov. 2023 - Mar. 2025",
        description: "Mainly work as a facilitator for SEEDs Program",
    },
    {
        title: "Teaching Assistant",
        time: "Apr. 2023 - Feb. 2024, Apr. 2025 - Aug. 2025",
        description: "Introductory Programming, Intelligent Systems Seminar",
    },
];
