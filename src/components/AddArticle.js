import React, { useState } from 'react';
import { Input, Button, useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';


const AddArticle = ({createArticle}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const toast = useToast();
  
  function handleSubmit(e) {
    e.preventDefault();
    createArticle(title, description, content, image);
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

  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input variant='filled' placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} px='8' />
        <Input variant='filled' placeholder='Plese put a litle Description' value={description} onChange={(e) => setDescription(e.target.value)} px='8' />
        <Input variant='filled' placeholder='Enter your thought' value={content} onChange={(e) => setContent(e.target.value)} px='8' />
        <Input variant='filled' placeholder='You can also add a picture if you want' value={image} onChange={(e) => setImage(e.target.value)} px='8' />
        <Button type='submit' onClick={handleSubmit} colorScheme='cyan' px='8'>Publish yor paragraph</Button>
      </div>
    </form>
  );
}

export default AddArticle;
