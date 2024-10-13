import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Paper} from '@mui/material';
import PrescriptionFormModal from './PrescriptionFormModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPrescriptions, removePrescription, updatePrescription, moveToHistory } from './prescriptionsSlice';
import PrescriptionRow from './PrescriptionRow';
import { useSnackbar } from 'notistack';

const PrescriptionsTable = () => {
    const prescriptions = useSelector(selectAllPrescriptions);
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const handleQuantityChange = (prescription, event) => {
      let newQuantity = parseInt(event.target.value, 10);
      if (isNaN(newQuantity) || newQuantity < 0) {
        newQuantity = 0;
      }
  
      if (newQuantity === 0) {
        if (prescription.refills > 0) {
          const newRefills = prescription.refills - 1;
          const resetQuantity = prescription.initialQuantity;
          enqueueSnackbar(`Quantity reset to ${resetQuantity}, you now have ${newRefills} refills`);
          dispatch(updatePrescription({
            id: prescription.id,
            quantity: resetQuantity,
            refills: newRefills,
          }));
        } else {
          enqueueSnackbar('You have no more refills for this medication. Please reach your local pharmacy or your Primary Care Physician for a new prescription.');
          dispatch(updatePrescription({
            id: prescription.id,
            quantity: 0,
            refills: 0,
          }));
          // Move to history logic
          dispatch(moveToHistory(prescription.id));
        }
      } else {
        dispatch(updatePrescription({
          id: prescription.id,
          quantity: newQuantity,
          refills: prescription.refills,
        }));
      }
    };

    const handleDelete = (id) => {
      dispatch(removePrescription(id));
    };

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right">Medication</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="left">Refills Remaining</TableCell>
            <TableCell align='right'>Delete</TableCell>
        </TableHead>
        <TableBody>
          {prescriptions.map((prescription) => (
            <PrescriptionRow 
              key={prescription.id} 
              prescription={prescription}
              handleQuantityChange={handleQuantityChange}
              onDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <div style={{paddingTop: 15, paddingLeft: 15}}>
        <PrescriptionFormModal/>
      </div>
    </>
  );
}

export default PrescriptionsTable;