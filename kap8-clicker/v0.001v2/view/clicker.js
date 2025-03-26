let template;

const createScoreNode = () => {
  if (!template) {
    template = document.getElementById('clicker-app');
  }

  return template.content.firstElementChild.cloneNode(true);
};
const attachEventsToClickerElement = (element, events) => {
  const handler = (e) => events.addOne();

  element.querySelector('.plussOne').addEventListener('click', handler);

  element
    .querySelector('.upgrade')
    .addEventListener('click', (e) => events.upgradeCounter());

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

  newCounter.innerHTML = '';
  const Counter = counter(score, clickerCount);

  Counter.map((score) => getClickerElement(score, events)).forEach(
    (element) => {
      newCounter.appendChild(element);
    }
  );

  return newCounter;
};
