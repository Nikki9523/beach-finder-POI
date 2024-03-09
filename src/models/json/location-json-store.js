import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { beachJsonStore } from "./beach-json-store.js";

export const locationJsonStore = {
  async getAllLocations() {
    await db.read();
    return db.data.locations;
  },

  async addLocation(location) {
    await db.read();
    location._id = v4();
    db.data.locations.push(location);
    await db.write();
    return location;
  },


  async getLocationById(id) {
    await db.read();
    const list = db.data.locations.find((location) => location._id === id);
    list.beaches = await beachJsonStore.getBeachesByLocationId(list._id);
    return list || null;
  },

  async getUserLocations(userid) {
    await db.read();
    return db.data.locations.filter((location) => location.userid === userid);
  },

  async deleteLocationById(id) {
    await db.read();
    const index = db.data.locations.findIndex((location) => location._id === id);
    if (index !== -1)  db.data.locations.splice(index, 1);
    await db.write();
  },

  

  async deleteAll() {
    db.data.locations = [];
    await db.write();
  },
};
