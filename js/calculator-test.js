document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculator test script loaded');
    
    // Find elements
    const calculateBtn = document.getElementById('calculate-cost');
    const areaInput = document.getElementById('area');
    const coatingTypeSelect = document.getElementById('coating-type');
    const floorConditionSelect = document.getElementById('floor-condition');
    const estimatedCostElement = document.getElementById('estimated-cost');
    
    // Log element existence
    console.log({
        calculateBtn,
        areaInput,
        coatingTypeSelect,
        floorConditionSelect,
        estimatedCostElement
    });
    
    // Add click event for testing
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            console.log('Calculate button clicked');
            alert('Calculator test successful!');
        });
    }
}); 