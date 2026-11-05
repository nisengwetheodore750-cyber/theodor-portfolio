// 1. Get HTML elements
const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentList = document.getElementById("studentList");
const searchInput = document.getElementById("searchInput");

// 2. Load students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// 3. Display students
function displayStudents(data = students) {

    studentList.innerHTML = "";

    data.forEach(function(student) {

        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = student.id;

        const nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        const emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteStudent(student.id);
        });

        actionCell.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);

        studentList.appendChild(row);

    });
}

// 4. Add new student
studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const newStudent = {
        id: Date.now(),
        name: studentName.value.trim(),
        email: studentEmail.value.trim()
    };

    students.push(newStudent);

    saveStudents();

    displayStudents();

    studentForm.reset();

});

// 5. Save students
function saveStudents() {

    localStorage.setItem("students", JSON.stringify(students));

}

// 6. Delete student
function deleteStudent(id) {

    students = students.filter(function(student) {
        return student.id !== id;
    });

    saveStudents();

    displayStudents();

}

// 7. Search student
searchInput.addEventListener("input", function() {

    const searchValue = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(function(student) {

        return student.name.toLowerCase().includes(searchValue);

    });

    displayStudents(filteredStudents);

});

// 8. Display saved students when page opens
displayStudents();