import withErrorHandling from "@/lib/serverUtils/withErrorHandling";
import { healthChecker } from "./types";
import connectMongoDb from "@/lib/serverUtils/connect-mongo-db";

export function GET() {
  return withErrorHandling<healthChecker>(
    async (event) => {
      const mongoResult = await connectMongoDb();
      const mongoAvailable = mongoResult.mongoDbStatus === "online";

      // Build a sophisticated status message
      const issues: string[] = [];

      if (!event.isOnline) {
        issues.push("Unable to reach the Internet");
      }
      if (!mongoAvailable) {
        issues.push("MongoDB connection failed");
      }

      const message = issues.length
        ? `Warning: ${issues.join(", ")}.
Please check your network and service configurations.`
        : "All systems are operational and running smoothly.";

      return {
        connectionActivity: event.isOnline ? "online" : "offline",
        status: event.isOnline && mongoAvailable ? "good" : "bad",
        statusCode: event.isOnline && mongoAvailable ? 200 : 503,
        mongoDbStatus: mongoResult.mongoDbStatus,
        message,
      };
    },
    { skipProcesses: ["connectionActivity"] }
  );
}
