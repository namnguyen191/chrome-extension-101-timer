const timeEle = document.getElementById('time');
const h1Ele = document.querySelector('h1');
const timerEle = document.querySelector('#timer');
const pauseBtnEle = document.querySelector('#pause');
const startBtnEle = document.querySelector('#start');
const resetBtnEle = document.querySelector('#reset');

let timerInterval;

chrome.action.setBadgeText(
  {
    text: 'TIME',
  },
  () => {
    console.log('Finished setting badge');
  }
);

chrome.storage.sync.get(['name'], (res) => {
  h1Ele.textContent = 'Hello ' + res.name ?? '';
});

function updateTime() {
  chrome.storage.local.get(['timer'], (res) => {
    const time = res.timer ?? 0;
    timerEle.textContent = `Timer is at ${time} seconds`;
  });

  const time = new Date().toLocaleTimeString();

  timeEle.textContent = `The time is ${time}`;
}

updateTime();
timerInterval = setInterval(updateTime, 1000);

pauseBtnEle.addEventListener('click', () => {
  chrome.storage.local.set({
    isRunning: false,
  });

  if (!timerInterval) return;

  clearInterval(timerInterval);
});

startBtnEle.addEventListener('click', () => {
  console.log('start');
  chrome.storage.local.set({
    isRunning: true,
  });
  updateTime();
  timerInterval = setInterval(updateTime, 1000);
});

resetBtnEle.addEventListener('click', () => {
  chrome.storage.local.set({
    timer: 0,
  });
});
