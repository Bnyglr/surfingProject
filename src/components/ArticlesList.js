import React from 'react';
import { VStack, StackDivider, HStack, Text, Spacer, IconButton, Badge } from '@chakra-ui/react';
import { FaTrash } from "react-icons/fa";

const ArticlesList = ({editMode,articles, deleteArticle}) => {
  if(!articles.length) {
    return(
      <Badge colorScheme='cyan' p='4' borderRadius='lg'>
        No Todos, yay!!!
      </Badge>
    );
  }
  
  return (
    <VStack divider={<StackDivider />} borderWidth='2px' borderColor='gray.100' borderRadius='lg' padding='4' w='100%' maxW={{base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw'}} alignItems='stretch'>
      {articles.map(article => (
        <HStack key={article._id}>
          <Text>{article.title}</Text>
          <Spacer />
          {editMode?<IconButton icon={<FaTrash />} isRound='true' onClick={() => deleteArticle(article._id)} />:null}
        </HStack>
      ))}
    </VStack>
  );
}

export default ArticlesList;
