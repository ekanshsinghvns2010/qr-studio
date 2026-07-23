function generateQR() {
    let text = document.getElementById("text").value.trim();

    if (text === "") {
        alert("Please enter a URL or text.");
        return;
    }

    // If it looks like a website, add https://
    if (
        !text.startsWith("http://") &&
        !text.startsWith("https://") &&
        text.includes(".")
    ) {
        text = "https://" + text;
    }

    const qrContainer = document.getElementById("qrcode");

    // Clear previous QR code
    qrContainer.innerHTML = "";

    // Generate QR
    new QRCode(qrContainer, {
        text: text,
        width: 220,
        height: 220,
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show download button
    document.getElementById("downloadBtn").hidden = false;
}

function downloadQR() {
    const canvas = document.querySelector("#qrcode canvas");

    if (!canvas) {
        alert("Generate a QR code first.");
        return;
    }

    const link = document.createElement("a");

    link.download = "qr-code.png";
    link.href = canvas.toDataURL("image/png");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}