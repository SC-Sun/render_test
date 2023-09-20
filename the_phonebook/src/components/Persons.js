const Persons = ({ names, persons, handleDelete }) => {
  return (
    <div>
      <ul>
        {Array.from(persons)
          .filter((person) =>
            person.name?.toLowerCase().includes(names.toLowerCase())
          )
          .map((i) => (
            <li key={i.id}>
              {i.name} {i.number}
              <button onClick={() => handleDelete(i.id)}> Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Persons;
