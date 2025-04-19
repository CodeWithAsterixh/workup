import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("templates/:id", "routes/templateCard.tsx"),
  route("templates", "routes/templates.tsx"),
] satisfies RouteConfig;
