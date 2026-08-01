export function parsePort(
  value: string | undefined,
  defaultPort: number,
): number {
  if (value === undefined || value === '') {
    return defaultPort;
  }

  if (!/^\d+$/.test(value)) {
    return Number.NaN;
  }

  return Number(value);
}
