export type EntryStatus = "pending" | "in-progress" | "finished";

export interface Entry {
  _id: string;
  __v?: number;
  description: string;
  createdAt: number;
  status: EntryStatus;
}
