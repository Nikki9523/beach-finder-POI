import { BeachSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Location",
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  addBeach: {
    validate: {
      payload: BeachSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentLocation = await db.locationStore.getLocationById(request.params.id);
        return h.view("location-view", { title: "Add beach error", location:currentLocation, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newBeach = {
        name: request.payload.name,
        description: request.payload.description,
        location: request.payload.location,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        waterQuality: request.payload.waterQuality,
        beachLength: Number(request.payload.beachLength)
      };
      await db.beachStore.addBeach(location._id, newBeach);
      return h.redirect(`/location/${location._id}`);
    },
  },

  deleteBeach: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.beachStore.deleteBeachById(request.params.beachid);
      return h.redirect(`/location/${location._id}`);
    },
  },
};
