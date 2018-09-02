document
  .getElementById('save')
  .addEventListener('click', () => window.parent.postMessage('data', '*'))
document
  .getElementById('publish')
  .addEventListener('click', () => window.parent.postMessage('location', '*'))
