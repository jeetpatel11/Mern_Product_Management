import { ChakraProvider, Button, Box } from '@chakra-ui/react';
import { Router,Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Createpage from './pages/Createpage';
import Navbar from './components/Navbar';
import { useColorModeValue } from '@chakra-ui/react';
function App() {
  return (
    <>
    <Box minH={"100vh"} 
    bg={useColorModeValue('gray.100', 'gray.900')}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Createpage />} />
        </Routes>
    </Box>
      
    </>
  );
}

export default App;