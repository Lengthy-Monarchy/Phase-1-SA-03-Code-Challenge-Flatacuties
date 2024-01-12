function displayCharacter(character) {
    const characterName = document.getElementById("name");
    characterName.innerText = character.name;
    const characterImage = document.getElementById("image");
    characterImage.src = character.image;
    characterImage.alt = character.name;
    const currentVotes = document.getElementById("vote-count");
    currentVotes.innerText = character.votes;

    const form = document.getElementById("votes-form");
    form.onsubmit = (e) => handleVoteSubmit(e, character);
    
    const resetButton = document.getElementById("reset-btn");
    resetButton.onclick = (e) => handleReset(e, character);
}

function createCharacterView(character) {
    const characterView = document.createElement("span");
    characterView.id = character.id;
    characterView.innerText = character.name;
    characterView.style.cursor = "pointer";
    characterView.addEventListener("click", () => displayCharacter(character));
    return characterView;
}

function handleVoteSubmit(e, character) {
    e.preventDefault();
    const votesInput = document.getElementById("votes");
    const votes = parseInt(votesInput.value);
    if (!isNaN(votes)) {
        const currentVotes = document.getElementById("vote-count");
        currentVotes.innerText = votes + character.votes;
    } else {
        alert("Votes can only be in numbers");
    }
    votesInput.value = '';
}

function handleReset(e, character) {
    e.preventDefault();
    const currentVotes = document.getElementById("vote-count");
    currentVotes.innerText = 0;
}

function addCharacterFormListener() {
    const newCharacterForm = document.getElementById("character-form");
    newCharacterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addNewCharacter();
    });
}

function addNewCharacter() {
    const newCharacterName = document.getElementById("name2").value;
    const newCharacterImage = document.getElementById("image-url").value;

    fetch("http://localhost:3000/characters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: newCharacterName,
            image: newCharacterImage,
            votes: 0
        })
    })
    .then(response => response.json())
    .then(character => {
        const navBar = document.getElementById("character-bar");
        const characterView = createCharacterView(character);
        navBar.appendChild(characterView);
    });
}

