import React, { useState, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Todolist from './components/Todolist';
import './App.css';

function App() {
  const [value, setValue] = useState('one');
  
  const handleChange = (event, value) =>{
    setValue(value);
  };
  
  return (
      <div>
        <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="home" label="HOME"/>
          <Tab value="mytodos" label="MY TODOS"/>
        </Tabs>
        </AppBar>
          {value === 'home' && <div><h2>Hello, welcome to MY TODOS!</h2></div>}
          {value === 'mytodos' && <Todolist />}
      </div>
    );
}

export default App;
