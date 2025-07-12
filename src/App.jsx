import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './conponents/TodoForm'
import TodoItem from './conponents/TodoItem'

function App() {
const [todos,setTodos] = useState([])
const [complete,setComplete] = useState(0)

const addTodo = (todo) => {
    setTodos((prev) => [...prev, todo])
}

const updateTodo = (id,todo)=>{  
  setTodos((prev)=>prev.map((prevTodo)=> (prevTodo.id===id) ? todo : prevTodo) )    
}

const deleteTodo = (id) => {
  setTodos((prev)=>prev.filter((prevTodo)=> prevTodo.id!=id ))                   
}

const toggleMark = (id)=>{
  setTodos((prev)=>prev.map((prevTodo)=>
    (prevTodo.id===id) ? {...prevTodo, mark: !prevTodo.mark} : prevTodo))       
}

useEffect(()=>{
  const todos = JSON.parse(localStorage.getItem("todos"))       
  if(todos && todos.length>0)
       setTodos(todos)
},[])

useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todos))                 
},[todos])

useEffect(()=>{
  const done=todos.filter((todo)=> todo.mark===true);
  setComplete(done.length )        
},[todos])

  return (
  <TodoProvider   value={{todos, addTodo, deleteTodo, updateTodo, toggleMark}} >
 <div className="bg-gray-950 min-h-screen py-8">
                
                <div className="w-full bg-[#172842] border-1 border-gray-700 max-w-2xl mx-auto shadow-md  rounded-2xl  text-blue-100 overflow-hidden">
                    <div className="bg-gray-700 h-20 ">
                     <h1 className="text-2xl  font-bold pt-4 ml-4">Task Management</h1>
                     <h6 className="font-light ml-4">Prioritize and track your workflow efficiently</h6>
                    </div>
                    <div className="mb-4  bg-[#243247] border-1 rounded-2xl border-gray-500 mt-8 mx-4">
                      <div className="mx-4 mt-5 text-gray-400 font-bold">NEW TASK</div>
                      <div className="mx-4 pb-6 mt-1" >
                         <TodoForm />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-y-3 mx-4">

                     {todos.map((todo) => (
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo} />
                          </div>
                      ))}

                    </div>
                    <ul className="mt-4  flex gap-20 justify-center font-bold mb-4">
                       <li>🎯Total Tasks : {todos.length}</li>
                       <li>✅Completed Tasks : {complete} </li>
                       <li>❌Remaining Tasks : {todos.length-complete} </li>
                    </ul>
                    
                </div>
            </div>
  </TodoProvider>
  )
}

export default App


