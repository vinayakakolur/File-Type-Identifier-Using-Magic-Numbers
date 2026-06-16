const button = document.getElementById("select");
const fileInput = document.getElementById("fileInput");

const magicNumbers = {
    "FFD8FF": "JPEG",
    "89504E470D0A1A0A": "PNG",
    "25504446": "PDF",
    "504B0304": "ZIP",
    "4D5A": "EXE"
};

button.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        const buffer = event.target.result;
        const bytes = new Uint8Array(buffer);

        let hex = "";

        for(let i = 0; i < bytes.length; i++){
            hex += bytes[i]
                .toString(16)
                .padStart(2, "0")
                .toUpperCase();
        }

        let detectedtype = "Unknown";

        for(const signature in magicNumbers) {
            if(hex.startsWith(signature)) {
                detectedtype = magicNumbers[signature];
                break;
            }
        }

        const extension = file.name
            .split(".")
            .pop()
            .toLowerCase();

        document.getElementById("fileName").textContent = file.name;

        document.getElementById("extension").textContent = extension.toUpperCase();

        document.getElementById("magic").textContent = hex;

        document.getElementById("detected").textContent = detectedtype;
    };

    reader.readAsArrayBuffer(file.slice(0, 16));
})