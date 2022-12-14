import type { NextApiRequest, NextApiResponse } from "next";
import { db, seedData } from "../../database";
import EntryModel from "../../models/Entry";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "Not access" });
  }

  await db.connectDB();

  await EntryModel.deleteMany();
  await EntryModel.insertMany(seedData.entries);

  await db.disconnectDB();

  res.status(200).json({ message: "Proceso relizado correctamente" });
}
