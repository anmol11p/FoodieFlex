import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}/book`,
});

export const orderBook = async (token, data) => {
  try {
    const resp = await api.post("/", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
};

export const showAllOrder = async (token) => {
  try {
    const resp = await api.get("/show", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
};

// remember
// axios.patch(url, data, config)

export const cancelOrder = async (token, id) => {
  try {
    const resp = await api.patch(
      `/cancel/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return resp;
  } catch (error) {
    return error;
  }
};
