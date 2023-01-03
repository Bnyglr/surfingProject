import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticlesList from './ArticlesList';
import AddArticle from './AddArticle';
import "./Main.css";
import { IconButton, Box, Heading } from '@chakra-ui/react';
import { FaSun, FaMoon, FaRegEdit, FaEye, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";


const Main =({setIsLogged}) => {
    const [change, setChange] = useState(false);
    const [articlesState, setArticlesState] = useState(false);
    const [articles, setArticles] = useState([]);
    const [editMode, setEditMode]=useState(false)
    const [backMode, setBackMode]=useState(true)
    const [wholeParaMode, setWholeParaMode]=useState(true)
    
    
    useEffect(() => {if(!articlesState){


        const fetchArticles = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3001/api/users/getAllUserArticles",
              {
                headers: {
                  Authorization:`bearer ${localStorage.token}`
                }
              });
              // localStorage.setItem('articles', JSON.stringify(articles));
              setArticles(response.data);
            console.log(response.data)
          } catch (e) {
            console.log(e);
          }
        }
        fetchArticles();
      }else{
        const fetchArticles = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3001/api/articles/",
              {
                headers: {
                  Authorization:`bearer ${localStorage.token}`
                }
              });
              setArticles(response.data);
              if(response.data){
            }
            console.log(response.data)
          } catch (e) {
            console.log(e);
          }
        }
        fetchArticles();
      }
   
    }, [change, articlesState]);
    



    const handleEditMode=()=>{
      if(!articlesState){
      setEditMode(!editMode);}
    }
    
    const handleBackMode=()=>{
      setBackMode(!backMode)
    }

    const getWholeArticles =() => {
        setWholeParaMode(!wholeParaMode);
        setArticlesState(!articlesState);
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
        


    function editArticle(article) {
        setArticles([...articles, article]);
    }
    
      const SignOut =()=> {
        
        setIsLogged(localStorage.token = "");
      }

      
      return (
        <div className='mainContainer' style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
          <div style={{height:"250px", display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex"}}>
              <IconButton onClick={handleBackMode} icon={backMode?<FaSun /> : <FaMoon />} isRound='true' size='lg'  />
              <IconButton onClick={handleEditMode} icon={editMode?<FaEye /> : <FaRegEdit />} isRound='true' size='lg'  />
              <IconButton onClick={getWholeArticles} icon={wholeParaMode?<FaUserAlt /> : <IoIosPeople />} isRound='true' size='lg'  />
              <IconButton onClick={SignOut} icon={<FaSignOutAlt />} isRound='true' size='lg' />
            </div>
            <Box>
              <Heading mb='8' fontWeight='extrabold' size='2xl' bgGradient='linear(to-r, cyan.400, purple.400, pink.400)' bgClip='text'>Surfing Site</Heading>
              <iframe src='https://www.israelweather.co.il/upload/weekly16.html' title='Wheter' ></iframe>
            </Box>
          </div>
          
          
          {editMode?<AddArticle createArticle={createArticle} editArticle={editArticle}/>:null}
          <br/>
          <ArticlesList editMode={editMode} articles={articles} deleteArticle={deleteArticle} />
    
        </div>
      );
    }


    export default Main;
    
    

    

    