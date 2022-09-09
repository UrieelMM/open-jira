import React, { useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { EntriesContext } from "../../context/entries";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setIsAddingEntry(false);
    setInputValue("");
    setTouched(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 2 }}
            placeholder="New entry"
            autoFocus
            multiline
            label="New entry"
            helperText={inputValue.length <= 0 && touched && "Required"}
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={handleTextChange}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveAltOutlinedIcon />}
              onClick={handleSave}
            >
              Guardar
            </Button>
            <Button
              variant="outlined"
              endIcon={<CancelOutlinedIcon />}
              onClick={() => setIsAddingEntry(!isAddingEntry)}
            >
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddBoxOutlinedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(!isAddingEntry)}
        >
          Add entry
        </Button>
      )}
    </Box>
  );
};
