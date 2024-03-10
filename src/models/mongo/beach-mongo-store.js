import { Beach } from "./beach.js";
import { Category } from "./category.js"; 

export const beachMongoStore = {
  async getAllBeaches() {
    const beaches = await Beach.find().lean();
    return beaches;
  },

  async addBeach(categoryId, beach) { 
    beach.categoryid = categoryId;
    const newBeach = new Beach(beach);
    const beachObj = await newBeach.save();
    return this.getBeachById(beachObj._id);
  },

  async getBeachesByCategoryId(id) {
    const beaches = await Beach.find({ categoryid: id }).lean();
    return beaches;
  },

  async getBeachById(id) {
    if (id) {
      const beach = await Beach.findOne({ _id: id }).lean();
      return beach;
    }
    return null;
  },

  async deleteBeach(id) {
    try {
      await Beach.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Beach.deleteMany({});
  },

  async updateBeach(beach, updatedBeach) {
    const beachDoc = await Beach.findOne({ _id: beach._id });
    beachDoc.title = updatedBeach.title;
    beachDoc.artist = updatedBeach.artist;
    beachDoc.duration = updatedBeach.duration;
    await beachDoc.save();
  },
};