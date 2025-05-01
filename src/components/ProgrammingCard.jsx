const ProgrammingCard = ({ onClick, title, description, imgSrc, imgAlt }) => {
	return (
		<div className="project-card" onClick={onClick}>
			<div className="project-text">
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className="card-thumbnail-container">
				<img src={imgSrc} alt={imgAlt} />
			</div>
		</div>
	);
};

export default ProgrammingCard;
