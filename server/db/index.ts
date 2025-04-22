import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connnection = await mongoose.connect(process.env.MONGO_URI as string, {
      tls: true, // Ensure TLS is enabled
    });
    console.log(`Database Connected Successfully`);
  } catch (error) {
    console.log("DB Error:" + error);
    console.log("Retrying connection in 5 seconds...");
    setTimeout(dbConnection, 15000);
  }
};

export default dbConnection;
