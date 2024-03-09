import { v4 } from "uuid";

let beaches = [];

export const beachMemStore = {
  async getAllBeaches() {
    return beaches;
  },

  async addBeach(locationId, beach) {
    beach._id = v4();
    beach.locationid = locationId;
    beaches.push(beach);
    return beach;
  },

  async getBeachesByLocationId(id) {
    return beaches.filter((beach) => beach.locationid === id);
  },

  async getBeachById(id) {
    return beaches.find((beach) => beach._id === id);
  },

  async getLocationBeaches(locationId) {
    return beaches.filter((beach) => beach.locationid === locationId);
  },

  async deleteBeach(id) {
    const index = beaches.findIndex((beach) => beach._id === id);
    beaches.splice(index, 1);
  },

  async deleteAllBeaches() {
    beaches = [];
  },

  async updateBeach(beach, updatedbeach) {
    beach.name = updatedbeach.name;
    beach.waterQuality = updatedbeach.waterQuality;
    beach.beachLength = updatedbeach.beachLength;
  },
};
