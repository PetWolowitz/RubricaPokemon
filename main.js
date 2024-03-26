// cattura del contenitore delle card contatto
let cardsWrapper = document.querySelector('#cardsWrapper');
// console.log(cardsWrapper)

// cattura del bottone mostra rubrica
let showContactsBtn = document.querySelector('#showContactsBtn');
// console.log(showContactsBtn)

// cattura del bottone aggiungi contatti
let addContactBtn = document.querySelector('#addContactBtn');

// cattura del bottone rimuovi contatti
let removedContactBtn = document.querySelector('#removedContactBtn');

// cattura degli input
let nameInput = document.querySelector('#nameInput');
let numberInput = document.querySelector('#numberInput')

const RUBRICA = {


    contacts: [

        { nome: 'Irene', numero: 333333345 },
        { nome: 'Pietro', numero: 33369669 },
        { nome: 'Viola', numero: 333337393 },


    ],


    // metodo dei contatti
    showContacts: function () {

        cardsWrapper.innerHTML = '';
        // svuoto il contenitore delle card prima di crearne di nuove, cosa che avviene sotto nel foreach

        this.contacts.forEach((contact) => {

            let div = document.createElement('div');

            div.classList.add('col-12', 'col-lg-8', 'my-3')

            div.innerHTML = `
            
            <div class="card-custom">
                <p class="m-0">${contact.nome}</p>
                <p class="m-0">${contact.numero}</p>
                <i class="fa-solid fa-trash-can fa-2x trashIcon"></i>
            </div>
        
        `;

            cardsWrapper.appendChild(div);

        })
        // cattura delle icone del bidone
        let trashIcons = document.querySelectorAll('.trashIcon');



        // trashIcons.forEach(icon, i)=>{
        trashIcons.forEach((icon, i) => {
            // attacchiamo ad ogni singola icona l'evento click
            icon.addEventListener('click', () => {
                // salvo all'interno di una variabile il nome dell'intero oggetto che si trova allo stesso indice dell'icona del cestino nel momento della sua creazione
                let nomeTrovato = this.contacts[i].nome;
    
                this.removeContact(nomeTrovato);
            });
        });
        
    },

        // metodo aggiungi contatto
        addContact : function (newName, newNumber) {
            this.contacts.push({ nome: newName, numero: newNumber });
            this.showContacts();
        },


        // metodo rimuovi contatto
        removeContact : function (removedName) {
            // voglio un array con solo i nomi 
            let names = this.contacts.map((contact) => {
                return contact.nome.toLowerCase();

            });

            let index = names.indexOf(removedName.toLowerCase());

            if (index > -1) {
                this.contacts.splice(index, 1);
                this.showContacts();
                showContactsBtn.innerHTML = "Nascondi Rubrica";
            } else {
                alert('Contatto non presente in Rubrica');
            }

        }
    }





// VARIABILE D'APPOGGIO PER CONFERMARE LA CONDIZIONE
let confirm = false;
    // evento click bottone mostra contatto

    showContactsBtn.addEventListener('click', () => {

        // quando clicco sul bottone
        // se confirm è false, invocami la funzione showContacts e passami confrm a true ela scritta del bottone a Nascondi bottone  

        if (confirm == false) {

            RUBRICA.showContacts();
            confirm = true;
            showContactsBtn.innerHTML = 'Nascondi Rubrica';

        } else {
            // quando clicco sul bottone 
            // se confirm è true ,svuotami cardWrapper e passami confirm a false per riprendere il giro da capo e passami la scrittad el bootono a mostra bottone

            cardsWrapper.innerHTML = '';
            confirm = false;
            showContactsBtn.innerHTML = "Mostra Rubrica";
        }
    });


    // 
    // // evento click sul bottone aggiungi contatto
    addContactBtn.addEventListener('click', () => {

        if (nameInput.value != '' && numberInput.value != '') {

            confirm = true;
            RUBRICA.addContact(nameInput.value, numberInput.value);
            showContactsBtn.innerHTML = 'Nascondi Rubrica';

            // svuotiamo i valori degli input
            nameInput.value = '';
            numberInput.value = '';

        } else {

            alert('Campi Obbligatori, inserisci un nome ed un numero')
        }

    }),


    /// evento click sul bottone rimuovi contatto
    removedContactBtn.addEventListener('click', () => {
        confirm = true;
        RUBRICA.removeContact(nameInput.value);
        nameInput.value = '';
    });
