import React from 'react';
import {IconButton, Badge} from '@chakra-ui/react';
import { FaTrash } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import "./ArticleList.css";
import ArticlePara from './ArticlePara';
import { useState } from 'react';


const ArticlesList = ({editMode,articles, deleteArticle}) => {

  const [paraOpen, setParaOpen] = useState(false);
  // articles.forEach(element => {
  //   element.isOpen = false;
  // });

  console.log(articles);
  if(!articles.length) {
    return(
      <Badge colorScheme='cyan' p='4' borderRadius='lg'>
        No Todos, yay!!!
      </Badge>
    );
  }
  
  return (
    <div className='TheList'>
    {/* <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))' > */}
      {articles.map(article => (
        <div className='card' style={{width: "18rem"}}>
          {article.image?<img src={article.image} alt="" />:null}
        <div className='card-body'>
          <div style={{display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
            <h5 className='card-title'>{article.title}</h5>
            {editMode?<IconButton icon={<FaTrash />} isRound='true' onClick={() => deleteArticle(article._id)} />:null}
            {!editMode && <IconButton icon={<IoOpenOutline />} isRound='true' onClick={() => setParaOpen(!paraOpen)} />}
            
          </div>
          
          <p className='card-text'>{article.text}</p>
           {paraOpen && <ArticlePara para={article.paragraphText} />}
         
        </div>
      </div>
      ))}
    {/* </SimpleGrid> */}
    </div>
  );
}

export default ArticlesList;



// {/* <VStack divider={<StackDivider />} borderWidth='2px' borderColor='gray.100' borderRadius='lg' padding='4' w='100%' maxW={{base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw'}} alignItems='stretch'>
//       {articles.map(article => (
//         <div key={article._id}>
//           <Text>{article.title}</Text>
//           <Spacer />
//           {editMode?<IconButton icon={<FaTrash />} isRound='true' onClick={() => deleteArticle(article._id)} />:null}
//         </div>
//       ))}
//     </VStack> */}


    // With supporting text below as a natural lead-in to additional content.