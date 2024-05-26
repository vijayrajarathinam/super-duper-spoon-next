import mongoose from "mongoose";

const connectToDb = async () => {
  // prettier-ignore
  const connectionUrl = "mongodb_url"
  const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };

  mongoose
    .connect(connectionUrl, clientOptions)
    .then(() => console.log("Database connected succesfully"))
    .catch((err) => console.log(err.message));
};

export default connectToDb;
