import React, { useState } from 'react';
import { HStack, Input, Button, useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';

const AddTodo = ({addTodo}) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const toast = useToast();
  
  function handleSubmit(e) {
    e.preventDefault();

    if(!content || !title) {
      toast({
        title: 'No content or title',
        status: 'error',
        duration: 2000,
        isClosable: true
      });

      return;
    }

    const article = {
      id: nanoid(),
      body: content
    };

    addTodo(article);
    setContent('');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <HStack mt='8'>
        <Input variant='filled' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input variant='filled' placeholder='Enter your thought' value={content} onChange={(e) => setContent(e.target.value)} />
        <Button type='submit' colorScheme='cyan' px='8'>Publish yor paragraph</Button>
      </HStack>
    </form>
  );
}

export default AddTodo;
