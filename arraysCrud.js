const students=[
    {id:1, name:"Jone Doe", age:20},
    {id:2, name:"Jane Smith", age:22},
    {id:3, name:"Alice Johson", age:19},
]
//create students new student {id:4,name:"Bob Brown",age:21}
const newStudent={id:4,name:"Bob Brown",age:21}
students.push(newStudent)
//Read all students
console.log("All Students:", students);
//read students by id
const studentIdToRead=2;
const studentToRead=students.find(student=>student.id===studentIdToRead);
if(studentIdToRead){
    console.log(`student with id ${studentIdToRead}:`, studentToRead);
} else {
    console.log(`student with id ${studentIdToRead} not found`);
}
//update student by id
const studentIdToUpdate=3;
const updatedStudent={id:3,name:"Alice Johnson",age:20};
const indexToUpdate=students.findIndex(student=>student.id===studentIdToUpdate);
if(indexToUpdate!==-1){
    students[indexToUpdate]=updatedStudent;
    console.log(`student with id ${studentIdToUpdate} updated:`, updatedStudent);
} else {
    console.log(`student with id ${studentIdToUpdate} not found`);
}
//delete student by id
const studentIdToDelete=1;
const studentIndexToDelete=students.findIndex(student=>student.id===studentIdToDelete);
if(studentIndexToDelete!==-1){
    const deleteStudent=students.splice(studentIndexToDelete,1);
    console.log(`student with id ${studentIdToDelete} deleted:`, deleteStudent[0]);
}
else{
    console.log(`student with id ${studentIdToDelete} not found`);
}
//All students slist after delection
console.log("All students list: ",students);