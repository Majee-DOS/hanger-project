import React from "react";
import "./Sellitem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { Textarea, Input } from "@material-tailwind/react";
import { addItem } from "../apiService";
import { newUser } from "../components/Register";

const Item: React.FC = () => {
  const [dragFile, setDragFile] = useState("Drag & Drop");
  const [dropFile, setDropFile] = useState(null);
  const [imgInput, setImgInput] = useState(null);
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [condInput, setCondInput] = useState("");
  const [catInput, setCatInput] = useState("");

  const inputFile = useRef<HTMLInputElement>();

  function handleDrop(e) {
    e.preventDefault();
    let file;
    file = e.dataTransfer.files[0];
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/png", "image/jpg"];
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();

      fileReader.onload = () => {
        let fileUrl = fileReader.result;
        let img = `<img src=${fileUrl} />`;
        setDropFile(img);
      };
      fileReader.readAsDataURL(file);
    } else {
      alert("This file is not an image");
    }
  }
  function handleDragOver(e) {
    e.preventDefault();
    setDragFile("Drop to Update");
  }
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragFile("Drag & Drop");
  };

  const handleClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleUploadBtn = async (e) => {
    e.preventDefault();
    const formItem = {
      // UID: newUser._id,
      title: titleInput,
      desc: descInput,
      price: priceInput,
      condition: condInput,
      category: catInput,
      
    };
    addItem(formItem);

    console.log(newUser);

    setCatInput("");
    setCondInput("");
    setDescInput("");
    setPriceInput("");
    setTitleInput("");

  };

  return (
    <>
      <div className="h-screen w-screen  blur-sm absolute z-10">
        <div className="bg-green-900 h-screen"></div>
      </div>
      <div className="absolute z-20 mt-20 ml-96 popup bg-orange-100 rounded-xl flex items-center flex-col">
        <div className="container rounded-lg border border-green-200 bg-white h-60 p-5 w-96 mt-10">
          <h3>Upload your File</h3>
          <div
            className="drag-area h-40 w-86  border-dashed active:border border-2 p-10 flex flex-col justify-center items-center "
            onDrop={(e) => handleDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
          >
            {" "}
            {
              <div
                dangerouslySetInnerHTML={{ __html: dropFile }}
                className="absolute z-10 h-40 w-86"
              />
            }
            <FontAwesomeIcon icon={faCloudArrowUp} className="text-3xl" />
            <span>{dragFile}</span>
            <span className="header text-sm">
              {" "}
              or{" "}
              <span
                className="button text-md text-green-900 font-bold hover:cursor-pointer"
                onClick={handleClick}
              >
                browse
              </span>
              <input
                ref={inputFile}
                type="file"
                accept="image/png, image/jpeg"
                hidden
              />
            </span>
            <span className="support text-xs"> Supports: JPG, PNG, JPEG</span>
          </div>
        </div>

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
      </div>
    </>
  );
};

export default Item;
