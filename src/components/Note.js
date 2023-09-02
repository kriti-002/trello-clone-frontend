import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import EditTask from './EditTask'
import axios from 'axios'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Note = (props) => {
  async function handleDelete(id){
    const sure = window.confirm("Do you really want to delete this note?")
    if(sure){
      try {
        const resp=await axios.delete(`/api/delete/${id}`)
        if(resp.status=== 200) window.location.reload()
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <Card elevation={3} xs={12}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <ReactMarkdown children={props.body} allowedElements={["p", "br", "strong", "em", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li"]} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <EditTask title={props.title} body={props.body} id={props.id} />
          </Grid>
          <Grid item xs={6}> 
          <Button variant='contained' color='error' onClick={()=> handleDelete(props.id)} startIcon={<DeleteForeverIcon/>}>Delete Task</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>  
    </>
  )
}

export default Note