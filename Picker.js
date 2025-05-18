// month & year to manipulate prev and next months
const date = new Date();
let month = date.getMonth();
let year = date.getFullYear();
// current day, month, and year, to save current selected date
let curday = date.getDate();
let curmonth = date.getMonth();
let curyear = date.getFullYear();
const months =
['January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'];
/**
 */
class Picker {
  /**
   * Create a date picker
   * @param {string} containerId id of a node the Picker will be a child of
   */
  constructor(containerId) {
    this.containerId = containerId;
  }
  // https://bobbyhadz.com/blog/javascript-get-number-of-days-in-month
  /**
   * @param {*} month
   * @param {*} year
   * @return {object}
   */
  numdaysinMonth(month, year) {
    const target = new Date(year, month, 0);
    return target.getDate();
  }
  /**
   *
   * @param {*} month
   * @param {*} year
   */
  generateDays() {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    // displays month and year
    const monthyear = document.getElementById('display');
    monthyear.innerText = months[month] + ' ' + year;
    // gets index of first day of the current month
    const firstdayofMonth = new Date(year, month, 1).getDay();
    const lastdayofMonthindex = new Date(year, month, 0).getDay();
    // how many days are in current month
    const numdaysthismonth = this.numdaysinMonth(month+1, year);
    // https://stackoverflow.com/questions/11398522/create-a-div-using-loop
    const day = document.getElementById('days');
    for (let i = 0; i < weekdays.length; i += 1) {
      const aweekday = document.createElement('div');
      aweekday.id = weekdays[i];
      aweekday.innerHTML = weekdays[i];
      aweekday.className = 'weekdays';
      day.appendChild(aweekday);
    }
    // total number of elements
    const total = 42;
    // number of days of the previous month
    const numdayslastMonth = new Date(year, month, 0).getDate();
    for (let i = firstdayofMonth; i > 0; i -= 1) {
      const prevdays = document.createElement('div');
      prevdays.id = 'd' + (firstdayofMonth - i);
      prevdays.innerHTML = (numdayslastMonth - i + 1);
      prevdays.className = 'lastmonth';
      day.appendChild(prevdays);
      prevdays.addEventListener('click', () => {
        this.clickPrev();
        const savedate = prevdays.innerText;
        const t =
        document.querySelectorAll('.thismonth');
        for (let i = 0; i < t.length; i+= 1) {
          if (savedate == (t[i].innerText)) {
            t[i].id = 'today';
            curday = parseInt(t[i].textContent);
            curmonth = month;
            curyear = year;
          }
        }
      });
    }
    // https://www.geeksforgeeks.org/how-to-change-the-id-of-element-using-javascript/
    // https://stackoverflow.com/questions/17264978/how-to-change-innerhtml-by-adding-a-integer-value-to-element
    for (let i = 1; i < numdaysthismonth + 1; i += 1) {
      const printday = document.createElement('div');
      if (curmonth == month && curyear == year && curday == i) {
        printday.id = 'today';
      } else {
        printday.id = 'd' + (firstdayofMonth + i - 1);
      }
      printday.innerHTML = i;
      printday.className = 'thismonth';
      day.appendChild(printday);
      printday.addEventListener('click', () => {
        const today = document.getElementById('today');
        if (today) {
          document.getElementById('today').id =
        'd' + (parseInt(today.textContent) + lastdayofMonthindex);
        }
        printday.id = 'today';
        curday = i;
        curmonth = month;
        curyear = year;
      });
    }
    const remainingdays = total - numdaysthismonth - firstdayofMonth;
    for (let i = 1; i <= remainingdays; i += 1) {
      const nextdays = document.createElement('div');
      nextdays.id = 'd' + (firstdayofMonth + numdaysthismonth + i - 1);
      nextdays.innerHTML = (i);
      nextdays.className = 'nextmonth';
      day.appendChild(nextdays);
      nextdays.addEventListener('click', () => {
        this.clickNext();
        const savedate = nextdays.innerText;
        const t = document.querySelectorAll('.thismonth');
        for (let i = 0; i < t.length; i += 1) {
          if (savedate == t[i].innerText) {
            t[i].id = 'today';
            curday = parseInt(t[i].textContent);
            curmonth = month;
            curyear = year;
          }
        }
      });
    }
    monthyear.addEventListener('click', () => {
      const daycontainer = document.getElementById('days');
      daycontainer.innerHTML = '';
      year = curyear;
      month = curmonth;
      this.generateDays();
    });
  }
  /**
   */
  clickPrev() {
    const daycontainer = document.getElementById('days');
    daycontainer.innerHTML = '';
    if (month == 0) {
      year -= 1;
      month = 11;
    } else {
      month -=1;
    }
    this.generateDays();
  }
  /**
   */
  clickNext() {
    const daycontainer = document.getElementById('days');
    daycontainer.innerHTML = '';
    if (month == 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }
    this.generateDays();
  }
}
// To satisfy linter rules
new Picker();