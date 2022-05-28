import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const FactChecker = () => {
  const [checked, setChecked] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const highlightStyle = { fontSize: "1.25rem", fontWeight: "bold" };
  const defaultStyle = { fontSize: "1.25rem" };

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (checked) {
      // post as text
      axios
        .post("http://localhost:8000/fact-check/text/", { content: input })
        .then((response) => {
          setResult(response.data["prediction"]);
        });
    } else {
      // post as link
      axios
        .post("http://localhost:8000/fact-check/link/", { url: input })
        .then((response) => {
          setResult(response.data["prediction"]);
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        height: "60vh",
      }}
    >
      <Card sx={{ width: "90%", mt: 5 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={!checked ? highlightStyle : defaultStyle}>
              Link
            </Typography>
            <AntSwitch
              checked={checked}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography sx={checked ? highlightStyle : defaultStyle}>
              Text
            </Typography>
          </Stack>
          <Box
            component="form"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 600,
              maxWidth: "100%",
              mt: 2,
              mb: 2,
            }}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            {checked ? (
              <TextField
                fullWidth
                id="outlined-basic"
                label="Article Text"
                multiline
                rows={8}
                variant="outlined"
                value={input}
                onChange={handleInput}
              />
            ) : (
              <TextField
                id="outlined-multiline-flexible"
                label="Article Link"
                variant="outlined"
                fullWidth
                value={input}
                onChange={handleInput}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 1, width: "100px" }}
            >
              Check
            </Button>
          </Box>
          <Typography sx={{ fontWeight: "bold" }}>
            RESULT: {result.toUpperCase()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FactChecker;
