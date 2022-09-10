interface SeedData {
  entries: seedEntry[];
}

interface seedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pending: Esta es una descripción de una tarea pendiente",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "In progres: Esta es una descripción de una tarea pendiente 02",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description:
        "Finished: Esta es una descripción de una tarea pendiente 03",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
