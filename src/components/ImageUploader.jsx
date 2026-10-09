function ImageUploader({ imagePreview, fileName, onImageChange }) {
  return (
    <div className="upload-card">
      <div className="section-label">01 · Add your visual</div>
      <label className="upload-zone">
        {imagePreview ? (
          <div className="image-preview-wrapper">
            <img src={imagePreview} alt="Selected visual" className="image-preview" />
            <div className="image-overlay">Choose a different image</div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-symbol">↑</div>
            <h3>Drop an image here</h3>
            <p>or click to browse</p>
            <small>PNG, JPG, WEBP or GIF · up to 5 MB</small>
          </div>
        )}
        <input className="d-none" type="file" accept="image/*" onChange={onImageChange} />
      </label>
      {fileName && <div className="file-name mt-3"><span className="file-dot" />{fileName}</div>}
    </div>
  );
}
export default ImageUploader;
