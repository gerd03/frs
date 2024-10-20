document.getElementById('generateBtn').addEventListener('click', function () {
    const startNumber = parseInt(document.getElementById('startNumber').value);
    const endNumber = parseInt(document.getElementById('endNumber').value);
    const startControlNumber = parseInt(document.getElementById('startControlNumber').value);
    const endControlNumber = parseInt(document.getElementById('endControlNumber').value);

    if (!startNumber || !endNumber || !startControlNumber || !endControlNumber || startNumber > endNumber || startControlNumber > endControlNumber) {
        alert("Please check your inputs. Make sure that the start and end values are correct.");
        return;
    }

    // Fuel Requisition Slip Output
    let fuelOutput = '';
    let controlNum = startControlNumber;

    for (let i = startNumber; i <= endNumber; i++) {
        if (controlNum > endControlNumber) break; // Stop when control number exceeds the end control number
        let controlEnd = controlNum + 49;  // Increment by 50 for each line
        if (controlEnd > endControlNumber) controlEnd = endControlNumber; // Ensure not to exceed the ending control number
        fuelOutput += `${i}\t${controlNum}-${controlEnd}\n`;
        controlNum += 50;
    }
    document.getElementById('fuelOutput').value = fuelOutput;

    // Central Warehouse Crude Monitoring Output
    const warehouseOutputs = document.getElementById('warehouseOutputs');
    warehouseOutputs.innerHTML = '';  // Clear previous outputs

    controlNum = startControlNumber;
    let boxCount = 0; // To keep track of the number of boxes generated

    for (let i = startNumber; i <= endNumber; i++) {
        if (controlNum > endControlNumber || boxCount >= 50) break; // Stop when control number exceeds the end control number or max 50 boxes are generated

        // Create a new box for each set of 25 control numbers
        const box = document.createElement('div');
        box.classList.add('box-output');

        let boxContent = '';
        for (let j = 0; j < 25; j++) {
            if (controlNum + j > endControlNumber) break; // Stop if control number exceeds the ending control number
            boxContent += `${controlNum + j}\n`;  // Output 25 control numbers
        }

        const textarea = document.createElement('textarea');
        textarea.classList.add('box-content');
        textarea.value = boxContent;

        // Add copy button for each box
        const copyBtn = document.createElement('button');
        copyBtn.innerText = 'Copy';
        copyBtn.onclick = function () {
            copyToClipboard(textarea, copyBtn);
        };

        box.appendChild(textarea);
        box.appendChild(copyBtn);
        warehouseOutputs.appendChild(box);

        controlNum += 25;  // Move to the next 25 control numbers
        boxCount++;  // Increment the box count
    }
});

document.getElementById('fuelCopyBtn').addEventListener('click', function () {
    const fuelTextarea = document.getElementById('fuelOutput');
    copyToClipboard(fuelTextarea, document.getElementById('fuelCopyBtn'));
});

function copyToClipboard(textarea, button) {
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    button.innerHTML = '✔'; // Change to check icon
    setTimeout(function () {
        button.innerHTML = 'Copy';  // Change back to copy after 3 seconds
        textarea.value = '';  // Clear the textarea
    }, 3000);
}
