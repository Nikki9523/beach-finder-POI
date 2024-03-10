import { categoryApi } from "./api/categories-api.js";
import { userApi } from "./api/user-api.js";
import { beachesApi } from "./api/beaches-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

  { method: "GET", path: "/api/beaches", config: beachesApi.find },
  { method: "GET", path: "/api/beaches/{id}", config: beachesApi.findOne },
  { method: "POST", path: "/api/categories/{id}/beaches", config: beachesApi.create },
  { method: "DELETE", path: "/api/beaches", config: beachesApi.deleteAll },
  { method: "DELETE", path: "/api/beaches/{id}", config: beachesApi.deleteOne },
];