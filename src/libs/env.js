import dotenv from "dotenv";
import path from "path";

const result = dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === "production" ? ".env" : ".env.local",
  ),
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

export default result.parsed;

