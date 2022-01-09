import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import { useState, useEffect } from "react";

export default function Timer() {
  const [second, setSeconds] = useState(0);
  const [minute, setMinutes] = useState(0);
  const [hour, setHours] = useState(0);

  const [active, setActive] = useState(false);

  useEffect(() => {
    var hourId = null;
    var minId = null;
    var secId = null;
    if (active) {
      secId = setInterval(() => {
        if (second <= 0) {
          setSeconds(0);
          clearInterval(secId);
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
      if (second === 0 && minute !== 0) {
        clearInterval(secId);
        minId = setInterval(() => {
          setMinutes((prev) => prev - 1);
          if (minute === 0) {
            clearInterval(minId);
          } else {
            setSeconds(60);
          }
        }, 1000);
      }
      if (minute === 0 && hour !== 0) {
        hourId = setInterval(() => {
          setHours((prev) => prev - 1);
          if (hour === 0) {
            clearInterval(hourId);
          } else {
            setMinutes(60);
          }
        }, 1000);
      }
      if (hour === 0) {
        clearInterval(hourId);
      }
      if (hour === 0 && minute === 0 && second === 0) {
        clearInterval(hourId);
        clearInterval(minId);
        clearInterval(secId);
      }
    } else {
      setActive(false);
      clearInterval(secId);
      clearInterval(minId);
      clearInterval(hourId);
    }

    return () => {
      clearInterval(secId);
      clearInterval(minId);
      clearInterval(hourId);
    };
  }, [hour, minute, second, active]);

  const handleStart = () => {
    setActive(!active);
  };

  const handleReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setActive(false);
  };

  return (
    <div>
      <Stack direction="row" sx={{ width: "60%" }}>
        <TextField
          id="standard-end-adornment"
          InputProps={{
            style: {
              fontSize: 40,
              padding: "0.5rem",
              width: "100%",
            },
            endAdornment: <InputAdornment position="end">h</InputAdornment>,
          }}
          inputProps={{
            maxLength: 2,
          }}
          variant="standard"
          placeholder="00"
          value={hour}
          onChange={(e) => setHours(Number(e.target.value))}
        />

        <TextField
          id="standard-end-adornment"
          InputProps={{
            style: {
              fontSize: 40,
              padding: "0.5rem",
              letterSpacing: "2px",
              width: "100%",
            },
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}
          inputProps={{
            maxLength: 2,
          }}
          variant="standard"
          placeholder="00"
          onChange={(e) => setMinutes(Number(e.target.value))}
          value={minute}
        />
        <TextField
          id="standard-end-adornment"
          InputProps={{
            style: {
              fontSize: 40,
              padding: "0.5rem",
              letterSpacing: "2px",
              width: "100%",
            },
            endAdornment: <InputAdornment position="end">s</InputAdornment>,
          }}
          inputProps={{
            maxLength: 2,
          }}
          variant="standard"
          placeholder="00"
          onChange={(e) => setSeconds(Number(e.target.value))}
          value={second}
        />
      </Stack>

      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          display: "flex",
          padding: "1rem",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <Button variant="contained" onClick={handleStart}>
          {!active ? "START" : "STOP"}
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          RESET
        </Button>
      </Box>
    </div>
  );
}
