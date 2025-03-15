import { useState } from "react";
import { storage } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';

function UploadImage() {
    const [imageUpload, setImageUpload] = useState(null);
    const UploadImage = () => {};
    if (imageUpload == null) {
        console.log("Please select an image to upload");
        return;
    }
    const imageRef = ref(storage, `images/${imageUpload.name + v4}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
        alert("Uploaded!");
    });

    return(
        <div>
            <h1>Upload Image</h1>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageUpload(e.target.files[0])}
            />
            <button onClick={UploadImage}>Upload</button>
        </div>
    );
}
export default UploadImage;
