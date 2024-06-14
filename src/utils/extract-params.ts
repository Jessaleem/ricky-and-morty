export function extractExistingParams(searchParams: URLSearchParams): Record<string, string> {
  const entries: [string, string][] = Array.from(searchParams.entries());
  return entries.reduce<Record<string, string>>((acc, [key, value]) => {
    if (!acc[key]) {
    acc[key] = '';
    }
    acc[key] = value;
    return acc;
  }, {});
}