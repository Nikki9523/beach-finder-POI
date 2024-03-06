import { Beach } from "./beach.js";

export const userMongoStore = {
  async getAllBeaches() {
    const beaches = await Beach.find().lean();
    return beaches;
  },

  async getBeachById(id) {
    if (id) {
      const beach = await Beach.findOne({ _id: id }).lean();
      return beach;
    }
    return null;
  },

  async addBeach(beach) {
    const newBeach = new Beach(beach);
    const beachObj = await newBeach.save();
    const beachById = await this.getBeachById(beachObj._id);
    return beachById;
  },

  async getBeachByName(name) {
    const beach = await Beach.findOne({ name: name }).lean();
    return beach;
  },

  async deleteBeachById(id) {
    try {
      await Beach.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Beach.deleteMany({});
  }
};