import dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

export default result.parsed;

