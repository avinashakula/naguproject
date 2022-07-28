import HelperFunctions from "./HelperFunctions";
import moment from 'moment';
import timezone from 'moment-timezone'

export default class DateHelper {
    static getMonthName(monthNumber) {
        const months = [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ];
        return months[monthNumber];
    }

    static addDaySuffix(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    static getDateFromString(dateString, timeString) {
        if (timeString) {
            timeString = timeString;
        } else {
            let timeStringAr = dateString.split(" ");
            timeString = timeStringAr[1];
        }
        const matchDate = new Date(Date.parse(dateString));
        const timeArray = timeString.split(":");
        matchDate.setHours(parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2]))
        return matchDate;
    }

    static getDateFromStringMoment(date) {
        var dateTimeArray = date.split(" ");
        var currentDate = new Date(Date.parse(dateTimeArray[0]));

        var timeArray = dateTimeArray[1].split(":");
        currentDate.setHours(parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2]));

        return currentDate;
    }

    static getCurrentDateAndTime() {
        var localDate = new Date();
        var x = DateHelper.getDateFromStringMoment(moment.tz(localDate, "America/New_York").format('YYYY-MM-DD HH:mm:ss'));
        return x;
    }

    static calculateMatchDateTimeDifferenceFromCurrent(currentDate) {
        // console.log(currentDate, "currentDate");
        var mMili = currentDate.getTime();
        var localDate = new Date();
        var x = DateHelper.getDateFromStringMoment(moment.tz(localDate, "America/New_York").format('YYYY-MM-DD HH:mm:ss'));
        var ausMelTime = x.getTime();
        var MILLI_DIFF = Math.abs(ausMelTime - mMili);
        var nd = new Date(ausMelTime);
        var monthName = HelperFunctions.prettyDate(currentDate);
        return {
            isLive: ausMelTime > mMili, // if match is live
            days: Math.floor(MILLI_DIFF / (1000 * 60 * 60 * 24)),
            milliSeconds: MILLI_DIFF,
            monthDate: monthName,
            date: DateHelper.convertToDateTime(currentDate) 
        };
    }

    static calculateMatchDateTimeDifferenceFromCurrentOld(matchDateTime) {
        let mMili = matchDateTime.getTime();

        let d = new Date();
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;
        let offset = 1;
        let ausMelTime = utc + (3600000 * offset);
        const MILLI_DIFF = Math.abs(ausMelTime - mMili);
        let nd = new Date(ausMelTime);
        var monthName = HelperFunctions.prettyDate(matchDateTime);
        return {
            isLive: ausMelTime > mMili, // if match is live
            days: Math.floor(MILLI_DIFF / (1000 * 60 * 60 * 24)),
            milliSeconds: MILLI_DIFF,
            monthDate: monthName
        };
    }

    static convertMS(milliseconds) {
        var day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        return {
            day: DateHelper.appendZero(day),
            hour: DateHelper.appendZero(hour),
            minute: DateHelper.appendZero(minute),
            second: DateHelper.appendZero(seconds)
        };
    }

    static appendZero(number) {
        return number < 10 ? '0' + number : '' + number
    }

    static convertTimeTo12HourFrom24Hour(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        const timeToReturn = time.join(''); // return adjusted time or original string
        const newTime = timeToReturn.replace(timeToReturn.substr(timeToReturn.lastIndexOf(':'), 3), '');
        return newTime;
    };

    static getDayNameFromDate(dateString) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let d = new Date(dateString);
        let dayName = days[d.getDay()];
        return dayName;
    }

    static getMonthNameFromDate(dateString) {
        let days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let d = new Date(dateString);
        let name = days[d.getMonth()];
        return name;
    }

    static getShortDayNameFromDate(dateString) {
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        let d = new Date(dateString);
        let dayName = days[d.getDay()];
        return dayName;
    }

    static getDayFromDate(dateString) {
        let d = new Date(dateString);
        return d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    }

    static convertDateStringInSlashFormat(dateString) {
        const dateSplitArr = dateString.split('-');
        return dateSplitArr[2] + '/' + dateSplitArr[1] + '/' + dateSplitArr[0];
    }

    static getYearFromDate(dateString) {
        const dateSplitArr = dateString.split('-');
        return dateSplitArr[0];
    }

    static getFullDateWithDay(dateWithTime) {
        const arr = dateWithTime.split(" ");
        const dateString = arr[0], timeString = arr[1];
        const day = DateHelper.getDayNameFromDate(dateString);
        const date = DateHelper.getDayFromDate(dateString);
        const month = DateHelper.getMonthNameFromDate(dateString);
        const year = DateHelper.getYearFromDate(dateString);
        const time = DateHelper.convertTimeTo12HourFrom24Hour(timeString);
        return { day, date, month, year, time }
    }

    static getActiveWeek() {
        const curr = new Date; // get current date
        const temp = new Date; // get current date
        var lastday = temp.getDate() - temp.getDay() + 6;
        var last = new Date(temp.setDate(lastday));
        var today = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate());
        var lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));
        var lastSundayDate = lastSunday.getDate();

        //if current day is sunday then sunday date will be current otherwise always get last sunday date
        if (today.getDate() === 0) {
            lastSundayDate = today.getDate();
        }

        return lastSundayDate + "-" + last.getDate();
    }

    static getNextDate() {
        var day = new Date();
        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        return nextDay.getDate();
    }


    static getCurrentMonth() {
        const curr = new Date; // get current date
        return this.getMonthName(curr.getMonth());
    }

    static getCurrentYear() {
        const curr = new Date; // get current date
        return curr.getFullYear();
    }

    static getCurrentTimeStamp() {
        const dt = new Date; // get current date
        let currMonth = dt.getMonth() < 10 ? '0' + (dt.getMonth() + 1) : (dt.getMonth() + 1);
        const currdate = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        return dt.getFullYear() + '' + currMonth + '' + currdate + '' + dt.getHours() + '' + dt.getMinutes() + '' + dt.getSeconds()
    }

    static formatDateForFunfacts(date) {
        var d = new Date(date),
            month = '' + DateHelper.getMonthName(d.getMonth()),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;


        return month + " " + day + ", " + year;
    }

    static convertToDateTime(str) {
        var date = new Date(str);
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let hours = ("0" + date.getHours()).slice(-2);
        let minutes = ("0" + date.getMinutes()).slice(-2);
        let sec = ("0" + date.getSeconds()).slice(-2);

        return date.getFullYear() + "-" + mnth + "-" + day + " " + hours + ":" + minutes + ":" + sec;
    }

}