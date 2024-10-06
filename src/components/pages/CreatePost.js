import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import '../css/CreatePost.css';

function CreatePost() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(""); // 'story' or 'post'
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
    if (file && caption && fileType) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);
      formData.append("type", fileType); // Either 'story' or 'post'

      // Here you would make your POST request to the backend
      try {
        const response = await fetch("https://your-backend-endpoint/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("File uploaded successfully!");
        } else {
          console.error("Error uploading file.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Please select a file, add a caption, and choose type.");
    }
  };

  return (
    <div>
      <Nav />
      <div>
        <h2>Create a Post or Story</h2>

        {/* Buttons to choose between story and post */}
        <div>
          <button onClick={() => setFileType("story")}>Upload Story</button>
          <button onClick={() => setFileType("post")}>Upload Post</button>
        </div>

        {/* Show the file input and caption only if type is selected */}
        {fileType && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Select {fileType === "story" ? "Story" : "Post"} File (Image/Video):</label>
              <input type="file" accept="image/*,video/*" onChange={handleFileChange} required />
            </div>

            {/* Preview of the selected file */}
            {preview && (
              <div>
                <h3>Preview:</h3>
                {file.type.startsWith("image") ? (
                  <img src={preview} alt="Preview" style={{ maxWidth: "300px", maxHeight: "300px" }} />
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
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
            <button type="submit">Upload {fileType === "story" ? "Story" : "Post"}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CreatePost;
