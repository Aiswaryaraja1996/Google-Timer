import React, { useState } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import TimerIcon from "@mui/icons-material/Timer";

import Timer from "./timer/Timer";
import Stopwatch from "./stopWatch/Stopwatch";
import Button from "@mui/material/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);
  const [func,setFunc] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleStart = () =>{

  // }

  // const handleReset = () => {

  // }
  return (
    <div className="App">
      <Box
        sx={{
          width: "100%",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "0.5rem",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              icon={<HourglassTopIcon />}
              iconPosition="start"
              label="TIMER"
              {...a11yProps(0)}
            />
            <Tab
              icon={<TimerIcon />}
              iconPosition="start"
              label="STOPWATCH"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Timer  />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stopwatch />
        </TabPanel>


      </Box>
    </div>
  );
}

export default App;
