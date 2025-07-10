export default function isDev() {
    // This function checks if the environment is development
    // and returns true if it is, otherwise false.
    return process.env.NODE_ENV === "development";
}