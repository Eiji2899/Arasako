
//Nav bar
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}

if (close){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}
// Show the login popup
document.getElementById("loginBtn").addEventListener("click", function(e) {
    e.preventDefault();
    document.getElementById("loginPopup").style.display = "block";
  });

  // Toggle password visibility
  function togglePassword(id, icon) {
    const input = document.getElementById(id);
    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.add("fa-eye");
      icon.classList.remove("fa-eye-slash");
    }
  }
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const registerLink = document.getElementById('registerLink');
  const loginLink = document.getElementById('loginLink');
  const passwordMismatch = document.getElementById('passwordMismatch');
  function closePopup() {
  document.getElementById("loginPopup").style.display = "none";
  }

  // Switch to register form
  registerLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  // Switch back to login form
  loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    passwordMismatch.style.display = "none";
  });

  
  registerForm.addEventListener('submit', function(e) {
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-confirm-password').value;
  if (!registerForm.checkValidity()) {
    e.preventDefault(); 
    registerForm.reportValidity(); 
    return;
  }
  // Check password match
  if (password !== confirmPassword) {
    e.preventDefault();
    passwordMismatch.style.display = "block";
  } else {
    passwordMismatch.style.display = "none";
    // 
    // Submit or send to backend
  }
  });
  const regPasswordInput = document.getElementById('reg-password');
  const passwordHelp = document.getElementById('passwordHelp');

  regPasswordInput.addEventListener('input', function () {
    const value = regPasswordInput.value;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasDigit = /[0-9]/.test(value);
    const isLong = value.length>= 8;

    if (value === "") {
      passwordHelp.textContent = "";
    } else if (hasUpper && hasLower && hasDigit && isLong) {
      passwordHelp.textContent = "Strong password ✔";
      passwordHelp.style.color = "green";
    } else {
      passwordHelp.textContent = "Password must have at least 8 characters, an uppercase, lowercase and number";
      passwordHelp.style.color = "red";
    }
  });
  document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const response = await fetch('/api/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Login successful: ' + result.message);
        document.getElementById("loginPopup").style.display = "none";
      } else {
        alert('Login failed: ' + result.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  });
  
  
  /*(async function() {
      const { text } = await( await fetch(`/api/httpTrigger1`)).json();
      document.querySelector('#name').textContent = text;
  }());*/
