/* eslint-disable @typescript-eslint/no-explicit-any */

export default function errorStringToObject (errorObj:Record<string, any>): string {
  // errorObj should be the value of "message" in your example
  if (!errorObj || !errorObj.errors) return "validation failed";

  const fieldMessages = Object.entries(errorObj.errors).map(
    ([field, details]) => {
      // Remove backticks from the message for readability
      const message = (details as { message: string }).message;
      let msg = message.replace(/`/g, "");
      // Optionally, remove "Path " prefix for a cleaner look
      msg = msg.replace(/^Path /, "Path ");
      if (field.toLowerCase().includes("password")){
        const errorField = errorObj.errors[field];
        const passwordValue = errorField?.value || "password";
        msg = msg.replace(passwordValue, "*".repeat(passwordValue.length));
      }
      return `${field}: ${msg}`;
    }
  );

  return `validation failed: ${fieldMessages.join(", ")}`;
}
