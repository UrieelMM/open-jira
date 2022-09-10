import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import EntryModel from "../../../models/Entry";
import { InterfaceEntry } from "../../../models/Entry";

type Data = { message: string } | InterfaceEntry;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: "Bad request" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.disconnectDB();

  const entryToUpdate = await EntryModel.findById(id);

  if (!entryToUpdate) {
    await db.connectDB();
    return res.status(404).json({ message: "Entry not found" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    return res.status(200).json(updatedEntry!);
  } catch (error) {
    return res.status(400).json({ message: "Bad request" });
  }
};
