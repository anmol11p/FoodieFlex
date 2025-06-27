import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    const dbLink = process.env.DBLINK;
    await mongoose.connect(dbLink);
    console.log(`db connection built successfully`);
  } catch (error) {
    process.exit(0);
  }
};

export default dbconnect;
