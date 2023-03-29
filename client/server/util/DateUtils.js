export class DateUtils {
    static convertFrenchDateToDataBase(date) {
        const dateArray = date.split('/');
        return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    }
    static convertTimeToDataBase(time) {
        const timeArray = time.split(':');
        return `${timeArray[0]}:${timeArray[1]}`;
    }
    static convertTimeToDate(time) {
        return new Date(`1970-01-01T${time}`);
    }
}
