import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { BeachesArray } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const beachesApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const beaches = await db.beachStore.getAllBeaches();
        return beaches;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all beachesApi",
    notes: "Returns details of all beachesapi",
    response: { schema: BeachesArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const beach = await db.beachStore.getBeachById(request.params.id);
        if (!beach) {
          return Boom.notFound("No Beach with this id");
        }
        return beach;
      } catch (err) {
        return Boom.serverUnavailable("No Beach with this id");
      }
    },
    tags: ["api"],
    description: "Find all beachesApi",
    notes: "Returns details of specific beach",
    response: { schema: BeachesArray, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const beach = request.payload;
        const newBeach = await db.beachStore.addBeach(beach);
        if (newBeach) {
          return h.response(newBeach).code(201);
        }
        return Boom.badImplementation("error creating beach");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create beachesApi",
    notes: "Create beachesapi",
    response: { schema: BeachesArray, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const beach = await db.beachStore.getBeachById(request.params.id);
        if (!beach) {
          return Boom.notFound("No Beach with this id");
        }
        await db.beachStore.deleteBeachById(beach._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Beach with this id");
      }
    },
    tags: ["api"],
    description: "Delete specific beach api",
    notes: "Delete specific beach",
    response: { schema: BeachesArray, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.beachStore.deleteAllBeaches();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all beachesApi",
    notes: "Delete all beachesapi",
    response: { schema: BeachesArray, failAction: validationError },
  },
};