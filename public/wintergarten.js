'use strict';

var cache = {

}
function fetchRows(id) {
  $('[data-id]').each(function() {
    var el =  $(this);
    var dataId = (id || el.data('id'))

    if(cache[dataId]) {
      $('#videos').html(cache[dataId]);
      return
    }
    (function(el){
      $.ajax({
        url: 'items.json?id=' + dataId,
        method: 'GET'
      }).done(function(data) {
        cache[dataId] = data.partial
        $('#videos').html(data.partial);
        // $('[data-id=' + data.id +']').html(data.partial);
      });
    })(el);
  });
};

$(function() {
  var self = this;

  self.init = function() {
    self.fetchRows();
    self.bindModals()
    self.bindForms();
  };

  self.fetchRows = fetchRows

  self.bindForms = function() {
    $('form').on('submit', function() {
      $(this).find('button').addClass('is-processing');
    });
  };

  self.bindModals = function() {
    $(document).on('click', '[data-modal-open]', function(event) {
      var name = $(this).data('modal-open');
      var redirect = self.getRedirect($(this));

      event.preventDefault();

      self.openModal(name, redirect);

    });

    $('.modal--bg').on('click', function(event){
      event.preventDefault();
      self.closeModals();
    });

    $('[data-modal-close]').on('click', function(event){
      event.preventDefault();
      self.closeModals();
    });

    $(window).on('resize', function() {
      var modals = $('.modal--container.is-active');
      if (modals.length) {
        modals.css('top', $(window).scrollTop());
      }
    });
  };

  self.openModal = function(name, redirect) {
    var modal = $('[data-component="modal-' + name + '"]');
    var form = modal.find('form');

    if (redirect.indexOf('watch') >= 0 && form.length) {
      form.append('<input type="hidden" name="redirect" value="' + redirect + '">');
    }
    if (!modal.hasClass('is-active')) {
      modal.css('top', $(window).scrollTop());
      modal.addClass('is-active');
    }
  };

  self.closeModals = function() {
    var modal = $('.modal--container');
    var form = modal.find('form');

    if (form.length) {
      form.find('[name=redirect]').remove();
    }
    if (modal.hasClass('is-active')) {
      modal.removeClass('is-active');
    }
  };

  self.getRedirect = function(el) {
    var parser = document.createElement('a');
    parser.href = el.prop('href');

    return parser.pathname;
  };

  self.init();
});


var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}
