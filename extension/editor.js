window.parent.postMessage('ready', '*')

window.addEventListener('message', e => {
  document.getElementById('href').value = e.data.href
})

document
  .getElementById('save')
  .addEventListener('click', () =>
    window.parent.postMessage(
      { href: document.getElementById('href').value },
      '*'
    )
  )
