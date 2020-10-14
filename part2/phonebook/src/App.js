import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phone: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("")

  const addName = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    if (persons.find((match) => match.name === newName)) {
      alert(`${newName} already exists in the phonebook.`);
    } else {
      const nameObj = {
        name: newName,
        phone: newPhone,
      };

      setPersons(persons.concat(nameObj));
      setNewName("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} {person.phone}</p>
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
