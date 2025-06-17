import React, { useState } from 'react';
import { Card, CardContent, FormControl, MenuItem, InputLabel, Typography, Collapse, Select, TextField, Button } from '@mui/material';

import api from '../api';

function ItemCard({ item, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleExpand = (e) => {
    setExpanded(prev => !prev);
    const res = api.get('/Items/'+item.id+'/')
  }

  const handleChangeGroup = (e) => {
    setEditedItem({ ...editedItem, group: e.target.value });
  };

  const handleSave = () => {
    onUpdate(editedItem);
    api.put('/Items/'+editedItem.id+'/', editedItem).then(res => {
    });
    setExpanded(false);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent onClick={handleExpand} sx={{ cursor: 'pointer' }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="subtitle2">{item.group}</Typography>
      </CardContent>
      <Collapse in={expanded}>
        <CardContent>
        <Typography variant="subtitle2">Time Created: {item.created_at}</Typography>
        <Typography variant="subtitle2">Last Updated: {item.updated_at}</Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={editedItem.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{mb:2}}>
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              labelId="group-select-label"
              id="group-select"
              value={editedItem.group}
              label="Group"
              onChange={handleChangeGroup}
            >
              <MenuItem value={"Primary"}>Primary</MenuItem>
              <MenuItem value={"Secondary"}>Secondary</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ItemCard;
