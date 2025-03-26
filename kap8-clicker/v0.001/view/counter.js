const getScoreCount = score => { 
    return `Current Score is: ${score}`
  }
  
  export default (targetElement, { score }) => {
    const newCounter = targetElement.cloneNode(true)
    newCounter.textContent = getScoreCount(score)
    return newCounter
  }