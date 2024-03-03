// import { userMemStore } from "./mem/user-mem-store.ts";
// import { locationMemStore } from "./mem/location-mem-store.ts";
// import { beachMemStore } from "./mem/beach-mem-store.ts";

import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { beachJsonStore } from "./json/beach-json-store.js";

export const db = {
  userStore: null,
  locationStore: null,
  beachStore: null,

  init() {
    this.userStore = userJsonStore;
    this.locationStore = locationJsonStore;
    this.beachStore = beachJsonStore;
  },
};
