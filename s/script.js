function createCountdownElement() {
  return document.createElement('div');
}

function updateCountdown(countdownElement, targetTime, isEnd) {
  const currentTime = new Date();
  const targetDateTime = new Date();
  targetDateTime.setHours(isEnd ? targetTime.endHour : targetTime.startHour,
    isEnd ? targetTime.endMinute : targetTime.startMinute, 0, 0);

  const timeDifference = targetDateTime - currentTime;

  if (timeDifference > 0) {
    let hours = Math.floor(timeDifference / (1000 * 60 * 60));
    let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    let timeString = "";
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0 || hours > 0) timeString += `${minutes}m `;
    timeString += `${seconds}s`;

    countdownElement.innerHTML = timeString.trim();
  } else {
    countdownElement.innerHTML = "​";
  }
}

function updateAllCountdowns() {
  for (let i = 0; i < targetTimes.length; i++) {
    const timerPair = countdownElements[i];
    const startCountdownElement = timerPair.start;
    const endCountdownElement = timerPair.end;
    const targetTime = targetTimes[i];
    updateCountdown(startCountdownElement, targetTime, false);
    updateCountdown(endCountdownElement, targetTime, true);
  }
}

// Create countdown elements
const countdownElements = [];
for (let i = 0; i < targetTimes.length; i++) {
  const timerPair = document.createElement('div');
  timerPair.className = 'timer-pair';

  const labelElement = document.createElement('div');
  labelElement.className = 'timer-label';
  labelElement.innerHTML = targetTimes[i].label;
  timerPair.appendChild(labelElement);

  const startCountdownElement = createCountdownElement();
  startCountdownElement.className = 'timer';
  timerPair.appendChild(startCountdownElement);

  const endCountdownElement = createCountdownElement();
  endCountdownElement.className = 'timer';
  timerPair.appendChild(endCountdownElement);

  document.getElementById('timers').appendChild(timerPair);
  countdownElements.push({ label: labelElement, start: startCountdownElement, end: endCountdownElement });
}

// Update all countdowns every second
setInterval(updateAllCountdowns, 1000);

// Initial call to set the initial countdowns
updateAllCountdowns();
