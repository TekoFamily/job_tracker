
/**
 * Job Service - Responsible for fetching and normalizing job data.
 */

const REMOTIVE_API = 'https://remotive.com/api/remote-jobs';

/**
 * Detects the seniority level based on job title.
 */
const detectLevel = (title) => {
    const t = title.toLowerCase();
    if (t.includes('intern') || t.includes('estágio') || t.includes('estágiario')) return 'intern';
    if (t.includes('junior') || t.includes('jr') || t.includes('entry')) return 'junior';
    if (t.includes('senior') || t.includes('sr') || t.includes('lead')) return 'senior';
    if (t.includes('pleno') || t.includes('mid') || t.includes('staff')) return 'pleno';
    return 'not_specified';
};

/**
 * Normalizes Remotive API data into standard jobData format.
 */
const normalizeRemotive = (rawJob) => {
    return {
        id: rawJob.id.toString(),
        title: rawJob.title,
        company: rawJob.company_name,
        location: rawJob.candidate_required_location || 'Remote',
        description: rawJob.description.replace(/<[^>]*>?/gm, ''), // Clean HTML
        tags: rawJob.tags || [],
        url: rawJob.url,
        postedAt: new Date(rawJob.publication_date),
        salary: rawJob.salary || 'Não informado',
        level: detectLevel(rawJob.title),
        source: 'Remotive',
        originalTags: rawJob.tags // Useful for exact matching
    };
};

export const fetchRecommendedJobs = async (category = 'software-dev') => {
    try {
        const response = await fetch(`${REMOTIVE_API}?category=${category}&limit=20`);
        const data = await response.json();

        if (!data.jobs) return [];

        return data.jobs.map(normalizeRemotive);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        // Return empty list or fallback mock data for demo robustness
        return [];
    }
};
