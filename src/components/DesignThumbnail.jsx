const DesignThumbnail = ({ imageSrc, imageAlt, onClick }) => {
    return (
        <div class="thumbnail" onClick={onClick}>
            <img src={imageSrc} alt={imageAlt} />
        </div>
    )
};

export default DesignThumbnail;