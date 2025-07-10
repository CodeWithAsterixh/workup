// app/api/user/route.ts
import bodyErrorBoundary from "@/lib/serverUtils/bodyErrorBoundary";
import { supabaseClient } from "@/lib/serverUtils/createSupabaseClient";
import withErrorHandling from "@/lib/serverUtils/withErrorHandling";
import { cookies } from "next/headers";
import { SignInBody } from "./types";

export async function POST(request: Request) {
  const nextCookie = await cookies()
  return await withErrorHandling(async () => {
    const bodyObj = (await request.json()) as SignInBody;
    const { body, errorMessage, hasError } = bodyErrorBoundary<SignInBody>(
      bodyObj,
      ["email", "password"],
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
        },
      }
    );

    if (hasError || !body) {
      return {
        statusCode: 400,
        message: errorMessage,
        
      };
    }
    const { email, password } = body;
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !session) {
      return {
        statusCode: error?.status || 503,
        message: error?.message || "No session token available.",
      };
    }
    nextCookie.set("access_token", session.access_token, {
      maxAge: session.expires_in,
    })
    nextCookie.set("access_token", session.refresh_token)
    return {
      statusCode: 200,
      message: "Sign in successful.",
      data: { refresh_token: session.refresh_token, access_token: session.access_token },
    };
  });
}
