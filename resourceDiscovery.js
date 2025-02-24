const GEMINI_API_KEY = 'AIzaSyCN0nAuCYsy0TOh8EKME5Q-CDK0rPyloQ8';

async function discoverResources(searchParams) {
    try {
        const { skill, goal, priorKnowledge, resourceTypes = ['course', 'blog', 'youtube'], 
                keywords = [], maxResults = 10, language = 'en', priceRange, duration } = searchParams;

        const systemPrompt = `Act as a learning resource discovery agent. Find high-quality ${resourceTypes.join(', ')} about ${skill}.
            Requirements:
            - Goal: ${goal || 'Not specified'}
            - Level: ${priorKnowledge || 'Any'}
            - Language: ${language}
            - Price Range: ${priceRange || 'Any'}
            - Duration: ${duration || 'Any'}
            - Keywords: ${keywords.join(', ')}

            For each resource, provide:
            1. Title
            2. URL (real, working URL)
            3. Platform/Source
            4. Brief description (2-3 sentences)
            5. Estimated duration
            6. Price (if applicable)
            7. Prerequisites
            8. Key takeaways (3-5 bullet points)

            Format as JSON. Example:
            {
                "resources": [
                    {
                        "title": "Complete Python Course",
                        "url": "https://www.coursera.org/python",
                        "source": "Coursera",
                        "description": "Comprehensive Python course...",
                        "duration": "10 hours",
                        "price": "Free",
                        "prerequisites": ["Basic programming"],
                        "keyTakeaways": ["Python basics", "OOP concepts"]
                    }
                ]
            }`;

        const userPrompt = `Find the top ${maxResults} resources for learning ${skill}.`;

        try {
            const response = await invokeAIAgent(systemPrompt, userPrompt);
            const parsedResults = JSON.parse(response);
            return parsedResults.resources;
        } catch (error) {
            console.warn('Using backup resource discovery method:', error);
            return getBackupResources(skill, resourceTypes);
        }
    } catch (error) {
        reportError(error);
        throw new Error('Failed to discover resources');
    }
}

function getBackupResources(skill, resourceTypes) {
    const resources = {
        python: [
            {
                title: "Learn Python Programming Masterclass",
                url: "https://www.udemy.com/course/python-the-complete-python-developer-course",
                source: "Udemy",
                description: "Complete Python course covering basics to advanced concepts",
                duration: "42 hours",
                price: "$13.99",
                prerequisites: ["No prior experience needed"],
                keyTakeaways: [
                    "Python fundamentals",
                    "Object-oriented programming",
                    "Web development with Python",
                    "Database integration"
                ],
                tags: ["programming", "python", "beginner-friendly"]
            },
            {
                title: "Python for Everybody Specialization",
                url: "https://www.coursera.org/specializations/python",
                source: "Coursera",
                description: "Learn to Program and Analyze Data with Python",
                duration: "8 months",
                price: "Free to audit",
                prerequisites: ["Basic computer skills"],
                keyTakeaways: [
                    "Programming fundamentals",
                    "Python data structures",
                    "Database access",
                    "Data visualization"
                ],
                tags: ["programming", "data-analysis", "python"]
            }
        ],
        javascript: [
            {
                title: "Modern JavaScript From The Beginning",
                url: "https://www.udemy.com/course/modern-javascript-from-the-beginning",
                source: "Udemy",
                description: "Modern JavaScript from the beginning - all the way up to JS expert level",
                duration: "21.5 hours",
                price: "$11.99",
                prerequisites: ["Basic HTML knowledge"],
                keyTakeaways: [
                    "JavaScript fundamentals",
                    "DOM manipulation",
                    "Async programming",
                    "Modern JS features"
                ],
                tags: ["programming", "javascript", "web-development"]
            }
        ],
        // Add more skills and their resources
    };

    return resources[skill.toLowerCase()] || [];
}
