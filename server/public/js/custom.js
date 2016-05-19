var baseUrl = 'http://127.0.0.1:4000/api/';
var url;
function hide(id,foo,type) {
  if(type){
    url = baseUrl + type; 
  }else{
    url = baseUrl + 'users'; 
  }
  $.post(url, {
    type : 'delete',
    id : id
  }, function() {
    foo.parentElement.parentElement.remove();
    // location.reload();
  });
}
