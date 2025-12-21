import dotenv from "dotenv";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";

dotenv.config();

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error("❌ Application start error:", error.message);
    process.exit(1);
  }
};

bootstrap();
