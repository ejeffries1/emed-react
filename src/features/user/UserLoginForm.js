import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { FormGroup, Button } from "@mui/material";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 
import { setCurrentUser, selectCurrentUser } from "./userSlice";
import { validateUserLoginForm } from '../../utils/validateUserLoginForm';
import { validateRegisterForm } from '../../utils/validateRegisterForm';
import { Label } from "reactstrap";
import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, onSnapshot } from "firebase/firestore";

const UserLoginForm = () => {
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const toggleLoginModal = () => setLoginModal(!loginModal);
    const toggleRegisterModal = () => setRegisterModal(!registerModal);

    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    // Fetch and listen for user data changes
    useEffect(() => {
        if (currentUser) {
            const userDocRef = doc(db, 'customers', currentUser.email);
            const unsubscribe = onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                    const userData = doc.data();
                    console.log("Fetched user data:", userData);
                    // Update additional user data if needed
                }
            });

            return () => unsubscribe(); // Clean up listener on unmount
        }
    }, [currentUser]);

    const handleLogin = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(setCurrentUser({ id: user.uid, email: user.email }));

                setLoginModal(false);
            })
            .catch((error) => {
                console.error("Login error:", error.message);
            });
    };

    const handleRegister = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const newUser = userCredential.user;
                dispatch(setCurrentUser({ id: newUser.uid, email: newUser.email }));

                // Add new user to Firestore
                const userDocRef = doc(db, 'customers', newUser.email);
                setDoc(userDocRef, {
                    name: `${values.firstName} ${values.lastName}`,
                    email: newUser.email,
                    phone: '', // Initialize with empty phone or other fields
                });

                setRegisterModal(false);
            })
            .catch((error) => {
                console.error("Registration error:", error.message);
            });
    };

    const goToAccount = () => {
        navigate('/account');
    };

    return (
        <>
            {/* Conditionally Render Login or Welcome */}
            {currentUser ? (
                <span className="navbar-text ml-auto">
                    <Button color="inherit" onClick={goToAccount}>
                        Welcome, {currentUser.email}
                    </Button>
                </span>
            ) : (
                <Button color="inherit" onClick={toggleLoginModal}>Login</Button>
            )}

            {/* Login Modal */}
            <MDBModal open={loginModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader className="text-body">
                            <MDBModalTitle>Login</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleLoginModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Formik initialValues={{ email: '', password: '' }} onSubmit={handleLogin} validate={validateUserLoginForm}>
                                <Form>
                                    <FormGroup>
                                        <Label>email</Label>
                                        <Field type="text" id="email" name="email" className="form-control" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Field type="password" id="password" name="password" className="form-control" />
                                    </FormGroup>
                                    <MDBBtn type="submit" style={{ marginTop: 25, backgroundColor: '#512da8' }}>Login</MDBBtn>
                                </Form>
                            </Formik>
                        </MDBModalBody>
                        <MDBModalBody className="text-center">
                            <Button variant="text" onClick={toggleRegisterModal}>Don't have an account? Register</Button>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            {/* Register Modal */}
            <MDBModal open={registerModal}>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader className="text-body">
                            <MDBModalTitle>Register</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleRegisterModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <Formik initialValues={{
                                firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
                            }} onSubmit={handleRegister} validate={validateRegisterForm}>
                                {({ errors, touched }) => (
                                    <Form>
                                        <FormGroup>
                                            <Label>First Name</Label>
                                            <Field type="text" id="firstName" name="firstName" className="form-control" />
                                            {errors.firstName && touched.firstName && <div className="text-danger">{errors.firstName}</div>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Last Name</Label>
                                            <Field type="text" id="lastName" name="lastName" className="form-control" />
                                            {errors.lastName && touched.lastName && <div className="text-danger">{errors.lastName}</div>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Field type="email" id="email" name="email" className="form-control" />
                                            {errors.email && touched.email && <div className="text-danger">{errors.email}</div>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Password</Label>
                                            <Field type="password" id="password" name="password" className="form-control" />
                                            {errors.password && touched.password && <div className="text-danger">{errors.password}</div>}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Confirm Password</Label>
                                            <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" />
                                            {errors.confirmPassword && touched.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                                        </FormGroup>
                                        <MDBBtn type="submit" style={{ marginTop: 25, backgroundColor: '#512da8' }}>Registar</MDBBtn>
                                    </Form>
                                )}
                            </Formik>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default UserLoginForm;
