const handleQuantityChange = (event) => {
    let newQuantity = parseInt(event.target.value, 10);
        if (isNaN(newQuantity) || newQuantity < 0) {
            newQuantity = 0;
        }

        if (newQuantity === 0) {
            let newRefills = prescription.refills - 1;
            if (newRefills < 0) {
                alert('You have no more refills. Please reach out to your Primary care physician for a new prescription.');
                newQuantity = prescription.initialQuantity;
                dispatch(moveToHistory(prescription.id));
            } else if (prescription.refills === 0 && newQuantity === 0) {
                alert('Your quantity and refills are both at 0. Moving prescription to history.');
                dispatch(moveToHistory(prescription.id));
            } else {
                alert('Your quantity has reached 0. Please call your local pharmacy for a refill.');
                newQuantity = prescription.initialQuantity;
                dispatch(updatePrescription({ id: prescription.id, quantity: newQuantity, refills: newRefills }));
            }
        } else {
            dispatch(updatePrescription({ id: prescription.id, quantity: newQuantity, refills: prescription.refills }));
        }
  };