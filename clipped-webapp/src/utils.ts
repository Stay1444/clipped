export function titleCase(str: string): string {
  return str
    .replace(/_/g, " ")
    .toLowerCase()   // Convert the entire string to lowercase
    .replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase();
    }); // Capitalize the first letter of each word
}