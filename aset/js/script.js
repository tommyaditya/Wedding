// aos
AOS.init()

// music
var tempMusic = ''
music = document.querySelector('.music')
if (tempMusic) {
    music.src = tempMusic
}

// door mulai
function mulai() {
    window.scrollTo(0, 0)

    var soundDoor = document.querySelector('.sound-door')
    soundDoor.play()

    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')
    doors.forEach(function (door, index) {
        var direction = (index === 0) ? -1 : 1
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
    })

    setTimeout(function () {
        music.play()
        doorSection.css('transform', 'scale(6)')
    }, 600)

    setTimeout(function () {
        doorSection.css('opacity', 0)
        $('body').removeClass('overflow-hidden')
        $('body').addClass('transition')
        doorSection.css('display', 'none')
    }, 2000)
}

// button music
var isPlaying = true

function toggleMusic(event) {
    event.preventDefault()

    const musicButton = document.getElementById('music-button')

    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        music.pause()
    } else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }

    isPlaying = !isPlaying
}

// countdown wedding
var countdownDate = new Date("Sep 3, 2025 07:00:00").getTime()

var x = setInterval(function () {
    var now = new Date().getTime()

    var distance = countdownDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var second = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById('countdown-wedding').innerHTML = `
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5> Hari</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5> Jam</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5> Menit</div></div>
        <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${second}</h5> Second</div></div>
    `

    if (distance < 0) {
        clearInterval (x)
        document.getElementById('countdown-wedding').innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Sudah imulai!</h2></span>"
    }
}, 1000)

// nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('p')
const nama = urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')
namaSambutan.innerText = `${panggilan} ${nama},`


// copy text
function copyText(el)
{
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()

    var temp = document.createElement('textarea')

    document.body.appendChild(temp)

    temp.value = content.replace(/\s+/g, '')
    temp.select()

    document.execCommand("copy")

    document.body.removeChild(temp)

    jQuery(el).text('Berhasil di copy')

    setTimeout(function () {
        jQuery(el).html(`<i class="fas fa-regular fa-copy"></i> copy`)
    })
}

// RSVP
window.addEventListener('load', function() {
    const form = this.document.getElementById('rsvp-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const status = document.getElementById('status').value
        const nama = document.getElementById('nama').value.trim()

        if (nama === "") {
            swal.fire({
                icon: "error",
                text: "Nama harus di isi!",
            }) 
            return;
        }
        if (status === "0") {
            swal.fire({
                icon: "error",
                text: "Pilih salah satu status terlebih dahulu!",
            })
            return;
        }

        const data = new FormData(form);
        const action = e.target.action;
        const input = form.querySelectorAll('input, select, button')
        input.forEach(input => {
            input.disable = true
        })

        fetch(action, {
            method: 'POST',
            body: data,
        })
        .then(() => {
            swal.fire({
                icon: "seccess",
                text: "Konfirmasi anda terkirim",
            })
        })
        .catch((error) => {
            swal.fire({
                icon: "error",
                text: error
            })
        })
        .finally(() => {
            input.forEach(input => {
                input.disable = false
            })
        })
    })
})