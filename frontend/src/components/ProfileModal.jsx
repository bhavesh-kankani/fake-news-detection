import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

export default function ProfileModal({ open, handleClose }) {
  const { authTokens } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});
  const [checkedValues, setCheckedValues] = useState({
    India: false,
    Business: false,
    Science: false,
    Technology: false,
    Entertainment: false,
    Sports: false,
    Health: false,
  });
  const categories = [
    "India",
    "Business",
    "Science",
    "Technology",
    "Entertainment",
    "Sports",
    "Health",
  ];

  const editPreferences = () => {
    setIsEditing(true);
  };

  const handleEdit = (event) => {
    setCheckedValues({
      ...checkedValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/users/update-preferences/", checkedValues, {
        headers: {
          Authorization: "Bearer " + authTokens?.access,
        },
      })
      .then((response) => {
        setIsEditing(false);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/profile/`, {
        headers: {
          Authorization: "Bearer " + authTokens?.access,
        },
      })
      .then((res) => {
        setUserData(res.data);
        res.data.preferences.map((preference) =>
          setCheckedValues((prevState) => {
            return { ...prevState, [preference]: true };
          })
        );
      });
    //eslint-disable-next-line
  }, [isEditing]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold" }}
          >
            Profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>First Name:</strong> {userData.first_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Last Name:</strong> {userData.last_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Email Address:</strong> {userData.email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Preferences:</strong>{" "}
            {userData.preferences && userData.preferences.join(", ")}
          </Typography>
          <Button
            onClick={editPreferences}
            variant="contained"
            sx={{ mt: 2, ml: 10 }}
          >
            Edit Preferences
          </Button>
          {isEditing && (
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <div style={{ width: "100%" }}>
                <FormGroup>
                  {categories.map((category) => (
                    <FormControlLabel
                      key={categories.indexOf(category)}
                      control={
                        <Checkbox
                          checked={checkedValues[category]}
                          onChange={handleEdit}
                          name={category}
                        />
                      }
                      label={category}
                    />
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      mt: 1,
                    }}
                  >
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      sx={{ mr: 2, ml: 6 }}
                    >
                      Confirm
                    </Button>
                    <Button onClick={handleCancel} sx={{ mr: 2, ml: 2 }}>
                      Cancel
                    </Button>
                  </Box>
                </FormGroup>
              </div>
            </FormControl>
          )}
        </Box>
      </Modal>
    </div>
  );
}
