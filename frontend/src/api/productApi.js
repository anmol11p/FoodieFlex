import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}/item`,
});

const getAllProducts = async () => {
  try {
    const response = await api.get("/");
    return response;
  } catch (error) {
    return error;
  }
};

const getCategoryData = async (category) => {
  try {
    const response = await api.get(`/${category}`);
    return response;
  } catch (error) {
    return error;
  }
};
export { getAllProducts, getCategoryData };
