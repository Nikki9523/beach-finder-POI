import { userMemStore } from "./mem/user-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { beachMemStore } from "./mem/beach-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { beachJsonStore } from "./json/beach-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";


export const db = {
  userStore: null,
  locationStore: null,
  beachStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.locationStore = locationJsonStore;
        this.beachStore = beachJsonStore;
        break;
        case "mongo":
          this.userStore = userMongoStore;
          connectMongo();
          break;
      default:
        this.userStore = userMemStore;
        this.locationStore = locationMemStore;
        this.beachStore = beachMemStore;
    }
  },
};