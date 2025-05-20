import {
    Box,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    HStack,
    IconButton,
    Image,
    Text,
    useToast,
    Input
} from '@chakra-ui/react';
import { useState } from 'react';
import { useColorModeValue, Button, VStack } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
    const { _id, name, price, description, image } = product;
    const textcolor = useColorModeValue('gray.600', 'gray.200');
    const bg = useColorModeValue('white', 'gray.800');
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();

    // Modal state
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: name || '',
        price: price || '',
        description: description || '',
        image: image || '',
    });

    const handledeleteProduct = async (e) => {
        e.stopPropagation();
        try {
            const result = await deleteProduct(_id);
            const { success, message } = result;
            toast({
                title: success ? 'Success' : 'Error',
                description: message,
                status: success ? 'success' : 'error',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Delete error:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete product. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleOpenModal = () => {
        setIsOpen(true);
        // Reset form data to current product values
        setFormData({
            name: name || '',
            price: price || '',
            description: description || '',
            image: image || '',
        });
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateProduct(_id, formData);
            const { success, message } = result;
            toast({
                title: success ? 'Success' : 'Error',
                description: message,
                status: success ? 'success' : 'error',
                duration: 3000,
                isClosable: true,
            });
            if (success) {
                handleCloseModal();
            }
        } catch (error) {
            console.error('Update error:', error);
            toast({
                title: 'Error',
                description: 'Failed to update product. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            p={4}
            _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
            transition="all 0.2s"
            cursor="pointer"
            bg={bg}
        >
            <Image
                src={image}
                alt="Product Image"
                objectFit="cover"
                width="100%"
                height="200px"
                borderRadius="lg"
                mb={4}
            />
            <Box p={4}>
                <Heading fontWeight="bold" fontSize="xl" mb={2}>
                    {name}
                </Heading>
                <Text fontSize="lg" color={textcolor}>
                    ${price}
                </Text>
                <Text mt={2} color={textcolor}>
                    {description}
                </Text>
                <HStack mt={4} spacing={4}>
                    <IconButton
                        icon={<EditIcon />}
                        onClick={handleOpenModal}
                        colorScheme="blue"
                        aria-label="Edit Product"
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        aria-label="Delete Product"
                        onClick={handledeleteProduct}
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Text fontSize="2xl" fontWeight="bold" color={textcolor}>
                            Update Product
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={4}>
                            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                <VStack spacing={4}>
                                    <Input
                                        placeholder="Product Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        placeholder="Product Price"
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        placeholder="Product Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        placeholder="Product Image URL"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Button colorScheme="purple" type="submit" width="100%">
                                        Update Product
                                    </Button>
                                </VStack>
                            </form>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default ProductCard;