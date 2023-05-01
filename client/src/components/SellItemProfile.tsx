import React from 'react';
import './Sellitem.css';
import { useState } from 'react';
import { useRef } from 'react';
import { Textarea, Input, Select, Option } from '@material-tailwind/react';
import { PostItemFunction, GetUserItemsFunction } from '../apiService';

interface Props {
  renderProfile2: () => void;
}

const Item: React.FC<Props> = ({ renderProfile2 }) => {
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [condInput, setCondInput] = useState('');
  const [catInput, setCatInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [previewSource, setPreviewSource] = useState(null);

  const inputFile = useRef<HTMLInputElement>();
  const userId = localStorage.getItem('userId');
  const user = localStorage.getItem('user');
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
    uploadImage(previewSource);
  }

  const uploadImage = (base64EncodedImage) => {
    const imageData = {
      img: previewSource,
    };
    // sendImage(imageData);
  };

  const handleUploadBtn = async (e) => {
    e.preventDefault();
    const formItem = {
      img: previewSource,
      title: titleInput,
      desc: descInput,
      price: Number(priceInput),
      condition: condInput,
      category: catInput,
      size: sizeInput,
    };

    await PostItemFunction(formItem);
    await renderProfile2();
    await GetUserItemsFunction();

    setCatInput('');
    setCondInput('');
    setDescInput('');
    setPriceInput('');
    setTitleInput('');
    setSizeInput('');
    setPreviewSource(null);
  };

  return (
    <>
      {previewSource && (
        <img src={previewSource} alt='preview image' className='h-40' />
      )}
      <input ref={inputFile} type='file' name='image' onChange={handleDrop} />
      <form onSubmit={handleSubmitFile}></form>

      <form className='mt-10 flex mb-10'>
        <div className='flex flex-col mr-10 gap-6'>
          <Input
            value={titleInput}
            label='Title'
            className='bg-white  '
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <Textarea
            value={descInput}
            label='Description...'
            className='bg-white '
            onChange={(e) => setDescInput(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex items-baseline'>
            <h1 className='mr-1'>£</h1>
            <Input
              value={priceInput}
              label='Price'
              type='number'
              className='mb-5 bg-white '
              onChange={(e) => setPriceInput(e.target.value)}
            />
          </div>
          <Select
            label='Select Size'
            value={sizeInput}
            className='mb-5 bg-white '
            onChange={(e) => setSizeInput(e)}
          >
            <Option value='S'>S</Option>
            <Option value='M'>M</Option>
            <Option value='L'>L</Option>
            <Option value='XL'>XL</Option>
            <Option value='XXL'>XXL</Option>
            <Option value='0-3YO'>0-3YO</Option>
            <Option value='4-6YO'>4-6YO</Option>
            <Option value='7-9YO'>7-9YO</Option>
            <Option value='10-12YO'>10-12YO</Option>
          </Select>

          <Select
            label='Select Category'
            value={catInput}
            className='mb-5 bg-white '
            onChange={(e) => setCatInput(e)}
          >
            <Option value='Men'>Men</Option>
            <Option value='Women'>Women</Option>
            <Option value='Kids'>Kids</Option>
          </Select>

          <Select
            value={condInput}
            label='Condition'
            className='bg-white'
            onChange={(e) => setCondInput(e)}
          >
            <Option value='New'>New</Option>
            <Option value='Like New'>Like New</Option>
            <Option value='Good'>Good</Option>
            <Option value='Used'>Used</Option>
          </Select>
        </div>
      </form>
      <button
        className='bg-green-900 rounded-lg p-3 px-20 text-white'
        onClick={handleUploadBtn}
      >
        Upload
      </button>
    </>
  );
};

export default Item;
