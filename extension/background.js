// inform active tab that browser action icon is clicked
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var activeTab = tabs[0]
    chrome.tabs.sendMessage(activeTab.id, { message: 'clicked_browser_action' })
  })
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == 'no-elements') {
    chrome.notifications.create('no-elements', {
      type: 'basic',
      iconUrl: 'icon64.png',
      title: 'No editable elements',
      message: 'Only changes to elements with data-pkey will be saved.'
    })
  }

  if (request.message == 'no-page-id') {
    chrome.notifications.create('no-page-id', {
      type: 'basic',
      iconUrl: 'icon64.png',
      title: 'No unique page id',
      message: 'No #pcms_unique_id element with data-key attribute found.'
    })
  }

  if (request.message == 'save-success') {
    chrome.notifications.create(`${reqiest.unique_id}-notification`, {
      type: 'basic',
      iconUrl: 'icon64.png',
      title: 'Content saved',
      message: `${reqiest.unique_id} document saved successfuly`
    })
  }
})
