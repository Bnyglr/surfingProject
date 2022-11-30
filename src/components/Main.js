import React from 'react'
import { VStack, IconButton, Box, Heading, useColorMode, flexbox, Editable, } from '@chakra-ui/react';
import { FaSun, FaMoon, FaRegEdit, FaEye } from "react-icons/fa";
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { useState, useEffect } from 'react';

function Main() {
    const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
    const [editMode, setEditMode]=useState(false)
    
      useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);
    
    const handleEditMode=()=>{
      setEditMode(!editMode)
    }
    
      function deleteTodo(id) {
        const newTodos = todos.filter((todo) => {
          return todo.id !== id;
        });
    
        setTodos(newTodos);
      }
    
      function addTodo(todo) {
        setTodos([...todos, todo]);
      }
    
      const {colorMode, toggleColorMode} = useColorMode();
      
      return (
        <VStack p='4'>
          <div style={{display:"flex",}}>
    
          <IconButton icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} isRound='true' size='lg' alignSelf='flex-end' onClick={toggleColorMode} />
          <IconButton onClick={handleEditMode} icon={editMode?<FaEye /> : <FaRegEdit />} isRound='true' size='lg' alignSelf='flex-end'  />
          </div>
          <Box>
            <Heading mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, cyan.400, purple.400, pink.400)' bgClip='text'>Surfing Site</Heading>
          </Box>
          {editMode?<AddTodo addTodo={addTodo} />:null
          
        }
        <TodoList editMode={editMode}todos={todos} deleteTodo={deleteTodo} />
    
        </VStack>
      );
}


export default Main;
