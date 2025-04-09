import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const application = {
    personalInformation: {
        title: 1,
        firstName: '',
        surname: '',
        email: '',
        nationality: 1,
    },
    contactInformation: {
        address: '',
        mobile: '',
        tellNo: '',
        email: '',
    },
    identification: {
        maritalStatus: 0,
        dateOfBirth: '',
        age: 0,
        gender: 0,
        race: 0,
        criminalRecord: 0,
    },
    professionalQualification: {
        certificationNO: '',
        institutionName: '',
        qualificationName: '',
        qualificationType: 0,
        qualificationStatus: 0,
        qualificationYear: '',
        qualificationDetails: '',
    },
    financialInformation: {
        totalCreditCards: 0,
        totalLoans: 0,
        vehicleFinance: 0,
        others: 0,
    },
    assetInformation: {
        assetType: 0,
        assetCatergory: 0,
        assetName: '',
        assetAddress: '',
        assetTelNo: '',
        assetCellNo: 0,
    },
    incomeInformation: {
        employmentType: '',
        rent: 0,
        vehicleAssetFinance: 0,
        grocery: 0,
        entertainment: 0,
        schoolFeel: 0,
        fuel: 0,
        medicalAid: 0,
        salary: 0,
        otherIncome: 0,
        additionalIncomeInvestment: 0,
    },
    documents: {
        latestPayslip: "",
        idDocument: '',
        proofOfBank: ''
    },
    verify:{
        selfie:'',
        isverified:false
    },
    offer: {
        status: '',
        amount: '',
        interestRate: '',
        paymentTerm: '',
        monthlyPayment: ''
    },
    debutOrder: {
        bank: '',
        accountType: '',
        accountNo: '',
        accountHolder: '',
        branch: '',
        debitDate: '',
        consent: ''
    },
    loanStatus: 'incomplete',
    currentStep: 0  // currentStep is now part of each application
};

// Define the initial state for the application
const initialState = {
    currentApplication: {
        loanIndex: 0,
    },
    activeApplications: [application],
    activeLoan: {
        amount: 0,
        outstanding: 0,
        installmentAmout: 0,
        paymentDate: 0,
        transactions: [
            {
                date: '',
                description: '',
                amount: 0,
                remainingBalance: 0,
            }
        ]
    }
};

// Define the application slice
const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        // Create a new application
        createNewApplication: (state) => {
            state.activeApplications.push({ ...application });
            state.currentApplication.loanIndex = state.activeApplications.length - 1;
        },

        // Navigation between steps - now updates the step in the specific loan application
        nextStep: (state) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].currentStep += 1;
        },
        
        prevStep: (state) => {
            const { loanIndex } = state.currentApplication;
            if (state.activeApplications[loanIndex].currentStep > 0) {
                state.activeApplications[loanIndex].currentStep -= 1;
            }
        },
        
        setStep: (state, action: PayloadAction<number>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].currentStep = action.payload;
        },
        
        // Select specific application to work on
        selectApplication: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0 && action.payload < state.activeApplications.length) {
                state.currentApplication.loanIndex = action.payload;
            }
        },
        
        // Personal Information
        updatePersonalInformation: (state, action: PayloadAction<typeof application.personalInformation>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].personalInformation = action.payload;
        },
        
        // Contact Information
        updateContactInformation: (state, action: PayloadAction<typeof application.contactInformation>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].contactInformation = action.payload;
        },
        
        // Identification
        updateIdentification: (state, action: PayloadAction<typeof application.identification>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].identification = action.payload;
        },
        
        // Professional Qualification
        updateProfessionalQualification: (state, action: PayloadAction<typeof application.professionalQualification>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].professionalQualification = action.payload;
        },
        
        // Financial Information
        updateFinancialInformation: (state, action: PayloadAction<typeof application.financialInformation>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].financialInformation = action.payload;
        },
        
        // Asset Information
        updateAssetInformation: (state, action: PayloadAction<typeof application.assetInformation>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].assetInformation = action.payload;
        },
        
        // Income Information
        updateIncomeInformation: (state, action: PayloadAction<typeof application.incomeInformation>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].incomeInformation = action.payload;
        },
        
        // Documents
        updateDocuments: (state, action: PayloadAction<typeof application.documents>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].documents = action.payload;
        },
        
        // Loan Offer
        updateOffer: (state, action: PayloadAction<typeof application.offer>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].offer = action.payload;
        },
        
        // Debit Order
        updateDebutOrder: (state, action: PayloadAction<typeof application.debutOrder>) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].debutOrder = action.payload;
        },
        
        // Update field by name (for individual field updates)
        updateField: (state, action: PayloadAction<{ 
            section: keyof typeof application, 
            field: string, 
            value: any 
        }>) => {
            const { loanIndex } = state.currentApplication;
            const { section, field, value } = action.payload;
            
            if (state.activeApplications[loanIndex][section]) {
                // @ts-ignore - dynamic access
                state.activeApplications[loanIndex][section][field] = value;
            }
        },
        
        // Complete current application
        completeApplication: (state) => {
            const { loanIndex } = state.currentApplication;
            state.activeApplications[loanIndex].loanStatus = 'complete';
            
            // Create active loan from completed application
            const { amount, interestRate, paymentTerm, monthlyPayment } = state.activeApplications[loanIndex].offer;
            
            // Only allow one active loan
            state.activeLoan = {
                amount: parseFloat(amount),
                outstanding: parseFloat(amount),
                installmentAmout: parseFloat(monthlyPayment),
                paymentDate: new Date().getDate(), // Default to current date
                transactions: [
                    {
                        date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
                        description: 'Loan disbursement',
                        amount: parseFloat(amount),
                        remainingBalance: parseFloat(amount),
                    }
                ]
            };
        },
        
        // Add transaction to active loan
        addTransaction: (state, action: PayloadAction<{
            description: string,
            amount: number,
            date?: string
        }>) => {
            const { description, amount, date = new Date().toISOString().split('T')[0] } = action.payload;
            const remainingBalance = state.activeLoan.outstanding - amount;
            
            state.activeLoan.transactions.push({
                date,
                description,
                amount,
                remainingBalance
            });
            
            state.activeLoan.outstanding = remainingBalance;
        },
        
        // Close active loan (when fully paid)
        closeLoan: (state) => {
            // Add final transaction if needed
            if (state.activeLoan.outstanding > 0) {
                state.activeLoan.transactions.push({
                    date: new Date().toISOString().split('T')[0],
                    description: 'Final payment',
                    amount: state.activeLoan.outstanding,
                    remainingBalance: 0
                });
            }
            
            // Reset active loan
            state.activeLoan = {
                amount: 0,
                outstanding: 0,
                installmentAmout: 0,
                paymentDate: 0,
                transactions: []
            };
        },
        
        // Remove an application (only for incomplete applications)
        removeApplication: (state, action: PayloadAction<number>) => {
            const indexToRemove = action.payload;
            
            if (indexToRemove >= 0 && indexToRemove < state.activeApplications.length &&
                state.activeApplications[indexToRemove].loanStatus !== 'complete') {
                // Remove the application
                state.activeApplications.splice(indexToRemove, 1);
                
                // Update current index if needed
                if (state.currentApplication.loanIndex >= state.activeApplications.length) {
                    state.currentApplication.loanIndex = Math.max(0, state.activeApplications.length - 1);
                }
            }
        }
    },
});

// Export actions
export const {
    createNewApplication,
    nextStep,
    prevStep,
    setStep,
    selectApplication,
    updatePersonalInformation,
    updateContactInformation,
    updateIdentification,
    updateProfessionalQualification,
    updateFinancialInformation,
    updateAssetInformation,
    updateIncomeInformation,
    updateDocuments,
    updateOffer,
    updateDebutOrder,
    updateField,
    completeApplication,
    addTransaction,
    closeLoan,
    removeApplication
} = applicationSlice.actions;

// Export the reducer to include in the store
export default applicationSlice.reducer;