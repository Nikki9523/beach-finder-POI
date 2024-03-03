import { v4 } from "uuid";

let beaches = [];

export const beachMemStore = {
  async getAllbeaches() {
    return beaches;
  },

  async addbeach(locationId, beach) {
    beach._id = v4();
    beach.locationid = locationId;
    beaches.push(beach);
    return beach;
  },

  async getbeachesByLocationId(id) {
    return beaches.filter((beach) => beach.locationid === id);
  },

  async getbeachById(id) {
    return beaches.find((beach) => beach._id === id);
  },

  async getLocationbeaches(locationId) {
    return beaches.filter((beach) => beach.locationid === locationId);
  },

  async deletebeach(id) {
    const index = beaches.findIndex((beach) => beach._id === id);
    beaches.splice(index, 1);
  },

  async deleteAllbeaches() {
    beaches = [];
  },

  async updatebeach(beach, updatedbeach) {
    beach.title = updatedbeach.title;
    beach.artist = updatedbeach.artist;
    beach.duration = updatedbeach.duration;
  },
};
