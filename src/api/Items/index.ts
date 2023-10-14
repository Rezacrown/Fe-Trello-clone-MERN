import axios from "axios";
import config from "@/config";
import { toast } from "react-toastify";

interface payloadCreateItem {
  name: string;
  TodoId: number | string;
}

export const createItems = async (payload: payloadCreateItem) => {
  try {
    const response = await axios.post(`${config.api_Host}/api/items`, payload);

    return response.data;
  } catch (error) {
    toast.error("ada error");
  }
};

export const editItems = async (id: number | string, name: string) => {
  try {
    const response = await axios.put(`${config.api_Host}/api/items/${id}`, {
      name,
    });

    return response.data;
  } catch (error) {
    toast.error("ada error");
  }
};

export const deleteItems = async (id: number) => {
  try {
    const response = await axios.delete(`${config.api_Host}/api/items/${id}`);

    return response.data;
  } catch (error) {
    toast.error("ada error");
  }
};

export const moveItems = async (id: number, targetTodoId: number | string) => {
  try {
    const response = await axios.put(
      `${config.api_Host}/api/items/move/${id}`,
      { targetTodoId }
    );

    return response.data;
  } catch (error) {
    toast.error("ada error");
  }
};
