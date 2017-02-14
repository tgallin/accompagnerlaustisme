(function () {
    $(document).on('click','.navbar-collapse.in',function(e) {
      if( $(e.target).is('a') ) {
          $(this).collapse('hide');
      };
  });
})();

window.recaptchaOptions = {
  lang: 'fr'
}