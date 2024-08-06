import React, { useState,useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ContactForm({ onSubmit, onClose, initialValues,isEdit}) {
  const [contact, setContact] = useState({
    first_name: "",
    last_name: "",
    emails: [""],
    phones: [""],
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(contact);
  };

  useEffect(() => {
    if (initialValues) {
      setContact({
        first_name: initialValues.first_name || "",
        last_name: initialValues.last_name || "",
        // company_name: initialValues.company_name || "",
        emails: initialValues.emails || [""],
        phones: initialValues.phones || [""],
      });
    }
  }, [initialValues]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="first_name"
        value={contact.first_name}
        onChange={(e)=> setContact({...contact,first_name:e.target.value})}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="last_name"
        value={contact.last_name}
        onChange={handleChange}
      />

      {/* <TextField
        label="Company"
        variant="outlined"
        fullWidth
        margin="normal"
        name="company_name"
        value={contact.company_name}
        onChange={handleChange}
      /> */}

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="emails"
        value={contact.emails}
        onChange={handleChange}
      />

      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        name="phones"
        value={contact.phones}
        onChange={handleChange}
      />

      <Button
        sx={{ background: "#6C3DFF" }}
        type="submit"
        variant="contained"
        fullWidth
      >
       { isEdit ? "Save":"Add Contact"}
      </Button>
    </Box>
  );
}

export default ContactForm;
