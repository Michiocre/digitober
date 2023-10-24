let counter = 0;

let cardUrls = [
    'assets/0_backside.png',
    'assets/1_magician.png',
    'assets/2_high_priestess.png',
    'assets/3_empress.png',
    'assets/4_emperor.png',
    'assets/5_hierophant.png',
    'assets/6_lovers.png',
    'assets/7_chariot.png',
    'assets/8_strength.png',
    'assets/9_hermit.png',
    'assets/10_wheel.png',
    'assets/11_justice.png',
    'assets/12_hanged_man.png',
    'assets/13_death.png',
    'assets/14_temperance.png',
    'assets/15_devil.png',
    'assets/16_tower.png',
    'assets/17_star.png',
    'assets/18_moon.png',
    'assets/19_sun.png',
    'assets/20_judgement.png',
    'assets/21_world.png',
    'assets/22_fool.png'
];

let texts = [
    '',
    'Sheesh 🫦',
    'The emperor is a fickle beast, give him time.',
    'OwO',
    'The empress hides in the Creators name.',
    `I've heard some of us are rarer than the others.`,
    'Every second you wait brings you closer to HIM.',
    'FOR THE MOTHERLAND!',
    'Keep going you can do it.',
    'I hope im one of the rare ones.',
    `You need more than fortune to get all of us.`,
    'The rare cards know where THEY are hidding.',
    'Tick Tick goes the clock.',
    '💀',
    'Get all the normals to get more rares.',
    `The Creators name is cursed, DO NOT go near it!`,
    `HE is III and SHE is IV.`,
    `The Creator is running out of things to say.`,
    `The empress has gone into hiding.`,
    `The emperor is biding his time.`,
    `Eeeeeeehhhhhhhhh.`,
    `Both of THEM are out there somewhere.`,
    `The secret is to wait, or something.` 
];

let known = [];

let lastDrawTime = null;
let normalCards = [1, 5, 7, 8, 9, 10, 11, 14, 15, 16, 17, 20, 21];
let rareCards = [2, 6, 12, 13, 18, 19, 22];
let specialCards = [3, 4];

let card = document.getElementsByClassName('card')[0];
let deckIcon = document.getElementById('deck-icon');
let deck = document.getElementById('deck');
let deckRow = document.getElementById('deck-row');

function getNextCardId() {
    if (Math.random() * (9 + document.getElementsByClassName('letterActive').length) > 9) {
        return [3, 'special'];
    }

    if (lastDrawTime) {
        let secSinceLastClick = (new Date().getTime() - lastDrawTime) / 1000;

        if ((Math.random() * 100) > 160 - secSinceLastClick) {
            return [4, 'special'];
        }
    }

    let randomNum = Math.floor(Math.random() * (normalCards.length + 1));
    
    if (randomNum == normalCards.length || ((known.length >= normalCards.length + 1) && Math.floor(Math.random() * 2) == 1)) {
        return [rareCards[Math.floor(Math.random() * rareCards.length)], 'rare'];
    } else {
        return [normalCards[randomNum], 'normal'];
    }
}

function createNewCard() {
    let [id, grade] = getNextCardId();
    lastDrawTime = new Date().getTime();
    
    let template = document.createElement('template');
    template.innerHTML = `<div class="card-wrapper"><h1 class="card-text">${texts[id]}</h1><div class="underneath"></div><div class="card"><div class="card-back"></div><div class="card-front"></div></div></div>`.trim();

    let wrapper = template.content.firstChild;
    wrapper.lastChild.lastChild.classList.add('c' + id);

    wrapper.id = id;
    wrapper.grade = grade;

    wrapper.onmouseover = (e) => {
        e.preventDefault();
        wrapper.childNodes[1].classList.add('glow-' + grade);
    }

    wrapper.onclick = (e) => {
        e.preventDefault();
        if (!wrapper.childNodes[1].classList.contains('glow-' + wrapper.grade)) {
            wrapper.childNodes[1].classList.add('glow-' + wrapper.grade);
        } else if (!wrapper.lastChild.classList.contains('flipped')) {
            wrapper.lastChild.classList.add('flipped');
        } else if (!known.includes(wrapper.id)) {
            wrapper.firstChild.classList.add('text-active');
            known.push(wrapper.id);
        } else {
            if (known.length == 1) {
                deckRow.classList.remove('hidden');
            }
            document.body.insertBefore(createNewCard(), document.body.firstChild);
            wrapper.firstChild.classList.remove('text-active');
            wrapper.classList.add('to-deck');
            
            let deckTemplate = document.createElement('template');
            deckTemplate.innerHTML = `<div class="small-card-wrapper"><div class="small-card c${wrapper.id}"><div class="deck-text">${texts[wrapper.id]}</div></div></div>`.trim();

            let replaceNode = deck.children[(wrapper.id - 1)];
            deck.insertBefore(deckTemplate.content.firstChild, replaceNode);
            deck.removeChild(replaceNode)
        }
    }

    return wrapper;
}

document.body.insertBefore(createNewCard(), document.getElementById('deck-row'));



deckIcon.onclick = (e) => {
    e.preventDefault();
    deck.classList.toggle('hidden');
}

let letters = document.getElementsByTagName('span');
for (const letter of letters) {
    letter.onclick = (e) => {
        e.preventDefault();
        letter.classList.toggle('letterActive');

        counter = document.getElementsByClassName('letterActive').length;
    };
}

let intro = document.getElementsByClassName('gone');
let introBackground = document.getElementById('intro');

introBackground.onclick = (e) => {
    if (intro.length == 0) {
        introBackground.hidden = true;
    } else {
        intro[0].classList.remove('gone');
    }
};