import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrescriptions, selectAllPrescriptions } from '../features/prescriptions/prescriptionsSlice';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

const SchedulePage = () => {
    const dispatch = useDispatch();
    const prescriptions = useSelector(selectAllPrescriptions);

    const [loading, setLoading] = useState(true);

    // Fetch prescriptions whenever component mounts or when a prescription is added/removed
    useEffect(() => {
        const loadPrescriptions = async () => {
            await dispatch(fetchPrescriptions());
            setLoading(false);  // Set loading to false once the fetch is complete
        };
        loadPrescriptions();
    }, [dispatch, prescriptions]);  // Add `prescriptions` to the dependency array to ensure updates

    const calculateDueTimes = (frequency) => {
        const times = [];
        switch (frequency) {
            case 'Take one by mouth once daily':
                times.push('09:00 AM');
                break;
            case 'Take one by mouth twice daily':
                times.push('09:00 AM', '09:00 PM');
                break;
            case 'Take one by mouth three times daily':
                times.push('06:00 AM', '02:00 PM', '10:00 PM');
                break;
            case 'Take one by mouth four times daily':
                times.push('06:00 AM', '12:00 PM', '06:00 PM', '12:00 AM');
                break;
            default:
                times.push('09:00 AM');
        }
        return times;
    };

    const renderPrescription = (prescription) => (
        <Grid item xs={12} sm={6} md={4} key={prescription.id}>
            <Card>
                <CardContent>
                    <Typography variant="h6">{prescription.medication} {prescription.strength}</Typography>
                    <Typography variant="body1">Scheduled Doses:</Typography>
                    <ul>
                        {calculateDueTimes(prescription.directions).map((time, index) => (
                            <li key={index}>{time}</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </Grid>
    );

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Dose Schedule
            </Typography>
            <Grid container spacing={2}>
                {prescriptions.length > 0 ? (
                    prescriptions.map(renderPrescription)
                ) : (
                    <Typography>No prescriptions available.</Typography>
                )}
            </Grid>
        </div>
    );
};

export default SchedulePage;
