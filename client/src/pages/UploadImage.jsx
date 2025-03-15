import { useState } from "react";
import { storage } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function UploadImage() {
  const [imageUpload, setImageUpload] = useState(null); // For the file to upload
  const [imageUrl, setImageUrl] = useState(""); // For the download URL

  const handleUploadImage = () => {
    if (imageUpload == null) {
      alert("Please select an image to upload");
      return;
    }

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            setImageUrl(downloadURL); // Store the URL in a separate state
            console.log("Download URL:", downloadURL); // Log it for debugging
            alert("Image Uploaded Successfully!");
            setImageUpload(null); // Reset the file input
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            alert("Failed to get image URL");
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        alert("Failed to upload image");
      });
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageUpload(e.target.files[0])}
      />
      <button onClick={handleUploadImage}>Upload</button>

      {/* Display the download URL if available */}
      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image URL:</h3>
          <p>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              {imageUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadImage;