import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [names, setNames] = useState("");
  const [persons, setPersons] = useState([]);
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        console.log("promose fullfilled");
        setPersons(response);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addNewPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const existingPerson = Array.from(persons).find(
      (x) => x.name?.toLowerCase() === newName.toLowerCase()
    );
    console.log(existingPerson, "existingPerson");
    if (!newName || !newNumber) {
      alert("please fill in the name and number");
      return;
    }
    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${newName} is already added to phonebook`);
      console.log(existingPerson.number);
      console.log("number", newNumber);
      setNames("");
      setNumber("");
      return;
    }
    if (existingPerson && existingPerson.number !== newNumber) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const change = { ...existingPerson, number: newNumber };
        const changeId = Object.keys(change).map((i) => {
          const id = change[i];
          return id;
        });
        console.log("editing id", changeId);
        console.log("editing person", change);
        personService
          .update(change.id, change)
          .then((response) => {
            console.log("Update-response =", response);
            setPersons("");
            setNumber("");
            setSuccess(`${change.name}'s number is changed!`);
            setTimeout(() => {
              setSuccess(null);
            }, 5000);
          })
          .catch((err) => console.log(err, "fail"));
      }
    }
    if (addNewPerson && !existingPerson) {
      personService
        .create(addNewPerson.id, addNewPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName("");
          setNumber("");
          setSuccess(`Added ${addNewPerson.name} `);
          setTimeout(() => {
            setSuccess(null);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });

      personService
        .update(addNewPerson.id, addNewPerson)
        .then((response) => {
          console.log("Update-response =", response);
          setPersons(persons.concat(response));
          setNewName("");
          setNumber("");
        })
        .catch((err) => {
          setFail(err);
          setTimeout(() => {
            setFail(null);
          }, 5000);
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("are you sure!")) {
      personService
        .deleteBody(id)
        .then(() => {
          const theOne = Object.values(persons).find((i) => i.id === id).name;
          setPersons(persons.filter((i) => i.id !== id));
          setFail(
            `Information of ${theOne} has already been removed from server`
          );
          setTimeout(() => {
            setFail(null);
          }, 5000);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const findNames = (e) => {
    setNames(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success={success} fail={fail} />
      <Filter names={names} findNames={findNames} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        handleSubmit={handleSubmit}
        handleNewName={handleNewName}
        handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} names={names} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
