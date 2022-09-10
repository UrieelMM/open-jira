import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import EntryModel from "../../../models/Entry";
import { InterfaceEntry } from "../../../models/Entry";

type Data =
  | { message: string }
  | { message: string; entries: InterfaceEntry[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connectDB();
  const entries = await EntryModel.find().sort({ createdAt: "ascending" });
  await db.disconnectDB();
  res.status(200).json({ message: "Success", entries });
};
