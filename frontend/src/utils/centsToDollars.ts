export function centsToDollars(cents: number): string {
    const dollars = Math.floor(cents / 100);
    const centsRemainder = cents % 100;
    return dollars + "." + centsRemainder.toString().padStart(2, "0");
  }
  