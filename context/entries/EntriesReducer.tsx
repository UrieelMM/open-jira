import { Entry } from "../../interfaces";
import { EntriesState } from "./";

type EntriesActionType =
  | { type: "Entry - Add-entry"; payload: Entry }
  | { type: "Entry - Update-entry"; payload: Entry }
  | { type: "Entry - Refresh-data"; payload: Entry[] };

export const EntriesReducer = (
  state: EntriesState,
  action: EntriesActionType
) => {
  switch (action.type) {
    case "Entry - Add-entry":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case "Entry - Update-entry":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status;
            entry.description = action.payload.description;
          }
          return entry;
        }),
      };
    case "Entry - Refresh-data":
      return {
        ...state,
        entries: [...action.payload],
      };
    default:
      return state;
  }
};
