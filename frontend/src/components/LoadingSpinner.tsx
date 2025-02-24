import './styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Processing recipe...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;