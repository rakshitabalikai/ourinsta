import React, { useState,useEffect } from "react";
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

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      setUser(parsedUser);
    }
  }, []);
  // Handle file input and convert to base64 for preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Convert the file to base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        setPreview(reader.result); // Set base64 preview
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    }
  };

  // Convert file to base64 for submission
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Reset messages
    setErrorMessage("");

    if (file && caption && fileType) {
      try {
        const base64File = await convertToBase64(file); // Convert file to base64

        const formData = {
          user_id:user.id,
          file: base64File,
          caption,
          type: fileType, // Either 'story' or 'post'
        };
        console.log(formData);
        // Select API based on fileType
        const apiUrl = fileType === "story"
          ? "http://localhost:5038/api/social_media/uploadstory"
          : "http://localhost:5038/api/social_media/uploadpost";

        // Make API request
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
    } else {
      setErrorMessage("Please select a file, add a caption, and choose a type.");
    }
  };

  return (
    <div className="create-post-container">
      <Nav />
      <div>
        <div>
          <h2>Create a Post or Story</h2>

          {/* Buttons to choose between story and post */}
          <div>
            <button onClick={() => setFileType("story")} className="createpostbutton">Upload Story</button>
            <button onClick={() => setFileType("post")}className="createpostbutton">Upload Post</button>
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

              {/* Caption input */}
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

              {/* Submit button */}
              <button className="upload" type="submit">Upload {fileType === "story" ? "Story" : "Post"}</button>
            </form>
          )}

          {/* Display success or error message */}
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
