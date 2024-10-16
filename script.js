// Function to generate control numbers based on inputs
document.getElementById('generate').addEventListener('click', function() {
    const startNumber = parseInt(document.getElementById('startNumber').value);
    const endNumber = parseInt(document.getElementById('endNumber').value);
    const controlStart = parseInt(document.getElementById('controlStart').value);

    // Validate inputs
    if (isNaN(startNumber) || isNaN(endNumber) || isNaN(controlStart)) {
        alert("Please provide valid numbers for the inputs.");
        return;
    }

    // Clear previous output
    const outputSection = document.getElementById('outputSection');
    outputSection.innerHTML = '';

    // Generate control numbers for the range
    let currentControl = controlStart;
    for (let i = startNumber; i <= endNumber; i++) {
        // Create output box for every 25 control numbers
        const outputBox = document.createElement('div');
        outputBox.className = 'output-box';
        
        let controlNumbers = '';
        for (let j = 0; j < 50; j++) { // Each box contains 50 control numbers
            controlNumbers += currentControl + '\n';
            currentControl++;
            if (j === 24) controlNumbers += '\n'; // Split each box at 25th number
        }

        // Create textarea to display control numbers
        const textArea = document.createElement('textarea');
        textArea.readOnly = true;
        textArea.value = controlNumbers;
        outputBox.appendChild(textArea);

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-btn';
        copyButton.textContent = 'Copy';
        copyButton.onclick = function() {
            textArea.select();
            document.execCommand('copy');
            alert('Copied to clipboard!');
        };
        outputBox.appendChild(copyButton);

        // Append box to the output section
        outputSection.appendChild(outputBox);
    }
});
