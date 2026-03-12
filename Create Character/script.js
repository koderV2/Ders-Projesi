
    function charSelection(name) { 
        let text = "";

        if (name === "alpha") {
            text = "You select assasin character";
        } else if (name === "beta") {
            text = "You select healing character";
        } else if (name === "gama") {
            text = "You select tank character";
        }
        document.getElementById("char1").innerHTML = text;
    }
    
    function charSelections(names) { 
        let text = "";

        if (names=== "alpha") {
            text = "Alpha is a phantom of the woods, focusing all his energy into a single, lethal blow. While his offensive power is unmatched among his companions, he sacrifices his own endurance for speed; leaving him vulnerable with lower defense and weak self-healing skills.";
        } else if (names === "beta") {
            text = "Beta acts as a conduit for the forest's ancient life essence. This deep connection allows her to mend her own wounds with incredible speed and potency, ensuring she survives to aid others. Yet, this gentle devotion to preservation leaves her physically fragile; clad only in simple robes, her defense is low, and her offensive strikes carry little weight.";
        } else if (names === "gama") {
            text = "Standing like an ancient oak, Gama is the unbreakable shield of the group. His massive armor grants him immense health and impenetrable defense, allowing him to absorb blows that would shatter others. However, the sheer weight of his gear makes his strikes slow and limits him to only average damage. Focused entirely on enduring pain, he lacks any knowledge of the healing arts, leaving him completely inept at mending his own wounds.";
        }
        document.getElementById("char").innerHTML = text;
        document.getElementById("chars").innerHTML = "Character Info"
    }


 


    const env = ["Short Sword", "Common Staff", "Long Sword", "Wood Shield", "Healing Pot", "Common Hammer", "Common Bow" ];

    function envanterSelection(type) {
        let text = "";

    
        for (let a = 0; a < env.length; a++) {
            
          
            if (type === "assasin" && (env[a] === "Short Sword" || env[a] === "Common Bow")) {
                text += env[a] + "<br>";
            } 
         
            else if (type === "heal" && (env[a] === "Common Staff" || env[a] === "Healing Pot")) {
                text += env[a] + "<br>";}
            
            else if (type === "tank" && (env[a] === "Common Hammer" || env[a] === "Wood Shield")) {
                text += env[a] + "<br>";
            
            }
        }

        
        document.getElementById("env").innerHTML = text;
        document.getElementById("env1").innerHTML = "Envanter"
         document.getElementById("next").innerHTML = "Next"
    }

    function pageSelection(page){
        let text = "";


        if (page === "orb") {
            document.getElementById("aph").innerHTML = ""
            document.getElementById("bte").innerHTML = ""
            document.getElementById("gma").innerHTML = ""
            document.getElementById("char").innerHTML = ""
            document.getElementById("chars").innerHTML = ""
            document.getElementById("char1").innerHTML = ""
            document.getElementById("env").innerHTML = ""
            document.getElementById("env1").innerHTML = ""
            text = "Orb Selection"
        }

             document.getElementById("bolum").innerHTML = text;
        }