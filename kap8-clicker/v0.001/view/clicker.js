let template;

const createScoreNode = () => {
  if (!template) {
    template = document.getElementById('score-item');
  }

  return template.content.firstElementChild.cloneNode(true);
};
const attachEventsToClickerElement = (element, events) => {
  // const handler = (e) => events.addOne();

  element
    .querySelector('.plussOne')
    .addEventListener('click', (events) => events.addOne(score));

  element
    .querySelector('.upgrade')
    .addEventListener('click', (events) => events.upgradeCounter(score, ));

  // element.addEventListener('dblclick', () => {
  //   element.classList.add('editing');
  //   element.querySelector('input.edit').focus();
  // });
};

const getClickerElement = (score, events) => {
  // const { text, completed } = todo;

  const element = createScoreNode();

  // element.querySelector('input.edit').value = text;
  // element.querySelector('label').textContent = text;

  // if (completed) {
  //   element.classList.add('completed');
  //   element.querySelector('input.toggle').checked = true;
  // }

  attachEventsToClickerElement(score, events);

  return element;
};

export default (targetElement, state, events) => {
  const { score, clickerCount } = state;
  const newCounter = targetElement.cloneNode(true);

  // newTodoList.innerHTML = ''

  return newCounter;
};
