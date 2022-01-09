import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Stopwatch() {
  const [seconds, setSeconds] = React.useState(0);
  const [active, setActive] = React.useState(false);

  const formatTime = () => {
    const getSeconds = `0${Math.floor((seconds / 1000) % 60)}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${Math.floor((seconds / 60000) % 60)}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    const getMilliSeconds = `0${(seconds / 10) % 100}`.slice(-2);

    console.log(getMinutes, getSeconds, getMilliSeconds);

    var timer = getMinutes.trim().split("").map(Number);

    if (timer[0] > 0 || timer[1] > 0) {
      return `${getMinutes}m  ${getSeconds}s  ${getMilliSeconds}`;
    } else {
      return `${getSeconds}s  ${getMilliSeconds}`;
    }
  };

  const ref = React.useRef(null);

  const startTimer = () => {
    setActive(true);

    if (!active) {
      if (!ref.current) {
        ref.current = setInterval(() => {
          setSeconds((prev) => {
            return prev + 10;
          });
        }, 10);
      }
    } else {
      pauseTimer();
    }
  };

  const pauseTimer = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  const resetTimer = () => {
    setActive(false);
    pauseTimer();
    setSeconds(0);
  };

  React.useEffect(() => {
    return pauseTimer;
  }, []);

  return (
    <div>
      <TextField
        inputProps={{
          style: {
            fontSize: 40,
            padding: "1rem",
            letterSpacing: "2px",
            
            
          },
        }}
        id="standard-textarea"
        multiline
        variant="standard"
        value={formatTime()}
      />

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
        <Button variant="contained" onClick={startTimer}>
          {active ? "STOP" : "START"}
        </Button>
        <Button variant="outlined" onClick={resetTimer}>
          RESET
        </Button>
      </Box>
    </div>
  );
}
