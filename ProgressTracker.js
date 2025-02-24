function ProgressTracker({ progress }) {
    const percentage = Math.round((progress?.completedModules / progress?.totalModules) * 100) || 0;

    return (
        <div className="progress-tracker" data-name="progress-tracker">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Learning Progress</h2>
                <div className="text-2xl font-bold text-indigo-600">{percentage}%</div>
            </div>
            <div className="progress-bar">
                <div 
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-indigo-50 rounded">
                    <div className="text-lg font-semibold text-indigo-600">
                        {progress?.completedModules || 0}
                    </div>
                    <div className="text-sm text-gray-600">Modules Completed</div>
                </div>
                <div className="p-3 bg-indigo-50 rounded">
                    <div className="text-lg font-semibold text-indigo-600">
                        {progress?.completedResources || 0}
                    </div>
                    <div className="text-sm text-gray-600">Resources Completed</div>
                </div>
                <div className="p-3 bg-indigo-50 rounded">
                    <div className="text-lg font-semibold text-indigo-600">
                        {progress?.timeSpent || 0}h
                    </div>
                    <div className="text-sm text-gray-600">Time Spent</div>
                </div>
            </div>
        </div>
    );
}
