import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/user/userSlice';
import { Card } from 'reactstrap';

const AccountPage = () => {
    const currentUser = useSelector(selectCurrentUser);

    if (!currentUser) {
        return <div>Please log in to view your account details.</div>;
    }

    return (
        <div>
            <Card>
                <h2>Account Details</h2>
                <p><strong>Username:</strong> {currentUser.username}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                {/* Add more account details as needed */}
            </Card>
        </div>
    );
};

export default AccountPage;