import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas',      phone: '040-123456' },
                                          { name: 'Ada Lovelace',     phone: '39-44-5323523' },
                                          { name: 'Dan Abramov',      phone: '12-43-234345' },
                                          { name: 'Mary Poppendieck', phone: '39-23-6423122' }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("")
  const [filter, setFilter] = useState("")

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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  function isFiltered(person) {
    return person.name.toLowerCase().indexOf(filter) > -1 ? <p key={person.name}>{person.name} {person.phone}</p> : ""
  }

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
      <form>
        <div>
          filter shown with<input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
      <h2>add a new</h2>
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
        isFiltered(person)
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
