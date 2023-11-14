const input = document.querySelector('input');
console.log("hell")
// Get a reference to the image tag
const image = document.querySelector('.image-preview');

// Add a click listener to the image tag
image.addEventListener('click', () => {
  // Click the input tag
  input.click();
});

const fileInput = document.getElementById('image-uploader');
console.log(fileInput)
// Add an event listener to the file input element to handle when the user selects an image.
fileInput.addEventListener('change', function () {
  // Get the selected image file.
  const file = this.files[0];
  alert("hii")
  // Log a message to check if the change event is triggered
  console.log('Image selected');
  const reuploadButton = document.querySelector('.rbtn');
  // Display the reupload button
  reuploadButton.style.display = 'block';
  // Read the image file as a data URL.
  const reader = new FileReader();
  reader.onload = function () {
    // Set the src attribute of the image element to the data URL.
    const dataURL = reader.result;
    imageElement.src = dataURL;
  };
  reader.readAsDataURL(file);
});