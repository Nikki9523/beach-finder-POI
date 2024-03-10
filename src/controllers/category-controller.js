import { BeachSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "Category",
        category: category,
      };
      return h.view("category-view", viewData);
    },
  },

  addBeach: {
    validate: {
      payload: BeachSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentCategory = await db.categoryStore.getCategoryById(request.params.id);
        return h.view("category-view", { title: "Add beach error", category:currentCategory, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newBeach = {
        name: request.payload.name,
        description: request.payload.description,
        category: request.payload.category,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        waterQuality: request.payload.waterQuality,
        beachLength: Number(request.payload.beachLength)
      };
      await db.beachStore.addBeach(category._id, newBeach);
      return h.redirect(`/category/${category._id}`);
    },
  },

  deleteBeach: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.beachStore.deleteBeachById(request.params.beachid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};
