const EventsPieChart = ({ sold, total, progressColor = '#2aad93' }) => {
  // Calculate percentage for the arc
  const percentage = (sold / total) * 100;
  
  // Calculate the SVG arc parameters
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = ((100 - percentage) / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32">
        {/* Background circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Progress circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke={progressColor}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Center text showing sold/total */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-semibold flex">
          {sold}<span className='text-sm text-black/50'>/{total}</span>
        </span>
      </div>
    </div>
  );
};

export default EventsPieChart;