import React from "react";
import "./Sellitem.css";
import { useState } from "react";
import { useRef } from "react";
import { Textarea, Input } from "@material-tailwind/react";
import { addItem } from "../apiService";
import { sendImage } from "../apiService";

const Item: React.FC = () => {
  const [imgInput, setImgInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [condInput, setCondInput] = useState("");
  const [catInput, setCatInput] = useState("");
  const [previewSource, setPreviewSource] = useState(null);

  const inputFile = useRef<HTMLInputElement>();
const userId = localStorage.getItem("userId");
  function handleDrop(e) {
    e.preventDefault();
    const file = e.target.files[0];
    
    previewFile(file);
    if (inputFile.current) {
      inputFile.current.click();
    }
  }
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  function handleSubmitFile(e) {
   
    e.preventDefault();
    uploadImage(previewSource)
  }

  const uploadImage = (base64EncodedImage) => {

    const imageData = {
      img: previewSource
    }
    sendImage(imageData);
  };

  const handleUploadBtn = async (e) => {
    e.preventDefault();
    const formItem = {
     img: previewSource,
      title: titleInput,
      desc: descInput,
      price: priceInput,
      condition: condInput,
      category: catInput,
    };
    addItem(formItem, userId );
console.log(formItem)
    // setCatInput("");
    // setCondInput("");
    // setDescInput("");
    // setPriceInput("");
    // setTitleInput("");
    // setPreviewSource(null)
  };

  return (
    <>
    
      {previewSource && (
        <img src={previewSource} alt="preview image" className="h-40" />
      )}
      <input ref={inputFile} type="file" name="image" onChange={handleDrop} />
      <form onSubmit={handleSubmitFile}>
      </form>

      <form className="mt-10 flex mb-10">
        <div className="flex flex-col mr-10 gap-6">
          <Input
            value={titleInput}
            label="Title"
            className="bg-white  "
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <Textarea
            value={descInput}
            label="Description..."
            className="bg-white "
            onChange={(e) => setDescInput(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-6">
          <Input
            value={priceInput}
            label="Price"
            className="mb-5 bg-white "
            onChange={(e) => setPriceInput(e.target.value)}
          />
          <Input
            value={catInput}
            label="Category"
            className="mb-5 bg-white "
            onChange={(e) => setCatInput(e.target.value)}
          />

          <Input
            value={condInput}
            label="Condition"
            className="bg-white"
            onChange={(e) => setCondInput(e.target.value)}
          />
        </div>
      </form>
      <button
        className="bg-green-900 rounded-lg p-3 px-20 text-white"
        onClick={handleUploadBtn}
      >
        Upload
      </button>
    </>
  );
};

export default Item;



 // const formData = new FormData()
    // formData.append('file', test )
    // formData.append('upload_preset', "dev_setups")
    // // if (!previewSource) return;
    // uploadImage(previewSource);
    //     fetch("https://api.cloudinary.com/v1_1/yourCloudName/image/upload", {
    //       method: "POST",
    //       body: JSON.stringify(formData),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error(response.statusText);
    //         }
    //         return response.json<T>();
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
          