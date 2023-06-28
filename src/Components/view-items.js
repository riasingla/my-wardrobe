import React, { useState, useEffect } from 'react';
import { ClothingItemService } from '../Service/api';
import { useNavigate } from 'react-router-dom';
import './view-items.css';

const ViewItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    ClothingItemService.GetItemsByUserId(userId)
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
        setError('');
      })
      .catch((error) => {
        console.error('Error occurred while fetching items:', error);
        setError('An error occurred while fetching the items. Please try again.');
      });
  }, []);

  const handleDeleteItem = (id) => {
    ClothingItemService.DeleteClothingItem(id)
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setError('');
      })
      .catch((error) => {
        console.error('Error occurred while deleting item:', error);
        setError('An error occurred while deleting the item. Please try again.');
      });
  };

  const handleSelectItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    }
  };

  const handleOutfit = () => {
    const selectedIds = selectedItems.map((item) => item.id).join(',');
    navigate(`/Outfits?selectedIds=${selectedIds}`);
  };

  return (
    <div className="ViewItems-container">
      <h2>View Items</h2>
      {error && <p className="error-message">{error}</p>}
      {items.length === 0 ? (
        <p>No items uploaded.</p>
      ) : (
        <div className="item-list">
          {items.map((item) => (
            <div className="item-card" key={item.id}>
              <img src={item.imageUrl} alt={item.type} />
              <p>Type: {item.type}</p>
              <p>Color: {item.colour}</p>
              <p>Size: {item.size}</p>
              <button className="select-button" onClick={() => handleSelectItem(item)}>
                {selectedItems.includes(item) ? 'Deselect' : 'Select'}
              </button>
              <button className="delete-button" onClick={() => handleDeleteItem(item.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedItems.length > 0 && (
        <div className="cart">
          <button className="create-outfit-button" onClick={handleOutfit}>
            Create Outfit
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewItems;
