// Utility to wrap route handlers with internet connectivity and error handling
// Usage: export default defineEventHandler(withErrorHandling(async (event) => { ... }, options))

import { generalResponse } from "@/types";
import { NextResponse } from "next/server";
import ping from "./ping";

// Extend H3Event to include our custom properties
interface Event {
  isOnline: "online" | "offline";
}

interface ErrorHandlingOptions {
  skipProcesses?: Array<keyof generalResponse>;
}

interface ErrorWithStatus {
  message?: string;
  statusCode?: number;
}

export default async function withErrorHandling<ReturnT>(
  handler: (event: Event) => Promise<Partial<generalResponse> & ReturnT>,
  options: ErrorHandlingOptions = {}
) {
  const isOnline = (await ping()) ? "online" : "offline";

  const responseFunction = (async function (event: Event) {
    try {
      // 1. Internet connectivity check
      if (
        isOnline === "offline" &&
        !options.skipProcesses?.includes("connectionActivity")
      ) {
        return {
          status: "bad",
          connectionActivity: "offline",
          statusCode: 503,
          message: "Service unavailable: cannot reach the internet.",
        };
      }

      // 3. Attach isOnline to event for downstream use
      event.isOnline = isOnline;

      // 4. Execute handler
      return {
        message: "Request processed successfully",
        ...(await handler(event)),
        connectionActivity: isOnline,
        statusCode: 200, // Default status code
        success: true,
        status: "good", // Default status
      };
    } catch (error) {
      // Convert error to meaningful message
      let message = "Internal server error";
      let statusCode = 500;

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else if (error && typeof error === "object") {
        const err = error as ErrorWithStatus;
        message = err.message || message;
        statusCode = err.statusCode || statusCode;
      }
      return {
        status: "bad",
        connectionActivity: "online",
        statusCode,
        message,
        success: false,
      };
    }
  })({ isOnline });
  
  return NextResponse.json(await responseFunction, {
    status: (await responseFunction).statusCode || 200,
  });
}
