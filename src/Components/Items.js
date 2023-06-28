import React, { useState } from 'react';
import { ClothingItemService } from '../Service/api';
import { Link } from 'react-router-dom';
import './Items.css';

const Items = () => {
  const [item, setItem] = useState({
    type: '',
    colour: '',
    size: '',
    imageUrl: '',
  });

  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setItem((prevItem) => ({
        ...prevItem,
        imageUrl: event.target.result,
      }));
    };

    reader.onloadend = () => {
      // Clear the selected file after the image is uploaded
      setSelectedFile(null);
    };

    reader.readAsDataURL(file);
    setSelectedFile(file); // Set the selected file in state
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!item.type || !item.colour || !item.size || !item.imageUrl) {
      setError('Please provide all information.');
      return;
    }

    const userId = localStorage.getItem('userId');
    const itemWithUserId = {
      ...item,
      userId: userId,
    };

    ClothingItemService.AddClothingItem(itemWithUserId)
      .then((response) => {
        console.log(response.data);
        setItem({
          type: '',
          colour: '',
          size: '',
          imageUrl: '',
        });

        setError('');
        alert('Item added successfully!');
      })
      .catch((error) => {
        console.error('Error occurred while adding item:', error);
        setError('An error occurred while adding the item. Please try again.');
      });
  };

  return (
    <div className='Items-container'>
      <h2>Add Clothing Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={item.type}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Colour:</label>
          <input
            type="text"
            name="colour"
            value={item.colour}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Size:</label>
          <select name="size" value={item.size} onChange={handleChange}>
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <button type="submit">Add Item</button>
        {error && <p className="error-message">{error}</p>}
        <div className='viewallitems'>
          <Link to="/view-items">View Your Items</Link>
        </div>
      </form>
    </div>
  );
};

export default Items;
