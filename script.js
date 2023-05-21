function validateCreditCard() {
    var cardNumber = document.getElementById('cardNumber').value;
    var expirationDate = document.getElementById('expirationDate').value;
    var cvv = document.getElementById('cvv').value;

    var isValidCardNumber = validateCardNumber(cardNumber);
    var isValidExpirationDate = validateExpirationDate(expirationDate);
    var isValidCVV = validateCVV(cvv, cardNumber);

    if (isValidCardNumber && isValidExpirationDate && isValidCVV) {
        showSuccessPopup();
    } else {
        showErrorPopup();
    }
}

function validateCardNumber(cardNumber) {
    var cardNumberLength = cardNumber.length;
    if (cardNumberLength >= 16 && cardNumberLength <= 19) {
        return true;
    }
    return false;
}

function validateExpirationDate(expirationDate) {
    var currentDate = new Date();
    var currentYear = currentDate.getUTCFullYear() % 100;
    var currentMonth = currentDate.getUTCMonth() + 1;

    var parts = expirationDate.split('/');
    var year = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);

    if (year > currentYear) {
        return true;
    } else if (year === currentYear && month >= currentMonth) {
        return true;
    }

    return false;
}

function validateCVV(cvv, cardNumber) {
    var cvvLength = cvv.length;
    var firstTwoDigits = cardNumber.substring(0, 2);

    if (firstTwoDigits === '34' || firstTwoDigits === '37') {
        return cvvLength === 4;
    } else {
        return cvvLength === 3;
    }
}

function showSuccessPopup() {
    alert('Credit card information is valid.');
}

function showErrorPopup() {
    alert('Credit card information is not valid. Please check your card details and try again.');
}

// Fetch current date and time from WorldTimeAPI
function fetchCurrentDateTime() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://worldtimeapi.org/api/ip', true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            var currentDateTime = new Date(response.datetime);

            var currentYear = currentDateTime.getUTCFullYear() % 100; // Get last two digits of the UTC year
            var currentMonth = currentDateTime.getUTCMonth() + 1; // January is 0

            // Use currentYear and currentMonth for any further processing
        }
    };

    xhr.send();
}

// Call the function to fetch the current date and time
fetchCurrentDateTime();
