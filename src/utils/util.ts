export function formatDate(timestamp: number): string {
  const date: Date = new Date(timestamp);
  const months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month: string = months[date.getMonth()];
  const day: number = date.getDate();
  const suffix: string = getDaySuffix(day); // Function to get the day suffix (e.g., 'st', 'nd', 'rd', 'th')
  const year: number = date.getFullYear();

  return `${month} ${day}${suffix}, ${year}`;
}

function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
