// NEXT TODO:
// Add a listener to decide, what kind of element is clicked on. Trigger actions.
// E.g. link -> show modal to edit the link or follow, etc.
// Make further elements Editable (images)
// Make duplication smarter: Check if there is a list or a repeated element.
// Create a element that shows where in the dom you are and ake it visible (with this, the user will understand HTML after a while)
// Make general attributes editable and make it possible to add other attributes.
// Create a share link to share edited websites (forces ppl to download penguin as plugin and open the link. This will directly apply the changes.)
// Create sth like filestack but by us: https://www.imgix.com/ and https://uppy.io/
// Create a list with changes (history) and allow to delete thos (that's dangerous, becuase the whole dom selectors will break)

window.penguin = {
  status: false,
  buttonFrame: '',
  menuFrame: '',
  editorFrame: '',
  style: '',
  data: [],
  context: '',
  menuTarget: undefined,
  menuVisible: false,
  eventListeners: [],
  elements: [],
  target: undefined,
  // server: 'http://localhost:3000'
  server: 'https://penguinjs.herokuapp.com'
}

const addEventListener = (scope, type, handler) => {
  scope.addEventListener(type, handler, false)
  return () => {
    scope.removeEventListener(type, handler, false)
  }
}

window.onbeforeunload = function() {
  // FIXME Edgecase: One field has been edited and has not unfocused yet. Then this will not show.
  if (penguin.data.length != 0)
    return 'Do you really want to exit without saving the changes?'
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    // add modal if browser action is clicked
    case 'clicked_browser_action':
      if (!document.getElementById('penguin-cms-buttons-frame')) {
        loadContents()
        addStyle()
        addButtonFrame()
        addMenuFrame()
        addCMS()
      } else {
        removeButtonFrame()
        removeMenuFrame()
        removeStyle()
        removeCMS()
        removeEditorFrame()
      }
      break
  }
})

function addButtonFrame() {
  let iframe = (penguin.buttonFrame = document.createElement('iframe'))
  iframe.src = chrome.runtime.getURL('buttons.html')
  iframe.className = 'penguin-button-box'
  iframe.setAttribute('id', 'penguin-cms-buttons-frame')
  document.body.appendChild(iframe)
}

function removeButtonFrame() {
  penguin.buttonFrame.remove()
}

const toggleMenu = command => {
  penguin.menuFrame.style.display = command === 'show' ? 'block' : 'none'
  penguin.menuVisible = !penguin.menuVisible
}

function addMenuFrame() {
  let menu = (penguin.menuFrame = document.createElement('iframe'))
  menu.src = chrome.runtime.getURL('menu.html')
  menu.className = 'penguin-menu'
  document.body.appendChild(menu)

  const setPosition = ({ top, left }) => {
    menu.style.left = `${left}px`
    menu.style.top = `${top}px`
    toggleMenu('show')
  }

  penguin.eventListeners.push(
    addEventListener(window, 'click', e => {
      if (penguin.menuVisible) toggleMenu('hide')
    })
  )

  penguin.eventListeners.push(
    addEventListener(window, 'contextmenu', e => {
      e.preventDefault()
      console.log(e)
      penguin.menuTarget = e.target
      const origin = {
        left: e.pageX,
        top: e.pageY
      }
      setPosition(origin)
      return false
    })
  )
}

function removeMenuFrame() {
  penguin.menuFrame.remove()
}

function addStyle() {
  let style = (penguin.style = document.createElement('link'))
  style.href = chrome.runtime.getURL('content.css')
  style.setAttribute('rel', 'stylesheet')
  style.setAttribute('id', 'penguin-cms-style')
  document.head.appendChild(style)
}

function removeStyle() {
  penguin.style.remove()
}

function addCMS() {
  const elements = (penguin.elements = document.querySelectorAll(
    'p,h1,h2,h3,h4,h5,h6,span,a,pre,address'
  ))

  elements.forEach(item => {
    item.setAttribute('contenteditable', 'true')
    // FIXME: seems like this is a problem, when duplicating stuff.
    penguin.eventListeners.push(
      addEventListener(item, 'focusin', e => {
        penguin.context = e.target.innerHTML
        penguin.target = e.target

        // Here should go a lot of magic.
        dispatcher()
      })
    )
    penguin.eventListeners.push(
      addEventListener(item, 'focusout', e => {
        if (penguin.context !== e.target.innerHTML) {
          penguin.data.push({
            path: Simmer(e.target),
            content: e.target.innerHTML,
            location: window.location.pathname
          })
        }
      })
    )
  })
}

function removeCMS() {
  penguin.eventListeners.forEach(e => e())
  penguin.elements.forEach(item => {
    item.setAttribute('contenteditable', 'false')
  })
}

// /////////////////////////////////////////////////////////////////////////////
// CMS Dispatcher and element handeling
// /////////////////////////////////////////////////////////////////////////////
function dispatcher() {
  removeEditorFrame()
  console.log(Simmer(penguin.target))
  if (penguin.target.tagName === 'A') {
    addEditorFrame()
  }
}

function addEditorFrame() {
  let iframe = (penguin.editorFrame = document.createElement('iframe'))
  iframe.src = chrome.runtime.getURL('editor.html')
  iframe.className = 'penguin-editor-box'
  iframe.setAttribute('id', 'penguin-cms-editor-frame')
  document.body.appendChild(iframe)
}

function removeEditorFrame() {
  if (penguin.editorFrame) penguin.editorFrame.remove()
}

function editorReady() {
  penguin.editorFrame.contentWindow.postMessage(
    { href: penguin.target.getAttribute('href') },
    '*'
  )
}

function setHref(href) {
  removeEditorFrame()
  penguin.target.setAttribute('href', href)
}
// /////////////////////////////////////////////////////////////////////////////
// Communication with Frame:
// /////////////////////////////////////////////////////////////////////////////
window.addEventListener('message', e => {
  // console.log(e)
  if (e.data === 'data') sendData()
  if (e.data === 'location') sendPublish(window.location.pathname)
  if (e.data === 'delete') sendDelete()
  if (e.data === 'duplicate') sendDuplicate()
  if (e.data === 'ready') editorReady()
  if (e.data.href) setHref(e.data.href)
})

sendData = () => {
  const request = new XMLHttpRequest()
  request.onreadystate = handleRequest
  request.open('POST', penguin.server + '/api', true)
  request.setRequestHeader('Content-Type', 'application/json')
  console.log(penguin.data)
  request.send(JSON.stringify(penguin.data))
  function handleRequest() {
    //FIXME Make sure to only trigger this, when state was successfull!
    penguin.data = []
    console.log(request.responseText)
  }
}

sendPublish = location => {
  console.log(location)
  const request = new XMLHttpRequest()
  request.open('POST', penguin.server + '/publish', true)
  request.setRequestHeader('Content-Type', 'application/json')
  request.send(JSON.stringify({ location }))
}

sendDelete = () => {
  if (penguin.menuVisible) toggleMenu('hide')
  console.log('delete')
  penguin.data.push({
    path: Simmer(penguin.menuTarget),
    action: 'delete',
    location: window.location.pathname
  })
  penguin.menuTarget.remove()
}

sendDuplicate = () => {
  if (penguin.menuVisible) toggleMenu('hide')
  console.log('duplicate')
  penguin.data.push({
    path: Simmer(penguin.menuTarget),
    action: 'duplicate',
    location: window.location.pathname
  })
  penguin.menuTarget.after(penguin.menuTarget.cloneNode(true))
}

// /////////////////////////////////////////////////////////////////////////////
// Load changes
// /////////////////////////////////////////////////////////////////////////////
function loadContents() {
  const request = new XMLHttpRequest()
  request.onload = () => {
    if (request.readyState == 4 && request.status == 200) {
      console.log('Data received from server: ', request.response)
      updateContent(JSON.parse(request.response))
    }
  }
  request.open('GET', penguin.server + '/api', true)
  request.send()
}
updateContent = data => {
  data.forEach(item => {
    const target = document.querySelector(item.path)
    console.log(item.path)
    if (item.action == 'duplicate') {
      console.log(target)
      target.after(target.cloneNode(true))
    }
    if (item.action == 'delete') {
      target.remove()
    }
    target.innerHTML = item.content
  })
}
