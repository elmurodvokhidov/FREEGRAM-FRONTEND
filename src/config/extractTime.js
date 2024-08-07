export const extractTime = (date) => {
    const DATE = new Date(date);
    let hours = DATE.getHours();
    const minutes = DATE.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${period}`;
}