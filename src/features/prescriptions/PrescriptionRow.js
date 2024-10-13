import React, { useState } from "react";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Table, TableHead, TableRow, TableCell, Typography, TextField } from "@mui/material";

const PrescriptionRow = ({prescription, handleQuantityChange, onDelete}) => {
    const [open, setOpen] = useState(false);

    return(
        <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{backgroundColor: '#F7F6FB'}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="" scope="row">{prescription.id + 1}</TableCell>
        <TableCell align="right">{prescription.medication} {prescription.strength}</TableCell>
        <TableCell align="center">
            <TextField
                label="Quantity"
                type="number"
                value={prescription.quantity}
                onChange={(event) => handleQuantityChange(prescription, event)}
                InputProps={{ inputProps: { min: 0 } }}
              />
        </TableCell>
        <TableCell align="left">{prescription.refills}</TableCell>
        <TableCell align='right'>
          <IconButton aria-label="delete" onClick={() => onDelete(prescription.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
        </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Directions
              </Typography>
              <Table size="small" aria-label="prescription-details">
                <TableHead>
                  <TableRow>
                    <TableCell>{prescription.directions || "No directions provided."}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
    )
};

export default PrescriptionRow;