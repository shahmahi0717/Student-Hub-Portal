/* =========================================================
   STUDENT HUB PORTAL
   COMMON JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CURRENT PAGE
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    /* =====================================================
       DARK MODE
       ===================================================== */

    /*
       These pages MUST stay in light mode.
    */

    const lightModePages = [
        "home.html",
        "contact.html",
        "faqs.html",
        "about.html",
        "login.html",
        "register.html",
        "forgetpassword.html",
        "forgotpassword.html"
    ];


    /*
       Check if current page can use dark mode.
    */

    const darkModeAllowed =
        !lightModePages.includes(currentPage);


    /*
       Get Dark Mode button.
       The button exists ONLY on dashboard.
    */

    const darkModeButton =
        document.getElementById("darkModeToggle");


    if (darkModeAllowed) {

        /*
           Get saved theme.
        */

        const savedTheme =
            localStorage.getItem("studentHubTheme");


        /*
           Apply saved dark mode.
        */

        if (savedTheme === "dark") {

            document.body.classList.add("dark-mode");

        }


        /*
           Update button text.
        */

        updateDarkModeButton();


        /*
           Dark Mode button click.
        */

        if (darkModeButton) {

            darkModeButton.addEventListener(
                "click",
                function () {

                    document.body.classList.toggle(
                        "dark-mode"
                    );


                    /*
                       Save theme.
                    */

                    if (
                        document.body.classList.contains(
                            "dark-mode"
                        )
                    ) {

                        localStorage.setItem(
                            "studentHubTheme",
                            "dark"
                        );

                    } else {

                        localStorage.setItem(
                            "studentHubTheme",
                            "light"
                        );

                    }


                    updateDarkModeButton();

                }
            );

        }

    }


    /*
       Change Dark Mode button text.
    */

    function updateDarkModeButton() {

        if (!darkModeButton) {
            return;
        }


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            darkModeButton.innerHTML =
                "☀️ Light Mode";

        } else {

            darkModeButton.innerHTML =
                "🌙 Dark Mode";

        }

    }


    /* =====================================================
       SIDEBAR TOGGLE
       ===================================================== */

    const sidebar =
        document.getElementById("sidebar");


    const mainContent =
        document.getElementById("mainContent");


    const sidebarToggle =
        document.getElementById("sidebarToggle");


    if (sidebar && sidebarToggle) {

        sidebarToggle.addEventListener(
            "click",
            function () {

                sidebar.classList.toggle(
                    "collapsed"
                );


                if (mainContent) {

                    mainContent.classList.toggle(
                        "expanded"
                    );

                }

            }
        );

    }


    /* =====================================================
       ACTIVE SIDEBAR LINK
       ===================================================== */

    document
        .querySelectorAll(".sidebar-links a")
        .forEach(function (link) {

            const href =
                (link.getAttribute("href") || "")
                    .split("/")
                    .pop()
                    .toLowerCase();


            if (
                href === currentPage &&
                currentPage !== ""
            ) {

                document
                    .querySelectorAll(
                        ".sidebar-links a"
                    )
                    .forEach(function (item) {

                        item.classList.remove(
                            "active"
                        );

                    });


                link.classList.add("active");

            }

        });


    /* =====================================================
       SEARCH / FILTER
       ===================================================== */

    document
        .querySelectorAll("form.search-bar")
        .forEach(function (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const searchInput =
                        form.querySelector(
                            "input[type='search']"
                        );


                    if (!searchInput) {
                        return;
                    }


                    const keyword =
                        searchInput.value
                            .trim()
                            .toLowerCase();


                    const cards =
                        document.querySelectorAll(
                            ".item-card"
                        );


                    cards.forEach(
                        function (card) {

                            const cardText =
                                card.textContent
                                    .toLowerCase();


                            if (
                                cardText.includes(
                                    keyword
                                )
                            ) {

                                card.style.display =
                                    "";

                            } else {

                                card.style.display =
                                    "none";

                            }

                        }
                    );

                }
            );

        });


    /* =====================================================
       FAQ
       ===================================================== */

    document
        .querySelectorAll(".faq-item")
        .forEach(function (item) {

            const question =
                item.querySelector("h3");


            const answer =
                item.querySelector("p");


            if (!question || !answer) {
                return;
            }


            answer.style.display = "none";


            question.style.cursor =
                "pointer";


            question.addEventListener(
                "click",
                function () {

                    if (
                        answer.style.display ===
                        "none"
                    ) {

                        answer.style.display =
                            "block";

                    } else {

                        answer.style.display =
                            "none";

                    }

                }
            );

        });


    /* =====================================================
       REGISTRATION FORM
       ===================================================== */

    const registrationForm =
        document.getElementById(
            "registrationForm"
        );


    /*
       IMPORTANT:
       Only run this if registrationForm exists.
       This prevents errors on other pages.
    */

    if (registrationForm) {

        registrationForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* -----------------------------
                   GET VALUES
                   ----------------------------- */

                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                const enrollment =
                    document.getElementById(
                        "enrollment"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();


                const mobile =
                    document.getElementById(
                        "mobile"
                    ).value.trim();


                const department =
                    document.getElementById(
                        "department"
                    ).value.trim();


                const semester =
                    document.getElementById(
                        "semester"
                    ).value.trim();


                const password =
                    document.getElementById(
                        "password"
                    ).value;


                const confirmPassword =
                    document.getElementById(
                        "confirmPassword"
                    ).value;


                /* -----------------------------
                   NAME
                   ----------------------------- */

                if (name === "") {

                    alert(
                        "Please enter your name."
                    );

                    return;

                }


                /* -----------------------------
                   ENROLLMENT
                   ----------------------------- */

                if (enrollment === "") {

                    alert(
                        "Please enter your enrollment number."
                    );

                    return;

                }


                /* -----------------------------
                   EMAIL
                   ----------------------------- */

                const gmailPattern =
                    /^[a-zA-Z0-9._+-]+@gmail\.com$/;


                if (email === "") {

                    alert(
                        "Please enter your Gmail address."
                    );

                    return;

                }


                if (
                    !gmailPattern.test(email)
                ) {

                    alert(
                        "This is not a correct Gmail address. Please enter a valid Gmail address."
                    );

                    return;

                }


                /* -----------------------------
                   MOBILE
                   ----------------------------- */

                const mobilePattern =
                    /^[0-9]{10}$/;


                if (mobile === "") {

                    alert(
                        "Please enter your mobile number."
                    );

                    return;

                }


                if (
                    !mobilePattern.test(mobile)
                ) {

                    alert(
                        "Mobile number is incorrect. Please enter exactly 10 digits."
                    );

                    return;

                }


                /* -----------------------------
                   DEPARTMENT
                   ----------------------------- */

                if (department === "") {

                    alert(
                        "Please enter your department."
                    );

                    return;

                }


                /* -----------------------------
                   SEMESTER
                   ----------------------------- */

                if (semester === "") {

                    alert(
                        "Please enter your semester."
                    );

                    return;

                }


                /* -----------------------------
                   PASSWORD
                   ----------------------------- */

                if (password === "") {

                    alert(
                        "Please enter your password."
                    );

                    return;

                }


                if (password.length < 8) {

                    alert(
                        "Password must contain at least 8 characters."
                    );

                    return;

                }


                /* -----------------------------
                   CONFIRM PASSWORD
                   ----------------------------- */

                if (confirmPassword === "") {

                    alert(
                        "Please confirm your password."
                    );

                    return;

                }


                if (
                    password !==
                    confirmPassword
                ) {

                    alert(
                        "Password and Confirm Password do not match."
                    );

                    return;

                }


                /* -----------------------------
                   SUCCESS
                   ----------------------------- */

                alert(
                    "Registration successful!"
                );


                registrationForm.reset();

            }
        );

    }


    /* =====================================================
       LOGIN FORM
       ===================================================== */

    document
        .querySelectorAll("form")
        .forEach(function (form) {

            /*
               Don't interfere with registration.
            */

            if (
                form.id ===
                "registrationForm"
            ) {

                return;

            }


            const emailInput =
                form.querySelector(
                    "input[type='email']"
                );


            const passwordInput =
                form.querySelector(
                    "input[type='password']"
                );


            const submitButton =
                form.querySelector(
                    "button[type='submit']"
                );


            if (
                emailInput &&
                passwordInput &&
                submitButton
            ) {

                form.addEventListener(
                    "submit",
                    function (event) {

                        event.preventDefault();


                        if (
                            emailInput.value
                                .trim() === ""
                        ) {

                            alert(
                                "Please enter your email."
                            );

                            emailInput.focus();

                            return;

                        }


                        if (
                            !emailInput.checkValidity()
                        ) {

                            alert(
                                "Please enter a valid email address."
                            );

                            emailInput.focus();

                            return;

                        }


                        if (
                            passwordInput.value === ""
                        ) {

                            alert(
                                "Please enter your password."
                            );

                            passwordInput.focus();

                            return;

                        }


                        alert(
                            "Login successful!"
                        );

                    }
                );

            }

        });


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    document
        .querySelectorAll(".contact-form")
        .forEach(function (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const name =
                        form.querySelector(
                            "#name"
                        );


                    const email =
                        form.querySelector(
                            "#email"
                        );


                    const subject =
                        form.querySelector(
                            "#subject"
                        );


                    const message =
                        form.querySelector(
                            "#message"
                        );


                    if (
                        !name ||
                        !email ||
                        !subject ||
                        !message
                    ) {

                        return;

                    }


                    if (
                        name.value.trim() === ""
                    ) {

                        alert(
                            "Please enter your name."
                        );

                        name.focus();

                        return;

                    }


                    if (
                        email.value.trim() === "" ||
                        !email.checkValidity()
                    ) {

                        alert(
                            "Please enter a valid email address."
                        );

                        email.focus();

                        return;

                    }


                    if (
                        subject.value.trim() === ""
                    ) {

                        alert(
                            "Please enter a subject."
                        );

                        subject.focus();

                        return;

                    }


                    if (
                        message.value.trim() === ""
                    ) {

                        alert(
                            "Please enter your message."
                        );

                        message.focus();

                        return;

                    }


                    alert(
                        "Your message has been submitted successfully!"
                    );


                    form.reset();

                }
            );

        });


    /* =====================================================
       LIBRARY BORROW BUTTON
       ===================================================== */

    document
        .querySelectorAll("button")
        .forEach(function (button) {

            const text =
                button.textContent
                    .trim()
                    .toLowerCase();


            /*
               Ignore these buttons.
            */

            if (
                button.id ===
                "darkModeToggle"
            ) {
                return;
            }


            if (
                button.id ===
                "sidebarToggle"
            ) {
                return;
            }


            if (
                button.type ===
                "submit"
            ) {
                return;
            }


            /*
               BORROW
            */

            if (text === "borrow") {

                button.addEventListener(
                    "click",
                    function () {

                        alert(
                            "Book borrowed successfully!"
                        );


                        button.textContent =
                            "Issued";


                        button.disabled =
                            true;

                    }
                );

            }


            /*
               APPLY
            */

            if (text === "apply") {

                button.addEventListener(
                    "click",
                    function () {

                        alert(
                            "Application submitted successfully!"
                        );

                    }
                );

            }

        });


    /* =====================================================
       JAVASCRIPT LOADED
       ===================================================== */

    console.log(
        "Student Hub common JavaScript loaded successfully."
    );

});