(function () {
    $(document).on('click','.navbar-collapse.in',function(e) {
      if( $(e.target).is('a') || $(e.target).is('i') || $(e.target).is('span') || $(e.target).is('img') ) {
          $(this).collapse('hide');
      };
  });
})();

window.recaptchaOptions = {
  lang: 'fr'
}