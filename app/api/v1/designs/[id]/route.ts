import bodyErrorBoundary from "@/lib/serverUtils/bodyErrorBoundary";
import { supabaseClient } from "@/lib/serverUtils/createSupabaseClient";
import withErrorHandling from "@/lib/serverUtils/withErrorHandling";
import { GetDesignSingle, PostDesignBody } from "../types";

export async function GET(
  // request: Request,
  // { params }: { params: Promise<{ id: string }> }
) {
  // const { id } = (await params) as { id: string };
  return withErrorHandling(async () => {
    const { data: design } = await supabaseClient.from("designs").select("id");
    if (!design || design.length === 0) {
      return {
        data: null,
        message: "No designs found.",
      };
    }
    return {
      statusCode: 200,
      data: design[0],
    };
  });
}

export async function POST(
  request: Request,
  // { params }: { params: Promise<{ id: string }> }
) {
  // const { id } = (await params) as { id: string };
  return withErrorHandling(async (event) => {
    const bodyObj = (await request.json()) as PostDesignBody;
    const { body, errorMessage, hasError } = bodyErrorBoundary<PostDesignBody>(
      bodyObj,
      [
        "name",
        "config.front",
        "config.back",
        "config.back.elements",
        "config.front.elements",
      ],
      {
        bodyLabel: "Sign In Body",
      }
    );
    if (!body || hasError) {
      return {
        connectionActivity: event.isOnline,
        status: "bad",
        statusCode: 400,
        message: errorMessage,
        data: null,
      };
    }
    const { data, error } = await supabaseClient.from("designs").insert(body);

    if (!data || error) {
      return {
        connectionActivity: event.isOnline,
        status: "bad",
        message: error?.message || "data not found",
        statusCode: 404,
        data: null,
      };
    }

    return {
      connectionActivity: event.isOnline,
      status: "good",
      statusCode: 200,

      data: data as GetDesignSingle,
    };
  });
}
