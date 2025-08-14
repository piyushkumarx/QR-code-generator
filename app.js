
let download_btn = document.querySelector(".Download");
let share_btn = document.querySelector(".Share");
let inpt = document.querySelector(".input").firstElementChild;
let main = document.querySelector(".main")
let qr = document.querySelector(".qr")
let err = document.querySelector(".err")
let button = inpt.nextElementSibling;


button.addEventListener("click", function () {

    let valueOfInput = String(inpt.value);

    if(valueOfInput.length > 1){

        main.style.display = "none"
        qr.style.display = "flex"

    const qrCode = new QRCode(document.getElementById("qrcode"), {
        text: valueOfInput,
        width: 150,
        height: 150,
    });

    }else{
        
        err.style.display = "block"
    }

    
})

share_btn.addEventListener("click" , function(){

    
})




download_btn.addEventListener("click", () => {
    let canvas = document.querySelector("#qrcode canvas");
    let img = document.querySelector("#qrcode img");
    let dataURL;

    if (canvas) {
        // Naya canvas create karo padding ke liye
        let paddedCanvas = document.createElement("canvas");
        let padding = 20; // yaha apni padding in px
        paddedCanvas.width = canvas.width + padding * 2;
        paddedCanvas.height = canvas.height + padding * 2;

        let ctx = paddedCanvas.getContext("2d");
        ctx.fillStyle = "#ffffff"; // background color (white)
        ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

        ctx.drawImage(canvas, padding, padding); // QR ko center me draw karo
        dataURL = paddedCanvas.toDataURL("image/png");

    } else if (img) {
        // Agar image hai to canvas bana ke padding add karo
        let image = new Image();
        image.crossOrigin = "anonymous";
        image.src = img.src;
        image.onload = () => {
            let padding = 20;
            let paddedCanvas = document.createElement("canvas");
            paddedCanvas.width = image.width + padding * 2;
            paddedCanvas.height = image.height + padding * 2;

            let ctx = paddedCanvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

            ctx.drawImage(image, padding, padding);
            let finalURL = paddedCanvas.toDataURL("image/png");

            let a = document.createElement("a");
            a.href = finalURL;
            a.download = "qrcode.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
        return;
    } else {
        alert("QR code not generated");
        return;
    }

    // Download ka code
    let a = document.createElement("a");
    a.href = dataURL;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});


share_btn.addEventListener("click", async () => {
    let canvas = document.querySelector("#qrcode canvas");
    let img = document.querySelector("#qrcode img");
    
    try {
        if (canvas || img) {
            // Get the image URL (data URL for canvas, src for img)
            const imageUrl = canvas ? canvas.toDataURL("image/png") : img.src;
            
            // Copy the URL to clipboard
            await navigator.clipboard.writeText(imageUrl);
            alert("QR code link copied to clipboard!");
        } else {
            alert("QR code not generated yet");
        }
    } catch (err) {
        console.error("Failed to copy: ", err);
        alert("Failed to copy QR code link");
    }
});