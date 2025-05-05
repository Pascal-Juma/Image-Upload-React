import { useState } from "react"
import Axios from "axios"

function App() {
  const [imageSeleted, setImageSelected] = useState("");
  const uploadImage = () => {
    const formData = new FormData();
    formData = new formData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "");

    Axios.post("https://api.cloudinary.com/v1_1//image/upload",
      formData
    ).then((response) => {
      console.log(response);
    });
  }
  return (
    <div>
      <input
      type="file"
      onChange={(event) =>{
        setImageSelected(event.target.files[0]);
      }}
      />
      <button type="button" onClick={uploadImage}>Upload Image</button>
    </div>
  )
}

export default App
