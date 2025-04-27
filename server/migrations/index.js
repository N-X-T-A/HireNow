const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const folderPath = __dirname;

async function importData() {
  try {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      if (path.extname(file) !== ".json") continue;
      const collectionName = path.basename(file, ".json");
      const filePath = path.join(folderPath, file);

      const fileContent = fs.readFileSync(filePath, "utf-8");
      let documents;

      try {
        documents = JSON.parse(fileContent);
      } catch (err) {
        console.error(`Failed to parse JSON in file: ${file}`);
        continue;
      }

      if (!Array.isArray(documents)) {
        documents = [documents];
      }

      documents = documents.map((doc) => {
        if (doc._id && doc._id.$oid) {
          doc._id = new ObjectId(doc._id.$oid);
        }
        if (doc.user_id && doc.user_id.$oid) {
          doc.user_id = new ObjectId(doc.user_id.$oid);
        }
        if (doc.job_id && doc.job_id.$oid) {
          doc.job_id = new ObjectId(doc.job_id.$oid);
        }

        if (doc.applied_date && doc.applied_date.$date) {
          doc.applied_date = new Date(doc.applied_date.$date);
        }

        return doc;
      });

      const collection = mongoose.connection.collection(collectionName);

      try {
        if (documents.length > 0) {
          await collection.insertMany(documents);
          console.log(`Imported ${file} successfully.`);
        }
      } catch (err) {
        console.error(`Failed to import ${file}:`, err.message);
      }
    }

    console.log("Data import process completed.");
    process.exit(0);
  } catch (err) {
    console.error("Data import process failed:", err.message);
    process.exit(1);
  }
}

db.once("open", importData);
