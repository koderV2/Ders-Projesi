function start() {
    let basla = document.getElementById("str");
    let nameInput = document.getElementById("nameInput");
    let nameButton = document.getElementById("nameButton");

    basla.style.display = "none" ;
    nameInput.style.display = "block";
    nameButton.style.display = "block";
}
const player = []

function nameButton() {
    let nameInput = document.getElementById("nameInput");
    let nameButton = document.getElementById("nameButton");
    let characterButton = document.getElementById("character");

    const playerName = nameInput.value.trim();

    if (playerName !== "") {
        player.push(playerName);
        characterButton.style.display = "block";
        nameInput.style.display = "none";
        nameButton.style.display = "none";
        
    }
}

const gamaInfo = {
    name: "Gama",
    numberOfPlayers: 73,
    type: "Tank",
}   

const betaInfo = {
    name: "Beta",
    numberOfPlayers: 52,
    type: "Healer",
}

const alphaInfo = {
    name: "Alpha",
    numberOfPlayers: 109,
    type: "Assassin",
    
}

function charSelection() {
    let chara = document.getElementById("character");
    let alphab = document.getElementById("aph");
    let betab = document.getElementById("bte");
    let gamab = document.getElementById("gma");
    let alphatext = document.getElementById("alphat");
    let betatext = document.getElementById("betat");
    let gamatext = document.getElementById("gamat");


    chara.style.display = "none";
    alphab.style.display = "inline";
    betab.style.display = "inline";
    gamab.style.display = "inline";

    alphatext.innerHTML = " Type Name " + alphaInfo.name + " - " + " Population " + alphaInfo.numberOfPlayers + " players" + " - " + " Type " + alphaInfo.type;
    betatext.innerHTML = " Type Name " + betaInfo.name + " - " + " Population " + betaInfo.numberOfPlayers + " players" + " - " + " Type " + betaInfo.type;
    gamatext.innerHTML = " Type Name " + gamaInfo.name + " - " + " Population " + gamaInfo.numberOfPlayers + " players" + " - " + " Type " + gamaInfo.type;
}

const typeImg = []
const typeName = []
function charInfos(name) {
    let hed = "";
    let par = "";
    let alphab = document.getElementById("aph");
    let betab = document.getElementById("bte");
    let gamab = document.getElementById("gma");
    let nextb = document.getElementById("nxt");
    let imags = document.getElementById("bimg");
    let alphatext = document.getElementById("alphat");
    let betatext = document.getElementById("betat");
    let gamatext = document.getElementById("gamat");

    if (name === "alpha") {
        par = "Alpha is a phantom of the woods, focusing all his <br> energy into a single, lethal blow. While his offensive power is <br> unmatched among his companions, he sacrifices his own endurance for speed; <br> leaving him vulnerable with lower defense and weak self-healing skills.";
        imags.src = "Alpha.png"
        typeName.push("Alpha");
    }
    else if (name === "beta") {
        par = "Beta acts as a conduit for the forest's ancient life essence. This deep connection allows her to mend her own wounds with incredible speed and potency, <br> ensuring she survives to aid others. Yet, this gentle devotion to preservation leaves her physically fragile; <br> clad only in simple robes, her defense is low, and her offensive strikes carry little weight.";
        imags.src = "Beta.png"
        typeName.push("Beta");
    }
    else if (name === "gama") {
        par = "Standing like an ancient oak, Gama is the unbreakable shield of the group. His massive armor grants him immense health and impenetrable defense, <br> allowing him to absorb blows that would shatter others. However, the sheer weight of his gear makes his strikes <br> slow and limits him to only average damage. Focused entirely on enduring pain, he <br> lacks any knowledge of the healing arts, leaving him completely inept at mending his own wounds."; 
        imags.src = "Gama.png"
         typeName.push("Gama");
    }

        
        alphab.style.display = "none";
        betab.style.display = "none";
        gamab.style.display = "none";
        document.getElementById("charIh").innerHTML = "Character Info";
        document.getElementById("charIp").innerHTML = par;
        nextb.style.display = "block";
        alphatext.style.display = "none";
        betatext.style.display = "none";
        gamatext.style.display = "none";
        typeImg.push(imags.src);

}


function nextPage() {
    let nextb = document.getElementById("nxt");
    let imags = document.getElementById("bimg");
    let charIh = document.getElementById("charIh");
    let charIp = document.getElementById("charIp");
    
    imags.style.display = "none";
    charIh.style.display = "none";
    charIp.style.display = "none";
    nextb.style.display = "none";

}
const item = [] 
const inventoryList = ["Sword Id:0110", "Shield Id:0120", "Bow Id:0130", "Heal Pot Id:0140","Hammer Id:0150","Staff Id:0160","Dagger Id:0170","Ring Id:0180","Amulet Id:0190","Helmet Id:0200"];

function showInventory() {
    let yourItemInfo = document.getElementById("yourItemInfo");
    let yourItemOne = document.getElementById("yourItemOne");
    let yourItemTwo = document.getElementById("yourItemTwo");
    let inventoryInfo = document.getElementById("inventoryInfo");
    let inventoryListElement = document.getElementById("inventoryList");
    let invInput = document.getElementById("invInput");
    let invButton = document.getElementById("invButton");
    let text = "";

    for (let i = 0; i < inventoryList.length; i++) {
        text += inventoryList[i] + "<br>";
    }
    inventoryInfo.style.display = "block";
    inventoryListElement.style.display = "block"; 
    invInput.style.display = "block";
    invButton.style.display = "block";  
    yourItemInfo.style.display = "block";
    yourItemOne.style.display = "block";
    yourItemTwo.style.display = "block";

    document.getElementById("yourItemInfo").innerHTML = "Your Items";
    document.getElementById("yourItemOne").innerHTML = "Your Item One: Empty";
    document.getElementById("yourItemTwo").innerHTML = "Your Item Two: Empty";
    document.getElementById("inventoryInfo").innerHTML = "Market Place";
    document.getElementById("inventoryList").innerHTML = text;
}

const itemIds = ["0110", "0120", "0130", "0140", "0150", "0160", "0170", "0180", "0190", "0200"]

function addButtonOne() {
    let secretButton = document.getElementById("invButton");
    let secretButton2 = document.getElementById("invButtonTwo");
    let invInput = document.getElementById("invInput");
    
   
        for (let i = 0; i < itemIds.length; i++) {
              if (invInput.value === itemIds[i]) {
                   document.getElementById("yourItemOne").innerHTML = "Your Item One: " + inventoryList[i];
              }
         }
    

    if (invInput.value !== "") {
    invInput.value = "";
    secretButton.style.display = "none";
    secretButton2.style.display = "block";
    }
}   
function addButtonTwo() {
    let secretButton = document.getElementById("invButtonTwo");
    let invInput = document.getElementById("invInput");
    let nextButton = document.getElementById("nxts");

   
    for (let i = 0; i < itemIds.length; i++) {
         if (invInput.value === itemIds[i]) {
              document.getElementById("yourItemTwo").innerHTML = "Your Item Two: " + inventoryList[i];
         }
     }
    
    if (invInput.value !== "") {


    secretButton.style.display = "none";
    invInput.style.display = "none";
    nextButton.style.display = "block";
    }
}

function lastPage() {
    let nextbs = document.getElementById("nxts");
    let charname = document.getElementById("playerName");
    let chartype = document.getElementById("playerType");
    let yorItemInfo = document.getElementById("yourItemInfo");
    let yourItemOne = document.getElementById("yourItemOne");
    let yourItemTwo = document.getElementById("yourItemTwo");
    let inventoryInfo = document.getElementById("inventoryInfo");
    let inventoryListElement = document.getElementById("inventoryList");
    let readyForAdventure = document.getElementById("readyForAdventure");
    let img = document.getElementById("bimg");

    charname = document.getElementById("playerName").innerHTML = "Player Name: " + player + "<br>" + yourItemOne.innerHTML + "<br>" + yourItemTwo.innerHTML;
    chartype = document.getElementById("playerType").innerHTML = "Player Type: " + typeName + "<br>" ;

    inventoryInfo.style.display = "none";
    inventoryListElement.style.display = "none";
    yourItemOne.style.display = "none";
    yourItemTwo.style.display = "none";
    nextbs.style.display = "none";
    yorItemInfo.style.display = "none";
    readyForAdventure.style.display = "block";
    img.style.display = "block";


}
