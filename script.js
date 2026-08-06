document.addEventListener("DOMContentLoaded", () => {

    
    const container = document.querySelector('.container');
    const btnRegister = document.querySelector('.register-btn');
    const btnLogin = document.querySelector('.login-btn');

    if (btnRegister && container) {
        btnRegister.addEventListener('click', () => {
            container.classList.add('active');
        });
    }

    if (btnLogin && container) {
        btnLogin.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }

    
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById("loginUser");
            const passwordInput = document.getElementById("loginPass");
            const messageBox = document.getElementById("messageBox");

            const username = usernameInput ? usernameInput.value.trim() : "";
            const password = passwordInput ? passwordInput.value.trim() : "";

            if (username === "") {
                showMessage(messageBox, "Please enter your username.", "error");
                return;
            }

            if (password === "") {
                showMessage(messageBox, "Please enter your password.", "error");
                return;
            }

            if (password.length < 6) {
                showMessage(messageBox, "Password should be at least 6 characters.", "error");
                return;
            }

            showToast("✅ Login successful!");
        });
    }

   
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const regUserInput = document.getElementById("regUser");
            const regEmailInput = document.getElementById("regEmail");
            const regPassInput = document.getElementById("regPass");
            const regMessageBox = document.getElementById("regMessageBox");

            const username = regUserInput ? regUserInput.value.trim() : "";
            const email = regEmailInput ? regEmailInput.value.trim() : "";
            const password = regPassInput ? regPassInput.value.trim() : "";

            if (username === "") {
                showMessage(regMessageBox, "Please enter a username.", "error");
                return;
            }

            if (email === "") {
                showMessage(regMessageBox, "Please enter your email.", "error");
                return;
            }

            if (password === "") {
                showMessage(regMessageBox, "Please enter a password.", "error");
                return;
            }

            if (password.length < 6) {
                showMessage(regMessageBox, "Password should be at least 6 characters.", "error");
                return;
            }

            showToast("✅ Registration successful!");
        });
    }
    const toggleIcons = document.querySelectorAll(".toggle-password");

toggleIcons.forEach(icon => {
    icon.addEventListener("click", () => {

        
        const passwordInput = icon.parentElement.querySelector("input");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.classList.remove("bx-hide");
            icon.classList.add("bx-show");
        } else {
            passwordInput.type = "password";
            icon.classList.remove("bx-show");
            icon.classList.add("bx-hide");
        }

    });
});

   
    function showMessage(targetBox, text, type) {
        if (targetBox) {
            targetBox.textContent = text;
            targetBox.className = `message-box ${type}`;
        }
    }
    function showToast(message) {
    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
});