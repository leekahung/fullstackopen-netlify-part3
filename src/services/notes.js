import axios from "axios";

const baseUrl = "/api/data";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const update = async (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);
  const response = await request;
  return response.data;
}

const noteServices = { getAll, create, update };

export default noteServices;
