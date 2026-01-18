
/**
 * Matcher Service - Logic to calculate compatibility between resume and jobs.
 */

export const calculateJobMatch = (resumeData, jobData) => {
    if (!resumeData || !jobData) return { score: 0, matchingSkills: [], gaps: [] };

    const userSkills = resumeData.skills.map(s => s.toLowerCase());
    const jobTags = jobData.tags.map(t => t.toLowerCase());
    const jobTitle = jobData.title.toLowerCase();
    const summary = resumeData.summary.toLowerCase();

    let score = 0;
    let matchingSkills = [];
    let gaps = [];

    // 1. Skill Matching (Weight: 60%)
    // Check how many job tags are in user skills or summary
    jobTags.forEach(tag => {
        if (userSkills.some(skill => skill.includes(tag) || tag.includes(skill)) || summary.includes(tag)) {
            matchingSkills.push(tag);
        } else {
            gaps.push(tag);
        }
    });

    const skillMatchRatio = jobTags.length > 0 ? (matchingSkills.length / jobTags.length) : 0;
    score += skillMatchRatio * 60;

    // 2. Level Adherence (Weight: 20%)
    const userLevel = detectUserLevel(resumeData.role, resumeData.summary);
    if (userLevel === jobData.level) {
        score += 20;
    } else if (isCompatibleLevel(userLevel, jobData.level)) {
        score += 10;
    }

    // 3. Title Keyword Match (Weight: 20%)
    const userRole = resumeData.role.toLowerCase();
    const titleKeywords = jobTitle.split(' ').filter(word => word.length > 3);
    const titleMatchCount = titleKeywords.filter(word => userRole.includes(word) || summary.includes(word)).length;

    const titleMatchRatio = titleKeywords.length > 0 ? (titleMatchCount / titleKeywords.length) : 0;
    score += titleMatchRatio * 20;

    return {
        score: Math.round(score),
        matchingSkills,
        gaps,
        levelMatch: userLevel === jobData.level
    };
};

/**
 * Helper to infer user level from their resume.
 */
const detectUserLevel = (role, summary) => {
    const text = (role + ' ' + summary).toLowerCase();
    if (text.includes('senior') || text.includes('sr') || text.includes('especialista')) return 'senior';
    if (text.includes('júnior') || text.includes('junior') || text.includes('jr')) return 'junior';
    if (text.includes('estagiário') || text.includes('estágio') || text.includes('intern')) return 'intern';
    return 'pleno';
};

/**
 * Checks if levels are horizontally compatible (e.g., Junior fits Intern jobs).
 */
const isCompatibleLevel = (user, job) => {
    if (user === 'junior' && job === 'intern') return true;
    if (user === 'pleno' && job === 'junior') return true;
    if (user === 'senior' && job === 'pleno') return true;
    return false;
};
