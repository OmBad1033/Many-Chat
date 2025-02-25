import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMonth = (month: number) => {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (month< 1 || month >12)
  {
    return "Invalid Month"
  }
  return months[month-1];
};

export const duplicationValidation = (arr:string[], element: string) => {
  if(!arr.find((t)=>t === element)){
    arr.push(element) //if element is not in the array push
    return arr
  } else {
    arr = arr.filter((t)=>t !== element) //if element is in the array remove
    return arr
  }
}
