export function getDateString (timestamp) {
    const dateObj = new Date(timestamp);

    // Calculate the date in the format "ddMMYY"
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getUTCFullYear()).slice(-2);
    const formattedDate = day + '.' + month+ '.' + year;

    // Calculate the time
    const hours = String(dateObj.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
    const formattedTime = hours + ':' + minutes + ':' + seconds;

    return `${formattedDate} ${formattedTime}`;
}
