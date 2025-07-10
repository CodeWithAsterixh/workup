// app/api/user/route.ts
import bodyErrorBoundary from "@/lib/serverUtils/bodyErrorBoundary";
import { supabaseClient } from "@/lib/serverUtils/createSupabaseClient";
import withErrorHandling from "@/lib/serverUtils/withErrorHandling";
import { SignUpBody } from "./types";

export async function POST(request: Request) {
  return await withErrorHandling(async (event) => {
    const bodyObj = (await request.json()) as SignUpBody;
    const { body, errorMessage, hasError } = bodyErrorBoundary<SignUpBody>(
      bodyObj,
      ["email", "password","username" ],
      {
        bodyLabel: "Sign In Body",
        checkers: {
          email: {
            action(value) {
              return typeof value === "string" && value.includes("@");
            },
            message: "Email must be a valid email address.",
          },
          password: {
            action(value) {
              return typeof value === "string" && value.length >= 6;
            },
            message: "Password must be at least 6 characters long.",
          },
          username: {
            action(value) {
              return typeof value === "string" && value.length >= 3;
            },
            message: "Username must be at least 3 characters long.",
          },
        },
      }
    );

    if (hasError || !body) {
      return {
        status: "bad",
        connectionActivity: event.isOnline,
        statusCode: 400,
        message: errorMessage,
      };
    }
    const { email, password,username } = body;
    const {
      data: { session,user },
      error,
    } = await supabaseClient.auth.signUp({
      email,
      password,
      options:{
        data: {
          username,
        }
      }
    });
    if (error) {
      return {
        status: "bad",
        connectionActivity: event.isOnline,
        statusCode: error.status || 503,
        message: error.message,
      };
    }
    return {
      status: "good",
      connectionActivity: "online",
      statusCode: 200,
      message: "Sign up successful",
      data: { session,user },
    };
  });
}
