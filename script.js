
/* Array of student objects */
let students = [
    { name: "player1", age: 18, course: "bsc" },
    { name: "player2", age: 19, course: "bsc" },
    { name: "player3", age: 20, course: "bsc" }
];

let playerCount = 3;

// Get HTML elements
const studentContainer = document.getElementById("studentContainer");
const showBtn = document.getElementById("showBtn");
const addBtn = document.getElementById("addBtn");
const themeBtn = document.getElementById("themeBtn");
const message = document.getElementById("message");

/* Function to display all students using a loop */
function showStudents() {
    studentContainer.innerHTML = "";

    if (students.length === 0) {
        studentContainer.innerHTML = "<p>No students available.</p>";
        return;
    }

    for (let i = 0; i < students.length; i++) {
        const student = students[i];

        const card = document.createElement("div");
        card.className = "student-card";

        const name = document.createElement("h3");
        name.textContent = student.name;

        const age = document.createElement("p");
        age.textContent = "Age: " + student.age;

        const course = document.createElement("p");
        course.textContent = "Course: " + student.course;

        card.appendChild(name);
        card.appendChild(age);
        card.appendChild(course);

        studentContainer.appendChild(card);
    }
}

/* Callback version of adding a student */
function addStudentWithCallback(callback) {
    setTimeout(function () {
        try {
            playerCount++;

            const newStudent = {
                name: "player" + playerCount,
                age: 18,
                course: "bsc"
            };

            students.push(newStudent);

            callback(null, newStudent);
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

/* Promise version of adding a student */
function addStudent() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                playerCount++;

                const newStudent = {
                    name: "player" + playerCount,
                    age: 18,
                    course: "bsc"
                };

                students.push(newStudent);

                resolve(newStudent);
            } catch (error) {
                reject(error);
            }
        }, 2000);
    });
}

/* Event: Show Students */
showBtn.addEventListener("click", function () {
    showStudents();
    message.textContent = "Students displayed successfully!";
});

/* Async/Await: Add Student */
async function handleAddStudent() {
    addBtn.disabled = true;
    message.textContent = "Adding student... Please wait.";

    try {
        const newStudent = await addStudent();

        showStudents();

        message.textContent =
            newStudent.name + " added successfully!";
    } catch (error) {
        message.textContent = "Error adding student.";
        console.error(error);
    } finally {
        addBtn.disabled = false;
    }
}

/* Event: Add Student */
addBtn.addEventListener("click", handleAddStudent);

/* Event: Change Theme */
themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        message.textContent = "Dark theme enabled.";
    } else {
        message.textContent = "Normal theme enabled.";
    }
});
