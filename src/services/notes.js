import axios from "axios";

const baseUrl = "/api/data";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const noteServices = { getAll, create, update, remove };

export default noteServices;
