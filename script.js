document.addEventListener("DOMContentLoaded", function() {
// Scrap Collector
document.getElementById("SCoForm").addEventListener("submit", function(event) {
event.preventDefault(); // Dont refresh website

    let s = parseInt(document.getElementById("totalscrap").value);
    let MGSL = parseInt(document.getElementById("MGSL").value);
    let BCSP = parseInt(document.getElementById("BCSP").value);
    let stars = parseInt(document.getElementById("stars").value);
    let gs = 0;

    if (isNaN(stars) || isNaN(s) || isNaN(MGSL) || isNaN(BCSP)) {
        document.getElementById("gs").textContent = "---";
        return;
    }

    gs = 25 * max[0, log10(s) - 9] * max[1, max(0, log10(s) - 30) / 8] * max[1, max(0, log10(s) - 100) / 15] * (1 + MGSL * 0.05)
    
    if (stars >= 10) {
        gs = 25 * max[0, log10(s) - 9] * max[1, max(0, log10(s) - 30) / 8] * max[1, max(0, log10(s) - 100) / 15] * (1 + MGSL * 0.05) * (1 + (BCSP / 1000) * 0.0125)
    }

    document.getElementById("gs").textContent = gs;
});

document.getElementById("stars").addEventListener("input", function() {
    let stars = parseInt(this.value);
    let minstars = 0;

    if (isNaN(stars) || stars < 0) {
        minstars = 1;
    } else {
        minstars = stars + 1;
    }

    document.getElementById("target").min = minstars;
});

document.getElementById("SCoForm").addEventListener("submit", function(event) {
event.preventDefault(); // Dont refresh website

    let stars = parseInt(document.getElementById("stars").value);
    let scrapyard = parseInt(document.getElementById("scrapyard").value);
    let betterdiscount = parseInt(document.getElementById("betterdiscount").value);
    let target = parseInt(document.getElementById("target").value);
    let gs = 0;
    let gsr = 0;
    let boost = 1;

    if (isNaN(stars) || isNaN(scrapyard) || isNaN(target)) {
        document.getElementById("gs").textContent = "---";
        document.getElementById("gsr").textContent = "---";
        document.getElementById("boost").textContent = "---";
        return;
    }

    getstars = target - stars;
    if (getstars < 0) {
        document.getElementById("gs").textContent = "0";
    
    if (scrapyard >= 7) {
        if (betterdiscount != 0 || betterdiscount != NaN) {
        //gs += (0.0025 * betterdiscount);
    }
    }
    boost = 3.63 * (1.30) ** (stars);
    gs = 67.65 * stars ** (2.86);
    gsr = gs * 1.2;

    /*if (stars <= 10) {
        boost = 50 * 1.3 ** (stars - 10);

        gs = 10000 + 10000 * (stars - 1);
    } else if (stars > 10) {
        boost = 50 * 1.3 ** (stars - 10);
        gs = 10000 + 10000 * stars + 5000 * (stars - 10) * (stars - 9); 
    }*/
    
    /*if (lvl <= 6) {
        for (let i = 1; i < lvl; i++) {
            totalXP += xpTable[i];
        }
        totalXP += y;
    } else {
        for (let i = 1; i <= 5; i++) {
            totalXP += xpTable[i];
        }
        for (let i = 7; i <= lvl; i++) {
            totalXP += 1000 + 100 * (i - 6);
        }
        totalXP += y;
    }*/

    document.getElementById("gs").textContent = gs;
    document.getElementById("gsr").textContent = gsr;
    document.getElementById("boost").textContent = boost;
});

// GPS Tracker
document.getElementById("lvl").addEventListener("input", function() {
    let lvl = parseInt(this.value);
    let maxXP;
    const xpTable = [100, 200, 400, 800, 1000];

    if (lvl <= 1 || isNaN(lvl)) {
        maxXP = 99;
    } else if (lvl <= 6) {
        maxXP = xpTable[lvl] - 1;
    } else {
        maxXP = 999 + 100 * (lvl - 5);
    }

    document.getElementById("FiL").max = maxXP;
    //document.getElementById("FiL").value = ""; // optional: reset input
});

document.getElementById("GPSForm").addEventListener("submit", function(event) {
event.preventDefault(); // Dont refresh website

    let lvl = parseInt(document.getElementById("lvl").value);
    let y = parseInt(document.getElementById("TiL").value);
    let totalXP = 0;
    let xpTable = [0, 100, 200, 400, 800, 1000];

    if (isNaN(lvl) || isNaN(y) || lvl < 1 || y < 0) {
        document.getElementById("answer").textContent = "---";
        document.getElementById("percent").textContent = "---";
        return;
    }

    if (lvl === 1) {
        totalXP = y;
    } else if (lvl <= 6) {
        for (let i = 1; i < lvl; i++) {
            totalXP += xpTable[i];
        }
        totalXP += y;
    } else {
        for (let i = 1; i <= 5; i++) {
            totalXP += xpTable[i];
        }
        for (let i = 7; i <= lvl; i++) {
            totalXP += 1000 + 100 * (i - 6);
        }
        totalXP += y;
    }

    document.getElementById("answer").textContent = totalXP;
    let percent = (totalXP / 35238095238) * 100;
    document.getElementById("percent").textContent = percent.toFixed(6);
});
});