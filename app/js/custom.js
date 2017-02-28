(function () {
    $(document).on('click','.navbar-collapse.in',function(e) {
      if( $(e.target).is('a') || $(e.target).is('i') ) {
          $(this).collapse('hide');
      };
  });
})();

window.recaptchaOptions = {
  lang: 'fr'
}