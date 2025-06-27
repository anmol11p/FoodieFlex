import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}/auth`,
});

const loginUser = async (formData) => {
  try {
    const resp = api.post("/login", formData);
    return resp;
  } catch (error) {
    return error;
  }
};

const userRegistration = async (formData) => {
  try {
    const resp = api.post("/signup", formData);
    return resp;
  } catch (error) {
    return error;
  }
};

export { loginUser, userRegistration };
