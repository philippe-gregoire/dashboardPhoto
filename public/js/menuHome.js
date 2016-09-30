if(document.getElementById("nameLamp") != null){
  document.getElementById("nameLamp").innerHTML = localStorage.getItem("name");
};
if(document.getElementById("nameHome") != null){
  document.getElementById("nameHome").innerHTML = "<i class='fa fa-fw fa-dashboard'></i> " + localStorage.getItem("name") + " Home";
};

