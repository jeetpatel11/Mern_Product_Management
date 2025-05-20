import { Box, Button, Container, Heading, Input,useToast , useColorModeValue, VStack, Toast } from '@chakra-ui/react';
import React, { use, useState } from 'react';
import { useProductStore } from '../store/product';

function Createpage() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const { createProduct } = useProductStore();
  const toast = useToast();
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const result = await createProduct(newProduct);
    const { success, message } = result;

    if (success) {
      toast({
        title: 'Product Created',
        description: message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setNewProduct({ name: '', price: '', description: '', image: '' });
    } else {
      toast({
        title: 'Failed to Create Product',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  } catch (error) {
    toast({
      title: 'Unexpected Error',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
};


  return (
    <Container maxW={'1200px'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'3xl'} mb={8} textAlign={'center'}>
          Create New Product
        </Heading>
        <Box
          w={'40%'}
          bg={useColorModeValue('white', 'gray.800')}
          p={8}
          boxShadow={'2xl'}
          rounded={'lg'}
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                placeholder='Product Price'
                name='price'
                type='number'
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Input
                placeholder='Product Description'
                name='description'
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
              <Input
                placeholder='Product Image URL'
                name='image'
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
              <Button colorScheme='purple' type='submit' width={'100%'}>
                Add Product
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}

export default Createpage;