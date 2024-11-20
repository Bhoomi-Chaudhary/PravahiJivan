// Password Strength Checker
const passwordInput = document.getElementById('password');
const strengthMessage = document.getElementById('password-strength-message');
const confirmPasswordInput = document.getElementById('confirm-password');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const signupBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');
const commentForm = document.getElementById('comment-form');
const commentSection = document.getElementById('comment-section');
const carousel = document.getElementById('carousel');
let currentIndex = 0;

// Password Strength Function
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    if (strength === 0) {
        strengthMessage.textContent = "Weak";
        strengthMessage.style.color = "red";
    } else if (strength === 1) {
        strengthMessage.textContent = "Medium";
        strengthMessage.style.color = "orange";
    } else if (strength >= 2) {
        strengthMessage.textContent = "Strong";
        strengthMessage.style.color = "green";
    }
}

// Confirm Password Validation
function validateConfirmPassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity("Passwords do not match.");
    } else {
        confirmPasswordInput.setCustomValidity("");
    }
}

// Email Validation
function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.setCustomValidity("Please enter a valid email address.");
    } else {
        emailInput.setCustomValidity("");
    }
}

// Username Uniqueness Simulation
let existingUsernames = ["john_doe", "jane_doe", "admin"];

function checkUsernameAvailability() {
    if (existingUsernames.includes(usernameInput.value)) {
        usernameInput.setCustomValidity("Username already taken.");
    } else {
        usernameInput.setCustomValidity("");
    }
}

// SignUp Button Event
signupBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (passwordInput.validity.valid && confirmPasswordInput.validity.valid && emailInput.validity.valid && usernameInput.validity.valid) {
        alert('Signup Successful!');
    } else {
        alert('Please fill out the form correctly.');
    }
});

// Login Button Event
loginBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (emailInput.validity.valid) {
        localStorage.setItem('loggedIn', true);
        alert('Login Successful!');
    } else {
        alert('Please enter a valid email.');
    }
});

// Carousel functionality
function startCarousel() {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        updateCarousel();
    }, 3000);
}

function updateCarousel() {
    for (let i = 0; i < carousel.children.length; i++) {
        carousel.children[i].style.display = 'none';
    }
    carousel.children[currentIndex].style.display = 'block';
}

carousel.addEventListener('mouseover', function() {
    clearInterval(startCarousel);
});

carousel.addEventListener('mouseout', function() {
    startCarousel();
});

// Blog Post Submission
commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let comment = document.getElementById('comment').value;
    let name = document.getElementById('name').value;
    
    if (comment && name) {
        let newComment = document.createElement('div');
        newComment.innerHTML = <p><strong>${name}</strong> says:</p><p>"${comment}"</p>;
        commentSection.appendChild(newComment);
    } else {
        alert("Please provide both name and comment.");
    }
});

// Dynamically Load Blog Content
const blogContent = [
    {
        title: "Adapting to a New Diet",
        content: "Changing your diet according to your region is important for maintaining a balanced lifestyle. Local foods offer nutrients that are specific to the area."
    },
    {
        title: "Exercise Tips for All Seasons",
        content: "Exercise routines should adapt based on the seasons. For instance, colder climates require different exercises than warmer regions."
    },
    {
        title: "Managing Stress with Wellness Practices",
        content: "Adapting your wellness routine to local cultures can enhance your ability to manage stress. Try yoga in calm environments or seek outdoor activities."
    }
];

function loadBlogs() {
    let blogSection = document.getElementById('blog-section');
    blogContent.forEach((blog) => {
        let blogElement = document.createElement('div');
        blogElement.innerHTML = `
            <h2>${blog.title}</h2>
            <p>${blog.content}</p>
        `;
        blogSection.appendChild(blogElement);
    });
}

// Page Initialization
document.addEventListener('DOMContentLoaded', function() {
    loadBlogs();
    startCarousel();
});