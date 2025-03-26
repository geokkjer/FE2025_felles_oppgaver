let template;

const getTemplate = () => {
  if (!template) {
    template = document.getElementById('clicker-app');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  const { scoreUp, upgrade, reset } = events;

  // targetElement
  //   .querySelector('.new-todo')
  //   .addEventListener('keypress', e => {
  //     if (e.key === 'Enter') {
  //       addItem(e.target.value)
  //       e.target.value = ''
  //     }
  //   })

  targetElement.querySelector('.plussOne').addEventListener('click', scoreUp);

  targetElement
    .querySelector('button.upgrade')
    .addEventListener('click', upgrade);
  targetElement.querySelector('button.reset').addEventListener('click', reset);
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);

  newApp.innerHTML = '';
  newApp.appendChild(getTemplate());

  newApp.querySelector('button');

  addEvents(newApp, events);

  return newApp;
};
