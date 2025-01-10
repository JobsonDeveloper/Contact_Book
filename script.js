const form = document.getElementById("user_form");
const page_popUp = document.getElementById("page_popUp");
const tel = [];


// Verifica se o telefone fornecido já foi cadastrado anteriormente
function checkPhone(phone) {
    if (tel.includes(phone)) {
        return true;
    }

    page_popUp.classList.add("message_error");
    page_popUp.innerHTML = "O número já foi cadastrado antes!";
    page_popUp.style.display = "block";
    return false;
};

// Captura o evento do formulario
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input_name = document.getElementById("input_name");
    const input_phone = document.getElementById("input_phone");

    if(checkPhone(input_phone.value)) {
        
    }
});