document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isValid = true;
        const errorMessages = {};

        document.querySelectorAll(".error-message").forEach(el => el.remove());
        confirmationMessage.textContent = "";

        const fields = [
            {
                id: "firstName",
                value: document.getElementById("firstName").value.trim(),
                validation: value => value !== "",
                message: "First name is required."
            },
            {
                id: "lastName",
                value: document.getElementById("lastName").value.trim(),
                validation: value => value !== "",
                message: "Last name is required."
            },
            {
                id: "email",
                value: document.getElementById("email").value.trim(),
                validation: value => /\S+@\S+\.\S+/.test(value),
                message: "Please enter a valid email address."
            },
            {
                id: "mobile",
                value: document.getElementById("mobile").value.trim(),
                validation: value => /^\d{10,15}$/.test(value),
                message: "Mobile number must be between 10 and 15 digits."
            },
            {
                id: "address",
                value: document.getElementById("address").value.trim(),
                validation: value => value !== "",
                message: "Address is required."
            },
            {
                id: "age",
                value: document.getElementById("age").value.trim(),
                validation: value => !isNaN(value) && value >= 18 && value <= 100,
                message: "Age must be a number between 18 and 100."
            },
            {
                id: "hobbies",
                value: document.getElementById("hobbies").value.trim(),
                validation: value => value !== "",
                message: "Hobbies are required."
            },
            {
                id: "country",
                value: document.getElementById("country").value.trim(),
                validation: value => value !== "",
                message: "Please select your country."
            },
            {
                id: "message",
                value: document.getElementById("message").value.trim(),
                validation: value => value !== "",
                message: "Message is required."
            }
        ];

        fields.forEach(({ id, value, validation, message }) => {
            const fieldElement = document.getElementById(id);
            if (!validation(value)) {
                isValid = false;
                errorMessages[id] = message;

                const errorElement = document.createElement("div");
                errorElement.className = "error-message";
                errorElement.style.color = "red";
                errorElement.style.fontSize = "0.9rem";
                errorElement.textContent = message;
                fieldElement.parentNode.appendChild(errorElement);
            }
        });

        if (isValid) {
            confirmationMessage.style.color = "green";
            confirmationMessage.textContent = "Thank you for contacting us! We'll get back to you soon.";
            form.reset();
        } else {
            confirmationMessage.style.color = "red";
            confirmationMessage.textContent = "Please fix the errors highlighted below.";
        }
    });
});
