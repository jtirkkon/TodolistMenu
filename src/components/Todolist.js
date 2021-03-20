import React, { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function Todolist() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState([]);
 
  const gridRef = useRef();

  const addTodo = () => {
    setTodos([...todos, {description: todo.description, date: date.toString().slice(0, 15), priority: todo.priority}]);
    setTodo({description: '', date: '', priority: ''});
    setDate(new Date());
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter(( todo, index) =>  index !== gridRef.current.getSelectedNodes()[0].childIndex))
    } else {
      alert('Select row first');
    }
  }

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const handleDateChange = (date) => {
    setDate(date);
  }

  const columns = [
    { headerName: "Description", field: "description", sortable: true, filter: true, floatingFilter: true},
    { headerName: "Date", field: "date", filter: true, sortable: true, floatingFilter: true},
    { headerName: "Priority", field :"priority", filter: true, sortable: true, floatingFilter: true,
      cellStyle: params => (params.value ===  "High" || params.value ===  "high")  ? {color: 'red'} : {color:'black'},
    }
  ]
  
  return (  
    <div className="App">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={date} onChange={date => handleDateChange(date)} style={{marginTop: 20}}/>
      </MuiPickersUtilsProvider>
      <TextField name="description" label="Description" onChange={inputChanged} value={todo.description} 
      style={{marginLeft: 50, marginRight: 50}}/>
      <TextField name="priority" label="Priority" onChange={inputChanged} value={todo.priority} 
      style={{marginLeft: 50, marginRight: 50}}/>
      
      <Button onClick={addTodo} variant="contained" color="primary" style={{marginRight: 20}}>Add</Button>
      <Button onClick={deleteTodo} variant="contained" color="secondary">Delete</Button>
      <div className="ag-theme-material" style={{height:'700px', width:'80%', margin:'auto'}}>
        <AgGridReact 
          ref={gridRef} 
          onGridReady={ params =>  gridRef.current= params.api}
          rowSelection="single"
          columnDefs={columns} 
          rowData={todos}
          animateRows={true}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default Todolist;