// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// calculateResults
function calculateResults(e) {
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12 ;
    const calculatedPayments = parseFloat(years.value) * 12;


    // Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
    } else {
        showError('Please check your numbers');
    }


    e.preventDefault();
}

function showError(error) {
    // Create div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add a class
    errorDiv.className = 'alert alert-danger';


    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear Error after 3 secs
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}