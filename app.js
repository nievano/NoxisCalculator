let apBase = 0;
let dpBase = 0;;
let spdBase = 0;
let apTemp = 0;
let dpTemp = 0;
let spdTemp = 0;
let inventory = [];
let armory = [];
let abilities = [];
class Item {
    constructor(name, ap, dp, spd) {
        this.name = name;
        this.ap = ap;
        this.dp = dp;
        this.spd = spd;
    }
}
class Weapon {
    constructor(name, ap, dp, spd) {
        this.name = name;
        this.ap = ap;
        this.dp = dp;
        this.spd = spd;
        this.active = false;
    }
}
class Action {
    constructor(name, ap, dp, spd) {
        this.name = name;
        this.ap = ap;
        this.dp = dp;
        this.spd = spd;
        this.active = false;
    }
}
function setStats() {
    document.getElementById("apBase").innerHTML = "AP: " + apBase;
    document.getElementById("dpBase").innerHTML = "DP: " + dpBase;
    document.getElementById("spdBase").innerHTML = "Spd: " + spdBase;
}
function addStats() {
    apBase = document.getElementById("apIn").value;
    dpBase = document.getElementById("dpIn").value;
    spdBase = document.getElementById("spdIn").value;
    setStats();
    setTemp();
}
function setTemp() {
    apTemp = apBase;
    dpTemp = dpBase;
    spdTemp = spdBase;
    for(i in inventory) {
        apTemp = Number(apTemp) + Number(inventory[i].ap);
        dpTemp = Number(dpTemp) + Number(inventory[i].dp);
        spdTemp = Number(spdTemp) + Number(inventory[i].spd);
    }
    for(i in armory) {
        if(armory[i].active) {
            apTemp = Number(apTemp) + Number(armory[i].ap);
            dpTemp = Number(dpTemp) + Number(armory[i].dp);
            spdTemp = Number(spdTemp) + Number(armory[i].spd);
        }
    }
    for(i in abilities) {
        if(abilities[i].active) {
            apTemp = Number(apTemp) + Number(abilities[i].ap);
            dpTemp = Number(dpTemp) + Number(abilities[i].dp);
            spdTemp = Number(spdTemp) + Number(abilities[i].spd);
        }
    }
    document.getElementById("apTemp").innerHTML = "AP: " + apTemp;
    document.getElementById("dpTemp").innerHTML = "DP: " + dpTemp;
    document.getElementById("spdTemp").innerHTML = "Spd: " + spdTemp;
}
function setInventory() {
    while(document.getElementById("inventory").childElementCount > 1) 
        document.getElementById("inventory").removeChild(document.getElementById("inventory").lastChild);
    for(i in inventory) {
        const p = document.createElement("p");
        p.setAttribute("onclick", `removeInventory(${i})`);
        p.setAttribute("onmouseover", "this.style.outline = 'thin solid #ffffff'");
        p.setAttribute("onmouseleave", "this.style.outline = ''");
        let s = inventory[i].name;
        if(inventory[i].ap != 0) s += " (" + (inventory[i].ap < 0 ? "" : "+") + inventory[i].ap + " AP)";
        if(inventory[i].dp != 0) s += " (" + (inventory[i].dp < 0 ? "" : "+") + inventory[i].dp + " DP)";
        if(inventory[i].spd != 0) s += " (" + (inventory[i].spd < 0 ? "" : "+") + inventory[i].spd + " Spd)";
        p.innerHTML = s;
        document.getElementById("inventory").append(p);
    }
}
function addInventory() {
    i = new Item(
        document.getElementById("nameItem").value,
        document.getElementById("apItem").value,
        document.getElementById("dpItem").value,
        document.getElementById("spdItem").value
    );
    inventory.push(i);
    setInventory();
    setTemp();
}
function removeInventory(item) {
    inventory.splice(item, 1);
    setInventory();
    setTemp();
}
function setArmory() {
    while(document.getElementById("armory").childElementCount > 1) 
        document.getElementById("armory").removeChild(document.getElementById("armory").lastChild);
    for(i in armory) {
        const p = document.createElement("p");
        p.setAttribute("onclick", `toggleWeapon(${i})`);
        let s = armory[i].name;
        if(armory[i].active) p.style.outline = "thin solid #ffffff"
        if(armory[i].ap != 0) s += " (" + (armory[i].ap < 0 ? "" : "+") + armory[i].ap + " AP)";
        if(armory[i].dp != 0) s += " (" + (armory[i].dp < 0 ? "" : "+") + armory[i].dp + " DP)";
        if(armory[i].spd != 0) s += " (" + (armory[i].spd < 0 ? "" : "+") + armory[i].spd + " Spd)";
        p.innerHTML = s;
        document.getElementById("armory").append(p);
    }
}
function addArmory() {
    i = new Weapon(
        document.getElementById("nameArm").value,
        document.getElementById("apArm").value,
        document.getElementById("dpArm").value,
        document.getElementById("spdArm").value
    );
    armory.push(i);
    setArmory();
}
function toggleWeapon(weapon) {
    armory[weapon].active = !armory[weapon].active;
    for(i in armory) if(armory[i] != armory[weapon]) armory[i].active = false;
    setArmory();
    setTemp();
}
function setAbilities() {
    while(document.getElementById("abilities").childElementCount > 1) 
        document.getElementById("abilities").removeChild(document.getElementById("abilities").lastChild);
    for(i in abilities) {
        const p = document.createElement("p");
        p.setAttribute("onclick", `toggleAction(${i})`);
        let s = abilities[i].name;
        if(abilities[i].active) p.style.outline = "thin solid #ffffff"
        if(abilities[i].ap != 0) s += " (" + (abilities[i].ap < 0 ? "" : "+") + abilities[i].ap + " AP)";
        if(abilities[i].dp != 0) s += " (" + (abilities[i].dp < 0 ? "" : "+") + abilities[i].dp + " DP)";
        if(abilities[i].spd != 0) s += " (" + (abilities[i].spd < 0 ? "" : "+") + abilities[i].spd + " Spd)";
        p.innerHTML = s;
        document.getElementById("abilities").append(p);
    }
}
function addAbility() {
    i = new Action(
        document.getElementById("nameAct").value,
        document.getElementById("apAct").value,
        document.getElementById("dpAct").value,
        document.getElementById("spdAct").value
    );
    abilities.push(i);
    setAbilities();
}
function toggleAction(action) {
    abilities[action].active = !abilities[action].active;
    setAbilities();
    setTemp();
}