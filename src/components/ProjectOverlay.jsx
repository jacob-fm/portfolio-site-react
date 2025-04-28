const ProjectOverlay = ({ 
  id,
  title,
  children,
  onClose 
}) => {
  return (
    <div id={id} className="project-overlay">
      <div className="overlay-panel">
        <div className="fixed-wrapper">
          <button 
            className="close-overlay"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <h2 className="text-center mb">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default ProjectOverlay;