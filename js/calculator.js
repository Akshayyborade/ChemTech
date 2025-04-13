// Cost Calculator Functionality

// Base rates per sq. ft. in rupees
const baseRates = {
    antistatic: 85,
    selflevelling: 110,
    industrial: 150,
    protective: 70,
    crack: 50,
    concrete: 60,
    machinery: 180,
    waterproofing: 90,
    chemical: 125,
    clear: 95,
    pu: 135
};

// Multipliers for usage areas
const usageMultipliers = {
    automotive: 1.2,
    power: 1.5,
    food: 1.3,
    pharma: 1.4,
    industrial: 1.25,
    paper: 1.3,
    warehouse: 1.1,
    hydraulic: 1.4,
    commercial: 1.0,
    water: 1.3,
    treatment: 1.4,
    retail: 0.9,
    healthcare: 1.2
};

// Multipliers for floor condition
const conditionMultipliers = {
    good: 1.0,
    average: 1.2,
    poor: 1.5
};

// Main calculator function
export function calculateCost() {
    const area = document.getElementById('area').value;
    const applicationType = document.getElementById('application-type').value;
    const usageArea = document.getElementById('usage-area').value;
    const floorCondition = document.getElementById('floor-condition').value;
    
    if (!area || !applicationType || !usageArea) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate cost
    const baseRate = baseRates[applicationType];
    const usageMultiplier = usageMultipliers[usageArea];
    const conditionMultiplier = conditionMultipliers[floorCondition];
    
    const estimatedCost = area * baseRate * usageMultiplier * conditionMultiplier;
    const formattedCost = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(estimatedCost);
    
    // Display result
    document.getElementById('estimated-cost').textContent = formattedCost;
    document.getElementById('calculator-result').style.display = 'block';
}

// Initialize the calculator
export function initCalculator() {
    const calculateBtn = document.querySelector('button[onclick="calculateCost()"]');
    
    if (calculateBtn) {
        // Replace the inline onclick with event listener
        calculateBtn.removeAttribute('onclick');
        calculateBtn.addEventListener('click', calculateCost);
        
        console.log('Cost calculator initialized');
    } else {
        console.warn('Calculate button not found');
    }
}

// Export the calculator functions
export default {
    calculateCost,
    initCalculator
}; 