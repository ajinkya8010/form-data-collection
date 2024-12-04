
const ProgressBar = ({ completed, total }) => {
    const percentage = Math.round((completed / total) * 100);
  
    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${percentage}%` }}>
          {percentage}%
        </div>
      </div>
    );
};

export default ProgressBar;