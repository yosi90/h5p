const cards = document.querySelectorAll('.card');
const counter = document.getElementById('countCards');
const progress = document.getElementById('progress');
const margin = cards[0].getBoundingClientRect().width + 15;
const pre = document.getElementById('pre');
pre.style.visibility = 'hidden';
const sig = document.getElementById('sig');
let actual = 1;

window.onload = function () {
    counter.innerText = `1/${cards.length}`;
    cards.forEach(function callback(e, index) {
        e.style.transform = `translateX(${index * margin}px) ${e.classList.contains('active') ? '' : 'scale(.9)'}`;

        let gris = e.children[0];
        gris.addEventListener('click', event => {
            if (actual < e.getAttribute('index'))
                siguiente();
            else
                previo();
        });
    });

    progress.style.width = `${(1/cards.length)*100}%`;
}

sig.addEventListener('click', function () {
    siguiente();
});

pre.addEventListener('click', function () {
    previo();
});

function siguiente() {
    if (actual < cards.length) {
        document.querySelector('.active').classList.toggle('active');
        cards[actual].classList.toggle('active');
        let dist = margin * actual * 2;
        actual++;
        counter.innerText = `${actual}/${cards.length}`;
        progress.style.width = `${(actual/cards.length)*100}%`;
        cards.forEach(function callback(e, index) {
            e.style.left = `-${dist}px`;
            e.style.transform = `translateX(${index * margin}px) ${e.classList.contains('active') ? '' : 'scale(.9)'}`;
        });
        if (actual == 2)
            pre.style.visibility = 'visible';
        else if (actual == cards.length)
            sig.style.visibility = 'hidden';
    }
}

function previo() {
    if (actual != 1) {
        document.querySelector('.active').classList.toggle('active');
        actual--;
        cards[actual - 1].classList.toggle('active');
        let dist = margin * (actual - 1) * 2;
        counter.innerText = `${actual}/${cards.length}`;
        progress.style.width = `${(actual/cards.length)*100}%`;
        cards.forEach(function callback(e, index) {
            e.style.left = `-${dist}px`;
            e.style.transform = `translateX(${index * margin}px) ${e.classList.contains('active') ? '' : 'scale(.9)'}`;
        });
        if (actual == 1)
            pre.style.visibility = 'hidden';
        else if (actual > 1)
            sig.style.visibility = 'visible';
    }
}