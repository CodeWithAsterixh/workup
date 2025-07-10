import connectMongoDb from "./connect-mongo-db";
import makeUseOfMongoDb from "./use-mongo-db";

export default async function connectDbUsers () {
    const dbResponse = await connectMongoDb("users");

    if (dbResponse.mongoDbStatus === "online") {
        return makeUseOfMongoDb("users");
    } else {
        console.error("Failed to connect to MongoDB:", dbResponse.message);
        throw new Error("Failed to connect to MongoDB");
    }
}