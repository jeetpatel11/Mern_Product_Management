import { background, Button, Center, Container, Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'

function Navbar() {

    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1340px"} 
    borderRadius={"10px"}>
      <Flex
        as="nav"
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={{base: "column", md: "row"}}
        >
        <Text bgGradient='linear(to-l,blue.500 ,blue.400 )' bgClip='text' fontSize='2xl' fontWeight='extrabold'>
            <Link to="/">
                Product Store 🛒
            </Link> 
        </Text>
        <div style={{marginTop: "10px"}}>
        <HStack spacing={3}  >
            <Link to="/create" >
            <Button>
                <PlusSquareIcon 
                fontSize={"25"} 
                backgroundColor={'transparent'} />
            </Button>
            </Link>

            <Button 
            onClick={toggleColorMode}>
                {colorMode === 'light' ? <IoMoon/> : <LuSun size={20} />} 
            </Button>
        </ HStack>
        </div>
        </Flex>
    </Container>
  )
}

export default Navbar
