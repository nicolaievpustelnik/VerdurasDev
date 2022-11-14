$(document).ready(function () {

    $("input.form-check-input").removeAttr("disabled");

    $('#selectTipoUsuario').on('change', function () {

        if ($(this).val() == 'Admin') {
            $(".form-check-input").prop("disabled", true);
            $('.form-check-input').prop('checked', false);
        } else {
            $(".form-check-input").prop("disabled", false);
        }
    });

    $(".suc").hide();
    $(".prov").hide();

    $('#selectTipoProducto').on('change', function () {

        if ($(this).val() == 'Producto') {
            $(".suc").show();
            $(".prov").hide();
        } else {
            $(".prov").show();
            $(".suc").hide();
        }
    });
});