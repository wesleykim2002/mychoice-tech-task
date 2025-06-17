import React, { useEffect } from 'react';
import api from '../api';
import ItemCard from './ItemCard';

function ItemList({ items, setItems }) {
  useEffect(() => {
    api.get('/Items/')
      .then(res => {
        console.log('Fetched items:', res.data); 
        setItems(res.data);
      })
      .catch(err => {
        console.error('Error fetching items:', err);
      });
  }, [setItems]);

  return (
    <div>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        items.map(item => (
          <ItemCard key={item.id} item={item} onUpdate={(updatedItem) => {
            setItems(prev =>
              prev.map(i => (i.id === updatedItem.id ? updatedItem : i))
            );
          }} />
        ))
      )}
    </div>
  );
}

export default ItemList;
