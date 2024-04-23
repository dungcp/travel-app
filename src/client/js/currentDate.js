export function currentDate() {
  // Get Default Date Format
  const todayDefault = new Date();

  // Get Year
  const year = todayDefault.getFullYear();

  // Get + Customize Month
  const month = todayDefault.getMonth() + 1;
  const monthCustom = month < 10 ? "0" + month : month;

  // Get + Customize Day
  const day = todayDefault.getDate();
  const dayCustom = day < 10 ? "0" + day : day;

  // Custom Date String
  const todayCustom = `${year}-${monthCustom}-${dayCustom}`;

  return todayCustom;
}
