import React, { useState } from "react";

const Filter = (props) => {
  return (
    <>
    <form>
      <div>
        filter shown with<input value={props.filter} onChange={props.onChange()} />
      </div>
    </form>
    </>
  )
}

const AddEntry = (props) => {
  return (
    <form onSubmit={props.addName()}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange()} />
        </div>
        <div>
          phone: <input value={props.newPhone} onChange={props.handlePhoneChange()} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const SingleEntry = (props) => {
  return (
    <>
      <p key={props.person.name}>{props.person.name} {props.person.phone}</p>
    </>
  )
}

const FilteredEntries = (props) => {
  return (
    <>
    {props.persons.map(person => 
      <SingleEntry person={person} />
    )}
    </>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas',      phone: '040-123456' },
                                          { name: 'Ada Lovelace',     phone: '39-44-5323523' },
                                          { name: 'Dan Abramov',      phone: '12-43-234345' },
                                          { name: 'Mary Poppendieck', phone: '39-23-6423122' }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("")
  const [filter, setFilter] = useState("")

  const filteredPersons = persons.filter(person => person.name.toLowerCase().indexOf(filter) > -1)

  const addName = (event) => {
    event.preventDefault();

    if (persons.find((match) => match.name === newName)) {
      alert(`${newName} already exists in the phonebook.`);
    } else {
      const nameObj = {
        name: newName,
        phone: newPhone,
      };

      setPersons(persons.concat(nameObj));
      setNewName("");
      setNewPhone("")
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={() => handleFilterChange} />
      <h2>Add a new</h2>
      <AddEntry addName={() => addName} handleNameChange={() => handleNameChange} handlePhoneChange={() => handlePhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <FilteredEntries persons={filteredPersons} />
    </div>
  );
};

export default App;
