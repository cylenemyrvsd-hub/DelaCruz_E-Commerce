document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("users")) {
        const defaultUsers = [
            {
                username: "customer1",
                email: "user@example.com",
                password: "password123",
                role: "customer"
            },
            {
                username: "seller1",
                email: "seller@example.com",
                password: "password123",
                role: "seller"
            }
        ];
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }

    // Container Switcher Animation
    const container = document.querySelector('.container');
    const btnRegister = document.querySelector('.register-btn');
    const btnLogin = document.querySelector('.login-btn');

    if (btnRegister && container) {
        btnRegister.addEventListener('click', () => container.classList.add('active'));
    }
    if (btnLogin && container) {
        btnLogin.addEventListener('click', () => container.classList.remove('active'));
    }

    // Registration Handler
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("regUser").value.trim();
            const email = document.getElementById("regEmail").value.trim();
            const password = document.getElementById("regPass").value.trim();
            const regMessageBox = document.getElementById("regMessageBox");

            if (!username || !email || !password) {
                showMessage(regMessageBox, "Please fill in all fields.", "error");
                return;
            }

            if (password.length < 6) {
                showMessage(regMessageBox, "Password should be at least 6 characters.", "error");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(user => user.username === username || user.email === email)) {
                showMessage(regMessageBox, "Username or Email already registered.", "error");
                return;
            }

            // Automatic Role Identification based on Email address
            const role = email.toLowerCase().includes("seller") ? "seller" : "customer";

            users.push({ username, email, password, role });
            localStorage.setItem("users", JSON.stringify(users));

            // Also save registered user backup profile for seller profile pages
            const newUserProfile = {
                username: username,
                sellerName: username,
                storeName: "MYRVS",
                email: email,
                phone: "+63 917 123 4567",
                address: "Camiling, Tarlac, Philippines",
                role: role
            };
            localStorage.setItem("myrvs_registered_user", JSON.stringify(newUserProfile));

            showMessage(regMessageBox, "", "");
            showToast(`✅ Registered successfully as ${role.toUpperCase()}!`);
            
            registerForm.reset();
            container.classList.remove('active');
        });
    }

    // Login Form Validation, Error Handling, Role Identification & Redirection
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const inputField = document.getElementById("loginUser").value.trim();
            const password = document.getElementById("loginPass").value.trim();
            const messageBox = document.getElementById("messageBox");

            // Form Validation (Empty checks)
            if (!inputField || !password) {
                showMessage(messageBox, "Please enter your username/email and password.", "error");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Match account by username or email
            const validUser = users.find(user => 
                (user.username === inputField || user.email === inputField) && user.password === password
            );

            // Error Message for Invalid Login
            if (!validUser) {
                showMessage(messageBox, "Invalid username/email or password.", "error");
                return;
            }

            // Construct user profile session payload
            const sessionData = {
                username: validUser.username,
                sellerName: validUser.username,
                storeName: "MYRVS",
                email: validUser.email,
                phone: "+63 917 123 4567",
                address: "Camiling, Tarlac, Philippines",
                role: validUser.role
            };

            // Store Active Session across all keys for seamless integration with Seller Profile
            localStorage.setItem("currentUser", JSON.stringify(sessionData));
            localStorage.setItem("myrvs_active_user", JSON.stringify(sessionData));
            localStorage.setItem("myrvs_seller_profile", JSON.stringify(sessionData));

            showMessage(messageBox, "", "");
            showToast(`✅ Welcome back, ${validUser.username}! (${validUser.role.toUpperCase()})`);

            // Redirect to correct dashboard page after login
            setTimeout(() => {
                if (validUser.role === "seller") {
                    window.location.href = "sellerdashboard.html"; // Seller Dashboard
                } else {
                    window.location.href = "side-menu.html"; // Customer Side Menu Page
                }
            }, 1200);
        });
    }

    // Password Visibility Toggle Function
    document.querySelectorAll(".toggle-password").forEach(icon => {
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
        setTimeout(() => toast.classList.remove("show"), 3000);
    }
});