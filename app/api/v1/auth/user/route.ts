// app/api/user/route.ts
import { supabaseClient } from "@/lib/serverUtils/createSupabaseClient";
import withErrorHandling from "@/lib/serverUtils/withErrorHandling";

export async function GET(request: Request) {
  return await withErrorHandling(async () => {
    // get header
    const auth = request.headers.get("authorization");
    const access_token = auth?.split(" ")[1] || "";
    if(!access_token) {
        return{
            statusCode: 401,
            message: "Unauthorized access, no access token provided."
        }
    }
    const {data:{user}, error} = await supabaseClient.auth.getUser(access_token);
    if(error){
        return{
            statusCode: error.status || 401,
            message: error.message || "Unauthorized access, invalid access token."
        }
    }
    
    return{
        data:user
    }
  });
}
