import bodyErrorBoundary from "@/lib/serverUtils/bodyErrorBoundary";
import { supabaseClient } from "@/lib/serverUtils/createSupabaseClient";
import withErrorHandling from "@/lib/serverUtils/withErrorHandling";
import { GetDesigns, PostDesignBody } from "./types";

export function GET() {
  return withErrorHandling<GetDesigns>(
    async (event) => {

      const s = await supabaseClient.from("designs").select();
      
      
      return {
        connectionActivity: event.isOnline,
        status: event.isOnline? "good" : "bad",
        statusCode: event.isOnline ? 200 : 503,
        data: [],
        rest:s,
        message:"Designs API is currently under development. Please check back later.",
      };


    },
  );
}

export function POST(request: Request) {
  return withErrorHandling<GetDesigns>(
    async (event) => {
const bodyObj = (await request.json()) as PostDesignBody;
    const { body } = bodyErrorBoundary<PostDesignBody>(
      bodyObj,
      ["name", "config.front", "config.back", "config.back.elements", "config.front.elements"],
      {
        bodyLabel: "Sign In Body",
      }
    );
    console.log(body)
      const s = supabaseClient.from("designs").select();
      

      return {
        connectionActivity: event.isOnline,
        status: event.isOnline? "good" : "bad",
        statusCode: event.isOnline ? 200 : 503,
        data: [],
        rest:s,
        message:"Designs API is currently under development. Please check back later.",
      };


    },
  );
}
