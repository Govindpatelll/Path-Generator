function App() {
    const [currentPage, setCurrentPage] = React.useState('onboarding');
    const [userProfile, setUserProfile] = React.useState(() => {
        // Check if there's a saved profile in localStorage
        const savedProfile = localStorage.getItem('userProfile');
        try {
            return savedProfile ? JSON.parse(savedProfile) : null;
        } catch {
            return null;
        }
    });

    React.useEffect(() => {
        // If user has a profile, show dashboard
        if (userProfile) {
            setCurrentPage('dashboard');
        }
    }, [userProfile]);

    const handleOnboardingComplete = (profile) => {
        try {
            const completeProfile = {
                id: Date.now().toString(),
                ...profile,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            // Save profile to localStorage
            localStorage.setItem('userProfile', JSON.stringify(completeProfile));
            setUserProfile(completeProfile);
            setCurrentPage('dashboard');
        } catch (error) {
            reportError(error);
            alert('Failed to save profile. Please try again.');
        }
    };

    return (
        <div className="app-container" data-name="app">
            <Header />
            <main className="min-h-screen">
                {currentPage === 'onboarding' && (
                    <Onboarding onComplete={handleOnboardingComplete} />
                )}
                {currentPage === 'dashboard' && userProfile && (
                    <Dashboard userProfile={userProfile} />
                )}
            </main>
            <Footer />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
