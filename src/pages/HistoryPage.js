import React, { useState } from "react";
import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import { MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from "mdb-react-ui-kit";
import { selectHistory } from "../features/prescriptions/prescriptionsSlice";

const HistoryPage = () => {
    const [basicModal, setBasicModal] = useState(false)
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    const historyArray = useSelector(selectHistory);
    //const toggleOpen = () => setBasicModal(!basicModal);


    const handleClickedPrescription = (prescription) => {
        setSelectedPrescription(prescription);
        setBasicModal(true);
      };

      const handleClose = () => {
        setBasicModal(false);
        setSelectedPrescription(null);
      };

    return (
        <Box>
            <List>
            {historyArray.map((prescript) => (
                <ListItem key={prescript.id} disablePadding>
                    <ListItemButton onClick={() => handleClickedPrescription(prescript)}>
                        <ListItemText 
                            primary={`Prescription Number: ${prescript.id}`}
                            primaryTypographyProps={{variant: 'h5'}}
                            secondary={`Medication: ${prescript.medication}`}
                            secondaryTypographyProps={{variant: 'body2'}}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>

      <MDBModal open={basicModal} onHide={handleClose} tabIndex='-1'>
        <MDBModalDialog>
            <MDBModalContent>
                {selectedPrescription && (
                    <>
                <MDBModalHeader>
                    <MDBModalTitle><strong>Presciption ID: </strong>{selectedPrescription.id}</MDBModalTitle>
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </MDBModalHeader>
                <MDBModalBody>
                    <p><strong>Medication:</strong> {selectedPrescription.medication +  " " +  selectedPrescription.strength}</p>
                    <p><strong>Frequency:</strong> {selectedPrescription.directions}</p>
                    <p><strong>Quantity:</strong> {selectedPrescription.initialQuantity}</p>
                    <p><strong>Refills:</strong> {selectedPrescription.initialRefill}</p>
                    <p><strong>Date Entered: </strong>{new Date(selectedPrescription.timestamp).toLocaleString()}</p>
                </MDBModalBody>
                </>
                    )}
            </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
        </Box>
    )
}

export default HistoryPage;