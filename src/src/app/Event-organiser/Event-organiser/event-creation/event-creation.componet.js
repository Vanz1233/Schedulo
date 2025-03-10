let bannerUpload = document.getElementById('banner_upload');
let bannerImage = document.getElementById('banner_image');

bannerUpload.addEventListener('click', () => bannerImage.click());
bannerUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    bannerUpload.classList.add('highlight');
});
bannerUpload.addEventListener('dragleave', () => bannerUpload.classList.remove('highlight'));
bannerUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    bannerUpload.classList.remove('highlight');
    let files = e.dataTransfer.files;
    handleFiles(files);
});
bannerImage.addEventListener('change', (e) => handleFiles(e.target.files));

function handleFiles(files) {
    if (files.length > 0) {
        let file = files[0];

        // Show preview
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
        };
    }
}

let psoterUpload = document.getElementById('poster_upload');
let posterImage = document.getElementById('poster_image');

psoterUpload.addEventListener('click', () => posterImage.click());
psoterUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    psoterUpload.classList.add('highlight');
});
psoterUpload.addEventListener('dragleave', () => psoterUpload.classList.remove('highlight'));
psoterUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    psoterUpload.classList.remove('highlight');
    let files = e.dataTransfer.files;
    handleFiles(files);
});
posterImage.addEventListener('change', (e) => handleFiles(e.target.files));

function handleFiles(files) {
    if (files.length > 0) {
        let file = files[0];

        // Show preview
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
        };
    }
}