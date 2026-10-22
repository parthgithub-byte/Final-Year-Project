import { config } from "./config.js";
import { createApp } from "./app.js";

createApp().listen(config.PORT, () => {
  console.log(`API listening on http://localhost:${config.PORT}`);
});
