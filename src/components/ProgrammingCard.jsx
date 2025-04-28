const ProgrammingCard = ({ onClick, title, description, imgSrc, imgAlt }) => {
	return (
		<div class="project-card" onClick={onClick}>
			<div class="project-text">
				<h2>{title}</h2>
				<p>
                    {description}
				</p>
			</div>
			<img src={imgSrc} alt={imgAlt} />
		</div>
	);
};

export default ProgrammingCard;
