// This is my "oh boy I really wish we used a real date library" cosplay.
export function wasYesterday(date : Date, now : Date) : boolean {
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let isLeapYear = (now.getFullYear() % 4 === 0) && ((now.getFullYear() % 100 !== 0) || (now.getFullYear() % 400 === 0));
    if (isLeapYear) {
        daysInMonth[1] = 29;
    }

    if (now.getDate() === 1) {
        if (now.getMonth() === 0) {
            return (date.getFullYear() === now.getFullYear() - 1) && (date.getMonth() === 11) && (date.getDate() === 31);
        } else {
            let lastMonth = now.getMonth() - 1;
            return (date.getFullYear() === now.getFullYear()) && (date.getMonth() === lastMonth) && (date.getDate() === daysInMonth[lastMonth]);
        }
    } else {
        return (date.getFullYear() === now.getFullYear()) && (date.getMonth() === now.getMonth()) && (date.getDate() === now.getDate() - 1);
    }
}
