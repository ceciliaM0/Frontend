window.load=take_photos();
var photos;
async function take_photos()
{
    const response= await fetch("https://picsum.photos/v2/list");
    photos= await response.json();
    console.log(photos);
    show_photos(photos);
    fill_select(photos);
}

function show_photos(photos) {
    const parent = document.getElementsByClassName('photos-area')[0];
    parent.innerHTML = '';
    photos.forEach(entry => {
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

function handleAuthorSelect(event)
{
    const selectedAuthor = event.target.value; 
    if(selectedAuthor!='all')
    photosByAuthor=photos.filter(item=>{ return item['author']==selectedAuthor });
    else
        photosByAuthor=photos;
    show_photos(photosByAuthor);
}

function show_full_photo(link)
{
    elem=document.getElementsByClassName('entire_photo')[0];
    elem.innerHTML = '<button class="close-btn" onclick="close_photo()">X</button>';
    elem.style.display='block';
    full_size=document.createElement('img');
    full_size.className='full-photo';
    full_size.src=link;
    elem.appendChild(full_size);
}

function close_photo()
{
    document.getElementsByClassName('entire_photo')[0].style.display = 'none';
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