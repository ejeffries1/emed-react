import React, { useState } from "react";
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,   
  } from 'mdb-react-ui-kit';
//import { MenuItem, Select } from "@mui/material";
import { FormGroup, Input, Label, Row, Col } from "reactstrap";
import { addPrescription } from "./prescriptionsSlice";
import { Field, Formik, Form} from "formik";
import { useDispatch } from "react-redux";

const PrescriptionFormModal = () => {
    const [basicModal, setBasicModal] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const prescription = {
            medication: values.medication,
            strength: values.strength,
            quantity: values.quantity,
            refills: values.refills,
            directions: values.directions,
            date: new Date(Date.now()).toISOString
        }
        console.log(prescription);
        dispatch(addPrescription(prescription));
        setBasicModal(false);
    };

  const toggleOpen = () => setBasicModal(!basicModal);

    return (
    <>
      <MDBBtn onClick={toggleOpen} style={{backgroundColor: '#512da8'}}>Add New Prescription</MDBBtn>
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle style={{color: '#512da8'}}>Add New Prescription</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <Formik 
                    initialValues={{
                        medication: '',
                        strength: '',
                        quantity: '',
                        refills: '',
                        directions: ''
                    }}
                    onSubmit={handleSubmit}
                >
                <Form>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="medication">Medication</Label>
                                <Input 
                                    id="medication"
                                    name="medication"
                                    type="text"
                                    tag={Field}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="strength">Strength</Label>
                                <Input
                                    type='text'
                                    id="strength"
                                    name="strength"
                                    tag={Field} 
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="quantity">Quantity</Label>
                        <Input
                            type="number"
                            id="quantity"
                            name="quantity"
                            tag={Field}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="refills">Refills</Label>
                        <Input 
                            type="number"
                            id="refills"
                            name="refills"
                            tag={Field}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="directions">Frequency</Label>
                        <Field
                            as="select"
                            name="directions"
                            className="form-control"
                        >
                            <option value="Select a frequency">Frequency</option>
                            <option value="Take medication once a day">QD</option>
                            <option value="Take medication twice a day">BID</option>
                            <option value="Take medication three times a day">TID</option>
                            <option value="Take medication four times a day">QID</option>
                        </Field>
                    </FormGroup>
                    <MDBModalFooter>
                        <MDBBtn  type="button" style={{backgroundColor: '#512da8'}} onClick={toggleOpen}>
                            Close
                        </MDBBtn>
                        <MDBBtn type='submit' style={{backgroundColor: '#512da8'}}> Submit Prescription</MDBBtn>
                    </MDBModalFooter>
                    </Form>
                </Formik>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
    )
}

export default PrescriptionFormModal;                                                                                                                        ;