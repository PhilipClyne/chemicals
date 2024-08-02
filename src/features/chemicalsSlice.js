import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chemicals: [
    { id: 1, name: "Hydrochloric acid", formula: "HCl" },
    { id: 2, name: "Sodium Chloride", formula: "NaCl" },
    { id: 3, name: "Sulfuric Acid", formula: "H2SO4" },
    { id: 4, name: "Ammonia", formula: "NH3" },
    { id: 5, name: "Ethanol", formula: "C2H5OH" },
  ],
  searchQuery: "",
};

const chemicalSlice = createSlice({
  name: "chemicals",
  initialState,
  reducers: {
    addChemical: (state, action) => {
      state.chemicals.push(action.payload);
    },
    updateChemical: (state, action) => {
      const index = state.chemicals.findIndex(
        (chem) => chem.id === action.payload.id
      );
      if (index !== -1) {
        state.chemicals[index] = action.payload;
      }
    },
    deleteChemical: (state, action) => {
      state.chemicals = state.chemicals.filter(
        (chem) => chem.id !== action.payload
      );
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { addChemical, updateChemical, deleteChemical, setSearchQuery } =
  chemicalSlice.actions;
export default chemicalSlice.reducer;
