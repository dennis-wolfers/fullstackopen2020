import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Filter = (props) => {
  return (
    <>
      <form>
        <div>
          filter shown with
          <input value={props.filter} onChange={props.onChange()} />
        </div>
      </form>
    </>
  );
};

const AddEntry = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        phone:{" "}
        <input value={props.newPhone} onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const SingleEntry = (props) => {
  return (
    <>
      <p>
        {props.person.name} {props.person.number}{" "}
        <button id={props.person.id} onClick={() => handleClick(props)}>
          delete
        </button>
      </p>
    </>
  );
};

const handleClick = (props) => {
  if (window.confirm(`Delete ${props.person.name}?`)) {
    personService.deleteEntry(props.person.id).then(() => {
      personService.getAll().then((initPersons) => {
        props.setPersons(initPersons);
      });
    });
  }
};

const FilteredEntries = (props) => {
  return (
    <>
      {props.persons.map((person) => (
        <SingleEntry
          key={person.id}
          person={person}
          setPersons={props.setPersons}
          persons={props.persons}
        />
      ))}
    </>
  );
};

const App = (props) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initPersons) => {
      setPersons(initPersons);
    });
  }, []);

  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(filter) > -1
  );

  const addName = (event) => {
    event.preventDefault();

    if (persons.find((match) => match.name === newName)) {
      alert(`${newName} already exists in the phonebook.`);
    } else {
      const nameObj = {
        name: newName,
        number: newPhone,
      };
      personService.create(nameObj).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
      });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={() => handleFilterChange} />
      <h2>Add a new</h2>
      <AddEntry
        addName={addName}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />
      <h2>Numbers</h2>
      <FilteredEntries setPersons={setPersons} persons={filteredPersons} />
    </div>
  );
};

export default App;
