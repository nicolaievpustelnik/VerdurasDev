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
});