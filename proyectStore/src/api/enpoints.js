const BASE_URL = "https://fakestoreapi.com";

export const endpoints = {
    getProducts: (id="") => `${BASE_URL}/products/${id}`,
    getProductsCategory: (categoryId="") => `${BASE_URL}/products/category/${categoryId}`,
    updateProduct: (id) => `${BASE_URL}/products/${id}`,
    deleteProduct: (id) => `${BASE_URL}/products/${id}`,
    createProduct: () => `${BASE_URL}/products`,
    getCarts: (id="") => `${BASE_URL}/carts/${id}`,
    createCart: () => `${BASE_URL}/carts`,
    updateCart: (id) => `${BASE_URL}/carts/${id}`,
    deleteCart: (id) => `${BASE_URL}/carts/${id}`,
    getUsers: (id="") => `${BASE_URL}/users/${id}`,
    createUser: () => `${BASE_URL}/users`,
    updateUser: (id) => `${BASE_URL}/users/${id}`,
    deleteUser: (id) => `${BASE_URL}/users/${id}`,
    login: () => `${BASE_URL}/auth/login`,
};
