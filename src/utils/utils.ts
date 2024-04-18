export function convertUTCToLocal(dateString: string) {
  const utcDate = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Karachi",
  };

  const localDateString = new Intl.DateTimeFormat("en-PK", options).format(
    utcDate
  );

  return localDateString;
}

export function formatPrice(price: number) {
  function formatNumber(number: number): string {
    const strNumber: string = number.toString();
    const decimalIndex: number = strNumber.indexOf(".");

    if (decimalIndex !== -1) {
      const integerPart: string = strNumber.slice(0, decimalIndex);
      const decimalPart: string = strNumber.slice(
        decimalIndex + 1,
        decimalIndex + 3
      );
      return `${integerPart}.${decimalPart}`;
    } else {
      return strNumber;
    }
  }

  if (price >= 10000000 && price <= 100000000) {
    const croreValue = price / 10000000;
    return `PKR ${formatNumber(croreValue)} crore`;
  } else if (price >= 100000 && price < 10000000) {
    const lacValue = price / 100000;
    return `PKR ${formatNumber(lacValue)} lac`;
  } else {
    return `PKR ${price.toLocaleString()}`;
  }
}

export function formatMileage(mileage: number): string {
  const formattedMileage = mileage.toLocaleString();
  return `${formattedMileage} km`;
}

export function formatKey(key: string): string {
  const words = key.split(/(?=[A-Z])/);
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return formattedWords.join(" ");
}
