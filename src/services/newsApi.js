import axios from 'axios';

const API_KEY = 'ac2235fd7aa7462fa7b2055fc3e0d771';
const BASE_URL = 'https://newsapi.org/v2';

export const categories = [
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'general', name: 'General' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
];

export const getSources = async (category) => {
    const url = `${BASE_URL}/top-headlines/sources?category=${category}&apiKey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.sources;
};

export const getArticles = async (source, page = 1) => {
    const url = `${BASE_URL}/everything?sources=${source}&page=${page}&apiKey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.articles;
};

export const getAllArticles = async (page = 1) => {
    const url = `${BASE_URL}/everything?q=source&page=${page}&apiKey=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.articles;
};