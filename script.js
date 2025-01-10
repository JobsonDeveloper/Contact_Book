const input_name = document.getElementById("input_name");
const input_phone = document.getElementById("input_phone");
const form = document.getElementById("user_form");
const page_popUp = document.getElementById("page_popUp");
const content = document.getElementById("content");
const array_tel = [];
const array_contact = [];
let editingContact = false;
let indexContactEdit = -1;

function showPopUp(type, message) {
    clearField();
    page_popUp.style.display = "flex";
    page_popUp.innerHTML = `${message}`;

    switch (type) {
        case "error":
            page_popUp.classList.add("message_error");
            break;

        case "success":
            page_popUp.classList.add("message_success");
            break;

        default:
            break;
    }

    setTimeout(() => {
        page_popUp.classList.remove("message_error");
        page_popUp.classList.remove("message_success");
        page_popUp.style.display = "none";
    }, 4000);
}

// Reseta os inputs
function clearField() {
    input_name.value = "";
    input_phone.value = "";
}

// Verifica se o telefone fornecido já foi cadastrado anteriormente
function checkPhone(tel) {
    if (array_tel.includes(tel)) {
        showPopUp("error", "O número já foi cadastrado antes!");
    }
    else {
        registerPhone(input_name.value, input_phone.value);
        showPopUp("success", "Número cadastrado.");
    }
};

// Registra o nome da pessoa e o telefone
function registerPhone(name, tel) {
    array_contact.push({ name: name, telephone: tel });
    array_tel.push(tel);
    updateTable();
}

function updateTable() {
    content.innerHTML = "";

    array_contact.forEach((item, index) => {
        content.innerHTML += `
            <tr>
                <td class="people_name">${item.name}</td>
                <td class="people_contact">${item.telephone}</td>
                <td class="list_options">
                    <button onclick="changeContact(${index})">
                        <img src="images/pen.png" alt="Icone de lapis">
                    </button>

                    <button onclick="deleteContact(${index})">
                        <img src="images/trash-bin.png" alt="Icone de lixeira">
                    </button>
                </td>
            </tr>
        `;
    });

    clearField();
}

// Captura o evento do formulario
form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (editingContact) { // Se estiver editando um contato
        editContact();
    }
    else { // Se estiver adicionando um contato
        checkPhone(input_phone.value);
    }
});

// Mudar os dados de um contato
function changeContact(index) {
    array_contact.forEach((contact, indesItemArray) => {
        if(index === indesItemArray) {
            input_name.value = contact.name;
            input_phone.value = contact.telephone;
            editingContact = true;
            indexContactEdit = index;
        }
    });
}

// Excluir um contato
function deleteContact(index) {
    array_contact.splice(index, 1);
    array_tel.splice(index, 1);
    updateTable();
    showPopUp("success", "Contato excluído.");
}

function editContact() {
    array_contact.splice(indexContactEdit, 1);
    array_tel.splice(indexContactEdit, 1);
    editingContact = false;
    indexContactEdit = -1;
    checkPhone(input_phone.value);
}