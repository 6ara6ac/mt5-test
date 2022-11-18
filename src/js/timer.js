import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const data = {
    button: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    value: document.querySelectorAll('.value')
    };

data.button.setAttribute('disabled', true);
data.button.addEventListener ('click', onTimerStart);

let terminalID = null;
let selectedDate = null;


flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,


  onClose(selectedDates) {
    if (selectedDates[0] < new Date()){
        data.button.setAttribute('disabled', true);
        Notiflix.Notify.failure("Please choose a date in the future");
    }
    
    else {
        selectedDate = selectedDates[0].getTime();
        data.button.removeAttribute('disabled');  
  }
}}
);


function onTimerStart () {
  data.button.setAttribute('disabled', true);
  terminalID = setInterval (() => { 
  const currentTime = selectedDate - Date.now();
  const timeLeft = convertMs(currentTime);
  console.log (currentTime);

  const { days, hours, minutes, seconds } = timeLeft;
  data.days.textContent = `${days}`;
  data.hours.textContent = `${hours}`;
  data.minutes.textContent = `${minutes}`;
  data.seconds.textContent = `${seconds}`;

  if (currentTime < 1000){
      clearInterval(terminalID);
  }
},1000)
}


function addLeadingZero(value) {
      return String(value).padStart(2, '0');
    }


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
