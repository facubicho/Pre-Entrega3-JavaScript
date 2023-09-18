const bicicletas = [
    {
        id: 1,
        rodado: 26,
        precio: 4000,
        color: "Azul",
        estado: "Disponible",
    },
    {
        id: 2,
        rodado: 28,
        precio: 5000,
        color: "Blanco",
        estado: "Disponible",
    },
    {
        id: 3,
        rodado: 24,
        precio: 3000,
        color: "Blanco",
        estado: "Alquilado",
    },
    {
        id: 4,
        rodado: 26,
        precio: 8000,
        color: "Rojo",
        estado: "Disponible",
    },
];


class Bicicletas {

    constructor({ id, rodado, precio, color, estado }) {
        this.id = id;
        this.rodado = rodado;
        this.precio = precio;
        this.color = color;
        this.estado = estado;
    }

    recargo() {
        return this.precio * 1.30;
    }
}


let bicicletaArray = [];




//----------------Inicio-----------------

document.addEventListener('DOMContentLoaded', () => {
    // cargarDatosBici();
    bicicletaArray = bicicletas;
})

function cargarDatosBici() {
    bicicletaArray = JSON.parse(localStorage.getItem("bicicletaArray"));
}



//------------------Mostrar Datos----------------

const mostrarBoton = document.getElementById("mostrar");
mostrarBoton.addEventListener("click", mostrarNavBicicletas);


function mostrarNavBicicletas() {

    mostrarBicicletas();
    noMostrarAgregarBicicletas();
    noMostrarAlquilerBicicletas();
    noMostrarCobroBicletas();
    noMostrarTotal();
    noMostrarCobroBicletasBoton();

    let datosbici = JSON.parse(localStorage.getItem("bicicletaArray"));

    if (datosbici) {
        bicicletaArray = datosbici;
        crearTemplate();
    } else {
        templateVacio();
    }
}


function crearTemplate() {

    contenedorBicicletas.innerHTML = "";
    bicicletaArray.forEach((bicicleta) => {
        contenedorBicicletas.innerHTML += `
            <div class="bicicleta">
                <p>ID: ${bicicleta.id}</p>
                <p>Rodado: ${bicicleta.rodado}</p>
                <p>Precio: ${bicicleta.precio}</p>
                <p>Color: ${bicicleta.color}</p>
                <p>Estado: ${bicicleta.estado}</p>
                <div class="btnBicicleta">
                <button class="btnBorrar" id="${bicicleta.id}">Borrar</button>
                </div>
            </div>
        `;
    });

    const btnBorrar = document.querySelectorAll('.btnBorrar');
    borrarBicicleta(btnBorrar);
}


function borrarBicicleta(selectores) {

    selectores.forEach((selector) => {
        selector.addEventListener('click', (e) => {

            const id = parseInt(e.target.id);
            const bicicleta = bicicletaArray.map((dato) => dato.id).indexOf(id);

            if (bicicleta !== -1 && bicicletaArray[bicicleta].estado === "Disponible") {
                bicicletaArray.splice(bicicleta, 1);
                localStorage.setItem("bicicletaArray", JSON.stringify(bicicletaArray));
                crearTemplate();
            }
        })
    }
    )
}


//--------------Agregar Datos--------------------

const agregarBoton = document.getElementById("agregar");
agregarBoton.addEventListener("click", agregarBicicleta);

function agregarBicicleta() {

    noMostrarBicicletas();
    mostrarAgregarBicicletas();
    noMostrarAlquilerBicicletas();
    noMostrarCobroBicletas();
    noMostrarTotal();
    noMostrarCobroBicletasBoton();

    const nuevoBoton = document.getElementById("nuevo");
    nuevoBoton.addEventListener("click", nuevaBicicleta);
}


function nuevaBicicleta() {

    const inputsFormularioNuevaBici = document.querySelectorAll('.input');
    const precio = parseFloat(inputsFormularioNuevaBici[1].value);
    if (isNaN(precio) || precio >= 0) {
        const id = maximoId() + 1;
        const rodado = inputsFormularioNuevaBici[0].value;
        const color = inputsFormularioNuevaBici[2].value;
        const estado = "Disponible";

        const bicicleta = {
            id,
            rodado,
            precio,
            color,
            estado,
        }

        bicicletaArray.push(bicicleta);
        localStorage.setItem("bicicletaArray", JSON.stringify(bicicletaArray));
        console.log(JSON.parse(localStorage.getItem("bicicletaArray")));
        console.log(bicicletaArray);

    }
}


function maximoId() {
    let maxId = 0;
    for (const bicicleta of bicicletaArray) {
        if (bicicleta.id > maxId) {
            maxId = bicicleta.id;
        }
    }
    return maxId;
}


//--------------Alquilar-----------------

const botonAlquilar = document.getElementById("alquilar");
botonAlquilar.addEventListener("click", alquilarBicicleta);

function alquilarBicicleta() {
    noMostrarBicicletas();
    noMostrarAgregarBicicletas();
    mostrarAlquilerBicicletas();
    noMostrarCobroBicletas();
    noMostrarTotal();
    noMostrarCobroBicletasBoton();


    let datosbici = JSON.parse(localStorage.getItem("bicicletaArray"));

    if (datosbici != null) {
        bicicletaArray = datosbici;
        crearTemplateAlquiler();
    } else {
        templateVacio();
    }
}


function crearTemplateAlquiler() {

    contenedorBicicletasAlquiladas.innerHTML = "";
    bicicletaArray.forEach((bicicleta) => {

        contenedorBicicletasAlquiladas.innerHTML += `
            <div class="alquiler">
                <p>ID: ${bicicleta.id}</p>
                <p>Rodado: ${bicicleta.rodado}</p>
                <p>Precio: ${bicicleta.precio}</p>
                <p>Color: ${bicicleta.color}</p>
                <p>Estado: ${bicicleta.estado}</p>
                <div class="btnBicicleta">
                <button class="btnAlquilar" id="${bicicleta.id}">Alquilar</button>
                </div>
            </div>
        `;
    });
    const btnAlquilar = document.querySelectorAll('.btnAlquilar')
    marcarAlquilerBicicleta(btnAlquilar)
}


function marcarAlquilerBicicleta(selectores) {
    selectores.forEach((selector) => {
        selector.addEventListener('click', (e) => {

            const id = parseInt(e.target.id);
            const bicicletaIndex = bicicletaArray.findIndex((bici) => bici.id === id);

            if (bicicletaIndex !== -1 && bicicletaArray[bicicletaIndex].estado === "Disponible") {
                bicicletaArray[bicicletaIndex].estado = "Alquilado";
                localStorage.setItem("bicicletaArray", JSON.stringify(bicicletaArray));
                crearTemplateAlquiler();
            }
        });
    });

}



//-----------------Cobrar------------------------

const botonCobrar = document.getElementById("cobrar");
botonCobrar.addEventListener("click", cobrarBicicleta);

function cobrarBicicleta() {

    noMostrarBicicletas();
    noMostrarAgregarBicicletas();
    noMostrarAlquilerBicicletas();
    noMostrarTotal();
    mostrarCobroBicletas();
    noMostrarCobroBicletasBoton();
    clickCobroBicletasBoton();

    let datosbici = JSON.parse(localStorage.getItem("bicicletaArray"));

    if (datosbici) {
        bicicletaArray = datosbici;
        crearTemplateCobrar();
    }
}


function crearTemplateCobrar() {

    let validaBoton = false;
    bicicletaArray = JSON.parse(localStorage.getItem("bicicletaArray"));

    contenedorBicicletasCobradas.innerHTML = "";
    bicicletaArray.forEach((bicicleta) => {
        if (bicicleta.estado === "Alquilado") {
            mostrarCobroBicletasBoton();
            contenedorBicicletasCobradas.innerHTML += `
            <div class="bicicleta">
                <p>ID: ${bicicleta.id}</p>
                <p>Rodado: ${bicicleta.rodado}</p>
                <p>Precio: ${bicicleta.precio}</p>
                <p>Color: ${bicicleta.color}</p>
                <p>Estado: ${bicicleta.estado}</p>
                <input type="checkbox" class="chkAlquilar" id="${bicicleta.id}">
            </div>
        `;
        }

    });

    contenedorBicicletasCobradasBoton.innerHTML = `
    <div class="divBtnCobrarAlquilada">
        <button class="btnCobrarAlquilada" id="">Cobrar Bicicletas</button>
    </div>
`;

    const btnCobrarAlquilada = document.querySelector(".btnCobrarAlquilada");
    btnCobrarAlquilada.addEventListener("click", marcarCobrarBicicleta);
}


function marcarCobrarBicicleta(selectores) {
    let total = 0;
    console.clear();

    bicicletaArray.forEach((bicicleta) => {

        const checkbox = document.getElementById(bicicleta.id);

        if (checkbox && checkbox.checked && bicicleta.estado === "Alquilado") {
            total += bicicleta.precio;
            bicicleta.estado = "Disponible"
            localStorage.setItem("bicicletaArray", JSON.stringify(bicicletaArray));
        }
    });


    if (total > 0) {
        noClickCobroBicletasBoton();
        mostrarTotal();
        const contenedorTotal = document.getElementById("contenedorTotal");
        contenedorTotal.innerHTML = `<div class="divBtnCobrarAlquilada marco">
        <p>**TOTAL: $${total} **</p>
        </div>`;

        crearTemplateCobrar();
    }
}




//-----------------Validacion vacio --------------------

function templateVacio() {
    const contenedorVacio = document.getElementById("contenedorVacio");
    contenedorVacio.innerHTML = `<div class="vacio">
        <p>No hay bicicletas disponibles</p>
        </div>`;
}


//---------------Prende/Apaga-------------------

function noMostrarTotal() {
    const contenedorTotal = document.getElementById("contenedorTotal");
    contenedorTotal.style.display = "none";
}

function mostrarTotal() {
    const contenedorTotal = document.getElementById("contenedorTotal");
    contenedorTotal.style.display = "block";
}

function noMostrarCobroBicletasBoton() {
    const contenedorBicicletasCobradasBoton = document.getElementById("contenedorBicicletasCobradasBoton");
    contenedorBicicletasCobradasBoton.style.display = "none";
}

function mostrarCobroBicletasBoton() {
    const contenedorBicicletasCobradasBoton = document.getElementById("contenedorBicicletasCobradasBoton");
    contenedorBicicletasCobradasBoton.style.display = "block";
}

function clickCobroBicletasBoton() {
    const contenedorBicicletasCobradasBoton = document.getElementById("contenedorBicicletasCobradasBoton");
    contenedorBicicletasCobradasBoton.classList.remove("disable");
}


function noClickCobroBicletasBoton() {
    const contenedorBicicletasCobradasBoton = document.getElementById("contenedorBicicletasCobradasBoton");
    contenedorBicicletasCobradasBoton.classList.add("disable");
}


function noMostrarCobroBicletas() {
    const contenedorBicicletasCobradas = document.getElementById("contenedorBicicletasCobradas");
    contenedorBicicletasCobradas.style.display = "none";
}

function mostrarCobroBicletas() {
    const contenedorBicicletasCobradas = document.getElementById("contenedorBicicletasCobradas");
    contenedorBicicletasCobradas.style.display = "block";
}

function noMostrarAlquilerBicicletas() {
    const contenedorBicicletasAlquiladas = document.getElementById("contenedorBicicletasAlquiladas");
    contenedorBicicletasAlquiladas.style.display = "none";
}

function mostrarAlquilerBicicletas() {
    const contenedorBicicletasAlquiladas = document.getElementById("contenedorBicicletasAlquiladas");
    contenedorBicicletasAlquiladas.style.display = "block";
}

function noMostrarAgregarBicicletas() {
    const formularioAgregar = document.getElementById("formularioAgregar");
    formularioAgregar.classList.add("disable");
}

function mostrarAgregarBicicletas() {
    const formularioAgregar = document.getElementById("formularioAgregar");
    formularioAgregar.classList.remove("disable");
}

function noMostrarBicicletas() {
    const contenedorBicicletas = document.getElementById("contenedorBicicletas");
    contenedorBicicletas.style.display = "none";
}

function mostrarBicicletas() {
    const contenedorBicicletas = document.getElementById("contenedorBicicletas");
    contenedorBicicletas.style.display = "block";
}


// --------------salir---------------

const salirBoton = document.getElementById("salir");
salirBoton.addEventListener("click", () => {
    document.body.classList.add("disable");
});



