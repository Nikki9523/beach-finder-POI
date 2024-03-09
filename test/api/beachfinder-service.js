import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const beachfinderService = {
  beachFinderUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.beachFinderUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.beachFinderUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.beachFinderUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.beachFinderUrl}/api/users`);
    return res.data;
  },
};