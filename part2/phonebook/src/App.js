import React, { useState, useEffect } from "react";
import personService from "./services/persons";

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }
  let classPicker = isError ? "error" : "notification";
  return <div className={classPicker}>{message}</div>;
};

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
  personService
    .deleteEntry(props.person.id)
    .then(() => {
      props.setNotificationMessage(`${props.person.name} deleted.`);
      personService.getAll().then((initPersons) => {
        props.setPersons(initPersons);
      });
      setTimeout(() => {
        props.setNotificationMessage(null);
      }, 5000);
    })
    .catch(() => {
      props.setIsError(true);
      props.setNotificationMessage(`${props.person.name} was already deleted.`);
      personService.getAll().then((initPersons) => {
        props.setPersons(initPersons);
      });
      setTimeout(() => {
        props.setNotificationMessage(null);
        props.setIsError(false);
      }, 5000);
    });
  props.setNewName("");
  props.setNewPhone("");
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
          setNotificationMessage={props.setNotificationMessage}
          setIsError={props.setIsError}
          setNewName={props.setNewName}
          setNewPhone={props.setNewPhone}
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
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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
    const nameObj = {
      name: newName,
      number: newPhone,
    };

    if (persons.find((match) => match.name === newName)) {
      let id = persons.find((person) => person.name === newName).id;

      personService
        .update(id, nameObj)
        .then(() => {
          setNotificationMessage(`Number for ${newName} changed.`);
          personService.getAll().then((initPersons) => {
            setPersons(initPersons);
          });
          setNewName("");
          setNewPhone("");
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(() => {
          setIsError(true);
          setNotificationMessage(`${newName} is no longer in the database.`);
          personService.getAll().then((initPersons) => {
            setPersons(initPersons);
          });
          setNewName("");
          setNewPhone("");
          setTimeout(() => {
            setNotificationMessage(null);
            setIsError(false);
          }, 5000);
        });
    } else {
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
      <FilteredEntries
        setPersons={setPersons}
        persons={filteredPersons}
        setNotificationMessage={setNotificationMessage}
        setIsError={setIsError}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
      />
      <Notification message={notificationMessage} isError={isError} />
    </div>
  );
};

export default App;
