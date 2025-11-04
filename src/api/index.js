import axios from "axios";

function create(baseURL, options) {
  const instance = axios.create({
    baseURL: baseURL,
    ...options,
  });
  return instance;
}

export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`);

// 개발모드 http://localhost:5000/posts/
// 운영모드  http://localhost:5001/posts/
