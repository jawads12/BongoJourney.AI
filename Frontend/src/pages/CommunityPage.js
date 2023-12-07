import React, { useState } from "react";
import "./CommunityPage.css"; // Create a separate CSS file for styling

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePost = () => {
    if (newPost.trim() || selectedFile) {
      // Add a new post only if there's content or a selected file
      const post = {
        content: newPost.trim(),
        photo: selectedFile,
      };

      setPosts([...posts, post]);
      setNewPost("");
      setSelectedFile(null);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return ( 
    <div className="community-page">
      <h2>Connect and Share: Our Community Hub</h2>

      {/* Form for posting */}
      <div className="post-form">
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <label className="file-label">
          Choose a file
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </label>
        <button onClick={handlePost}>Post</button>
      </div>

      {/* Display posts */}
      <div className="post-container">
        {posts.map((post, index) => (
          <div key={index} className="post">
            {post.content && <p>{post.content}</p>}
            {post.photo && (
              <img
                src={URL.createObjectURL(post.photo)}
                alt="Posted"
                className="post-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
