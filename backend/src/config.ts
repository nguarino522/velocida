/** Shared config for application; can be required many places. */
import "colors"

export const PORT = process.env.PORT || 5227

export const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const getDatabaseUri = () => {
    return (process.env.NODE_ENV === "test")
        ? process.env.DATABASE_URL_TEST
        : process.env.DATABASE_URL
}

console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
// console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");