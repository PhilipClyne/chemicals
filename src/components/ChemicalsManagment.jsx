import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addChemical,
  updateChemical,
  deleteChemical,
  setSearchQuery,
} from "../features/chemicalsSlice";
import "./styles.css";

const ChemicalManagement = () => {
  const chemicals = useSelector((state) => state.chemicals.chemicals);
  const searchQuery = useSelector((state) => state.chemicals.searchQuery);
  const dispatch = useDispatch();
  const [newChemical, setNewChemical] = useState({
    id: "",
    name: "",
    formula: "",
  });
  const [editChemical, setEditChemical] = useState(null);

  const filteredChemicals = chemicals.filter((chem) =>
    chem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddOrUpdate = () => {
    if (editChemical) {
      dispatch(updateChemical(newChemical));
    } else {
      dispatch(addChemical({ ...newChemical, id: Date.now() }));
    }
    setNewChemical({ id: "", name: "", formula: "" });
    setEditChemical(null);
  };

  const handleEdit = (chemical) => {
    setNewChemical(chemical);
    setEditChemical(chemical);
  };

  const handleDelete = (id) => {
    dispatch(deleteChemical(id));
  };

  return (
    <div className="container">
      <h1>Chemical Management</h1>
      <input
        type="text"
        placeholder="Search chemicals"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newChemical.name}
          onChange={(e) =>
            setNewChemical({ ...newChemical, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Formula"
          value={newChemical.formula}
          onChange={(e) =>
            setNewChemical({ ...newChemical, formula: e.target.value })
          }
        />
        <button onClick={handleAddOrUpdate}>
          {editChemical ? "Update" : "Add"}
        </button>
      </div>
      <ul className="chemical-list">
        {filteredChemicals.map((chem) => (
          <li key={chem.id}>
            {chem.name} ({chem.formula})
            <span>
              <button onClick={() => handleEdit(chem)}>Edit</button>
              <button onClick={() => handleDelete(chem.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChemicalManagement;
