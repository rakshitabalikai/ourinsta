import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import '../css/Story.css'; // Add a separate CSS file for Story

function Story() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  // Handle file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Create an object URL for preview instead of base64 for videos
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreview(fileUrl);
    }
  };

  // Clean up object URL when component unmounts or a new file is selected
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview); // Clean up memory
      }
    };
  }, [preview]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file && caption) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);
      formData.append("type", "story"); // Specifically mark it as a story

      // Here you would make your POST request to the backend
      try {
        const response = await fetch("https://your-backend-endpoint/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("Story uploaded successfully!");
        } else {
          console.error("Error uploading story.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Please select a file and add a caption.");
    }
  };

  return (
    <div className="story-container">
      <Nav />
      <div>
        <div>
          <h2>Create a Story</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Select Story File (Image/Video):</label>
              <input type="file" accept="image/*,video/*" onChange={handleFileChange} required />
            </div>

            {/* Preview of the selected file */}
            {preview && (
              <div className="preview-container">
                <h3>Preview:</h3>
                {file.type.startsWith("image") ? (
                  <img src={preview} alt="Preview" />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                  >
                    <source src={preview} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}

            {/* Caption input */}
            <div>
              <label>Caption:</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption..."
                required
              />
            </div>

            {/* Submit button */}
            <button type="submit">Upload Story</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Story;
