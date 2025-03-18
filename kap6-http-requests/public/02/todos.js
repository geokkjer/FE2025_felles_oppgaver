import http from './http.js';

const HEADERS = {
  'Content-Type': 'application/json',
};

const BASE_URL = '/api/todos';

const list = () => http.get(BASE_URL);

const create = (text) => {
  const todo = {
    text,
    completed: false,
  };

  return http.post(BASE_URL, todo, HEADERS);
};

const update = (newTodo) => {
  const url = `${BASE_URL}/${newTodo.id}`;
  return http.patch(url, newTodo, HEADERS);
};

const deleteTodo = (id) => {
  const url = `${BASE_URL}/${id}`;
  return http.delete(url, HEADERS);
};
const deleteAllTodo = () => {
  // for(let i = 0; i < BASE_URL)
  // const url = `${BASE_URL}`;
  // return http.get([]);

  return http.deleteMany();
};

export default {
  list,
  create,
  update,
  delete: deleteTodo,
  deleteAll: deleteAllTodo,
};
