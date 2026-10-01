const STUDENT_STORAGE_KEY = "studentHubStudents";
const CURRENT_USER_KEY = "studentHubCurrentUser";
const THEME_KEY = "studentHubTheme";


/* =========================================
   LOAD INITIAL STUDENTS FROM JSON
========================================= */

async function initializeStudentData() {

    const existingStudents =
        localStorage.getItem(STUDENT_STORAGE_KEY);

    /*
       If students are already stored,
       don't overwrite them.
    */
    if (existingStudents) {
        return JSON.parse(existingStudents);
    }

    try {

        const response =
            await fetch("../Data/students.json");

        if (!response.ok) {
            throw new Error("Unable to load students.json");
        }

        const students =
            await response.json();

        localStorage.setItem(
            STUDENT_STORAGE_KEY,
            JSON.stringify(students)
        );

        return students;

    } catch (error) {

        console.error(
            "Error loading students.json:",
            error
        );

        return [];

    }
}


/* =========================================
   GET ALL STUDENTS
========================================= */

function getStudents() {

    return JSON.parse(
        localStorage.getItem(
            STUDENT_STORAGE_KEY
        ) || "[]"
    );

}


/* =========================================
   SAVE ALL STUDENTS
========================================= */

function saveStudents(students) {

    localStorage.setItem(
        STUDENT_STORAGE_KEY,
        JSON.stringify(students)
    );

}


/* =========================================
   REGISTER NEW STUDENT
========================================= */

function registerStudent(student) {

    const students = getStudents();

    const emailExists =
        students.some(function(existingStudent) {

            return existingStudent.email
                .toLowerCase() ===
                student.email.toLowerCase();

        });


    if (emailExists) {

        return {
            success: false,
            message: "Email already registered."
        };

    }


    const newStudent = {

        id: "STU" + Date.now(),

        name: student.name,

        email: student.email,

        password: student.password || "",

        mobile: student.mobile || "",

        course: student.course || "",

        semester: student.semester || "",

        enrollment: student.enrollment || "",

        city: student.city || "",

        division: student.division || "",

        gender: student.gender || ""

    };


    students.push(newStudent);

    saveStudents(students);


    return {
        success: true,
        student: newStudent
    };

}


/* =========================================
   LOGIN STUDENT
========================================= */

function loginStudent(email, password) {

    const students = getStudents();


    const student =
        students.find(function(student) {

            return (
                student.email.toLowerCase() ===
                email.toLowerCase() &&
                student.password === password
            );

        });


    if (!student) {

        return {

            success: false,

            message: "Invalid email or password."

        };

    }


    /*
       Save logged-in student's email
    */

    localStorage.setItem(
        CURRENT_USER_KEY,
        student.email
    );


    return {

        success: true,

        student: student

    };

}


/* =========================================
   GET CURRENT LOGGED-IN STUDENT
========================================= */

function getCurrentStudent() {

    const currentEmail =
        localStorage.getItem(
            CURRENT_USER_KEY
        );


    if (!currentEmail) {

        return null;

    }


    const students =
        getStudents();


    return students.find(
        function(student) {

            return (
                student.email.toLowerCase() ===
                currentEmail.toLowerCase()
            );

        }
    ) || null;

}


/* =========================================
   UPDATE STUDENT
========================================= */

function updateStudent(updatedData) {

    const students =
        getStudents();


    const currentEmail =
        localStorage.getItem(
            CURRENT_USER_KEY
        );


    if (!currentEmail) {

        return false;

    }


    const index =
        students.findIndex(
            function(student) {

                return (
                    student.email.toLowerCase() ===
                    currentEmail.toLowerCase()
                );

            }
        );


    if (index === -1) {

        return false;

    }


    students[index] = {

        ...students[index],

        ...updatedData

    };


    saveStudents(students);

    return true;

}


/* =========================================
   LOGOUT
========================================= */

function logoutStudent() {

    localStorage.removeItem(
        CURRENT_USER_KEY
    );

    window.location.href =
        "login.html";

}


/* =========================================
   THEME SYSTEM
========================================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_KEY
        ) || "light";


    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

}


function toggleTheme() {

    const currentTheme =
        document.documentElement.getAttribute(
            "data-theme"
        );


    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    document.documentElement.setAttribute(
        "data-theme",
        newTheme
    );


    localStorage.setItem(
        THEME_KEY,
        newTheme
    );

}


/* =========================================
   STARTUP
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        initializeTheme();

        await initializeStudentData();

    }
);