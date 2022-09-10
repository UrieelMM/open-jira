import React, { FC, useReducer, useEffect } from "react";
import { EntriesContext, EntriesReducer } from "./";
import { Entry } from "../../interfaces";
import { entriesApi } from "../../apis";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode;
}

const UI_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(EntriesReducer, UI_INITIAL_STATE);

  //Get entries from database
  const refreshEntries = async () => {
    const { data } = await entriesApi.get("/entries");
    const entries = data.entries;
    dispatch({ type: "Entry - Refresh-data", payload: entries });
  };
  useEffect(() => {
    refreshEntries();
  }, []);

  //Add entry to database
  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>("/entries", { description });
    dispatch({ type: "Entry - Add-entry", payload: data });
  };

  //Update entry in database
  const updateEntry = async (entry: Entry) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, {
        description: entry.description,
        status: entry.status,
      });
      dispatch({ type: "Entry - Update-entry", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
