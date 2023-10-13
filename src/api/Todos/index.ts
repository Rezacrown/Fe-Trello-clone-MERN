import axios from "axios";
import config from "@/config";

export const getAllTodos = async () => {
  try {
    const response = await axios.get(`${config.api_Host}/api/todos`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTodosById = async (id: number) => {
  try {
    const response = await axios.get(`${config.api_Host}/api/todos/${id}`);

    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTodos = async (name: string) => {
  try {
    const response = await axios.post(`${config.api_Host}/api/todos`, { name });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
