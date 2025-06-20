import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import '../css/CreatePost.css';

function CreatePost() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(""); // 'story' or 'post'
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For displaying success message
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error message
  const [user, setUser] = useState(null);
  const [mediaType, setMediaType] = useState(""); // 'image' or 'video'

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileType = selectedFile.type.startsWith("image") ? "image" : "video";
      setMediaType(fileType);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => setPreview(reader.result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!file || !caption || !fileType || !mediaType || !user) {
      setErrorMessage("Please select a file, add a caption, and choose a type.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user.id);
    formData.append("caption", caption);
    formData.append("type", fileType);
    formData.append("mediaType", mediaType);

    const apiUrl = fileType === "story"
      ? "https://socialmedia-apis-2.onrender.com/api/social_media/uploadstory"
      : "https://socialmedia-apis-2.onrender.com/api/social_media/uploadpost";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage(`${fileType === "story" ? "Story" : "Post"} uploaded successfully!`);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error uploading file.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="create-post-container">
      <Nav />
      <div>
        <h2>Create a Post or Story</h2>
        <div>
          <button onClick={() => setFileType("story")} className="createpostbutton">Upload Story</button>
          <button onClick={() => setFileType("post")} className="createpostbutton">Upload Post</button>
        </div>

        {fileType && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Select {fileType === "story" ? "Story" : "Post"} File (Image/Video):</label>
              <input type="file" accept="image/*,video/*" onChange={handleFileChange} required />
            </div>

            {preview && (
              <div className="preview-container">
                <h3>Preview:</h3>
                {file.type.startsWith("image") ? (
                  <img src={preview} alt="Preview" />
                ) : (
                  <video autoPlay loop muted>
                    <source src={preview} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}

            <div className="caption">
              <label>Caption:</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Add a caption..."
                required
              />
            </div>

            <button className="upload" type="submit">Upload {fileType === "story" ? "Story" : "Post"}</button>
          </form>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default CreatePost;
