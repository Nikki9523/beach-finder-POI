import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const beachJsonStore = {
  async getAllBeaches() {
    await db.read();
    return db.data.beaches;
  },

  async addBeach(locationId, beach) {
    await db.read();
    beach._id = v4();
    beach.locationid = locationId;
    db.data.beaches.push(beach);
    await db.write();
    return beach;
  },

  async getBeachesByLocationId(id) {
    await db.read();
    return db.data.beaches.filter((beach) => beach.locationid === id);
  },

  async getBeachById(id) {
    await db.read();
    return db.data.beaches.find((beach) => beach._id === id) || null;
  },

  async deleteBeachById(id) {
    await db.read();
    const index = db.data.beaches.findIndex((beach) => beach._id === id);
    if (index !== -1) db.data.beaches.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.beaches = [];
    await db.write();
  },

  async updateBeach(beach, updatedBeach) {
    beach.name = updatedBeach.name;
    beach.waterQuality = updatedBeach.waterQuality;
    beach.beachLength = updatedBeach.beachLength;
    await db.write();
  },
};