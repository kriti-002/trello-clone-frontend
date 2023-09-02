import React, { useState } from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Modal, Alert, Typography} from '@mui/material'
import axios from 'axios'

function CreateTask() {
  const [open, setOpen] = useState(false);
  const [title, setTitle]= useState('')
  const [body, setBody]= useState('')
  const [category, setCategory]= useState('')

  const handleSubmit= async (event)=>{
        event.preventDefault();
        console.log('Submitted', title, body, category)
        try{
          await axios.post("http://localhost:8081/api/create",{title, body,category});
          console.log("New Note Created");
          setOpen(false)
          window.location.reload()
        }catch(error){
          console.log(error);
        }
    }

  const content = (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', bgcolor: 'background.paper', border: '1px solid #000', p: 3 }}>
      <Box>
      <Typography variant="h4" gutterBottom>
        Create Task
      </Typography>
      <Alert severity="info">
      Good news! We have markdown rendering enabled in the body section.
    </Alert>
        <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        fullWidth
        multiline
        rows={5}
        margin="normal"
        required
        
      />
      <FormControl fullWidth>
        <InputLabel>Select a Category</InputLabel>
        <Select
          value={category}
          onChange={(e)=>{setCategory(e.target.value)}}
          label="Select an option"
          margin="normal"
          required
        >
          <MenuItem value="todo">To-do</MenuItem>
          <MenuItem value="doing">Doing</MenuItem>
        </Select>
      </FormControl>
        <Button type="submit" variant="contained" color="primary">
        Create Task
      </Button>
      <Button onClick={()=>setOpen(false)}>Close</Button>
      </form>
        </Box> 
    </Box>
  );

  return (
    <>
      <Button onClick={()=>setOpen(true)} color="inherit">
        Create Task
      </Button>
      <Modal
        open={open}
        onClose={()=> setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {content}
      </Modal>
    </>
  );
}

export default CreateTask;
