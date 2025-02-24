function DashboardSettings({ settings, onSettingsChange }) {
    const handleThemeToggle = () => {
        try {
            const newSettings = {
                ...settings,
                darkMode: !settings.darkMode
            };
            onSettingsChange(newSettings);
            document.documentElement.classList.toggle('dark');
        } catch (error) {
            reportError(error);
        }
    };

    const handleFontSizeChange = (size) => {
        try {
            const newSettings = {
                ...settings,
                fontSize: size
            };
            onSettingsChange(newSettings);
        } catch (error) {
            reportError(error);
        }
    };

    const handleHighContrastToggle = () => {
        try {
            const newSettings = {
                ...settings,
                highContrast: !settings.highContrast
            };
            onSettingsChange(newSettings);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="widget" data-name="dashboard-settings">
            <div className="widget-header">
                <h3 className="text-lg font-semibold">Dashboard Settings</h3>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <button
                        onClick={handleThemeToggle}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 
                            ${settings.darkMode ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        role="switch"
                        aria-checked={settings.darkMode}
                        data-name="theme-toggle"
                    >
                        <span className="sr-only">Toggle dark mode</span>
                        <span
                            className={`inline-block w-4 h-4 transform rounded-full bg-white transition
                                ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Font Size</label>
                    <div className="flex space-x-4">
                        {['normal', 'large', 'xlarge'].map(size => (
                            <button
                                key={size}
                                onClick={() => handleFontSizeChange(size)}
                                className={`px-3 py-1 rounded ${
                                    settings.fontSize === size
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700'
                                }`}
                                data-name={`font-size-${size}`}
                            >
                                {size.charAt(0).toUpperCase() + size.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span>High Contrast</span>
                    <button
                        onClick={handleHighContrastToggle}
                        className={`relative inline-flex items-center h-6 rounded-full w-11 
                            ${settings.highContrast ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        role="switch"
                        aria-checked={settings.highContrast}
                        data-name="contrast-toggle"
                    >
                        <span className="sr-only">Toggle high contrast</span>
                        <span
                            className={`inline-block w-4 h-4 transform rounded-full bg-white transition
                                ${settings.highContrast ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
