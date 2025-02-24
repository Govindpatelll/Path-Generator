function createUserProfile(data) {
    try {
        return {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    } catch (error) {
        reportError(error);
        throw new Error('Failed to create user profile');
    }
}

function validateProfile(profile) {
    try {
        const requiredFields = ['skills', 'goals', 'priorKnowledge', 'learningStyle', 'timeCommitment', 'resourcePreferences'];
        
        // Check if all required fields exist
        const missingFields = requiredFields.filter(field => !profile[field]);
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // Validate skills
        if (!Array.isArray(profile.skills) || profile.skills.length === 0) {
            throw new Error('Please select at least one skill');
        }

        // Validate goals
        if (!profile.goals.primary || !profile.goals.timeline) {
            throw new Error('Please complete your learning goals');
        }

        // Validate time commitment
        if (!profile.timeCommitment.hoursPerWeek || !profile.timeCommitment.preferredTimes) {
            throw new Error('Please specify your time commitment');
        }

        // Validate learning style
        if (!profile.learningStyle.pacePreference) {
            throw new Error('Please select your learning style preferences');
        }

        // Validate resource preferences
        if (!profile.resourcePreferences.formats || profile.resourcePreferences.formats.length === 0) {
            throw new Error('Please select at least one resource format preference');
        }

        return true;
    } catch (error) {
        reportError(error);
        throw error;
    }
}

function updateUserProfile(profile, updates) {
    try {
        const updatedProfile = {
            ...profile,
            ...updates,
            updatedAt: new Date().toISOString()
        };

        // Validate the updated profile
        if (validateProfile(updatedProfile)) {
            // Save to localStorage
            localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
            return updatedProfile;
        }
    } catch (error) {
        reportError(error);
        throw new Error('Failed to update user profile');
    }
}

function getUserProfile() {
    try {
        const savedProfile = localStorage.getItem('userProfile');
        return savedProfile ? JSON.parse(savedProfile) : null;
    } catch (error) {
        reportError(error);
        return null;
    }
}
