export function getDayOrNightIcon(iconName: string, dateTimeString: string): string {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const isDay = hours > 6 && hours < 18;
    return isDay ? iconName.replace(/.$/, 'd') : iconName.replace(/.$/, 'n');
}