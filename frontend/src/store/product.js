import {create} from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image){
            return {success: false, message: "Please fill all the fields"};
        }
        try {
            const response = await fetch("/api/products", {  
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to create product');
            }
            
            const data = await response.json();
            set((state) => ({
                products: [...state.products, data.product]
            }));
            return {success: true, message: "Product created successfully"};
        } catch (error) {
            return {success: false, message: error.message};
        }
    },
    fetchProducts: async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            set({ products});
            
            return { success: true };
        } catch (error) {
            console.error('Error fetching products:', error);
            return { success: false, message: error.message };
        }
    },
    deleteProduct: async (id) => {
        if (!id) {
            return { success: false, message: 'Invalid product ID' };
        }
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Deletion failed');
            }
            
            const data = await response.json();
            set((state) => ({
                products: state.products.filter((product) => product._id !== id)
            }));
            return { success: true, message: 'Product deleted successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    updateProduct: async (id, updatedProduct) => {
        if (!id || !updatedProduct) {
            return { success: false, message: 'Invalid product ID or data' };
        }
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Update failed');
            }
            
            const data = await response.json();
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? { ...product, ...updatedProduct } : product
                )
            }));
            return { success: true, message: 'Product updated successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
}));