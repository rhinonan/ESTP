var baseUrl = 'http://121.196.203.217:4000/api/';
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
