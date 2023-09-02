import React, { useState } from 'react';
import {Box, Button, TextField, Modal, Alert, Typography} from '@mui/material'
import axios from 'axios'
import EditNoteIcon from '@mui/icons-material/EditNote';

function EditTask(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle]= useState(props.title)
  const [body, setBody]= useState(props.body)

  const handleSubmit= async (event)=>{
      event.preventDefault();
        try{
          await axios.post(`http://localhost:8081/api/update/${props.id}`,{title, body});
          console.log("Note Updated");
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
        Edit Task
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
      
        <Button type="submit" variant="contained" color="primary">
        Edit Task
      </Button>
      <Button onClick={()=>setOpen(false)}>Close</Button>
      </form>
        </Box>
      
    </Box>
  );

  return (
    <>
      <Button onClick={()=>setOpen(true)} variant='contained' color='secondary' startIcon={<EditNoteIcon/>}>
        Edit Task
      </Button>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {content}
      </Modal>
    </>
  );
}

export default EditTask;
