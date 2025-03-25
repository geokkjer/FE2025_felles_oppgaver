let template

const getTemplate = () => {
  if (!template) {
    template = document.getElementById('clicker-app')
  }

  return template
    .content
    .firstElementChild
    .cloneNode(true)
}

const addEvents = (targetElement, events) => {
  const { clearCompleted, completeAll, addItem } = events

  targetElement
    .querySelector('.new-todo')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        addItem(e.target.value)
        e.target.value = ''
      }
    })

  targetElement
    .querySelector('input.toggle-all')
    .addEventListener('click', completeAll)

  targetElement
    .querySelector('.clear-completed')
    .addEventListener('click', clearCompleted)
}

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true)

  newApp.innerHTML = ''
  newApp.appendChild(getTemplate())


  newApp
    .querySelector('button')


  addEvents(newApp, events)

  return newApp
}