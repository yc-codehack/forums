import moment from "moment";

// *TODO Refactor this code to optime and use of less if else
export const convertTimeToString = (time) => {
	if (time.asDays() < 1) {
		const timeString = parseInt(time.asHours());
		return timeString + " H";
	} else if (time.asDays() > 7 && time.asDays() < 30) {
		const timeString = parseInt(time.asWeeks());
		return timeString + " W";
	} else if (time.asWeeks() > 4 && time.asMonths() < 12) {
		const timeString = parseInt(time.asMonths());
		return timeString + " M";
	} else if (time.asMonths() > 12) {
		const timeString = parseInt(time.asYears());
		return timeString + " Y";
	} else {
		const timeString = parseInt(time.asDays());
		return timeString + " D";
	}
};
