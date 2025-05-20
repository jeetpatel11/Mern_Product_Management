import { Container, VStack ,Text, Link, SimpleGrid} from '@chakra-ui/react'
import React, { use } from 'react'
import { Links } from 'react-router-dom'
import { useEffect } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

function Homepage() {

  const {fetchProducts,products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products)
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="stretch">
        <Text fontSize="4xl" fontWeight="bold" textAlign="center"
        color={"blue.500"} mb={4}>
        
          Current Product 🚀
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"100%"}>
          {products
          .filter((product) => product && product._id) 
          .map((product) => (
              <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>
        {products.length === 0 && (
          <Text fontSize="2xl" textAlign="center">
          No products found 😢 {" "}
          <Link color="blue.500" fontWeight={'bold'} href="/create">
            Create a new product
          </Link>
        </Text>
        )}


        
      </VStack>
    </Container>
  )
}

export default Homepage
