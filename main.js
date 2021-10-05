let film_tomb = [];

class Film {

    constructor(nev, rendezo, kiadasi_ev) {
        this.nev = nev;
        this.rendezo = rendezo;
        this.kiadasi_ev = kiadasi_ev;
    }

    toString() {
        return this.nev + ", " + this.rendezo + ", " + this.kiadasi_ev;
    }
}

function hozzaad() {
    let nev_input = document.getElementById("nev");
    let rendezo_input = document.getElementById("rendezo");
    let kiadasi_ev_input = document.getElementById("kiadasi_ev");

    if (nev_input.value == "" || rendezo_input.value == "" || kiadasi_ev_input.value == "") {
        document.getElementById("ures").innerHTML = "Nem hagyunk üresen mezőket!";
    }
    else {
        document.getElementById("ures").innerHTML = "";

        // Feladat szerint
        /*
        let obj_film = new Film(nev_input.value, rendezo_input.value, kiadasi_ev_input.value);
        film_tomb.push(obj_film);
        */
        film_tomb.push(new Film(nev_input.value, rendezo_input.value, kiadasi_ev_input.value));

        nev_input.value = "";
        rendezo_input.value = "";
        kiadasi_ev_input.value = "";

        let tablazat = document.getElementById("tablazat");

        tablazat.innerHTML = "<tr><th onclick='tablazatSorrend(0)'>Név</th><th onclick='tablazatSorrend(1)'>Rendező</th><th onclick='tablazatSorrend(2)'>Kiadási Év</th></tr>";

        for (i = 0; i < film_tomb.length; i++) {
            tablazat.innerHTML += "<tr><td>" + film_tomb[i].nev + "</td><td>" + film_tomb[i].rendezo + "</td><td>" + film_tomb[i].kiadasi_ev + "</td></tr>";
        }
    }
}
// RÉGI
/*
function listazas() {
    let tablazat = document.getElementById("tablazat");

    // Feladat szerint
    //tablazat.innerHTML = "";

    tablazat.innerHTML = "<tr><th>Név</th><th>Rendező</th><th>Kiadás Éve</th></tr>";

    for (i = 0; i < film_tomb.length; i++) {
        tablazat.innerHTML += "<tr><td>" + film_tomb[i].nev + "</td><td>" + film_tomb[i].rendezo + "</td><td>" + film_tomb[i].kiadasi_ev + "</td></tr>";
    }
}
*/
function tablazatSorrend(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tablazat");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            // A legújabb Firefox-on kb 1-2 perc tesztelés után "x is undefined"
            // de Crome-on 10 perc tesztelés után semmi... ?
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];

            if (dir == "asc") {
                if (!isNaN(y.innerHTML) && !isNaN(x.innerHTML)) {
                    if (Number(x.innerHTML) > Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (typeof x.innerHTML == "string" && typeof y.innerHTML == "string") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else if (dir == "desc") {
                if (!isNaN(y.innerHTML) && !isNaN(x.innerHTML)) {
                    if (Number(x.innerHTML) < Number(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else if (typeof x.innerHTML == "string" && typeof y.innerHTML == "string") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        }
        else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
