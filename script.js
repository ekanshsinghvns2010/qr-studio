function generateQR() {

    const text = document.getElementById("text").value.trim();

    if (text === "") {
        alert("Please enter some text or a URL.");
        return;
    }

    const qrContainer = document.getElementById("qrcode");

    qrContainer.innerHTML = "";

    new QRCode(qrContainer, {
        text: text,
        width: 220,
        height: 220
    });

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

    link.click();
}