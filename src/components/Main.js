import React from 'react'
import { IconButton, Box, Heading, useColorMode } from '@chakra-ui/react';
import { FaSun, FaMoon, FaRegEdit, FaEye, CiLogout } from "react-icons/fa";
import ArticlesList from './ArticlesList';
import AddArticle from './AddArticle';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Main() {
    const [change, setChange] = useState(false);
    const [articles, setArticles] = useState([]);
    //                                      ^
    //() => JSON.parse(localStorage.getItem('articles')) || []

    const [editMode, setEditMode]=useState(false)
    const MyTrue = true;
    
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
  
       
      }, [change]);
    
    const handleEditMode=()=>{
      setEditMode(!editMode)
    }
    
    async function deleteArticle(_id) {
        try {
          const response = await axios.post(
            "http://localhost:3001/api/articles/del",
            {
              _id:_id
            },
            {
              headers: {
                Authorization:`bearer ${localStorage.token}`
              }
            }
            );
            // localStorage.setItem('articles', JSON.stringify(articles));
            console.log("here");
          if(response.data){
            setChange(!change);
          }
          console.log(response.data)
        } catch (e) {
          console.log(e);
        }
    
      }
    
      function editArticle(article) {
        setArticles([...articles, article]);
      }

      async function createArticle(title,description,content,image){
        console.log('title: ', title);
        try{
          const response = await axios.post(
            "http://localhost:3001/api/articles/new",
            {
              title: title,
              text: description,
              image: image,
              paragraphText: content
            },{
              headers: {
                Authorization:`bearer ${localStorage.token}`
              },
            }
          );
          if(response.data){
            setChange(!change);
          }
          console.log(response.data);
        }catch(error){

        }
      }



    
      const {colorMode, toggleColorMode} = useColorMode();
      
      return (
        <div className='mainContainer' style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
          <div style={{height:"250px", display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex"}}>
              <IconButton icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} isRound='true' size='lg'  onClick={toggleColorMode} />
              <IconButton onClick={handleEditMode} icon={editMode?<FaEye /> : <FaRegEdit />} isRound='true' size='lg'  />
            </div>
            <Box>
              <Heading mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, cyan.400, purple.400, pink.400)' bgClip='text'>Surfing Site</Heading>
            </Box>
          </div>
          
          
          {editMode?<AddArticle createArticle={createArticle} editArticle={editArticle} />:null}
          <br/>
          <ArticlesList editMode={editMode} articles={articles} deleteArticle={deleteArticle} />
    
        </div>
      );
}


export default Main;



//VStack p='4'