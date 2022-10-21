$(document).ready(function () {

    $("input.form-check-input").removeAttr("disabled");

    $('#selectTipoUsuario').on('change', function () {

        if ($(this).val() == 'Admin') {
            $(".form-check-input").prop("disabled", true);
        } else {
            $(".form-check-input").prop("disabled", false);
        }
    });
});