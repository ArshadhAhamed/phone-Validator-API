document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('phone-form').addEventListener('submit', fetchPhoneData);
});

/**

 * @param {Event} event - The form submission event.
 */
function fetchPhoneData(event) {
    event.preventDefault();

    const phoneNumber = document.getElementById('phone').value.trim();
    const apiKey = 'bbd1a8db17272fa20443382a93992f36'; // Replace with your actual Numverify API key
    const apiUrl = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${encodeURIComponent(phoneNumber)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (!data.valid) {
                displayError('The phone number is invalid. Please check and try again.');
            } else {
                displayPhoneData(data);
            }
        })
        .catch(error => displayError('An error occurred while fetching data.'));
}

/**
 
 * @param {object} data 
 */
function displayPhoneData(data) {
    const phoneResult = document.getElementById('phone-result');
    phoneResult.innerHTML = `
        <h3>Phone Number: ${data.international_format}</h3>
        <p><strong>Country:</strong> ${data.country_name} (${data.country_code})</p>
        <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
        <p><strong>Carrier:</strong> ${data.carrier || 'N/A'}</p>
        <p><strong>Line Type:</strong> ${data.line_type || 'N/A'}</p>
    `;
}

/**
 * 
 * @param {string} message - .
 */
function displayError(message) {
    const phoneResult = document.getElementById('phone-result');
    phoneResult.innerHTML = `<p class="text-danger">${message}</p>`;
}
