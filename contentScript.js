const containerSelector = 'ul.mrChatList__list'
let isIconChanged = false

// case 1: navigated from "配信開始" button
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('ONMESSAGE')
  f()
})

// case 2: reload happened
window.onload = async () => {
  console.log('ONLOAD')
  f()
}

/* functions */
const bindThis = ev => {
  const [name, comment] = ev.target.innerText.split
  readComment(ev.target.innerText)
}

const f = () => {
const waitUlLoad = setInterval(() => {
    if ($(containerSelector).length) {
      // div element changed to ul element
      console.log('ul ready')
      // send message to background script
      if (!isIconChanged) {
        chrome.runtime.sendMessage('ul ready')
        // update flag
        isIconChanged = true
      }
      clearInterval(waitUlLoad)
      const container = $(containerSelector)
      // remove previous bounds
      container.off('DOMNodeInserted', bindThis)
      // add new bounds
      container.bind('DOMNodeInserted', bindThis)
    }
  }, 100)
}

/* speech */
const jpVoiceIndices = [0, 57]
const synth = window.speechSynthesis
const voices = synth.getVoices()

const readComment = comment => {
  console.log(comment)
  /* START TEST: enter comments only */
  if (!comment.includes('が入室しました')) return
  /* END TEST */
  const readThis = new SpeechSynthesisUtterance(comment)
  readThis.voice = voices[jpVoiceIndices[0]] // can be 0 or 1 i.e. 0, 57 of voices
  readThis.pitch = 2
  readThis.rate = 1.5
  synth.speak(readThis)
}