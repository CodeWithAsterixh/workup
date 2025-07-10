export function splitCamelCase(str:string) {
  return str
    // insert space between a lowercase letter and uppercase letter
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // (optional) trim in case there's leading/trailing whitespace
    .trim();
}