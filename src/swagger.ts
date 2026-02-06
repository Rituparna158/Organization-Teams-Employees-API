import { version } from "node:os";
import { Express } from "express";
//import swaggerJSDoc from "swagger-jsdoc";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HR Backend API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routers/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);
export function setSwagger(app: Express) {
  console.log("swagger loaded");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
