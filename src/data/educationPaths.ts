export interface UserProfile {
    age: number;
    highestQualification: 'O-Level' | 'A-Level' | 'Diploma' | 'Degree' | 'High School';
    grades: 'Excellent' | 'Good' | 'Average' | 'Pass';
}

export type LocalizedText = { en: string; zh: string };

export interface PathStep {
    title: LocalizedText;
    duration: LocalizedText;
    description: LocalizedText;
}

export interface StudyPath {
    id: string;
    name: LocalizedText;
    description: LocalizedText;
    steps: PathStep[];
    eligibleSchools: string[]; // IDs of schools from mapData
}

const k12Path: StudyPath = {
    id: 'k12-path',
    name: { en: 'K12 / International Schools', zh: '低龄 / 国际学校' },
    description: {
        en: 'For younger students, we shortlist schools, plan assessments, and manage admissions and landing steps.',
        zh: '适合低龄学生：从选校、评估到申请与落地安排，形成可执行时间线。',
    },
    steps: [
        {
            title: { en: 'Assessment', zh: '背景评估' },
            duration: { en: '1-2 Days', zh: '1–2 天' },
            description: { en: 'Grade, language level, timeline.', zh: '梳理年级、语言、节点与目标。' },
        },
        {
            title: { en: 'School Shortlist', zh: '院校清单' },
            duration: { en: '3-5 Days', zh: '3–5 天' },
            description: { en: 'Match to budget and location.', zh: '结合预算与通勤，筛出合适学校。' },
        },
        {
            title: { en: 'Admissions', zh: '申请与测试' },
            duration: { en: '2-12 Weeks', zh: '2–12 周' },
            description: { en: 'Apply, prepare interviews/tests.', zh: '提交申请，准备面试/测评。' },
        },
        {
            title: { en: 'Landing', zh: '落地安排' },
            duration: { en: '2-6 Weeks', zh: '2–6 周' },
            description: { en: 'Student pass + onboarding.', zh: '学生准证与报到、安居支持。' },
        },
    ],
    eligibleSchools: [],
};

const foundationToDegreePath: StudyPath = {
    id: 'foundation-path',
    name: { en: 'Foundation → Diploma → Degree', zh: '预科 → 文凭 → 本科' },
    description: {
        en: 'A common pathway for students completing secondary education to progress into a Bachelor’s program.',
        zh: '适合中学阶段毕业的学生，通过预科/文凭逐步衔接本科学位。',
    },
    steps: [
        {
            title: { en: 'Foundation', zh: '预科' },
            duration: { en: '4-8 Months', zh: '4–8 个月' },
            description: { en: 'Build academic readiness.', zh: '夯实基础，衔接更高阶段。' },
        },
        {
            title: { en: 'Diploma', zh: '文凭' },
            duration: { en: '6-12 Months', zh: '6–12 个月' },
            description: { en: 'Bridge into degree modules.', zh: '衔接本科模块与学习方法。' },
        },
        {
            title: { en: 'Bachelor’s', zh: '本科学位' },
            duration: { en: '16-24 Months', zh: '16–24 个月' },
            description: { en: 'Complete final years and graduate.', zh: '完成本科后半段课程，获得学位。' },
        },
    ],
    eligibleSchools: ['kaplan', 'psb', 'amity'],
};

const publicUniversityTrack: StudyPath = {
    id: 'public-uni-path',
    name: { en: 'Public University Track (NUS/NTU)', zh: '公立大学路线（NUS/NTU）' },
    description: {
        en: 'For stronger academic profiles, focus on timeline planning, requirements and application strategy.',
        zh: '适合学术背景更强的申请者：围绕时间线、材料要求与申请策略推进。',
    },
    steps: [
        {
            title: { en: 'Targeting', zh: '选校选专业' },
            duration: { en: '3-7 Days', zh: '3–7 天' },
            description: { en: 'Major fit + entry requirements.', zh: '匹配专业方向与录取要求。' },
        },
        {
            title: { en: 'Materials', zh: '材料与文书' },
            duration: { en: '2-6 Weeks', zh: '2–6 周' },
            description: { en: 'Personal statement + documents.', zh: '准备文书与全套申请材料。' },
        },
        {
            title: { en: 'Submission', zh: '提交与跟进' },
            duration: { en: '1-4 Weeks', zh: '1–4 周' },
            description: { en: 'Apply and track outcomes.', zh: '提交申请并持续跟进结果。' },
        },
    ],
    eligibleSchools: ['nus', 'ntu'],
};

const directDegreePathBase: StudyPath = {
    id: 'degree-path',
    name: { en: 'Direct Degree Entry', zh: '直入本科' },
    description: {
        en: "Fast-track your education with direct entry to a Bachelor's program.",
        zh: '适合 A 水准或大专背景，直接进入本科阶段。',
    },
    steps: [
        {
            title: { en: "Bachelor's Degree", zh: '本科学位' },
            duration: { en: '24-36 Months', zh: '24–36 个月' },
            description: { en: 'Complete your degree.', zh: '完成本科学位。' },
        },
    ],
    eligibleSchools: ['kaplan', 'psb', 'amity'],
};

const mastersPathBase: StudyPath = {
    id: 'masters-path',
    name: { en: "Master's Degree", zh: '硕士路线' },
    description: {
        en: 'Advance your career with a postgraduate qualification.',
        zh: '通过研究生学习提升学历与职业竞争力。',
    },
    steps: [
        {
            title: { en: "Master's Degree", zh: '硕士学位' },
            duration: { en: '12-18 Months', zh: '12–18 个月' },
            description: { en: 'Specialized postgraduate study.', zh: '完成硕士课程。' },
        },
    ],
    eligibleSchools: ['kaplan', 'psb', 'amity'],
};

const generalPath: StudyPath = {
    id: 'general-path',
    name: { en: 'General Education Path', zh: '通用咨询路线' },
    description: {
        en: 'Explore options and get a tailored shortlist for your profile.',
        zh: '根据你的情况匹配可选方向，并给出更合适的执行方案。',
    },
    steps: [
        {
            title: { en: 'Consultation', zh: '咨询评估' },
            duration: { en: '1 Day', zh: '1 天' },
            description: { en: 'Speak with our counselors.', zh: '与顾问沟通目标与背景。' },
        },
        {
            title: { en: 'Customized Plan', zh: '定制方案' },
            duration: { en: 'Variable', zh: '按情况' },
            description: { en: 'Tailored to your needs.', zh: '根据目标与预算制定方案。' },
        },
    ],
    eligibleSchools: [],
};

export const getRecommendedPaths = (profile: UserProfile): StudyPath[] => {
    const paths: StudyPath[] = [];

    const strongGrades = profile.grades === 'Excellent' || profile.grades === 'Good';

    if (Number.isFinite(profile.age) && profile.age > 0 && profile.age < 16) {
        paths.push(k12Path);
        return paths;
    }

    if (profile.highestQualification === 'O-Level' || profile.highestQualification === 'High School') {
        if (strongGrades) paths.push(publicUniversityTrack);
        paths.push(foundationToDegreePath);
    }

    if (profile.highestQualification === 'A-Level' || profile.highestQualification === 'Diploma') {
        if (strongGrades) paths.push(publicUniversityTrack);
        paths.push({
            ...directDegreePathBase,
            eligibleSchools: strongGrades
                ? ['kaplan', 'psb', 'amity', 'nus', 'ntu']
                : ['kaplan', 'psb', 'amity'],
        });
    }

    if (profile.highestQualification === 'Degree') {
        paths.push({
            ...mastersPathBase,
            eligibleSchools: strongGrades
                ? ['kaplan', 'psb', 'amity', 'nus', 'ntu']
                : ['kaplan', 'psb', 'amity'],
        });
    }

    if (paths.length === 0) paths.push(generalPath);

    const seen = new Set<string>();
    return paths.filter((path) => {
        if (seen.has(path.id)) return false;
        seen.add(path.id);
        return true;
    });
};
