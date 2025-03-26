import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Resource, Database } from "@adminjs/mongoose";
import { componentLoader } from "#component/component-loader.js";
import { boxResource } from "#resources/box.js";

AdminJS.registerAdapter({
  Resource: Resource,
  Database: Database,
});

const adminJS = new AdminJS({
  componentLoader,
  branding: {
    companyName: "Titan CorporationVN",
    styles: "#public/styles/global.css",
  },
  resources: [boxResource],
  rootPath: "/admin",
  locale: {
    translations: {
      en: {
        resources: {
          box: {
            properties: {
              box_type_id: "Box Type",
            },
          },
        },
      },
    },
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
