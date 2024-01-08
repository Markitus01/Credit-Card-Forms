document.addEventListener("DOMContentLoaded", main);

function main()
{
    let checkbox = document.getElementById('veure');
    let inputs = document.getElementsByClassName("form-control");
    //Reiniciem l'estat dels inputs i checkbox en cas d'actualitzar pàgina
    checkbox.checked = false;
    Array.from(inputs).forEach((input) => {
        input.value = "";
        input.disabled = true;
    });

    checkbox.addEventListener("change", () => {
        if (checkbox.checked)
        {
            // https://stackoverflow.com/questions/3871547/iterating-over-result-of-getelementsbyclassname-using-array-foreach
            Array.from(inputs).forEach((input) => {
                input.disabled = false;
            });
        }
        else
        {
            Array.from(inputs).forEach((input) => {
                input.value = "";
                input.disabled = true;
            });
        }
    });

    let regexp_titular  = /([A-Z]{2,})([ ][A-Z]{2,})?([ ][A-Z]{2,})/;
    let regexp_cvv      = /[0-9]{3}/;
    let regexp_caduca   = /[]/;
}