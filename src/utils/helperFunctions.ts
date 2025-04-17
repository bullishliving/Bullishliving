import moment from "moment";

export function formatDate(date: string | Date, format: string) {
  const jsDate = new Date(date)
  const dateObject = moment(jsDate);
  if (!dateObject.isValid()) {
    return
  }
  return dateObject.format(format);
}
