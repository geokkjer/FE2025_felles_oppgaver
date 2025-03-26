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
  const { scoreUp, upgradeUp } = events

 
  targetElement
    .querySelector('.update')
    .addEventListener('click', scoreUp)

  targetElement
    .querySelector('.upgrade')
    .addEventListener('click', upgradeUp)
}

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true)

  newApp.innerHTML = ''
  newApp.appendChild(getTemplate())

  addEvents(newApp, events)

  return newApp
}