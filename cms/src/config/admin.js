import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Resource, Database } from "@adminjs/mongoose";
import { Component, componentLoader } from "#component/component-loader.js";
import { blogResource } from "#resources/blog.js";
import { TagResource } from "#resources/tag.js";
import dotenv from "dotenv";
import { PlanResource } from "#resources/plan.js";
import { getDashboardData } from "#utils/dashboard-metrics.js";
dotenv.config();

AdminJS.registerAdapter({
  Resource: Resource,
  Database: Database,
});

const adminJS = new AdminJS({
  componentLoader,
  branding: {
    companyName: "HireNow",
    styles: "#public/styles/global.css",
    logo: "/static/images/logo.svg",
    favicon: "/static/images/favicon.ico",
    softwareBrothers: false,
  },
  resources: [blogResource, TagResource, PlanResource],
  rootPath: "/admin",
  dashboard: {
    handler: async (req, res, context) => {
      return await getDashboardData(req);
    },
    component: Component.MainDashboard,
  },
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
  authenticate: async (email, password) => {
    if (email === "admin@example.com" && password === "1") {
      return { email };
    }
    return null;
  },
  cookiePassword: "secure-password",
});

export default adminRouter;
