/**
 * Created by smagne on 10/18/2016.
 */
(function ($, window) {
    "use strict";

    window.multi = window.multi || {};

    multi.users = (function () {
        function init() {
            handleEvents();
        }

        function handleEvents() {
            var $frmLogin = $("#frmLogin"),
                $errorBlock = $('.error-block'),
                $errorBlockText = $('.error-block p');
            $frmLogin.on("submit", function (e) {
                $errorBlock.addClass("hide");
                $errorBlockText.html("");
                if(!validForm()){
                    e.preventDefault();
                    $errorBlock.removeClass("hide");
                }
            });
        }

        function validForm() {
            var $txtEmail = $("#txtEmail"),
                $txtPassword = $("#txtPassword"),
                isValid = true;
            isValid = multi.validation.validateText($txtEmail, $txtEmail.parent()) && isValid;
            isValid = multi.validation.validateEmail($txtEmail, $txtEmail.parent()) && isValid;
            isValid = multi.validation.validateText($txtPassword, $txtPassword.parent()) && isValid;
            return isValid
        }

        return {
            init: init
        }
    })();
    multi.users.init();

}(jQuery, this));