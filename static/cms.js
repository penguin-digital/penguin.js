const data = []
let context = ''
onSave = () => {
  const request = new XMLHttpRequest()
  request.onreadystate = handleRequest
  request.open('POST', '/api', true)
  request.setRequestHeader('Content-Type', 'application/json')
  request.send(JSON.stringify(data))
  function handleRequest() {
    console.log(request.responseText)
  }
}

document.querySelector('#save').addEventListener('click', onSave)

const elements = document.querySelectorAll(
  'p,h1,h2,h3,h4,h5,h6,span,a,pre,address,input'
)

elements.forEach(item => {
  item.setAttribute('contenteditable', 'true')
  item.addEventListener('focusin', e => {
    context = e.target.innerHTML
  })
  item.addEventListener('focusout', e => {
    if (context !== e.target.innerHTML)
      data.push({ path: Simmer(e.target), content: e.target.innerHTML })
  })
})

// window.onbeforeunload = function() {
//   return 'I am not sure...\n\nCMS asks:'
// }

//Styles

const cmsCss =
  '[contenteditable=true]{ outline-color: rgba(55, 55, 55, 0.08); outline-offset: 0px; outline-style: dashed; outline-width: thin; } [contenteditable=true]:hover { outline-color: rgba(255, 0, 0, 0.3); outline-offset: 0px; outline-style: dotted; outline-width: thin; } [contenteditable=true]:empty{ background-color: rgba(255, 0, 0, 0.3); } [contenteditable=true]:empty:before{ content: empty; }'

const style = document.createElement('style')
style.rel = 'stylesheet'
style.innerHTML = cmsCss
document.head.appendChild(style)
