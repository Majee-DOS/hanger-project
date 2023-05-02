import React from 'react';
import './Sellitem.css';
import { useState } from 'react';
import { useRef } from 'react';
import { Textarea, Input, Select, Option } from '@material-tailwind/react';
import { PostItemFunction } from '../apiService';

const Item: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [priceInput, setPriceInput] = useState(0);
  const [condInput, setCondInput] = useState('');
  const [catInput, setCatInput] = useState('');
  const [sizeInput, setSizeInput] = useState('');
  const [previewSource, setPreviewSource] = useState(null);
  //Temporarily store image in string form
  const [stringImage, setStringImage] = useState('');
  const [cloudImg, setCloudImg] = useState('');

  const inputFile = useRef<HTMLInputElement>();
  const userId = localStorage.getItem('userId');

  function handleDrop(e) {
    e.preventDefault();
    const baseImg = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(baseImg);
    reader.onloadend = () => {
      setCloudImg(reader.result.toString());
    }
  }

  const handleUploadBtn = async (e) => {
    e.preventDefault();
    const formItem = {
      img: cloudImg,
      title: titleInput,
      desc: descInput,
      price: Number(priceInput),
      condition: condInput,
      category: catInput,
      size: sizeInput,
    };

    console.log(formItem);
    await PostItemFunction(formItem);

    setCatInput('');
    setCondInput('');
    setDescInput('');
    setPriceInput(0);
    setTitleInput('');
    setSizeInput('');
    setPreviewSource(null);
    setStringImage('');
  };

  return (
    <>
      {previewSource && (
        <img src={previewSource} alt='preview image' className='h-40' />
      )}
      <input ref={inputFile} type='file' name='image' onChange={handleDrop} />
      <form className='mt-10 flex mb-10'>
        <div className='flex flex-col mr-10 gap-6'>
          <Input
            value={titleInput}
            label='Title'
            className='bg-white  '
            onChange={(e) => setTitleInput(e.target.value)}
            onResize={undefined}
            onResizeCapture={undefined}
          />
          <Input
            value={stringImage}
            label='Image'
            className='bg-white  '
            onChange={(e) => setStringImage(e.target.value)}
            onResize={undefined}
            onResizeCapture={undefined}
          />
          {/* <Input
            value={priceInput}
            label='Price'
            className='bg-white  '
            onChange={(e) => setPriceInput(Number(e.target.value))}
          /> */}
          <Textarea
            value={descInput}
            label='Description...'
            className='bg-white '
            onChange={(e) => setDescInput(e.target.value)}
            onResize={undefined}
            onResizeCapture={undefined}
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
              onChange={(e) => setPriceInput(parseInt(e.target.value))}
              onResize={undefined}
              onResizeCapture={undefined}
            />
          </div>
          <Select
            label='Select Size'
            value={sizeInput}
            className='mb-5 bg-white '
            onChange={(e) => setSizeInput(e)}
            onResize={undefined}
            onResizeCapture={undefined}
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
            onResize={undefined}
            onResizeCapture={undefined}
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
            onResize={undefined}
            onResizeCapture={undefined}
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
