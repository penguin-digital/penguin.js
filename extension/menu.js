document
  .querySelector('.menu-option.delete')
  .addEventListener('click', () => window.parent.postMessage('delete', '*'))

document
  .querySelector('.menu-option.duplicate')
  .addEventListener('click', () => window.parent.postMessage('duplicate', '*'))
