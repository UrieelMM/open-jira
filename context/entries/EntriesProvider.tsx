import React, { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { EntriesContext, EntriesReducer } from "./";
import { Entry } from "../../interfaces";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode;
}

const UI_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: "Pending: Esta es una descripción de una tarea pendiente",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "In progres: Esta es una descripción de una tarea pendiente 02",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "Finished: Esta es una descripción de una tarea pendiente 03",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, UI_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };
    dispatch({ type: "Entry - Add-entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "Entry - Update-entry", payload: entry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};