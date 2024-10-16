// Copy to clipboard function
function copyToClipboard(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}

// Main function to generate output for both Word and Excel
document.getElementById("generate").addEventListener("click", function () {
    const startNumber = parseInt(document.getElementById("startNumber").value);
    const endNumber = parseInt(document.getElementById("endNumber").value);
    const controlStart = parseInt(document.getElementById("controlStart").value);

    if (isNaN(startNumber) || isNaN(endNumber) || isNaN(controlStart)) {
        alert("Please enter valid numbers.");
        return;
    }

    // Generate Fuel Requisition Slip Output
    let fuelOutput = "NO.\tCONTROL #\n";
    let controlNumber = controlStart;
    for (let i = startNumber; i <= endNumber; i++) {
        fuelOutput += `${i}\t${controlNumber}-${controlNumber + 49}\n`;
        controlNumber += 50;
    }
    document.getElementById("fuelOutput").value = fuelOutput;

    // Generate Central Warehouse Crude Monitoring Output
    let excelOutput = "";
    controlNumber = controlStart;
    for (let i = startNumber; i <= endNumber; i++) {
        for (let j = 0; j < 50; j++) {
            excelOutput += `${controlNumber}\n`;
            controlNumber++;
            if (j === 24) excelOutput += '\n'; // Break after 25 numbers
        }
    }
    document.getElementById("excelOutput").value = excelOutput;
});
