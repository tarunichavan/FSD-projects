const students = [
    {id: 1, name: "Rahul Kumar", age: 20},
    {id: 2, name: "Priya Sharma", age: 22},
    {id: 3, name: "Arjun ", age: 19},
];

// Create - new student
const newStudent = {id: 4, name: "Sneha Patel", age: 21};
students.push(newStudent);

// Read all students
console.log("All Students:", students);

// Read student by ID
const studentIdToRead = 2;
const studentToRead = students.find(student => student.id === studentIdToRead);

if (studentToRead) {
    console.log(`Student with id ${studentIdToRead}:`, studentToRead);
} else {
    console.log(`Student with id ${studentIdToRead} not found`);
}

// Update student by ID
const studentIdToUpdate = 3;
const updatedStudent = {id: 3, name: "Arjun", age: 20};

const indexToUpdate = students.findIndex(
    student => student.id === studentIdToUpdate
);

if (indexToUpdate !== -1) {
    students[indexToUpdate] = updatedStudent;
    console.log(`Student with id ${studentIdToUpdate} updated:`, updatedStudent);
} else {
    console.log(`Student with id ${studentIdToUpdate} not found`);
}

// Delete student by ID
const studentIdToDelete = 1;

const studentIndexToDelete = students.findIndex(
    student => student.id === studentIdToDelete
);

if (studentIndexToDelete !== -1) {
    const deleteStudent = students.splice(studentIndexToDelete, 1);
    console.log(`Student with id ${studentIdToDelete} deleted:`, deleteStudent[0]);
} else {
    console.log(`Student with id ${studentIdToDelete} not found`);
}

// All students list after deletion
console.log("All students list:", students);