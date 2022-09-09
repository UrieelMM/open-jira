import mongoose from "mongoose";

const mongoConnection = {
  isConnected: 0,
};

export const connectDB = async () => {
  if (mongoConnection.isConnected) return;

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) return;
    await mongoose.disconnect();
  }

  await mongoose.connect("...");
  mongoConnection.isConnected = 1;
  console.log("Conectado a MongoDB");
};

export const disconnectDB = async () => {
  if (mongoConnection.isConnected != 0) return;
  await mongoose.disconnect();
};
