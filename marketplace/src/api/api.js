import axios from "axios";

export async function getProfileApi(token) {
    return axios.get('http://localhost:5000/auth/profile', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export async function loginApi(email, password) {
    return axios.post('http://localhost:5000/auth/login', {
                email, password
        })
}

export async function registerApi({ username, email, password }) {
    return axios.post('http://localhost:5000/auth/register', {
        username,
        email,
        password
    })
}

export async function getProductsApi(page) {
    return axios.get(`https://fakestoreapi.in/api/products?page=${page}&limit=8`)
}

export async function getProductsByCategoryApi(category, page) {
    return axios.get(`https://fakestoreapi.in/api/products/category?type=${category}&page=${page}&limit=8`)
}

export async function getProductDetailsApi(id) {
    return axios.get(`https://fakestoreapi.in/api/products/${id}`)
}

export async function getCategoriesApi() {
    return axios.get('https://fakestoreapi.in/api/products/category')
}