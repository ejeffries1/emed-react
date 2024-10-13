import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { db } from '../../firebase.config';
//import { collection, getDocs } from 'firebase/firestore';

export const fetchPrescriptions = createAsyncThunk(
    'prescriptions/fetchPrescriptions',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'prescriptions'));
        const prescriptions = [];
        querySnapshot.forEach((doc) => {
            prescriptions.push(doc.data());
        });
        return prescriptions;
    }
);


export const postPrescription = createAsyncThunk(
    'prescriptions/postPrescriptions',
    async(payload, { dispatch, getState }) => {
        setTimeout(() => {
            const { prescriptions } = getState();
            payload.date = new Date().toISOString();
            payload.id = prescriptions.prescriptionsArray.length;
            dispatch(addPrescription(payload));
        }, 2000)
    }
);


const prescriptionsSlice = createSlice({
    name: 'prescriptions',
    initialState: {
        prescriptionsArray: [], 
        historyArray: [],
        isLoading: true, 
        errMsg: null
    },
    reducers: {
        addPrescription: (state, action) => {
            console.log('addPrescription action.payload:', action.payload);
            console.log('addPrescription state.prescriptionsArray:', state.prescriptionsArray);
            //state.prescriptionsArray.push(action.payload);
            const newPrescription = {
                id: state.prescriptionsArray.length + 1,
                timestamp: new Date().toISOString(),
                initialQuantity: action.payload.quantity,
                initialRefill: action.payload.refills,
                ...action.payload
            };
            state.prescriptionsArray.push(newPrescription);
        },
        removePrescription: (state, action) => {
            state.prescriptionsArray = state.prescriptionsArray.filter(
                prescription => prescription.id !== action.payload
            );
        },
        updatePrescription: (state, action) => {
            const { id, quantity, refills } = action.payload;
            const prescription = state.prescriptionsArray.find(prescription => prescription.id === id);
            if (prescription) {
                prescription.quantity = quantity;
                prescription.refills = refills;
            if (quantity === 0 && refills === 0) {
                state.historyArray.push(prescription);
                state.prescriptionsArray = state.prescriptionsArray.filter(p => p.id !== id);
                }
            }
        },
        moveToHistory: (state, action) => {
            const prescription = state.prescriptionsArray.find(prescription => prescription.id === action.payload);
            if (prescription) {
                state.historyArray.push(prescription);
                state.prescriptionsArray = state.prescriptionsArray.filter(prescription => prescription.id !== action.payload);
            }
        },setNextDose: (state, action) => {
            const index = state.prescriptionsArray.findIndex(prescription => prescription.id === action.payload.id);
            if (index !== -1) {
                state.prescriptionsArray[index].nextDose = action.payload.nextDose;
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPrescriptions.pending, (state) => {
            state.isLoading = true;         
        })
        .addCase(fetchPrescriptions.fulfilled, (state, action) => {
            state.isLoading = false;
            state.errMsg = '';
            state.prescriptionsArray = (action.payload);
        })
        .addCase(fetchPrescriptions.rejected, (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error ? action.error.message : 'Fetch failed';
        });
    }
});

export const prescriptionsReducer = prescriptionsSlice.reducer;

export const { addPrescription, removePrescription, updatePrescription, moveToHistory, setNextDose } = prescriptionsSlice.actions;

export const selectAllPrescriptions = (state) => {
    return state.prescriptions.prescriptionsArray;
};

export const selectPrescriptionById = (id) => (state) => {
    return state.prescriptionsArray.find(
        (prescription) => prescription.id === parseInt(id)
    );
};

export const selectHistory = (state) => {
    return state.prescriptions.historyArray;
};