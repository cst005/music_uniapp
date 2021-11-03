exports.timestampToDate = function(format, timestamp) {
	if (!timestamp) {
		return timestamp
	}

	var date = getDate(parseInt(timestamp))
	var year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds();
	var re = getRegExp("[YyMmDdHhSs]+", 'g');
	var str = format.replace(re, function(w) {

		if (w == 'yy' || w == 'YY' || w == 'y' || w == 'Y') {
			return year.toString().substring(2);

		} else if (w == 'yyyy' || w == 'YYYY') {
			return year;

		} else if (w == 'MM') {
			return month >= 10 ? month : '0' + month;

		} else if (w == 'M') {
			return month;

		} else if (w == 'DD' || w == 'dd') {
			return day >= 10 ? day : '0' + day;

		} else if (w == 'D' || w == 'd') {
			return day;

		} else if (w == 'HH' || w == 'hh') {
			return hour >= 10 ? hour : '0' + hour;

		} else if (w == 'H' || w == 'h') {
			return hour;

		} else if (w == 'mm') {
			return minute >= 10 ? minute : '0' + minute;

		} else if (w == 'm') {
			return minute;

		} else if (w == 'ss' || w == 's') {
			return second >= 10 ? second : '0' + second;
		}
	});

	return str;
}

exports.playCounFormat = function(str) {
	var playcount = parseInt(str)
	if (playcount >= 100000) {
		playcount = playcount / 10000
		playcount = playcount.toFixed(1)
		str = playcount + '万'
	}
	return str;
}
