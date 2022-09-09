import React, { useContext, FC, useMemo } from "react";
import { Paper, List } from "@mui/material";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";
import { EntryCard } from ".";
import { EntryStatus } from "../../interfaces";
import styles from "./EntryList.module.css";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text/plain");
    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleAllowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          backgroundColor: "transparent",
          padding: "5px 10px",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.5 : 1, transition: "all .5s" }}>
          {entriesByStatus.map((entry) => {
            return <EntryCard key={entry._id} entry={entry} />;
          })}
        </List>
      </Paper>
    </div>
  );
};
