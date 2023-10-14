import axios from "axios";
import config from "@/config";
import { toast } from "react-toastify";

export const getAllTodos = async () => {
  try {
    const response = await axios.get(`${config.api_Host}/api/todos`);

    return response.data.data;
  } catch (error) {
    toast.error("ada error");
  }
};

export const getTodosById = async (id: number) => {
  try {
    const response = await axios.get(`${config.api_Host}/api/todos/${id}`);

    return response.data.data;
  } catch (error) {
    toast.error("ada error");
  }
};

export const createTodos = async (name: string) => {
  try {
    const response = await axios.post(`${config.api_Host}/api/todos`, { name });

    return response.data;
  } catch (error) {
    toast.error("ada error");
  }
};

export const editTodos = async (id: number, name: string) => {
  try {
    const response = await axios.put(`${config.api_Host}/api/todos/${id}`, {
      name,
    });

    return response.data;
  } catch (error) {
    toast.error("ada error");
  }
};

export const deleteTodos = async (id: number) => {
  try {
    const response = await axios.delete(`${config.api_Host}/api/todos/${id}`);

    return response.data;
  } catch (error) {
    toast.error("ada error");
  }
};
