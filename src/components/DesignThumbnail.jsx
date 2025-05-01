const DesignThumbnail = ({ imageSrc, imageAlt, onClick }) => {
    return (
        <div className="thumbnail" onClick={onClick}>
            <img src={imageSrc} alt={imageAlt} />
        </div>
    )
};

export default DesignThumbnail;