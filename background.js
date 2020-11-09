chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        console.log('moved to' + changeInfo.url)
        chrome.tabs.sendMessage(tabId, {
            message: 'navigated',
            url: changeInfo.url
        })
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message == 'ul ready') {
    console.log('change icon')
    chrome.browserAction.setIcon({
      path: "icon-128-color.png",
      tabId: sender.tab.id
    })
  }
})