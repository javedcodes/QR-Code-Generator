const wrapper = document.querySelector(".wrapper"),
      qrInput = wrapper.querySelector(".form input"),
      generateBtn = wrapper.querySelector(".form button"),
      qrImg = wrapper.querySelector(".qr-code img");

// Check if the button already exists, if not create it
let downloadBtn = wrapper.querySelector(".download-btn");
if (!downloadBtn) {
    downloadBtn = document.createElement("button");
    downloadBtn.innerText = "Download QR Code";
    downloadBtn.className = "download-btn";
    wrapper.appendChild(downloadBtn); // Append to the wrapper
    downloadBtn.style.display = "none"; // Initially hide the button
}

let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    if (!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${qrValue}`;
    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
        downloadBtn.style.display = "block"; // Show the download button
    });
});

qrInput.addEventListener("keyup", () => {
    if (!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
        downloadBtn.style.display = "none"; // Hide the download button if input is cleared
    }
});

// Add functionality to the download button
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = qrImg.src; // Use the QR code image URL
    link.download = "qr-code.png"; // Set the default filename
    link.click(); // Trigger the download
});
