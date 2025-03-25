let template

const createScoreNode = () => {
    if (!template) {
      template = document.getElementById('score-item')
    }
  
    return template
      .content
      .firstElementChild
      .cloneNode(true)
  }
//   const attachEventsToTodoElement = (element, index, events) => {
//     const handler = e => events.deleteItem(index)
  
//     element
//       .querySelector('button.destroy')
//       .addEventListener('click', handler)
  
//     element
//       .querySelector('input.toggle')
//       .addEventListener('click', e => events.toggleItemCompleted(index))
  
//     element
//       .addEventListener('dblclick', () => {
//         element.classList.add('editing')
//         element
//           .querySelector('input.edit').focus()
//       })
  
//     element
//       .querySelector('input.edit')
//       .addEventListener('keypress', e => {
//         if (e.key === 'Enter') {
//           element.classList.remove('editing')
//           events.updateItem(index, e.target.value)
//         }
//       })
//   }
  export default (targetElement, state, events) => {
    const { score , clickerCount } = state
    const newTodoList = targetElement.cloneNode(true)
  
    // newTodoList.innerHTML = ''
  
    return newTodoList
  }