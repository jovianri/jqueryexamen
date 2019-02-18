let activa;
let articulos;

$(document).ready(function () {
    getCategorias();
    getArticulos();
});

function getCategorias() {
    $.get("http://localhost:3000/categorias", function (json) {
        let categoriasCaja = $("#categorias");
        json.map((element) => {
            caja = $("<div></div>").attr('id', element.id);
            caja.attr('class', 'categoria mostrarArticulos');
            nombre = $("<p></p>").text(element.nombre);

            caja.append(nombre);
            categoriasCaja.append(caja);
            if (element.activa == "true") {
                activa = element.id;
            }

            $(".mostrarArticulos").on('click', function () {
                reloadArticulos($(this).attr('id'));
            });
        });
    });
}

function reloadArticulos(categoria) {
    $.get("http://localhost:3000/articulos", function (json) {
        articulos = json;
        let articulosCaja = $("#articulos");
        listaJsonDoc = document.getElementById("articulos");
        while (listaJsonDoc.firstChild) {
			listaJsonDoc.removeChild(listaJsonDoc.firstChild);
		}
        json.map((element) => {
            if (element.idCat == categoria) {
                caja = $("<div></div>").attr('id', element.id);
                caja.attr('class', 'caja');
                nombreArt = $("<p></p>").text(element.nombre);
                descripcionArt = $("<p></p>").text(element.descripcion);
                precioArt = $("<p></p>").text(element.precio);
                botonEditar = $("<button></button>").addClass("btn btn-info botonEditar").text("Editar");

                caja.append(nombreArt).append(descripcionArt).append(precioArt).append(botonEditar);
                articulosCaja.append(caja);

                $(".botonEditar").on('click', function () {
                    mostrarModal($(this).parents('div').attr('id'));
                });
            }
        });
    });
}

function getArticulos() {
    $.get("http://localhost:3000/articulos", function (json) {
        articulos = json;
        let articulosCaja = $("#articulos");
        json.map((element) => {
            if (element.idCat == activa) {
                caja = $("<div></div>").attr('id', element.id);
                caja.attr('class', 'caja');
                nombreArt = $("<p></p>").text(element.nombre);
                descripcionArt = $("<p></p>").text(element.descripcion);
                precioArt = $("<p></p>").text(element.precio);
                botonEditar = $("<button></button>").addClass("btn btn-info botonEditar").text("Editar");

                caja.append(nombreArt).append(descripcionArt).append(precioArt).append(botonEditar);
                articulosCaja.append(caja);

                $(".botonEditar").on('click', function () {
                    mostrarModal($(this).parents('div').attr('id'));
                });
            }
        });
    });
}


function mostrarModal(idUsuario) {

    $.get("http://localhost:3000/articulos/" + idUsuario, function (json) {
        $("#btnGrabar").off('click');
        $("#btnGrabar").on('click', function () {
            guardarCambios(idUsuario);
        });

        let modal = $("#modalArticulo");
        $("#id").val(json.id);
        $("#nombre").val(json.nombre);
        $("#descripcion").val(json.descripcion);
        $("#precio").val(json.precio);

        modal.modal('show');
    });
}

function guardarCambios(idUsuario) {
    $.ajax({
        type: "PATCH",
        url: "http://localhost:3000/articulos/" + idUsuario,
        data: $("#ficha").serialize(),
        dataType: "json",
        success: function (response) {
            articulos.map((element) => {
                if (element.id == idUsuario) {
                    reloadArticulos(element.idCat);
                }
            });
            $("#modalArticulo").modal('hide');
        }
    });
}
