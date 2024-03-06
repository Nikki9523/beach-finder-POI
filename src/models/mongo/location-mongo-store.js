import { Location } from "./location.js";

export const userMongoStore = {
  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  async addLocation(location) {
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    const locationById = await this.getLocationById(locationObj._id);
    return locationById;
  },

  async getLocationByName(name) {
    const location = await Location.findOne({ name: name }).lean();
    return location;
  },

  async deleteLocationById(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Location.deleteMany({});
  }
};