import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Note from '../components/Note'
import { Grid, Paper, Typography } from '@mui/material';

const Home = () => {
  const [tasks, setTasks] = useState({ todo: [], doing: [], done: [] })
  useEffect( () => {
    axios.get('/api/all').then((response)=>{
      const toDoData= response.data.filter((item)=>(item.category=== "todo"))
  const doingData= response.data.filter((item)=>(item.category=== "doing"))
  const doneData= response.data.filter((item)=>(item.category=== "done"))
    setTasks({todo: toDoData, doing: doingData, done: doneData})
    }).catch((e)=>console.log(e))
  }, []);
  

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    // Update the status in the frontend state
    const updatedTasks = { ...tasks };
    const movedTask = updatedTasks[source.droppableId].find(
      (task) => task._id === draggableId
    );

    updatedTasks[source.droppableId] = updatedTasks[
      source.droppableId
    ].filter((task) => task._id !== draggableId);
    updatedTasks[destination.droppableId].splice(
      destination.index,
      0,
      movedTask
    );

    setTasks(updatedTasks);

    axios.post(`/api/update/${draggableId}`, { category: destination.droppableId })
      .then((response) => {
        console.log('Task status updated in the backend', response.data);
      })
      .catch((error) => {
        console.error('Error updating task status in the backend', error);
      });
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Grid container sx={{marginTop: '5%'}} maxWidth="xl">
      <Grid container className="kanban-board">
        {Object.keys(tasks).map((category) => (
          <Grid item sm={4} xs={12} key={category} className="column">
            <Paper style={category==="todo" ? { padding: 30 , backgroundColor: '#FFF979'} : (category==="doing" ? { padding: 30, backgroundColor: 'pink' } : { padding: 30 , backgroundColor: 'lightgreen'})}>
            <Typography variant='h4' align='center' sx={{margin: 2}}>{category==="todo"? "To-Do😥 " : (category==="doing" ? "Doing📝" : "Done✔️")}</Typography>
            <Droppable droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="task-list"
                >
                  {category==="todo" && tasks[category].length===0 && (<Typography variant='h6' align='center'>Yayy! No todos. Do your tasks without distraction.</Typography>)}
                  {category==="doing" && tasks[category].length===0 && (<Typography variant='h6' align='center'>Nothing to do at the moment. Utilize your time!</Typography>)}
                  {category==="done" && tasks[category].length===0 && (<Typography variant='h6' align='center'>Keep Hustling till you complete your tasks!</Typography>)}
                  {tasks[category].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task"
                        >
                          <Note title={task.title} body={task.body} id={task._id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            </Paper>
          </Grid>
          
        ))}
      </Grid>
    </Grid>
    </DragDropContext>
  );
};

export default Home;
