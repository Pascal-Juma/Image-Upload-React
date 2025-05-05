import { useState } from "react";
import Axios from "axios";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import "./App.css";

function App() {
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const uploadImage = () => {
    const formData = new FormData();
    if (imageSelected) {
      formData.append("file", imageSelected);
    }
    formData.append("upload_preset", "ajp9cgop");

    Axios.post(
      "https://api.cloudinary.com/v1_1/do89liaoq/image/upload",
      formData
    ).then((response) => {
      setPublicId(response.data.public_id);
    });
  };
  const cld = new Cloudinary({
    cloud: {
      cloudName: "do89liaoq",
    },
  });

  let myImage = null;
  if (publicId) {
    myImage = cld.image(publicId);
    myImage.resize(fill().width(300).height(300));
  }
  return (
    <>
      <div className="section">
        <label htmlFor="fileInput">Upload File:</label>
        <input
          id="fileInput"
          type="file"
          title="Choose a file to upload"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageSelected(e.target.files[0]);
            }
          }}
        />
        <button type="button" onClick={uploadImage}>
          Upload Image
        </button>
      </div>
      {myImage && (
        <div className="image">
          <AdvancedImage cldImg={myImage} />
        </div>
      )}
    </>
  );
}

export default App;
