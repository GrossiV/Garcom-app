$('.collection-item').on('click', function(){
  var $badge = $('.badge',this);
if ($badge.length == 0) {
    $badge =$('<span class="badge orange-text">0</span>').appendTo(this);
}

  $badge.text(parseInt($badge.text())+1);

});

$('#confirmar').on('click', function(){
  var texto ='';
  $('.badge').parent().each(function(){
    var produto = this.firstChild.textContent;
    var quantidade = this.lastChild.textContent;

    texto+= produto +': '+  quantidade +  ', ';
  });

  $('#resumo').text(texto);


});


$('.modal-trigger').leanModal();

$('.collection').on('click', '.badge', function(){
    $(this).remove();
    return false;
});

$('.acao-limpar').on('click', function(){
  $('#numero-mesa').val('');
  $('.badge').remove();
});

$('.scan-qrcode').on('click', function(){
    cordova.plugins.barcodeScanner.scan(
       function (resultado) {
           if (resultado.text) {
               Materialize.toast('Mesa ' + resultado.text, 2000);
               $('#numero-mesa').val(resultado.text);
           }
       },
       function (error) {
           Materialize.toast('Erro: ' + error, 2000, 'red-text');
       }
    );
});



$('.acao-finalizar').on('click', function(){
  $.ajax({
      url: 'http://cozinhapp.sergiolopes.org/novo-pedido',
      data:{
          mesa: $('#numero-mesa').val() ,
          pedido: $('#resumo').text()
      },
        error: function(error){
           Materialize.toast(error.responseText, 2000, 'red-text');
        }
     })
})
