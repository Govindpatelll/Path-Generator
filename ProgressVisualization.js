function ProgressVisualization({ progress, visualizationType = 'default' }) {
    const [chartData, setChartData] = React.useState(null);

    React.useEffect(() => {
        try {
            // Transform progress data based on visualization type
            const transformedData = transformProgressData(progress, visualizationType);
            setChartData(transformedData);
        } catch (error) {
            reportError(error);
        }
    }, [progress, visualizationType]);

    const renderVisualization = () => {
        switch (visualizationType) {
            case 'tree':
                return renderSkillTree(chartData);
            case 'radial':
                return renderRadialChart(chartData);
            case 'journey':
                return renderJourneyMap(chartData);
            default:
                return renderDefaultProgress(chartData);
        }
    };

    const renderSkillTree = (data) => {
        return (
            <div className="skill-tree" data-name="skill-tree">
                {data?.skills?.map((skill, index) => (
                    <div 
                        key={index}
                        className={`skill-node ${skill.completed ? 'completed' : ''}`}
                    >
                        <i className={`fas ${skill.icon} text-xl mb-2`}></i>
                        <span>{skill.name}</span>
                        {skill.subskills?.length > 0 && (
                            <div className="skill-branches">
                                {skill.subskills.map((subskill, subIndex) => (
                                    <div 
                                        key={subIndex}
                                        className={`skill-subnode ${subskill.completed ? 'completed' : ''}`}
                                    >
                                        {subskill.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderRadialChart = (data) => {
        const totalSegments = data?.segments?.length || 0;
        const angleStep = (2 * Math.PI) / totalSegments;

        return (
            <div className="radial-chart" data-name="radial-chart">
                <svg viewBox="0 0 200 200">
                    <g transform="translate(100,100)">
                        {data?.segments?.map((segment, index) => {
                            const startAngle = index * angleStep;
                            const endAngle = (index + 1) * angleStep;
                            const path = describeArc(0, 0, 80, startAngle, endAngle);
                            return (
                                <path
                                    key={index}
                                    d={path}
                                    className={`segment ${segment.completed ? 'completed' : ''}`}
                                    fill={segment.completed ? '#4f46e5' : '#e2e8f0'}
                                />
                            );
                        })}
                    </g>
                </svg>
            </div>
        );
    };

    const renderJourneyMap = (data) => {
        return (
            <div className="journey-map" data-name="journey-map">
                <div className="journey-path">
                    {data?.milestones?.map((milestone, index) => (
                        <div 
                            key={index}
                            className={`milestone ${milestone.completed ? 'completed' : ''}`}
                        >
                            <div className="milestone-icon">
                                <i className={`fas ${milestone.icon}`}></i>
                            </div>
                            <div className="milestone-content">
                                <h4>{milestone.title}</h4>
                                <p>{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderDefaultProgress = (data) => {
        return (
            <div className="default-progress" data-name="default-progress">
                <div className="progress-bar">
                    <div 
                        className="progress-bar-fill"
                        style={{ width: `${data?.percentage || 0}%` }}
                    ></div>
                </div>
                <div className="progress-stats">
                    <div className="stat">
                        <span className="stat-label">Completed</span>
                        <span className="stat-value">{data?.completed || 0}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Total</span>
                        <span className="stat-value">{data?.total || 0}</span>
                    </div>
                </div>
            </div>
        );
    };

    // Helper function for radial chart
    const describeArc = (x, y, radius, startAngle, endAngle) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
        return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");
    };

    const polarToCartesian = (centerX, centerY, radius, angleInRadians) => {
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    const transformProgressData = (progress, type) => {
        // Transform progress data based on visualization type
        // This is a simplified example
        return progress;
    };

    return (
        <div className="widget" data-name="progress-visualization">
            <div className="widget-header">
                <h3 className="text-lg font-semibold">Progress Visualization</h3>
                <select
                    value={visualizationType}
                    onChange={(e) => setVisualizationType(e.target.value)}
                    className="form-input"
                    data-name="visualization-type-select"
                >
                    <option value="default">Default</option>
                    <option value="tree">Skill Tree</option>
                    <option value="radial">Radial Chart</option>
                    <option value="journey">Journey Map</option>
                </select>
            </div>
            <div className="widget-content">
                {chartData ? renderVisualization() : (
                    <div className="flex justify-center items-center h-full">
                        <i className="fas fa-spinner fa-spin text-2xl text-gray-400"></i>
                    </div>
                )}
            </div>
        </div>
    );
}
