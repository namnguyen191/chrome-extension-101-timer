const h1El = document.querySelector('h1');
const inputNameEle = document.querySelector('#name-input');
const inputTimeEle = document.querySelector('#time-input');
const buttonEle = document.querySelector('#save-btn');

console.log(h1El);

buttonEle.addEventListener('click', () => {
  const name = inputNameEle.value;
  const notificationTime = inputTimeEle.value;
  chrome.storage.sync.set(
    {
      name,
      notificationTime,
    },
    () => {
      console.log(`Name is set to ${name}`);
    }
  );
});

chrome.storage.sync.get(['name', 'notificationTime'], (res) => {
  inputNameEle.value = res.name ?? '';
  inputTimeEle.value = res.notificationTime ?? 1000;
});
