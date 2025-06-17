import './App.css';
import ItemList from './components/ItemList';
import CreateItemDialog from './components/CreateItemDialog';
import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  const handleAdd = (newItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="App">
      <ItemList items={items} setItems={setItems} />
      <CreateItemDialog onCreate={handleAdd} />
    </div>
  );
}

export default App;
