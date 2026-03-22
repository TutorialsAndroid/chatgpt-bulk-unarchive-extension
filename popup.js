let counter = 0;

async function sendCommand(action) {

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  // Inject content script first (important)
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });

  // Then send command
  chrome.tabs.sendMessage(tab.id, { action });

}


document.getElementById("startBtn").onclick = async () => {

  counter = 0;

  document.getElementById("status").innerText = "Running...";
  document.getElementById("counter").innerText = "0";

  sendCommand("START");

};


document.getElementById("stopBtn").onclick = async () => {

  document.getElementById("status").innerText = "Stopped";

  sendCommand("STOP");

};


// listen for progress updates

chrome.runtime.onMessage.addListener((msg) => {

  if (msg.type === "progress") {

    counter = msg.value;

    document.getElementById("counter").innerText = counter;

  }

});