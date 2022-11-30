import React from 'react'
import { VStack, IconButton, Box, Heading, useColorMode, flexbox, Editable, } from '@chakra-ui/react';
import { FaSun, FaMoon, FaRegEdit, FaEye } from "react-icons/fa";
import ArticlesList from './ArticlesList';
import AddTodo from './AddTodo';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {
    const [articles, setArticles] = useState(() => JSON.parse(localStorage.getItem('articles')) || []);
    const [editMode, setEditMode]=useState(false)
    
      useEffect(() => {
        const fetchArticles = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3001/api/users/getAllUserArticles",
              {
                headers: {
                  Authorization:`bearer ${localStorage.token}`
                }
              }
              );
              // localStorage.setItem('articles', JSON.stringify(articles));
              setArticles(response.data);
            console.log(response.data)
          } catch (e) {
            console.log(e);
          }
        }
        fetchArticles();
  
       
      }, []);
    
    const handleEditMode=()=>{
      setEditMode(!editMode)
    }
    
    async function deleteArticle(id) {
        try {
          const response = await axios.get(
            "http://localhost:3001/api/articles/del",
            {
              headers: {
                Authorization:`bearer ${localStorage.token}`
              }
            }
            );
            // localStorage.setItem('articles', JSON.stringify(articles));
            setArticles(response.data);
          console.log(response.data)
        } catch (e) {
          console.log(e);
        }
    
      }
    
      function addTodo(todo) {
        setArticles([...articles, todo]);
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
        <ArticlesList editMode={editMode} articles={articles} deleteArticle={deleteArticle} />
    
        </VStack>
      );
}


export default Main;
