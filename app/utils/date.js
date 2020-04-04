const padZero = str => str.toString().padStart(2, 0);

const format = (date, withHour = false) => {
	console.log('date', date);
	const dateToString = new Date(date);
	const Year = dateToString.getFullYear();
	const Month = dateToString.getMonth() + 1;
	const Day = dateToString.getDay();
	const Hour = dateToString.getHours();
	const Min = dateToString.getMinutes();
	const Sec = dateToString.getSeconds();
	if (withHour) {
		return `${Year}-${padZero(Month)}-${padZero(Day)} ${padZero(Hour)}:${padZero(Min)}:${padZero(Sec)}`
	}
	return `${Year}-${padZero(Month)}-${padZero(Day)}`;
};

export {
	format,
};
