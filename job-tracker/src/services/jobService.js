
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

const ARBEITNOW_API = 'https://www.arbeitnow.com/api/job-board-api';

/**
 * Normalizes Arbeitnow API data into standard jobData format.
 */
const normalizeArbeitnow = (rawJob) => {
    return {
        id: rawJob.slug,
        title: rawJob.title,
        company: rawJob.company_name,
        location: rawJob.location,
        description: rawJob.description.replace(/<[^>]*>?/gm, '').slice(0, 500) + '...', // Clean HTML and truncate
        tags: rawJob.tags || [],
        url: rawJob.url,
        postedAt: new Date(rawJob.created_at * 1000), // Unix timestamp
        salary: 'Não informado',
        level: detectLevel(rawJob.title),
        source: 'Arbeitnow',
        originalTags: rawJob.tags // Useful for exact matching
    };
};

export const fetchRecommendedJobs = async (category = 'software-dev') => {
    try {
        // Fetch from multiple sources in parallel
        const [remotiveRes, arbeitnowRes] = await Promise.allSettled([
            fetch(`${REMOTIVE_API}?category=${category}&limit=15`),
            fetch(ARBEITNOW_API)
        ]);

        let allJobs = [];

        // Process Remotive Results
        if (remotiveRes.status === 'fulfilled') {
            const data = await remotiveRes.value.json();
            if (data.jobs) {
                allJobs = [...allJobs, ...data.jobs.map(normalizeRemotive)];
            }
        }

        // Process Arbeitnow Results
        if (arbeitnowRes.status === 'fulfilled') {
            const data = await arbeitnowRes.value.json();
            if (data.data) {
                // Filter for tech-related jobs roughly since Arbeitnow is mixed
                const techJobs = data.data.filter(j =>
                    j.title.toLowerCase().match(/developer|engineer|software|data|fullstack|backend|frontend|devops|tech/)
                );
                allJobs = [...allJobs, ...techJobs.map(normalizeArbeitnow)];
            }
        }

        // Shuffle results to mix sources
        return allJobs.sort(() => Math.random() - 0.5);

    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};
