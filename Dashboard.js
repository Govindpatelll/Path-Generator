function Dashboard({ userProfile }) {
    const [learningPath, setLearningPath] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [settings, setSettings] = React.useState(() => {
        const savedSettings = localStorage.getItem('dashboardSettings');
        return savedSettings ? JSON.parse(savedSettings) : {
            darkMode: false,
            fontSize: 'normal',
            highContrast: false,
            widgets: ['progress', 'visualization', 'motivation']
        };
    });

    React.useEffect(() => {
        const initializeDashboard = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load or generate learning path
                const savedPath = localStorage.getItem(`learningPath_${userProfile.id}`);
                let path;

                if (savedPath) {
                    path = JSON.parse(savedPath);
                } else {
                    path = await generateLearningPath(userProfile);
                    localStorage.setItem(`learningPath_${userProfile.id}`, JSON.stringify(path));
                }

                setLearningPath(path);

                // Apply settings
                if (settings.darkMode) {
                    document.documentElement.classList.add('dark');
                }
                document.body.classList.add(`text-size-${settings.fontSize}`);
                if (settings.highContrast) {
                    document.body.classList.add('high-contrast');
                }
            } catch (err) {
                setError(err.message);
                reportError(err);
            } finally {
                setLoading(false);
            }
        };

        initializeDashboard();

        return () => {
            // Cleanup
            document.body.classList.remove(
                'text-size-normal',
                'text-size-large',
                'text-size-xlarge',
                'high-contrast'
            );
        };
    }, [userProfile.id]);

    const handleSettingsChange = (newSettings) => {
        try {
            setSettings(newSettings);
            localStorage.setItem('dashboardSettings', JSON.stringify(newSettings));
        } catch (error) {
            reportError(error);
        }
    };

    const updateProgress = (moduleIndex, resourceIndex) => {
        try {
            if (!learningPath) return;

            const newPath = { ...learningPath };
            const resource = newPath.modules[moduleIndex].resources[resourceIndex];
            resource.completed = !resource.completed;

            // Update progress
            const completedResources = newPath.modules.reduce((acc, module) => 
                acc + module.resources.filter(r => r.completed).length, 0);

            const completedModules = newPath.modules.filter(module =>
                module.resources.every(r => r.completed)).length;

            newPath.progress = {
                ...newPath.progress,
                completedResources,
                completedModules
            };

            setLearningPath(newPath);
            localStorage.setItem(`learningPath_${userProfile.id}`, JSON.stringify(newPath));
        } catch (error) {
            reportError(error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen" data-name="dashboard-loading">
                <div className="text-center">
                    <i className="fas fa-spinner fa-spin text-4xl text-indigo-600 mb-4"></i>
                    <p>Generating your personalized learning path...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen" data-name="dashboard-error">
                <div className="text-center text-red-600">
                    <i className="fas fa-exclamation-circle text-4xl mb-4"></i>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container" data-name="dashboard">
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ProgressTracker progress={learningPath?.progress} />
                        <div id="main-content">
                            <LearningPath 
                                path={learningPath} 
                                onUpdateProgress={updateProgress}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <AiTutor />
                            <LearningStreak />
                        </div>
                        <div className="mt-8">
                            <ResourceDiscovery userProfile={userProfile} />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <DashboardSettings 
                            settings={settings}
                            onSettingsChange={handleSettingsChange}
                        />
                        <ResourceLibrary />
                        {settings.widgets.includes('visualization') && (
                            <ProgressVisualization 
                                progress={learningPath?.progress}
                                visualizationType="tree"
                            />
                        )}
                        {settings.widgets.includes('motivation') && (
                            <MotivationalMessage 
                                userProfile={userProfile}
                                progress={learningPath?.progress}
                            />
                        )}
                    </div>
                </div>
            </div>

            <nav className="mobile-nav">
                <div className="mobile-nav-grid">
                    <a href="#progress" className="mobile-nav-item active">
                        <i className="fas fa-chart-line"></i>
                        <span>Progress</span>
                    </a>
                    <a href="#resources" className="mobile-nav-item">
                        <i className="fas fa-book"></i>
                        <span>Resources</span>
                    </a>
                    <a href="#tutor" className="mobile-nav-item">
                        <i className="fas fa-chalkboard-teacher"></i>
                        <span>AI Tutor</span>
                    </a>
                    <a href="#settings" className="mobile-nav-item">
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </div>
            </nav>
        </div>
    );
}
