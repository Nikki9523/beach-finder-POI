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

  async createCategory(playlist) {
    const res = await axios.post(`${this.playtimeUrl}/api/playlists`, playlist);
    return res.data;
  },

  async deleteAllCategories() {
    const response = await axios.delete(`${this.playtimeUrl}/api/playlists`);
    return response.data;
  },

  async deleteCategory(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/playlists/${id}`);
    return response;
  },

  async getAllCategories() {
    const res = await axios.get(`${this.playtimeUrl}/api/playlists`);
    return res.data;
  },

  async getCategory(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/playlists/${id}`);
    return res.data;
  },
};