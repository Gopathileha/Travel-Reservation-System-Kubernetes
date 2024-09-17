document.addEventListener('DOMContentLoaded', () => {
    // Navigation buttons
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const getTicketBtn = document.getElementById('get-ticket-btn');

    // Modals
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const ticketModal = document.getElementById('ticket-modal');

    // Modal close buttons
    const loginCloseBtn = document.getElementById('login-close-btn');
    const signupCloseBtn = document.getElementById('signup-close-btn');
    const ticketCloseBtn = document.getElementById('ticket-close-btn');

    // Forms
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const bookingForm = document.getElementById('booking-form');

    // Booking summary elements
    const bookingSummary = document.getElementById('booking-summary');
    const summaryElement = document.getElementById('summary');

    // Price per passenger
    const pricePerPassenger = 500; // Change this value as needed

    // Handle page navigation
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html'; // Redirect to login page
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            window.location.href = 'signup.html'; // Redirect to sign up page
        });
    }

    if (getTicketBtn) {
        getTicketBtn.addEventListener('click', () => {
            window.location.href = 'ticket.html'; // Redirect to get ticket page
        });
    }

    // Handle modal opening and closing
    if (loginCloseBtn) {
        loginCloseBtn.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    if (signupCloseBtn) {
        signupCloseBtn.addEventListener('click', () => {
            signupModal.style.display = 'none';
        });
    }

    if (ticketCloseBtn) {
        ticketCloseBtn.addEventListener('click', () => {
            ticketModal.style.display = 'none';
        });
    }

    // Click outside modal to close it
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
        if (event.target === ticketModal) {
            ticketModal.style.display = 'none';
        }
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            if (validateCredentials(email, password)) {
                alert("Login successful!");
                window.location.href = 'index.html'; // Redirect to homepage
            } else {
                alert('Invalid email or password. Please try again.');
            }
        });

        function validateCredentials(email, password) {
            return email !== '' && password !== ''; // Replace with actual validation logic
        }
    }

    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            if (!email || !password) {
                alert("Please fill in all fields.");
                return;
            }

            alert(`Signed up with Email: ${email}`);
            //signupModal.style.display = 'none';
            window.location.href = 'index.html'; // Redirect to homepage
        });
    }

    // Update total price based on the number of passengers
    function updateTotalPrice() {
        const passengersInput = document.getElementById('passengers');
        const priceInput = document.getElementById('price');

        if (!passengersInput || !priceInput) return;

        const numberOfPassengers = parseInt(passengersInput.value) || 0;
        const totalPrice = numberOfPassengers * pricePerPassenger;

        priceInput.value = `$${totalPrice.toFixed(2)}`;
    }

    const passengersInput = document.getElementById('passengers');
    if (passengersInput) {
        passengersInput.addEventListener('input', updateTotalPrice);
    }

    // Ticket booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const gender = document.getElementById('gender').value;
            const dob = document.getElementById('dob').value;
            const mobile = document.getElementById('mobile').value;
            const email = document.getElementById('email').value;
            const journeyDate = document.getElementById('journey-date').value;
            const travelFrom = document.getElementById('travel-from').value;
            const travelTo = document.getElementById('travel-to').value;
            const price = document.getElementById('price').value;
            const passengers = document.getElementById('passengers').value;

            const phonePattern = /^[0-9]{10}$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !gender || !dob || !mobile || !email || !journeyDate || !travelFrom || !travelTo || !price || !passengers) {
                alert("Please fill in all required fields.");
                return;
            }

            if (!phonePattern.test(mobile)) {
                alert("Please enter a valid 10-digit mobile number.");
                return;
            }

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (new Date(journeyDate) < new Date()) {
                alert("The date of journey cannot be in the past.");
                return;
            }

            if (price <= 0 || passengers <= 0) {
                alert("Price and number of passengers must be positive numbers.");
                return;
            }

            const summaryText = `
                <strong>Name:</strong> ${name}<br>
                <strong>Gender:</strong> ${gender}<br>
                <strong>Date of Birth:</strong> ${dob}<br>
                <strong>Mobile Number:</strong> ${mobile}<br>
                <strong>Email ID:</strong> ${email}<br>
                <strong>Date of Journey:</strong> ${journeyDate}<br>
                <strong>Travel From:</strong> ${travelFrom}<br>
                <strong>Travel To:</strong> ${travelTo}<br>
                <strong>Total Price:</strong> $${price}<br>
                <strong>Number of Passengers:</strong> ${passengers}
            `;

            summaryElement.innerHTML = summaryText;
            bookingSummary.style.display = 'block'; // Make the summary visible

            // Alert before redirecting
            alert("Form submitted successfully! You will be redirected shortly.");

            // Redirect after displaying summary
            setTimeout(() => {
                window.location.href = 'confirmation.html';
            }, 3000);
        });
    } else {
        console.error('Booking form element not found.');
    }
});
