import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';
import DeleteIcone from './assets/trash.png'
import EditIcon from './assets/edit.png'


function App() {

  const [todos, setTodos] = useState([]);
  const [oldTodo, setOldTodo] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newTodos, setNewTodos] = useState("");

  const BASE_URL='https://todo-app-server-zw8e.onrender.com/';

  const LoadTodos = async () => {
  console.log("Server Loading...");

  const response = await axios.get(`${BASE_URL}/todos`);

  setTodos(response.data.data);
}

const AddTodos = async () =>{
  const response = await axios.post(`${BASE_URL}/todos`, {todoItem: newTodos});
  setNewTodos("");
  LoadTodos();
};

const UpdateTodo = async () => {
  const response = await axios.put(`${BASE_URL}/todos`, {oldTodoItem: oldTodo, newTodoItem: newTodos});
  setEditMode(false);
  setNewTodos("");
  LoadTodos();
}

const DeleteTodo = async (todoItem) => {
  const response = await axios.delete(`${BASE_URL}/todos`, {data: {todoItem}});
  LoadTodos();
};

  useEffect(() => {
    LoadTodos();
  }, [])

  return (
    <div>
      <h1>TODO</h1>
      <h3>{editMode ? "Edit Task" : "Add Task"}</h3>
      <div>
      {
        todos.map((todo, index) => {
          return (
            <div key={index} className='task-container'>
              <p>{todo}</p>

              <div>
              <img src={EditIcon} className='editIcon' 
              onClick={() => {
                setEditMode(true);
                setOldTodo(todo);
                setNewTodos(todo);
              }}
              />
              <img src={DeleteIcone} className='deleteIcon' 
              onClick={() => {
                DeleteTodo(todo)
              }}
              />
              </div>
            </div>
          )
        })
      }
      </div>

      <div className='task-add-container'>
        <input type="text" placeholder='Enter the Tasks' className='input' 
        value={newTodos}
        onChange={(e) => {
          setNewTodos(e.target.value)
        }}
        />
        <button className='btn'
        onClick={() => {
          if(editMode){
            UpdateTodo();
          }else{
            AddTodos();
          }
        }}
        >
        {editMode ? "Update Task" : "Add Task"}
        </button>
        </div>
    </div>
  )
}

export default App
