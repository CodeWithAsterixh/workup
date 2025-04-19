import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("template/:id", "routes/templateCard.tsx"),
  route("templates", "routes/templates.tsx"),
] satisfies RouteConfig;
