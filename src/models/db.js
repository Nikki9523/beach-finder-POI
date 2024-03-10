import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { beachMemStore } from "./mem/beach-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { beachJsonStore } from "./json/beach-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";


export const db = {
  userStore: null,
  categoryStore: null,
  beachStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.categoryStore = categoryJsonStore;
        this.beachStore = beachJsonStore;
        break;
        case "mongo":
          this.userStore = userMongoStore;
          connectMongo();
          break;
      default:
        this.userStore = userMemStore;
        this.categoryStore = categoryMemStore;
        this.beachStore = beachMemStore;
    }
  },
};