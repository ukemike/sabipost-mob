import moment from "moment";

export const formatDate = (initialDate: any): any => {
  const formatted = moment(initialDate).format("dddd, Do MMMM YYYY");
  return formatted;
};

export const formatTime = (initialDate: string): string => {
  const formatted = moment(initialDate).format("h:mm a");
  return formatted;
};

export const formatDays = (initialDate: string): string => {
  const formatted = moment(initialDate).fromNow();
  return formatted;
};

export const shortenText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + "...";
};

export const formatDate2 = (initialDate: string): string => {
  const formatted = moment(initialDate).format("DD MMM YYYY");
  return formatted;
};

// 09 h
export const formatTime2 = (initialDate: string): string => {
  const formatted = moment(initialDate).format("HH:mm");
  return formatted;
};

// 2023-09-29T15:37:00.000Z to June 22 . 08.30 pm - 9:30 pm
export const formatDateTime = (initialDate: string): string => {
  const formatted = moment(initialDate).format("MMMM DD . hh:mm a");
  return formatted;
};

// from 2023-09-21T14:47:20.760Z to Today | 09:24 AM
export const formatDateTime2 = (initialDate: string): string => {
  const formatted = moment(initialDate).format("DD MMM YYYY | hh:mm A");
  return formatted;
};

export const numberFormat = (value: any) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NGN",
    // minimumSignificantDigits: 3,
    maximumSignificantDigits: 3,
  }).format(value);
