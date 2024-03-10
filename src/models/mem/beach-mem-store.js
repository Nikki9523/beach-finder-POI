import { v4 } from "uuid";

let beaches = [];

export const beachMemStore = {
  async getAllBeaches() {
    return beaches;
  },

  async addBeach(categoryId, beach) {
    beach._id = v4();
    beach.categoryid = categoryId;
    beaches.push(beach);
    return beach;
  },

  async getBeachesByCategoryId(id) {
    return beaches.filter((beach) => beach.categoryid === id);
  },

  async getBeachById(id) {
    return beaches.find((beach) => beach._id === id);
  },

  async getCategoryBeaches(categoryId) {
    return beaches.filter((beach) => beach.categoryid === categoryId);
  },

  async deleteBeach(id) {
    const index = beaches.findIndex((beach) => beach._id === id);
    beaches.splice(index, 1);
  },

  async deleteAll() {
    beaches = [];
  },

  async updateBeach(beach, updatedbeach) {
    beach.name = updatedbeach.name;
    beach.waterQuality = updatedbeach.waterQuality;
    beach.beachLength = updatedbeach.beachLength;
  },
};
