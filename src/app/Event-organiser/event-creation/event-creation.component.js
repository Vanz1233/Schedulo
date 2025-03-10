let dropAreaBanner = document.getElementById('drop-area-banner');
let dropAreaPoster = document.getElementById('drop-area-poster');

let fileInputBanner = document.createElement('input');
fileInputBanner.type = 'file';
fileInputBanner.accept = 'image/*';
fileInputBanner.addEventListener('change', (e) => handleFiles(e.target.files, 'preview-banner'));

let fileInputPoster = document.createElement('input');
fileInputPoster.type = 'file';
fileInputPoster.accept = 'image/*';
fileInputPoster.addEventListener('change', (e) => handleFiles(e.target.files, 'preview-poster'));

// Banner Upload
dropAreaBanner.addEventListener('click', () => fileInputBanner.click());
dropAreaBanner.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropAreaBanner.classList.add('highlight');
});
dropAreaBanner.addEventListener('dragleave', () => dropAreaBanner.classList.remove('highlight'));
dropAreaBanner.addEventListener('drop', (e) => {
    e.preventDefault();
    dropAreaBanner.classList.remove('highlight');
    handleFiles(e.dataTransfer.files, 'preview-banner');
});

// Poster Upload
dropAreaPoster.addEventListener('click', () => fileInputPoster.click());
dropAreaPoster.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropAreaPoster.classList.add('highlight');
});
dropAreaPoster.addEventListener('dragleave', () => dropAreaPoster.classList.remove('highlight'));
dropAreaPoster.addEventListener('drop', (e) => {
    e.preventDefault();
    dropAreaPoster.classList.remove('highlight');
    handleFiles(e.dataTransfer.files, 'preview-poster');
});

function handleFiles(files, previewId) {
    let preview = document.getElementById(previewId);
    preview.innerHTML = ''; // Clear previous previews

    for (let file of files) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            let img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.margin = '5px';
            preview.appendChild(img);
        };
    }
}

document.getElementById('eventForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        title1: document.getElementById('title1').value,
        maintitle: document.getElementById('maintitle').value,
        short_desc: document.getElementById('short_desc').value,
        event_name: document.getElementById('event_name').value,
        event_desc: document.getElementById('event_desc').value,
        event_date: document.getElementById('event_date').value,
        start_time: document.getElementById('start_time').value,
        end_time: document.getElementById('end_time').value
    };

    async function createEvent(eventData) {
        console.log('Submitting event:', eventData); // ✅ DEBUGGING LOG
        try {
            const response = await fetch('http://localhost:3000/api/create-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
    
            // Check if response is OK
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }
    
            const result = await response.json(); // 🛠️ Ensure JSON response
            console.log('Event created:', result);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    }

    await createEvent(formData); // ✅ CALL FUNCTION TO SEND DATA
});

