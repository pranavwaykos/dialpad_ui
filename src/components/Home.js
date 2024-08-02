import React, { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ContactForm from "./ContactForm";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SnackBar from "../components/Alert/SnackBar";
import { APISerices } from "../context/apiserviceContext";


const Home = () => {
  const [openContactForm, setOpenContactForm] = React.useState(false);
  const [data, setData] = useState([]);
  const { customerservices } = useContext(APISerices);
  const [snackbar, setSnackBar] = React.useState({
    message: "",
    open: false,
    severity: "success",
  });
  const [selectedContactId, setSelectedContactId] = React.useState(false); // State for selected contact ID
  const [selectedContact, setSelectedContact] = useState(null);

  const handleOpenForm = () => {
    setOpenContactForm(true);
  };

  const handleCloseForm = () => {
    setOpenContactForm(false);
  };

  const handleFormSubmit = async (contactData) => {
    try {
      let response;
      if(selectedContactId){
        const uid = selectedContact.id 
        contactData.uid = uid
        response = await customerservices.update_contact(contactData);
      }else {
        response = await customerservices.create_contact(contactData);
      }
      if (response) {
        setOpenContactForm(false);
        setSnackBar({
          ...snackbar,
          open: true,
          severity: "success",
          message: selectedContactId? "Contact details updated successfully":"Contact deleted successfully",
        });
      }
    } catch (error) {
      console.log(error);
      setSnackBar({
        ...snackbar,
        open: true,
        severity: "error",
        message: `Error creating contact!`,
      });
    }
  };

  const fetchContactData = async () => {
    try {
      let response = await customerservices.get_contact_list();
      if(response){
      setData(response.items);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      let response = await customerservices.remove_contact(id);
      if (response) {
        fetchContactData() 
        setSnackBar({
          open: true,
          severity: "success",
          message:"Contact deleted successfully",
        });
      }
    } catch (error) {
      setSnackBar({
        open: true,
        severity: "error",
        message: "Failed to delete contact",
      });
    }
  };

  const handleEditContact = (id,isOpen = false) => {
    const contact = data.find(item => item.id === id);
    setSelectedContactId(isOpen);
    setSelectedContact(contact);
    handleOpenForm(); 
  };

  return (
    <Box sx={{ width: "100%", marginTop: "10px" }}>
      {snackbar && snackbar.open && (
        <SnackBar
          open={snackbar.open}
          onClose={() => setSnackBar({ open: false })}
          severity={snackbar.severity}
          message={snackbar.message}
        />
      )}
      <Button
        variant="contained"
        sx={{ alignSelf: "flex-end", width: "auto", background: "#6C3DFF" }}
        onClick={handleOpenForm}
      >
        Add Contact
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.company_name}</TableCell>
                <TableCell>{row.primary_email}</TableCell>
                <TableCell>{row.primary_phone}</TableCell>
                <TableCell align="right">
                  <Button variant="text" sx={{ mr: 1 }} onClick={() => handleEditContact(row.id,true)}>
                    Edit
                  </Button>
                  <Button variant="text" color="error" onClick={() => handleDeleteContact(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openContactForm} onClose={handleCloseForm}>
        <DialogTitle>{selectedContactId ? "Edit Contact":"Create a New Contact"}</DialogTitle>
        <DialogContent>
          <ContactForm onSubmit={handleFormSubmit} onClose={handleCloseForm}  initialValues={selectedContact}
          isEdit ={selectedContactId}/>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ width: "auto", color: "#6C3DFF" }}
            onClick={handleCloseForm}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
