const input = document.querySelector('input');
console.log("hii")
// Get a reference to the image tag
const image = document.querySelector('.image-preview');

// Add a click listener to the image tag
image.addEventListener('click', () => {
  // Click the input tag
  input.click();
});

function hideDescription() {
  const descriptionElements = document.querySelectorAll('.description');
  for (const descriptionElement of descriptionElements) {
    descriptionElement.style.display = 'none';
  }
}

// Show the reupload button when the image is uploaded.
function showReuploadButton() {
  const reuploadButton = document.querySelector('.rbtn');
  reuploadButton.style.display = 'block';
}

const fileInput = document.getElementById('image-uploader');
console.log(fileInput)
// Add an event listener to the file input element to handle when the user selects an image.
fileInput.addEventListener('change', function() {
  // Get the selected image file.
  const file = this.files[0];

    // Convert the image file to a base64 encoded string.
    var imageBase64 = readFileAsDataURL(file);

    // Send the base64 encoded image string to the server using a POST request.
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload-image");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ image: imageBase64 }));
  console.log("hii")
  hideDescription();
  showReuploadButton();
  // Read the image file as a data URL.
  const reader = new FileReader();
  reader.onload = function() {
    // Set the src attribute of the image element to the data URL.
    const dataURL = reader.result;
    const imageElement = document.querySelector('.upload');
    console.log(imageElement)
    imageElement.src = dataURL;
  };
  reader.readAsDataURL(file);
});