// Copy to clipboard function
function copyToClipboard(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}

// Main function to generate outputs
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

    // Clear old warehouse output boxes
    const warehouseOutputContainer = document.getElementById('warehouseOutputContainer');
    warehouseOutputContainer.innerHTML = '';

    // Generate Central Warehouse Crude Monitoring Output
    controlNumber = controlStart;
    for (let i = startNumber; i <= endNumber; i++) {
        let warehouseBox = document.createElement('div');
        warehouseBox.className = 'output-box';
        
        let outputContent = '';
        for (let j = 0; j < 50; j++) {
            outputContent += `${controlNumber}\n`;
            controlNumber++;
            if (j === 24) outputContent += '\n'; // Add a break after 25 numbers
        }
        
        // Add textarea for each interval
        let textArea = document.createElement('textarea');
        textArea.readOnly = true;
        textArea.value = outputContent;
        textArea.style.fontFamily = 'Calibri';
        textArea.style.fontSize = '9pt';
        
        warehouseBox.appendChild(textArea);

        // Add copy button for each interval
        let copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.textContent = 'Copy for Excel';
        copyButton.onclick = function() {
            textArea.select();
            document.execCommand('copy');
            alert('Copied to clipboard!');
        };

        warehouseBox.appendChild(copyButton);
        warehouseOutputContainer.appendChild(warehouseBox);
    }
});
