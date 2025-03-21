import todos from './todos.js';
import fs from 'fs';

const printResult = (action, result) => {
  const time = new Date().toTimeString();
  const node = document.createElement('p');
  node.textContent = `${action.toUpperCase()}: ${JSON.stringify(
    result
  )} (${time})`;

  document.querySelector('div').appendChild(node);

  fs.readFile('/test.json', (error, data) => {
    if (error) {
      console.error(error);

      throw err;
    }

    const user = JSON.parse(data);

    console.log(user);
  });
};

const onListClick = async () => {
  const result = await todos.list();
  printResult('list todos', result);
};

const onAddClick = async () => {
  const result = await todos.create('A simple todo Element');
  printResult('add todo', result);
};

const onUpdateClick = async () => {
  const list = await todos.list();

  const { id } = list[0];
  const newTodo = {
    id,
    completed: true,
  };

  const result = await todos.update(newTodo);
  printResult('update todo', result);
};

const onDeleteClick = async () => {
  const list = await todos.list();
  const { id } = list[0];

  const result = await todos.delete(id);
  printResult('delete todo', result);
};

const onDeleteAllClick = async () => {
  const list = await todos.list();
  let result = [];
  for (let i = 0; i < list.length; i++) {
    const { id } = list[i];
    result = await todos.delete(id);
  }
  printResult('delete all todo', result);
};

const onUpdateAllCompleted = async () => {
  const list = await todos.list();
  let result = '';
  for (let i = 0; i < list.length; i++) {
    const { id } = list[i];
    const newTodo = {
      id,
      completed: true,
    };

    result = await todos.update(newTodo);
  }
  result = await todos.list();

  printResult('update all to completed todo', result);
};

document
  .querySelector('button[data-update-all]')
  .addEventListener('click', onUpdateAllCompleted);
document
  .querySelector('button[data-delete-all]')
  .addEventListener('click', onDeleteAllClick);

document
  .querySelector('button[data-list]')
  .addEventListener('click', onListClick);

document
  .querySelector('button[data-add]')
  .addEventListener('click', onAddClick);

document
  .querySelector('button[data-update]')
  .addEventListener('click', onUpdateClick);

document
  .querySelector('button[data-delete]')
  .addEventListener('click', onDeleteClick);
