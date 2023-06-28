import React, { useEffect, useState } from 'react';
import { ClothingItemService, OutfitService } from '../Service/api';
import './Outfit.css';

const Outfits = () => {
  
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [outfitName, setOutfitName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const ids = searchParams.get('selectedIds');
    if (ids) {
      const selectedIdsArray = ids.split(',');
      setSelectedItemIds(selectedIdsArray);
    }
  }, []);

  useEffect(() => {
    if (selectedItemIds.length > 0) {
      Promise.all(
        selectedItemIds.map((itemId) => ClothingItemService.GetById(itemId))
      )
        .then((responses) => {
          const fetchedItems = responses.map((response) => response.data);
          setSelectedItems(fetchedItems);
          setError('');
        })
        .catch((error) => {
          console.error('Error occurred while fetching selected items:', error);
          setError('An error occurred while fetching the selected items. Please try again.');
        });
    }
  }, [selectedItemIds]);

  useEffect(() => {
    fetchOutfits();
  }, []);

  const fetchOutfits = () => {
    const userId = localStorage.getItem('userId');
    OutfitService.GetOutfitsByUserId(userId)
    .then((response) => {
      setOutfits(response.data);
      console.log(response.data);
      setError('');
    })
    .catch((error) => {
      console.error('Error occurred while fetching outfits:', error);
      setError('No Outfits have been created.');
    });
  };

  const handleCreateOutfit = () => {
    const outfit = {
      outfitName: outfitName,
      Item1: selectedItems.length >= 1 ? selectedItems[0].imageUrl : '',
      Item2: selectedItems.length >= 2 ? selectedItems[1].imageUrl : '',
      UserId: localStorage.getItem('userId'),
    };

    OutfitService.CreateOutfit(outfit)
      .then((response) => {
        setOutfitName('');
        setSelectedItemIds([]);
        setSelectedItems([]);
        fetchOutfits();
        console.log(response.data);

      })
      .catch((error) => {
        console.error('Error occurred while creating outfit:', error);
        setError('An error occurred while creating the outfit. Please try again.');
      });
  };
  const handleDeleteOutfit = (outfitId) => {
    // Call your API or service to delete the outfit with the given outfitId
    OutfitService.DeleteOutfit(outfitId)
      .then(() => {
        // Update the outfits state by removing the deleted outfit
        setOutfits((prevOutfits) =>
          prevOutfits.filter((outfit) => outfit.outfitId !== outfitId)
        );
      })
      .catch((error) => {
        console.error('Error occurred while deleting outfit:', error);
        setError('An error occurred while deleting the outfit. Please try again.');
      });
  };
  

  return (
    <div className="outfits-container">
      <h2>Selected Items</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="outfit-grid">
        {selectedItems.length === 0 ? (
          <p>No selected items found.</p>
        ) : (
          selectedItems.map((item) => (
            <div key={item.id} className="outfit-item">
              <img src={item.imageUrl} alt={item.type} />
            </div>
          ))
        )}
      </div>
      <div className="info">
        <label htmlFor="outfitName">Outfit Name:</label>
        <input
          type="text"
          id="outfitName"
          value={outfitName}
          onChange={(e) => setOutfitName(e.target.value)}
        />
        <div className="save">
          <button onClick={handleCreateOutfit}>Save</button>
        </div>
      </div>
      <h3>All Outfits</h3>
      {outfits.length === 0 ? (
        <p>No outfits found.</p>
      ) : (
        <div className="outfit-list">
          {outfits.map((outfit, index) => (
            <div key={outfit.outfitId || index} className="outfit-card">
              <h4>{outfit.outfitName}</h4>
              <img src={outfit.item1} alt="Item 1" />
              <img src={outfit.item2} alt="Item 2" />
              <div className='delete-fit'>
              <button onClick={() => handleDeleteOutfit(outfit.outfitId)}>
              Delete
            </button>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default Outfits;
