const app = require("./app");
const connectDB = require("./config/mongo.config");
require("dotenv").config();

const PORT = process.env.APP_PORT || 3001;

connectDB();

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
