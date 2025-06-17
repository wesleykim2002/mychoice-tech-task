import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Fab, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import api from '../api';

function CreateItemDialog({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', group: '' });

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleChangeGroup = (e) => {
    setNewItem({ ...newItem, group: e.target.value });
  };

  const handleSubmit = () => {
    api.post('/Items/', newItem).then(res => {
      onCreate(res.data);
      setOpen(false);
      setNewItem({ name: '', group: '' });
    })
    .catch(err => {
      console.error("Failed to create item:", err.response?.data || err.message);
      alert("Failed to create item. Please check your input or try again.");
    });
  };

  return (
    <>
      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 20, right: 20 }} 
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ mb: 2 }}>Create New Item</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{mb:2}}>
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              value={newItem.group}
              label="Group"
              onChange={handleChangeGroup}
            >
              <MenuItem value={"Primary"}>Primary</MenuItem>
              <MenuItem value={"Secondary"}>Secondary</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateItemDialog;
