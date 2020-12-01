//modal
var modal = document.getElementById('myModal');
//grilles du jeu
const cases = document.querySelectorAll('.bg-color');
var span = document.getElementsByClassName("close")[0];
var p = document.querySelector('.modal-content>p');
var restartBtn = document.querySelector('button');

//quand on clique sur la croix
span.onclick = function() {
    modal.style.display = "none";
}

modal.style.display = 'block';

//quand on clique sur le bouton restart
restartBtn.addEventListener('click',()=>{
    restart();
} )

/*===============================================*/
/*===========GESTION DU JEU======================*/
/*===============================================*/

//combinaison gagnante
const tabGagnant = [
    [1,2,3],[4,5,6],[7,8,9],[1,5,9],[3,5,7],[1,4,7],[2,5,8],[3,6,9]
];

//joueurs
player1 = true;
player2 = false;

//victoire
let win = false;

//nombre de tour
let tour = 1;
const tourText = document.querySelector('h2');
tourText.innerHTML = 'tour n° : ' + tour;

//tableau du joueur
let player1Tab = [];
let player2Tab = [];

//affiche les croix ou rond selon le joueur
cases.forEach(el => {
    let player1Case;
    let player2Case;

    el.addEventListener('click', ()=>{
        if (el.textContent === "") {
            if (player1) {
                player1Case = el.id;
                player1Tab.push(player1Case);
                el.innerHTML = "x";
                player1 = false;
                player2 = true;
                tour +=1;
                tourText.innerHTML = 'tour n° : ' + tour;
            }else{
                player2Case = el.id;
                player2Tab.push(player2Case);
                el.innerHTML = "o";
                player1 = true;
                player2 = false;
                tour += 1;
                tourText.innerHTML = 'tour n° : ' + tour;
            }
        }

        if (tour >= 10 && win === false) {
            modal.style.display = "block";
            p.textContent = 'égalité';
            restartBtn.textContent ="rejouer";
        }

        if (player1Tab.length >= 3) {
            verifCombinaison(player1Tab);
        }
        
        if (player2Tab.length >= 3) {
            verifCombinaison(player2Tab);
        }
    });

    
});

function verifCombinaison(playerTab)
{
    tabGagnant.forEach((element) => {

        const tabWin = [];
        element.forEach(el => {
            
            if (playerTab.includes(el.toString())) {
                tabWin.push(el);
                if (tabWin.length === 3) {
                    gameOver(playerTab);
                }
            }
        });

    });
    
}

function gameOver(playerTab)
{
    if (playerTab === player1Tab) {
        win = true;
        modal.style.display = "block";
        p.textContent = 'joueur 1 a gagné';
        restartBtn.textContent ="rejouer";
    }

    if (playerTab === player2Tab) {
        win = true;
        modal.style.display = "block";
        p.textContent = 'joueur 2 a gagné';
        restartBtn.textContent ="rejouer";
    }
}

function restart()
{
    if (win === false && restartBtn.textContent === 'jouer') {
        modal.style.display = 'none';
    }else if(win === true && restartBtn.textContent === 'rejouer' || win === false && restartBtn.textContent === 'rejouer')
    {
        win = false;
        modal.style.display = 'none';
        player1Tab = [];
        player2Tab = [];
        cases.forEach(el =>{
            el.textContent = "";
        });
        tour =  1;
        tourText.innerHTML = 'tour n° : ' + tour;
    }
}