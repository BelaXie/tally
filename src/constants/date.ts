let years = [];
let months = [];
const currentYear = new Date().getFullYear();
for (let i = 1900; i <= currentYear; i++) {
  years.push(i);
}
for (let i = 1; i <= 12; i++) {
  months.push(i);
}
const DB_Date = Object.freeze({
  year: [...years],
  month: [...months],
  day: [],
});
export default DB_Date;
