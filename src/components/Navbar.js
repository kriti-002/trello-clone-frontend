import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import CreateTask from './CreateTask'

const Navbar = () => {
  return (
    <>
    <AppBar position="fixed">
      <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trello-Clone
        </Typography>
        <CreateTask/>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar