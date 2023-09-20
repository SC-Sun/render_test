import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const getAll = async () => {
  const request = axios.get(`${baseUrl}`);
  const response = await request;
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

const deleteBody = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, deleteBody };
