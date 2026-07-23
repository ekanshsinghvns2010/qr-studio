let currentType = "url";


// -------------------------
// Change QR Type
// -------------------------

function setType(type) {

    currentType = type;

    const urlTab = document.getElementById("urlTab");
    const textTab = document.getElementById("textTab");

    const label = document.getElementById("inputLabel");
    const input = document.getElementById("text");


    if (type === "url") {

        urlTab.classList.add("active");
        textTab.classList.remove("active");

        label.textContent = "Enter your URL";

        input.placeholder = "https://example.com";

    } else {

        textTab.classList.add("active");
        urlTab.classList.remove("active");

        label.textContent = "Enter your text";

        input.placeholder = "Enter any text here...";

    }

}


// -------------------------
// Generate QR
// -------------------------

function generateQR() {

    let text = document
        .getElementById("text")
        .value
        .trim();


    if (text === "") {

        alert("Please enter something first.");

        return;

    }


    // Add HTTPS for URLs

    if (
        currentType === "url" &&
        !text.startsWith("http://") &&
        !text.startsWith("https://")
    ) {

        text = "https://" + text;

    }


    const qrContainer =
        document.getElementById("qrcode");


    // Clear old QR

    qrContainer.innerHTML = "";


    // Generate QR

    new QRCode(qrContainer, {

        text: text,

        width: 220,

        height: 220,

        correctLevel:
            QRCode.CorrectLevel.H

    });


    // Show actions

    document
        .getElementById("qrActions")
        .hidden = false;

}


// -------------------------
// Clear
// -------------------------

function clearQR() {

    document
        .getElementById("text")
        .value = "";


    document
        .getElementById("qrcode")
        .innerHTML = "";


    document
        .getElementById("qrActions")
        .hidden = true;

}


// -------------------------
// Download
// -------------------------

function downloadQR() {

    const canvas =
        document.querySelector(
            "#qrcode canvas"
        );


    if (!canvas) {

        alert("Generate a QR code first.");

        return;

    }


    const link =
        document.createElement("a");


    link.download = "qr-code.png";

    link.href =
        canvas.toDataURL("image/png");


    link.click();

}


// -------------------------
// Share
// -------------------------

async function shareQR() {

    const canvas =
        document.querySelector(
            "#qrcode canvas"
        );


    if (!canvas) {

        alert("Generate a QR code first.");

        return;

    }


    // Check browser support

    if (!navigator.share) {

        alert(
            "Sharing is not supported on this browser. Please download the QR code instead."
        );

        return;

    }


    try {

        const blob =
            await new Promise(
                resolve =>
                    canvas.toBlob(resolve, "image/png")
            );


        const file =
            new File(
                [blob],
                "qr-code.png",
                {
                    type: "image/png"
                }
            );


        await navigator.share({

            title: "QR Studio",

            text: "QR Code created with QR Studio",

            files: [file]

        });


    } catch (error) {

        console.log(
            "Share cancelled or failed:",
            error
        );

    }

}