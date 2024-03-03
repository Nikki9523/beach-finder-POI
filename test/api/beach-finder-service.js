import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const beachFinderService = {
  beachfinderUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.beachfinderUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.beachfinderUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.beachfinderUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.beachfinderUrl}/api/users`);
    return res.data;
  },
};