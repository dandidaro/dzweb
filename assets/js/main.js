/* === Count date === */

// Constant variables
const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS * 60;
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
const ONE_DAY_IN_MILLISECONDS = ONE_DAY_IN_SECONDS * 1000;
var type = "inRelation";

// Re-assign functions from JavaScript engine
const { floor, abs } = Math;

// Export


function calculate(type, currentDate = new Date()) {
    // Format: year, date, month-1, hour, minute, second
    
    if (type === "inRelation"){
        INPUT_DATE = new Date(2021, 6, 6, 21, 5, 33);
    } else if (type === "firstMatch") {
        INPUT_DATE = new Date(2021, 5, 8, 1, 0, 0);
    }
    
    let years;
    let months;
    let days;
    let hours;
    let minutes;
    let seconds;

  // Get raw time
  const gapMilliSeconds = INPUT_DATE.getTime();
  const currentMilliSeconds = currentDate.getTime();
  const diff = currentMilliSeconds - gapMilliSeconds;

  // We can cut off years first as the number of days is static, 365 or 366
  years = currentDate.getFullYear() - INPUT_DATE.getFullYear();

  // For months and days, however, it's a little bit tricky
  const gapMonth = INPUT_DATE.getMonth();
  const currentMonth = currentDate.getMonth();

  // Don't forget to subtract this if date, hours, minutes, seconds is lesser
  months = currentMonth - gapMonth;

  // Days
  const gapDateInMonth = INPUT_DATE.getDate();
  const currentDateInMonth = currentDate.getDate();

  days = currentDateInMonth - gapDateInMonth;

  // We use this to calculate time
  const daysRemainder = Math.floor((diff % ONE_DAY_IN_MILLISECONDS) / 1000);

  // Time
  hours = floor(daysRemainder / ONE_HOUR_IN_SECONDS);
  const hoursRemainder = daysRemainder % ONE_HOUR_IN_SECONDS;

  minutes = floor(hoursRemainder / ONE_MINUTE_IN_SECONDS);
  const minutesRemainder = hoursRemainder % ONE_MINUTE_IN_SECONDS;

  seconds = minutesRemainder % ONE_MINUTE_IN_SECONDS;

  if (currentDateInMonth === gapDateInMonth) {
    // Check hours
    const gapHours = INPUT_DATE.getHours();
    const currentHours = currentDate.getHours();

    if (currentHours < gapHours) {
      days -= 1;
    } else if (currentHours === gapHours) {
      // Check minutes
      const gapMinutes = INPUT_DATE.getMinutes();
      const currentMinutes = currentDate.getMinutes();

      if (currentMinutes < gapMinutes) {
        days -= 1;
      } else if (currentMinutes === gapMinutes) {
        // Check seconds
        if (currentDate.getSeconds() < INPUT_DATE.getSeconds()) {
          days -= 1;
        }
      }
    }
  }

  // If any of them is less than 1, set to maximum
  if (days < 0) {
    days += getNumberOfDaysInMonth(currentDate);
    months -= 1;
  }

  if (months < 0) {
    months = 12 + months;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
}

function render({ years, months, days, hours, minutes, seconds }) {
    // Fill into the divs
    var options = { weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour:'numeric',
                    minute: 'numeric',
                    hour12: false
                };

    const yearsDiv = document.getElementById('years');
    const monthsDiv = document.getElementById('months');
    const daysDiv = document.getElementById('days');
    const hoursDiv = document.getElementById('hours');
    const minutesDiv = document.getElementById('minutes');
    const secondsDiv = document.getElementById('seconds');
    const defDateDiv = document.getElementById('defaultDate');

    yearsDiv.innerHTML = appendZeros(years);
    monthsDiv.innerHTML = appendZeros(months);
    daysDiv.innerHTML = appendZeros(days);
    hoursDiv.innerHTML = appendZeros(hours);
    minutesDiv.innerHTML = appendZeros(minutes);
    secondsDiv.innerHTML = appendZeros(seconds);
    defDateDiv.innerHTML = INPUT_DATE.toLocaleDateString("en-US", options);
}

// Helper functions
function getNumberOfDaysInMonth(date) {
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return endOfMonth.getDate();
}

function appendZeros(number) {
  if (number < 10) {
    return `0${number}`;
  }

  return `${number}`;
};


/* === Dynamic modal === */
var modalTitle = document.querySelector('.modal-title');

$('.modalMemory').on('click',function(){
  var newTitle = this.getAttribute('data-title');
  var newContent = this.getAttribute('data-content');

  modalTitle.innerHTML = newTitle;
  $('.modal-body').load('memories/' + newContent + '.html',function(){
    $('#myModal').modal({show:true});
  });
});