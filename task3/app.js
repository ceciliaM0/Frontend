window.onload = take_photos();

let photos;
let filteredPhotos = [];
let currentPage = 1;
const photosPerPage = 6;

async function take_photos() {
    const response = await fetch("https://picsum.photos/v2/list");
    photos = await response.json();
    console.log('Photos loaded:', photos);
    filteredPhotos = [...photos];
    show_photos(filteredPhotos);
    fill_select(photos);
}

function show_photos(photos) {
    const parent = document.getElementsByClassName('photos-area')[0];
    parent.innerHTML = '';

    const start = (currentPage - 1) * photosPerPage;
    const end = start + photosPerPage;
    const photosToShow = photos.slice(start, end);

    photosToShow.forEach(entry => {
        const frame = document.createElement('div');
        frame.className = 'photo-frame';

        const flipCardInner = document.createElement('div');
        flipCardInner.className = 'flip-card-inner';

        const flipCardFront = document.createElement('div');
        flipCardFront.className = 'flip-card-front';
        
        const photoPreview = document.createElement('div');
        photoPreview.className = 'photo-preview';
        
        const image = document.createElement('img');
        image.src = entry['download_url'];
        image.className = 'photo-preview';
        image.addEventListener('click', function () {
            show_full_photo(entry['download_url']);
        });

        const author = document.createElement('p');
        author.className = 'title';
        author.textContent = entry['author'];

        flipCardFront.appendChild(photoPreview);
        photoPreview.appendChild(image);
        flipCardFront.appendChild(author);

        const flipCardBack = document.createElement('div');
        flipCardBack.className = 'flip-card-back';
        const desc = document.createElement('p');
        desc.className = 'description';
        const w = entry['width'];
        const h = entry['height'];
        const link = entry['url'];
        desc.textContent = 'This photo has ' + h + ' px height and ' + w + ' px width. You can download it from: ' + link;
        flipCardBack.appendChild(desc);

        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);

        frame.appendChild(flipCardInner);
        parent.appendChild(frame);
    });

    updateControls();
}

function updateControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = (currentPage * photosPerPage) >= filteredPhotos.length;
}

function showNextPage() {
    if ((currentPage * photosPerPage) < filteredPhotos.length) {
        currentPage++;
        show_photos(filteredPhotos);
    }
}

function showPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        show_photos(filteredPhotos);
    }
}

function fill_select(data) {
    authors = new Set();
    data.forEach(item => {
        authors.add(item['author']);
    });

    var dropdown = document.getElementById("myDropdown");

    authors.forEach(author => {
        var option = document.createElement("a");
        option.href = "#";
        option.textContent = author;
        option.addEventListener('click', function () {
            handleAuthorSelect({ target: { value: author } });
            document.getElementById("myDropdown").classList.remove("show");
        });
        dropdown.appendChild(option);
    });

    var allOption = document.createElement("a");
    allOption.href = "#";
    allOption.textContent = 'All';
    allOption.addEventListener('click', function () {
        handleAuthorSelect({ target: { value: 'all' } });
        document.getElementById("myDropdown").classList.remove("show");
    });
    dropdown.appendChild(allOption);
}

function handleAuthorSelect(event) {
    const selectedAuthor = event.target.value;
    if (selectedAuthor !== 'all') {
        filteredPhotos = photos.filter(item => item['author'] === selectedAuthor);
    } else {
        filteredPhotos = [...photos];
    }
    currentPage = 1;
    show_photos(filteredPhotos);
}

function show_full_photo(link) {
    elem = document.getElementsByClassName('entire_photo')[0];
    elem.innerHTML = '<button class="close-btn" onclick="close_photo()">X</button>';
    elem.style.display = 'block';
    full_size = document.createElement('img');
    full_size.className = 'full-photo';
    full_size.src = link;
    elem.appendChild(full_size);
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
    const input = document.getElementById("myInput");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("myDropdown");
    const a = div.getElementsByTagName("a");
    for (let i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('nextBtn').addEventListener('click', showNextPage);
    document.getElementById('prevBtn').addEventListener('click', showPrevPage);
});
