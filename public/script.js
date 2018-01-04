'use strict';

var $formName       = $("#name");
var $formEmail      = $("#email");
var $btnApply       = $('#btn-apply');
var $modalForm      = $('#apply-modal');
var $modalSuccess   = $('#success-modal');
var $modalError     = $('#apply-error');


function init(){
    $btnApply.on('click', sendForm);
}


function sendForm() {
    
    var _name = $formName.val();
    var _mail = $formEmail.val();

    $.ajax({
        method: 'POST',
        url: 'http://avanade.gama.academy/api/process_applications',
        dataType: 'json',
        headers: { EMAIL: 'tellme@luizrodrigues.com' },
        contentType: 'application/json',
        data: JSON.stringify({ process_application: { name: _name, email: _mail } }),
        success: function (json) {
            alertSuccess();
        },
        error: function (jqXHR, textStatus, errorThrown) {
    
            var _response = jqXHR.responseJSON;

            alertError();

            $('.form-control').removeClass('f-error');
            $('.f-msg').removeClass('show');
            $('.f-msg').html('');
            
            for(var type in _response) {
                
                var _type   = type;
                var _msg    = _response[type].toString();

                $('#'+_type).addClass('f-error');
                $('.e-'+_type).addClass('show');
                $('.e-'+_type).html(_msg);
            }

            
            
        }
    });

    
}

function resetForm(){
    $("#name").val('');
    $("#email").val('');
}

function alertSuccess(){
    $modalForm.modal('hide');
    $modalSuccess.modal('show');
    $form.classList.remove('was-validated');
    resetForm();
}

function alertError(){
    $modalError.modal('show');
}



// INIT
init();