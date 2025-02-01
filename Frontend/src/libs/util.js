 export function format_Time(date) {
  return new Date(date).toLocaleString("en", {
    hour: "2-digit",
    minute: "2-digit",
  });
}


