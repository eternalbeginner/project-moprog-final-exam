import { PrismaClient } from "@prisma/client";

import env from "libs/env";

let prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      ...(env.NODE_ENV === "production"
        ? ["error", "info", "warn"]
        : ["error", "info"]),
    ],
  });

prisma.$use(async (params, next) => {
  switch (params.action) {
    case "findFirst":
    case "findFirstOrThrow":
    case "findUnique":
      params.action = "findFirst";
      params.args.where["deletedAt"] = null;
      break;
    case "findMany":
      if (params.args.where && params.args.where.deletedAt == undefined)
        params.args.where["deletedAt"] = null;
      else params.args["where"] = { deletedAt: null };
      break;
    case "update":
      params.action = "updateMany";
      params.args.where["deletedAt"] = null;
      break;
    case "updateMany":
      if (params.args.where && params.args.where.deletedAt != undefined)
        params.args.where["deletedAt"] = null;
      else params.args["where"] = { deletedAt: null };
      break;
    case "delete":
      params.action = "update";
      params.args["data"] = { deletedAt: new Date() };
      break;
    case "deleteMany":
      params.action = "updateMany";
      if (params.args.data != undefined)
        params.args.data["deletedAt"] = new Date();
      else params.args["data"] = { deletedAt: new Date() };
      break;
  }

  return next(params);
});

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;

