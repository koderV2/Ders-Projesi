const oyunAlani = document.getElementById("oyun-alani");
const altinSayaciGorsel = document.getElementById("altin-sayaci");
const sandikSayaciGorsel = document.getElementById("sandik-sayaci");

const boyut = 20;
let harita = [];
let oyuncuX = 0;
let oyuncuY = 0;
let altin = 0;
let kalanSandik = 3;

// AŞAMA 2: YENİ SAVAŞ DEĞİŞKENLERİ
let sonYon = "d"; // Başlangıçta karakter sağa (d) bakıyor
let savunmada = false; // Q tuşu için kalkan durumu

function haritayiOlustur() {
oyunAlani.innerHTML = "";
harita = [];

for (let y = 0; y < boyut; y++) {
    let satir = [];
    for (let x = 0; x < boyut; x++) {
        let tip = (Math.random() < 0.25 && (x !== 0 || y !== 0)) ? 1 : 0;
        satir.push(tip);

        let kare = document.createElement("div");
        kare.id = `kare-${x}-${y}`;
        kare.classList.add("kare", "karanlik");
        oyunAlani.appendChild(kare);
    }
    harita.push(satir);
}

// 3 Sandık Yerleştir
let yerlesenSandik = 0;
while (yerlesenSandik < 3) {
    let rx = Math.floor(Math.random() * boyut);
    let ry = Math.floor(Math.random() * boyut);
    if (harita[ry][rx] === 0 && (rx !== 0 || ry !== 0)) {
        harita[ry][rx] = 2; yerlesenSandik++;
    }
}

// 4 Adet Rastgele Canavar (Tip 3) Yerleştir
let yerlesenCanavar = 0;
while (yerlesenCanavar < 4) {
    let cx = Math.floor(Math.random() * boyut);
    let cy = Math.floor(Math.random() * boyut);
    if (harita[cy][cx] === 0 && (cx > 3 || cy > 3)) { // Bize çok yakın doğmasınlar
        harita[cy][cx] = 3; yerlesenCanavar++;
    }
}
}

function ekraniCiz() {
    for (let y = 0; y < boyut; y++) {
        for (let x = 0; x < boyut; x++) {
            // Ters tırnaklar eklendi
            let kareDiv = document.getElementById(`kare-${x}-${y}`);
            kareDiv.className = "kare";

            let mesafeX = Math.abs(oyuncuX - x);
            let mesafeY = Math.abs(oyuncuY - y);

            if (mesafeX <= 2 && mesafeY <= 2) {
                if (x === oyuncuX && y === oyuncuY) {
                    kareDiv.classList.add("oyuncu");
                    // Eğer savunmadaysa kalkan sınıfını da ekle
                    if (savunmada) kareDiv.classList.add("kalkan");
                }
                else if (harita[y][x] === 1) kareDiv.classList.add("duvar");
                else if (harita[y][x] === 2) kareDiv.classList.add("sandik");
                else if (harita[y][x] === 3) kareDiv.classList.add("canavar");
            } else {
                kareDiv.classList.add("karanlik");
            }
        }
    }
}

// SİLAH ANİMASYONLARI

// 1. Yarım Daire Çizen Küçük Kare (Yakın Dövüş)
function yakinSaldiri() {
let px = oyuncuX * 25;
let py = oyuncuY * 25;

// Görünmez bir döner menteşe oluşturuyoruz
let mentese = document.createElement("div");
mentese.style.position = "absolute";
mentese.style.width = "25px"; height = "25px";
mentese.style.left = px + "px"; mentese.style.top = py + "px";
mentese.style.transformOrigin = "center";

// O menteşeye bağlı küçük kılıç ucu (kare)
let silah = document.createElement("div");
silah.style.position = "absolute";
silah.style.width = "10px"; silah.style.height = "10px";
silah.style.backgroundColor = "#fff"; // Beyaz kare
silah.style.right = "-15px"; // Karakterin hemen dışına koy
silah.style.top = "7.5px"; 

mentese.appendChild(silah);
oyunAlani.appendChild(mentese);

// Son yöne göre ana açıyı belirle
let aci = 0;
if (sonYon === "w") aci = -90;
if (sonYon === "s") aci = 90;
if (sonYon === "a") aci = 180;
if (sonYon === "d") aci = 0;

// JavaScript Animate ile 180 derecelik yarım daire savurma!
mentese.animate([
    { transform: `rotate(${aci - 90}deg)` },
    { transform: `rotate(${aci + 90}deg)` }
], { duration: 150, easing: "ease-in-out" });

// Animasyon bitince ekrandan sil
setTimeout(() => { mentese.remove(); }, 150);
}

// 2. 200px İleri Fırlayan Dikdörtgen (Uzak Dövüş)
function uzakSaldiri() {
let px = oyuncuX * 25;
let py = oyuncuY * 25;

let mermi = document.createElement("div");
mermi.style.position = "absolute";
// Yukarı/Aşağı ise dik, Sağa/Sola ise yatay dikdörtgen yap
mermi.style.width = (sonYon==="w" || sonYon==="s") ? "5px" : "15px";
mermi.style.height = (sonYon==="w" || sonYon==="s") ? "15px" : "5px";
mermi.style.backgroundColor = "#e74c3c"; // Kırmızı büyü
mermi.style.left = (px + 10) + "px"; 
mermi.style.top = (py + 10) + "px";

oyunAlani.appendChild(mermi);

let hedefX = px; let hedefY = py;
const menzil = 200; // 200px gidecek

if (sonYon === "w") hedefY -= menzil;
if (sonYon === "s") hedefY += menzil;
if (sonYon === "a") hedefX -= menzil;
if (sonYon === "d") hedefX += menzil;

// Hedefe doğru kayma animasyonu
mermi.animate([
    { transform: `translate(0px, 0px)` },
    { transform: `translate(${hedefX - px}px, ${hedefY - py}px)` }
], { duration: 300, easing: "linear" });

setTimeout(() => { mermi.remove(); }, 300);
}

// KLAVYE KONTROLLERİ VE SAVAŞ TUŞLARI
document.addEventListener("keydown", function(e) {
let yeniX = oyuncuX;
let yeniY = oyuncuY;

// Hareket ve Yön Hafızası
if (e.key === "w" || e.key === "ArrowUp") { yeniY--; sonYon = "w"; }
else if (e.key === "s" || e.key === "ArrowDown") { yeniY++; sonYon = "s"; }
else if (e.key === "a" || e.key === "ArrowLeft") { yeniX--; sonYon = "a"; }
else if (e.key === "d" || e.key === "ArrowRight") { yeniX++; sonYon = "d"; }

// SAVAŞ MEKANİKLERİ
if (e.key === "e") yakinSaldiri(); // E tuşu ile Yarım Daire (Kılıç)
if (e.key === "r") uzakSaldiri();  // R tuşu ile Dikdörtgen (Büyü/Ok)
if (e.key === "q" && !savunmada) { // Q tuşu ile Kalkan (Savunma)
    savunmada = true;
    ekraniCiz(); // Kalkanı hemen çiz
    setTimeout(() => { savunmada = false; ekraniCiz(); }, 1000); // 1 Sn sonra kalkanı kapat
}

// Çarpışma ve Toplama
if (yeniX >= 0 && yeniX < boyut && yeniY >= 0 && yeniY < boyut && harita[yeniY][yeniX] !== 1) {
    
    oyuncuX = yeniX;
    oyuncuY = yeniY;

    if (harita[oyuncuY][oyuncuX] === 2) {
        harita[oyuncuY][oyuncuX] = 0; 
        kalanSandik--;
        altin += Math.floor(Math.random() * 66) + 10; 
        
        altinSayaciGorsel.innerText = altin;
        sandikSayaciGorsel.innerText = kalanSandik;

        if (kalanSandik === 0) alert("Tüm sandıkları buldun!");
    }
    ekraniCiz();
}
});

haritayiOlustur();
ekraniCiz();

// --- 3. AŞAMA YENİ DEĞİŞKENLER VE YAPAY ZEKA ---
let sariYol = []; 
let oyunBitti = false; 

function enKisaYoluBul(basX, basY, bitisX, bitisY) {
    let kuyruk = [{ x: basX, y: basY, yol: [] }];
    let ziyaretEdilen = Array(boyut).fill().map(() => Array(boyut).fill(false));
    ziyaretEdilen[basY][basX] = true;
    let yonler = [ {x: 0, y: -1}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 1, y: 0} ];

    while (kuyruk.length > 0) {
        let suAnkiKare = kuyruk.shift();
        
        if (suAnkiKare.x === bitisX && suAnkiKare.y === bitisY) return suAnkiKare.yol; 

        for (let yon of yonler) {
            let yeniX = suAnkiKare.x + yon.x;
            let yeniY = suAnkiKare.y + yon.y;

            if (yeniX >= 0 && yeniX < boyut && yeniY >= 0 && yeniY < boyut && 
                harita[yeniY][yeniX] !== 1 && !ziyaretEdilen[yeniY][yeniX]) {
                
                ziyaretEdilen[yeniY][yeniX] = true;
                kuyruk.push({
                    x: yeniX,
                    y: yeniY,
                    yol: [...suAnkiKare.yol, { x: yeniX, y: yeniY }]
                });
            }
        }
    }
    return []; 
}