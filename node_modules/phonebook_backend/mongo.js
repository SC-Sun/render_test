/* const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://sunc:${password}@cluster0.c6d2qnn.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("database is connected! ");
    if (process.argv.length === 3) {
      return Person.find({});
    } else if (process.argv.length === 5) {
      const newName = process.argv[3];
      const newNumber = process.argv[4];
      const newPerson = new Person({
        name: newName,
        number: newNumber,
      });
      return newPerson.save();
    }
  })
  .then((data) => {
    if (process.argv.length === 3) {
      console.log("phonebook: ");
      data.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    } else if (process.argv.length === 5) {
      console.log(
        "added",
        process.argv[3],
        "number",
        process.argv[4],
        "to phonebook"
      );
    }
  });
 */