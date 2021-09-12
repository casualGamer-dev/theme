

var TwoFactorModal = (function () {

    function bindListeners() {
        $(document).ready(function () {
            $('#close_reload').click(function () {
                location.reload();
            });
            $('#do_2fa').submit(function (event) {
                event.preventDefault();

                $.ajax({
                    type: 'PUT',
                    url: Router.route('account.security.totp'),
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content'),
                    }
                }).done(function (data) {
                    var image = new Image();
                    image.src = data.qrImage;
                    $(image).on('load', function () {
                        $('#hide_img_load').slideUp(function () {
                            $('#qr_image_insert').attr('src', image.src).slideDown();
                        });
                    });
                    $('#open2fa').modal('show');
                }).fail(function (jqXHR) {
                    alert('An error occurred while attempting to load the 2FA setup modal. Please try again.');
                    console.error(jqXHR);
                });

            });
            $('#2fa_token_verify').submit(function (event) {
                event.preventDefault();
                $('#submit_action').html('<i class="fa fa-spinner fa-spin"></i> Submit').addClass('disabled');

                $.ajax({
                    type: 'POST',
                    url: Router.route('account.security.totp'),
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content'),
                    },
                    data: {
                        token: $('#2fa_token').val()
                    }
                }).done(function (data) {
                    $('#notice_box_2fa').hide();
                    if (data === 'true') {
                        $('#notice_box_2fa').html('<div class="alert alert-success">2-Factor Authentication has been enabled on your account. Press \'Close\' below to reload the page.</div>').slideDown();
                    } else {
                        $('#notice_box_2fa').html('<div class="alert alert-danger">The token provided was invalid.</div>').slideDown();
                    }
                }).fail(function (jqXHR) {
                    $('#notice_box_2fa').html('<div class="alert alert-danger">There was an error while attempting to enable 2-Factor Authentication on this account.</div>').slideDown();
                    console.error(jqXHR);
                }).always(function () {
                    $('#submit_action').html('Submit').removeClass('disabled');
                });
            });
        });
    }

    return {
        init: function () {
            bindListeners();
        }
    }
})();

TwoFactorModal.init();
