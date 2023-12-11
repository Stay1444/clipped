export function titleCase(str: string): string {
  return str
    .replace(/_/g, " ")
    .toLowerCase() // Convert the entire string to lowercase
    .replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase();
    }); // Capitalize the first letter of each word
}

export function formatDuration(duration: number): string {
  duration = Math.floor(duration);

  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  while (duration > 3600 && duration - 3600 > 0) {
    duration -= 3600;
    hours++;
  }

  while (duration > 60 && duration - 60 > 0) {
    duration -= 60;
    minutes++;
  }

  seconds = duration;

  let result = "";

  if (hours > 0) {
    result += `${hours}h `;
  }

  if (minutes > 0) {
    result += `${minutes}m `;
  }

  if (seconds > 0) {
    result += `${seconds}s`;
  }

  return result.trim();
}

export function formatSize(size: number): string {
  size = Math.floor(size);

  if (size > 1024 * 1024 * 1024) {
    // 1 gigabyte
    return `${+(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  } else if (size > 1024 * 1024) {
    // 1 megabyte
    return `${Math.round(size / (1024 * 1024))} MB`;
  } else if (size > 1024) {
    return `${Math.round(size / 1024)} KB`;
  } else {
    return `${size} B`;
  }
}

