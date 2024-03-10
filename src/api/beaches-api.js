import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { BeachSpec } from "../models/joi-schemas.js";

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
  },
};