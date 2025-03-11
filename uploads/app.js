document.getElementById('file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewContainer.style.display = 'block';
        };

        reader.readAsDataURL(file);
    } else {
        previewContainer.style.display = 'none';
    }
});

document.getElementById('file-upload-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission to handle via JavaScript

    // Show an alert to confirm the file has been uploaded
    alert("File successfully selected! Now uploading...");

    // You can proceed with the actual file upload here if you like, or let the form submit normally
    this.submit();  // Uncomment this line to allow the form submission after the alert
});
