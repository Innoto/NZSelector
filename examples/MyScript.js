var ordenArray = new Array("7","1","6","5","3","4");

$(document).ready(function(){	
	var select = new NZselector('selectitem');	//Crear select simple
	var select1 = new NZselector('selectitem1' , { theme: "dark" }); //Crear select simple
  var select2 = new NZselector('selectitem2' , { theme: "Aetonyx" });  //Crear select simple  
  var select3 = new NZselector('selectitem3' , { theme: "Brontosaurus",	whereToPlace: 'probandoContainer', onOptionSelect: onselectedSelect }); //Crear select simple
  var select4 = new NZselector('selectitem4' , { theme: "Campylodon" }); //Crear select simple
  var select5 = new NZselector('selectitem5' , { theme: "Dryptosauroides" });
  var select6 = new NZselector('selectitem6' , { theme: "Euacanthus"});
  var select7 = new NZselector('selectitem7' , { theme: "Futabasaurus"});
  var select8 = new NZselector('selectitem8' , { theme: "Gigantoscelus"});
  var select9 = new NZselector('selectitem9' , { theme: "Harpymimus"});
  var select10 = new NZselector('selectitem10' , { theme: "Iguanasaurus"});
  var select11 = new NZselector('selectitem11' , { theme: "Jurapteryx"});
  var select12 = new NZselector('selectitem12' , { theme: "Kakuru"});
  var select13 = new NZselector('selectitem13' , { theme: "Lancangjiangosaurus"});
  var select14 = new NZselector('selectitem14' , { theme: "Metriacanthosaurus"});
  var select15 = new NZselector('selectitem15' , { theme: "Nuthetes"});
  var select16 = new NZselector('selectitem16' , { theme: "Nuthetes"});
  var select17 = new NZselector('selectitem17' , { theme: "Nuthetes" , dragAdrop:true });
  var select18 = new NZselector('selectitem18' , { theme: "Futabasaurus", initOrder: ordenArray });
});


function onselectedSelect (){
	alert('Asignado');
}