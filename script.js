// app.js

// Import Axios
import axios from 'axios';

// Base URL for your API
const API_BASE_URL = 'http://localhost:3000/api';

// Function to register a new driver
function registerDriver() {
    const driverData = {
        vehicleNumber: document.getElementById('vehicleNumber').value,
        name: document.getElementById('driverName').value,
        // Add any additional fields here
    };

    axios.post(`${API_BASE_URL}/drivers`, driverData)
        .then(response => {
            console.log('Driver registered:', response.data);
            alert('Driver registered successfully!');
        })
        .catch(error => {
            console.error('Error registering driver:', error);
            alert('Failed to register driver: ' + error.response.data.message);
        });
}

// Function to handle displaying the passenger form
function showPassenger() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('passenger').style.display = 'block';
    document.getElementById('driver').style.display = 'none'; 
}

// Function to handle displaying the driver form
function showDriver() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('driver').style.display = 'block';
    document.getElementById('passenger').style.display = 'none';
}

// Add event listeners to buttons (assuming you have IDs set in HTML)
document.getElementById('registerDriverButton').addEventListener('click', registerDriver);
document.getElementById('passengerButton').addEventListener('click', showPassenger);
document.getElementById('driverButton').addEventListener('click', showDriver);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const { protect } = require('./middleware/authMiddleware'); 
app.use('/api/drivers', protect, driverRoutes); 
app.use('/api/trips', protect, tripRoutes);


function selectPickup() {
    alert("Pickup location selection triggered!");
    // In a full implementation, this could open a map interface or location picker.
}

function signInPassenger() {
    // Hide the passenger login section
    document.getElementById('passenger').style.display = 'none';

    // Display the passenger interface section
    const passengerInterface = document.getElementById('passenger-interface');
    passengerInterface.style.display = 'block';
    passengerInterface.classList.add('fade-in'); // Optional: Add fade-in animation
}


let allOptions = [];

// Run once on page load to store the initial hostel options
document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('hostel-select');
    allOptions = Array.from(select.options).map(option => ({
        text: option.textContent,
        value: option.value
    }));
});


const hostels = [
    "Hostel A", "Hostel B", "Hostel C", "Hostel D", "Hostel E",
    "Hostel F", "Hostel G", "Hostel H", "Hostel I", "Hostel J",
    "Hostel K", "Hostel L", "Hostel M", "Hostel N", "Hostel O", "Hostel PG", "Hostel Q", "MAIN GATE", "JAGGI", "COS" , "TAN"
];

function filterHostels() {
    const input = document.getElementById('search-hostel');
    const dropdown = document.getElementById('dropdown2-options');
    const query = input.value.toLowerCase();

    // Clear previous dropdown options
    dropdown.innerHTML = '';
    dropdown.style.display = 'none'; // Hide initially

    // Filter hostels based on query
    const filteredHostels = hostels.filter(hostel => 
        hostel.toLowerCase().includes(query)
    );

    // Display matching hostels in dropdown
    if (filteredHostels.length > 0) {
        dropdown.style.display = 'block'; // Show dropdown
        filteredHostels.forEach(hostel => {
            const option = document.createElement('div');
            option.textContent = hostel;
            option.onclick = () => selectHostel(hostel);
            dropdown.appendChild(option);
        });
    }
}

function selectHostel(hostel) {
    document.getElementById('search-hostel').value = hostel;
    document.getElementById('dropdown-options').style.display = 'none'; // Hide dropdown
}
// Close dropdown when clicking outside
window.addEventListener('click', function (event) {
    const dropdown = document.getElementById('dropdown2-options');
    const input = document.getElementById('search-hostel');
    if (!input.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none'; // Hide dropdown if clicked outside
    }
});

// Event listener for the search input to filter hostels
document.getElementById('search-hostel').addEventListener('input', filterHostels);