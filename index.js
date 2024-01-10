document.addEventListener("DOMContentLoaded", main);

function main()
{
    let checkbox = document.getElementById('veure');
    let form_inputs = document.getElementsByClassName("form-control");
    //Reiniciem l'estat dels inputs i checkbox en cas d'actualitzar pàgina
    checkbox.checked = false;
    Array.from(form_inputs).forEach((input) => {
        input.value = "";
        input.disabled = true;
    });

    checkbox.addEventListener("change", () => {
        if (checkbox.checked)
        {
            // https://stackoverflow.com/questions/3871547/iterating-over-result-of-getelementsbyclassname-using-array-foreach
            Array.from(form_inputs).forEach((input) => {
                input.disabled = false;
            });
        }
        else
        {
            Array.from(form_inputs).forEach((input) => {
                input.value = "";
                input.disabled = true;
            });
        }
    });

    let titular     = document.getElementById("owner");
    let cvv         = document.getElementById("cvv");
    let tarja       = document.getElementById("cardNumber");
    let caducitat   = document.getElementById("expireDate");

    console.log(inputs);

    titular.addEventListener("input", function()
    {
        nomesLletres(this);
    });

    cvv.addEventListener("input", function()
    {
        nomesNums(this);
    });

    tarja.addEventListener("input", function()
    {
        nomesNums(this);
    });

    caducitat.addEventListener("input", function()
    {
        nomesNums(this);
    });

    let arrayValidacions = []; // Array on guardarem el resultat de les validacions

    titular.addEventListener("focusout", function()
    {
        // https://www.shecodes.io/athena/5558-find-index-of-elements-in-array-with-matching-values-javascript
        let titularIndex = arrayValidacions.findIndex(x => x.camp == "titular");

        if (titularIndex != -1)
        {
            arrayValidacions[titularIndex].valid = validarTitular(this);
        }
        else
        {
            arrayValidacions.push({ camp: "titular", valid: validarTitular(this) });
        }
    });

    // https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
    cvv.addEventListener("input", escripturaCVV);

    cvv.addEventListener("focusout", function()
    {
        let cvvIndex = arrayValidacions.findIndex(x => x.camp == "cvv");

        if (cvvIndex != -1)
        {
            arrayValidacions[cvvIndex].valid = validarCVV(this);
        }
        else
        {
            arrayValidacions.push({ camp: "cvv", valid: validarCVV(this) });
        }
    });

    caducitat.addEventListener("input", escripturaCaducitat);

    caducitat.addEventListener("focusout", function()
    {
        let caduIndex = arrayValidacions.findIndex(x => x.camp == "caducitat");

        if (caduIndex != -1)
        {
            arrayValidacions[caduIndex].valid = validarCaducitat(this);
        }
        else
        {
            arrayValidacions.push({ camp: "caducitat", valid: validarCaducitat(this) });
        }

        console.log(arrayValidacions);
    });
}

function nomesLletres(input)
{
    input.value = input.value.replace(/[^a-zA-Z\s]/, '').toUpperCase();
}

function nomesNums(input)
{
    input.value = input.value.replace(/[^0-9]/, '');
}

function validarTitular(input)
{
    let regexp_titular = /^([A-Z]{2,})([ ][A-Z]{2,})?([ ][A-Z]{2,})$/;

    return regexp_titular.test(input.value);
}

function escripturaCVV(e)
{
    let cvv = e.target.value;

    e.target.value = cvv.replace(/\D/, '').slice(0, 3);
}

function validarCVV(input)
{
    let regexp_cvv = /^[0-9]{3}$/;

    return regexp_cvv.test(input.value);
}

function escripturaCaducitat(e)
{
    let caducitat = e.target.value;

    let inputFinal = caducitat.replace(/\D/, '');

    // Afegim la barra
    if (inputFinal.length >= 2)
    {
        inputFinal = inputFinal.slice(0, 2) + "/" + inputFinal.slice(2);
    }

    // No més llarg que els numeros de mes i any separats per la barra
    e.target.value = inputFinal.slice(0, 5);
}


function validarCaducitat(input)
{
    let regexp_caduca = /(^0[1-9]|1[0-2])\/(\d{2}$)/;

    return regexp_caduca.test(input.value);
}