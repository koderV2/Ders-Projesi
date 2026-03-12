class Character {
    constructor(name, type, skill1, skill2, info) {
        this.name = name;
        this.type = type;
        this.skills = [skill1, skill2];
        this.info = info;
    }
}

const rawData = `[
    {"id": "alpha", "name": "Alpha", "type": "Assassin", "s1": "Silent", "s2": "Shadow Step", "desc": "A silent killer lurking in the dark."},
    {"id": "beta", "name": "Beta", "type": "Healer", "s1": "Self Heal", "s2": "Heal Line", "desc": "A master of restoration and support."},
    {"id": "gama", "name": "Gama", "type": "Tank", "s1": "Heavy Metal", "s2": "Rage Attack", "desc": "An unbreakable wall of pure strength."}
]`;

const charDb = JSON.parse(rawData);

const skillDescriptions = {
    "Silent": "Become completely invisible for 5 seconds.",
    "Shadow Step": "Instantly teleport and deal 50 damage.",
    "Self Heal": "Immediately restore 25% health.",
    "Heal Line": "Create a path that heals allies.",
    "Heavy Metal": "Slam the ground and stun enemies.",
    "Rage Attack": "Increase attack speed by 50%."
};

const userState = {
    playerName: "",
    selectedChar: null,
    selectedSkill: null
};


const notify = (msg, color = "#f1c40f") => {
    const status = document.getElementById("statusMsg");
    status.innerText = msg;
    status.style.color = color;
   
    setTimeout(() => { status.innerText = ""; }, 3000);
};


const mockFetchData = () => {
    return new Promise((resolve) => {
        notify("Loading game assets...");
        setTimeout(() => resolve("Assets Loaded!"), 1200);
    });
};

const handleStart = async () => {
    const msg = await mockFetchData(); 
    console.log(msg);
    document.getElementById("str").style.display = "none";
    document.getElementById("nameArea").style.display = "block";
    notify("Welcome, Adventurer!", "#28a745");
};

const handleNameConfirm = () => {
    const { value } = document.getElementById("nameInput");
    
    if (value.trim() === "") {
        notify("Warning: Name cannot be empty!", "#e74c3c");
        return;
    }
    
    userState.playerName = value;
    document.getElementById("nameArea").style.display = "none";
    document.getElementById("selectionArea").style.display = "block";
    notify(`Name saved: ${value}`, "#28a745");
};

const showCharacters = () => {
    document.getElementById("characterBtn").style.display = "none";
    document.getElementById("charList").style.display = "block";
};

const handleCharSelect = (charId) => {
    const charData = charDb.find(c => c.id === charId);
    userState.selectedChar = new Character(charData.name, charData.type, charData.s1, charData.s2, charData.desc);

    renderSkills();
    showInfo(userState.selectedChar.name, userState.selectedChar.info);
    notify(`${charData.name} selected!`);
};

const renderSkills = () => {
    const { skills } = userState.selectedChar;
    document.getElementById("skillArea").innerHTML = skills.map((s, index) => `
        <button onclick="handleSkillClick('${index}')" style="margin: 8px; padding: 12px 25px; border-radius: 20px; cursor: pointer; font-weight: bold;">
            ${s}
        </button>
    `).join('');
    document.getElementById("nextStepBtn").style.display = "none";
};

const handleSkillClick = (index) => {
    const { name, skills } = userState.selectedChar;
    const chosenSkill = skills[index];
    userState.selectedSkill = chosenSkill;

    showInfo(`${name} - ${chosenSkill}`, `${userState.playerName}, you selected ${chosenSkill}: ${skillDescriptions[chosenSkill]}`);
    document.getElementById("nextStepBtn").style.display = "block";
};

const showInfo = (header, text) => {
    document.getElementById("charInfH").innerText = header;
    document.getElementById("chaarInfP").innerText = text;
};

const goToNextLevel = () => {
    const { playerName, selectedChar, selectedSkill } = userState;
    
   
    showInfo("QUEST STARTED!", "The gates are opening... Good luck!");
    document.getElementById("nextStepBtn").style.display = "none";
    
    notify("Adventure Initializing...", "#28a745");
    
   
    setTimeout(() => {
        console.log("FINAL STATE:", JSON.stringify({player: playerName, hero: selectedChar.name, skill: selectedSkill}));
    }, 2000);
};