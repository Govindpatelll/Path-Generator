async function generateLearningPath(userProfile) {
    try {
        const systemPrompt = `Generate a personalized learning path based on:
            Skills: ${JSON.stringify(userProfile.skills)}
            Goals: ${JSON.stringify(userProfile.goals)}
            Prior Knowledge: ${JSON.stringify(userProfile.priorKnowledge)}
            Learning Style: ${JSON.stringify(userProfile.learningStyle)}
            Time Commitment: ${JSON.stringify(userProfile.timeCommitment)}
            Resource Preferences: ${JSON.stringify(userProfile.resourcePreferences)}`;

        const userPrompt = "Generate a detailed learning path with resources and progress tracking.";

        try {
            const response = await invokeAIAgent(systemPrompt, userPrompt);
            const parsedPath = JSON.parse(response);
            return {
                ...parsedPath,
                progress: {
                    completedModules: 0,
                    totalModules: parsedPath.modules?.length || 0,
                    completedResources: 0,
                    totalResources: parsedPath.modules?.reduce((acc, module) => acc + (module.resources?.length || 0), 0) || 0,
                    timeSpent: 0
                }
            };
        } catch (error) {
            console.warn('Using default learning path:', error);
            return getDefaultLearningPath(userProfile.skills[0]);
        }
    } catch (error) {
        reportError(error);
        throw new Error('Failed to generate learning path');
    }
}

function getDefaultLearningPath(skill) {
    return {
        modules: [
            {
                title: 'Getting Started',
                description: `Introduction to ${skill}`,
                completed: false,
                resources: [
                    {
                        title: `${skill} Fundamentals`,
                        description: `Learn the basics of ${skill}`,
                        type: 'course',
                        provider: 'Coursera',
                        duration: '2 hours',
                        completed: false,
                        url: `https://www.coursera.org/search?query=${skill}`,
                        tags: ['beginner', skill.toLowerCase()]
                    }
                ]
            }
        ],
        progress: {
            completedModules: 0,
            totalModules: 1,
            completedResources: 0,
            totalResources: 1,
            timeSpent: 0
        }
    };
}
