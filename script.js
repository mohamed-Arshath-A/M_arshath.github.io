async function downloadImage(imageSrc, fileName) {
    try {
      const image = await fetch(imageSrc);
      const imageBlob = await image.blob();
      const imageURL = URL.createObjectURL(imageBlob);

      const link = document.createElement('a');
      link.href = imageURL;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Error downloading image. Please try again.');
    }
  }

  document.getElementById('generate-btn').addEventListener('click', async function() {
    var inputValue = document.getElementById('text-input').value.trim();
    if (inputValue !== '') {
      var qrCodeDiv = document.getElementById('qr-code');
      qrCodeDiv.innerHTML = ''; // Clear previous QR code if exists

      // Create the QR code image
      var qr_img = document.createElement('img');
      qr_img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(inputValue);
      qr_img.alt = 'QR Code';

      // Append the QR code image to the div
      qrCodeDiv.appendChild(qr_img);

      // Show the QR code div
      qrCodeDiv.style.display = 'block';

      // Show download button
      var downloadBtn = document.getElementById('download-btn');
      downloadBtn = document.createElement('button');
      downloadBtn.id = 'download-btn';
      downloadBtn.classList.add('btn', 'btn-success', 'd-block', 'mx-auto', 'mb-3');
      downloadBtn.textContent = 'Download QR Code';
      downloadBtn.onclick = function() {
        downloadImage(qr_img.src, 'qrcode.png');
      };
      document.querySelector('.card-body').appendChild(downloadBtn);
    } else {
      alert('Please enter a URL to generate QR code.');
    }
  });