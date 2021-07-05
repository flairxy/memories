import axios from "axios";

const API = axios.create({ baseURL: "https://flair-memories.herokuapp.com/" });

API.interceptors.request.use((request) => {
  const data = localStorage.getItem("profile");
  if (data) {
    request.headers.Authorization = `Bearer ${JSON.parse(data).token}`;
  }

  return request;
});

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const login = (formData) => API.post("/user/login", formData);
export const register = (formData) => API.post("/user/register", formData);
