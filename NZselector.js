var NZselector = Class.create({	
	/************************************************************************************************************************************/
	init: function(id, opts){
		this.item = $('#'+id);
		this.nzitem = '#'+id+'_nzselector';
		this.id = id;
		this.msgdefault = "";
		this.selectorClass = this.item.attr('class');
		this.multiselect = this.item.attr('multiple');    
		this.items_options = [];	
		this.items_binds = [];				
		this.options = new Object({
			theme: "default",
      initOrder : "",
      dragAdrop: this.item.attr('dragAdrop'),
			whereToPlace: "",
			onOptionSelect:function(){}
		});		
		$.extend(true, this.options, opts);
    this.options.theme = this.options.theme.toLowerCase();
		if(!$(this.nzitem).length){
      if(this.options.initOrder != "") // Si recibe un array de "Values" los ordena antes de empezar 
        this.orderOptions(this.options.initOrder.reverse());
			this.getOptions();
			this.setInterface();
		}	
	},
	/********************************** Este metodo añade las css necesarias del selector, busca en donde se va crear el nuevo selector **/
	setInterface: function(){	
		var that = this;		
		//$(this.item).hide();		
		if(this.multiselect)
      if(this.options.dragAdrop)
			   var nzHtml = this.getInterfaceDragADropSorteable();
      else
         var nzHtml = this.getMultipleInterface();
		else
			var nzHtml = this.getSimpleInterface();		
		var ready = false;		
		if(this.options.whereToPlace != ''){
			if($('#'+this.options.whereToPlace).length !=0){				
				$('#'+this.options.whereToPlace).append(nzHtml);
				ready = true;
			}else{ alert('Error Container no encontrado.'); }			
		}else{
			$(this.item).parent().append(nzHtml);
			ready = true;
		}		
		if(ready)
			this.openSelector();			
	},
	/*************************************************************************************	Construye el contenido HTML del NZselector **/
	getSimpleInterface: function(){
		var that = this;		
		var nzHtml = '<div id="'+this.id+'_nzselector" class="nzselector ';
			nzHtml +=  'nz_theme_'+this.options.theme ;
		nzHtml +=  ' '+this.selectorClass+'">';
			nzHtml += '<div class="nzselectorheader">'+that.msgdefault+'</div>';
			nzHtml += '<div class="nzselectoroptions" style="display:none;">';
			$.each(that.items_options , function(i ,e){
				if(e.group_cabecera){
          if(!e.default_optgroup){
            nzHtml += '<div class="nzlabel">'+e.group_label+'</div>';
          }else{
            nzHtml += '<div nz_option_id="'+e.value+'" class="nzlabel nzoptgroup nz_optgroup_id_'+e.value+' ';
              if(e.selected == true)  
                nzHtml += 'selected ';
            nzHtml += '">'+e.group_label+'</div>';
          }   
        }        
        if(!e.default_optgroup) {
          nzHtml += '<div nz_option_id="'+e.value+'" class="nzoption nz_option_id_'+e.value+' ';
          if(e.selected == true)  
            nzHtml += 'selected ';
          if(e.disabled == true)
          	nzHtml += 'nzoption_disabled ';         
					nzHtml += '">'+e.text_value+'</div>';		
				}								
			});	
			nzHtml += '</div>';
		nzHtml += '</div>';		
		return nzHtml;		
	},
	/************************************************************************************************************************************/
	getMultipleInterface: function(){
    var that = this;    
    var nzHtml = '<div id="'+this.id+'_nzselector" class="multiple_nzselector nzselector ';
      nzHtml +=  'nz_theme_'+this.options.theme ;
    nzHtml +=  ' '+this.selectorClass+'">';
      nzHtml += '<div class="nzselectoroptions">';
      $.each(that.items_options , function(i ,e){
        if(e.group_cabecera){
          if(!e.default_optgroup){
            nzHtml += '<div class="nzlabel">'+e.group_label+'</div>';
          }else{
            nzHtml += '<div nz_option_id="'+e.value+'" class="nzlabel nzoptgroup nz_optgroup_id_'+e.value+' ';
              if(e.selected == true)  
                nzHtml += 'selected ';
            nzHtml += '">'+e.group_label+'</div>';
          }   
        }        
        if(!e.default_optgroup) {
          nzHtml += '<div nz_option_id="'+e.value+'" class="nzoption nz_option_id_'+e.value+' ';
          if(e.selected == true)  
            nzHtml += 'selected ';
          if(e.disabled == true)
            nzHtml += 'nzoption_disabled ';         
          nzHtml += '">'+e.text_value+'</div>';   
        }               
      }); 
      nzHtml += '</div>';
    nzHtml += '</div>';   
    return nzHtml;    
  },
  /************************************************************************************************************************************/
  getInterfaceDragADropSorteable: function(){
    var that = this;    
    var nzHtml = '<div id="'+this.id+'_nzselector" class="multiple_dragAdrop_nzselector nzselector ';
      nzHtml +=  'nz_theme_'+this.options.theme ;
    nzHtml +=  ' '+this.selectorClass+'">';
      nzHtml += '<div class="nzselectoroptions">';
      $.each(that.items_options , function(i ,e){
        if(e.group_cabecera){
          if(!e.default_optgroup){
            nzHtml += '<div class="nzlabel">'+e.group_label+'</div>';
          }else{
            nzHtml += '<div nz_option_id="'+e.value+'" class="nzlabel nzoptgroup nz_optgroup_id_'+e.value+' ';
              if(e.selected == true)  
                nzHtml += 'selected ';
            nzHtml += '">'+e.group_label+'</div>';
          }   
        }        
        if(!e.default_optgroup && !e.selected) {
          nzHtml += '<div nz_option_id="'+e.value+'" class="nzoption nz_option_id_'+e.value+' ';
          if(e.disabled == true)
            nzHtml += 'nzoption_disabled ';         
          nzHtml += '">'+e.text_value+'   <span style="font-size:8px;"> &gt;&gt</span></div>';   
        }               
      }); 
      nzHtml += '</div><div class="nzselectoroptions_d2d_selected"><label class="nz_ttitle_selected">Elementos seleccionados</label>';
         $.each(that.items_options , function(i ,e){
            if(e.selected == true)  
              nzHtml += '<div nz_option_id="'+e.value+'" class="nzoption nz_option_id_'+e.value+' ">'+e.text_value+'    <span style="font-size:8px;"> &gt;&gt</span><span class="returnmyposition">x</span></div>';   
         });
      nzHtml += '</div>';
    nzHtml += '<hr class="clear"></div>';   
    return nzHtml;    
  },
	/****************************  Recorre los options del select original y crea una array de cada opcion con los atributos necesarios**/
	getOptions: function(){
		var that = this;		
		var arrayGrupo = new Array();
		$(this.item).find('option').each(function(i,e){
			var arrayItem = new Array();
				arrayItem['value'] = e.value; 									// Valor del option
				arrayItem['text_value'] = $(e).html(); 							// Texto que se muestra
				var grupo = $(e).parents('optgroup'); 
        if(grupo.length > 0){
          arrayItem['group_label'] = grupo.attr('label'); // Grupo no que esta
          if( typeof(arrayGrupo[grupo.attr('label')]) == "undefined" ){
            // primer option de grupo
            if($(e).attr('default_optgroup')) {
              arrayGrupo[grupo.attr('label')] = $(e).val();
              arrayItem['group_cabecera'] = grupo.attr('label');
              arrayItem['default_optgroup'] = 1;                  
            }else{
              arrayGrupo[grupo.attr('label')] = null;
              arrayItem['group_cabecera'] = grupo.attr('label');
            }
          }
        }
				if($(e).attr('selected')){  				//Comprueba si el selector no es multiselect y si la opcion esta seleccionada ... si se cumple la condicion coloca el texto en la cabecera y la marca como seleccionada 
					that.msgdefault =  '<div nz_option_id="'+e.value+'" class="nzoption nz_option_id_'+e.value+' selected">'+$(e).html()+'</div>';
					arrayItem['selected'] = true;
				}else{
					arrayItem['selected'] = false;
				}

				if($(e).attr('disabled'))
					arrayItem['disabled'] = true;
				else
					arrayItem['disabled'] = false;			
			var length = that.items_options.length;	
			that.items_options[length] = arrayItem;				
		});
	},
  setOptions: function( options_array ){
    that.items_options = options_array;
  },
	/************************************************************************************************************************************/
	openSelector: function(){
		var that = this;
		$(this.nzitem).find('.nzselectorheader').click(function(){	
			$(that.nzitem).find('.nzselectoroptions').show();			
			that.asignBinds();
		});

    if(this.multiselect)
      that.asignBinds();

	},
	/************************************************************************************************************************************/
	asignBinds: function(){
		var that = this;		
		if(this.items_binds.length == 0){			
			
        if(!this.multiselect){  //BINDS SIMPLE SELECT
          this.items_binds[this.items_binds.length] = $('body').click(function(e){	
    				if($(e.target).parents(that.nzitem).length == 0)
    						that.hideOptions();		
    			});			
    			this.items_binds[this.items_binds.length] = $(this.nzitem).find('.nzoption').not('.nzoption_disabled').click(function(e){				
    				$(that.item).val($(e.target).attr('nz_option_id'));														
    				that.hideOptions();					
    				var nz_element = $(e.currentTarget).clone();
    				$(that.nzitem).find('.nzselectorheader').html(nz_element);				
    				$(that.nzitem).find('.selected').removeClass('selected');	
    				$(e.target).addClass('selected');
    				that.item.trigger("change");
    				that.options.onOptionSelect();														
    			});
    			this.items_binds[this.items_binds.length] = $(this.nzitem).find('.nzoptgroup').click(function(e){        
            $(that.item).val($(e.target).attr('nz_option_id'));                           
            that.hideOptions();                 
            var nz_element = $(e.currentTarget).clone();
            $(that.nzitem).find('.nzselectorheader').html(nz_element);            
            $(that.nzitem).find('.selected').removeClass('selected'); 
            $(e.target).addClass('selected');        
            that.item.trigger("change");
            that.options.onOptionSelect();                            
          });
        }else{ ////BINDS MULTI SELECT
          if(!this.options.dragAdrop){
            /*Seleccionar*/
            this.items_binds[this.items_binds.length] = $(this.nzitem).find('.nzoption').not(".nzoption_disabled").click(function(e){       
              var multiselect_values = $(that.item).val();
              if($(e.target).hasClass('selected')){ // Seleccionado  
                $(e.target).removeClass('selected');
                delete multiselect_values[$.inArray($(e.target).attr('nz_option_id'), multiselect_values)];              
                $(that.item).val(multiselect_values);                                    
                
              }else{
                if(multiselect_values != null)
                  multiselect_values.push($(e.target).attr('nz_option_id'));
                else{
                  multiselect_values = $(e.target).attr('nz_option_id'); 
                }
                $(that.item).val(multiselect_values);                                    
                $(e.target).addClass('selected');
              }
              that.item.trigger("change");
              that.options.onOptionSelect();                            
            });
          }else{//Si es dragAdrop

            this.items_binds[this.items_binds.length] = $(this.nzitem).find('.nzselectoroptions_d2d_selected .returnmyposition').click(function(){
              var selected_values = $(that.item).val();
              delete selected_values[$.inArray($(this).parent().attr('nz_option_id'), selected_values)];                      
              $(that.nzitem).find('.nzselectoroptions').append($(this).parent());
              $(this).remove();
              selected_values.reverse();
              that.orderOptions(selected_values);
              $(that.item).val(selected_values);
            });

            /*BIND OPCIONES SELECCIONADAS*/
            this.items_binds[this.items_binds.length] = $(this.nzitem).find('.nzselectoroptions_d2d_selected').sortable({
              cancel:".nzoption_disabled",
              cursor: "move",
              distance: 5,
              items: "> div.nzoption" ,
              opacity: 0.5,
              receive: function( event, ui ) {   
                ui.item.append('<span class="returnmyposition">x</span>');
                $(ui.item).find('.returnmyposition').click(function(){
                  /*Se desselecciona*/
                  var selected_values = $(that.item).val();
                  delete selected_values[$.inArray($(this).parent().attr('nz_option_id'), selected_values)];                      
                  $(that.nzitem).find('.nzselectoroptions').append($(this).parent());
                  $(this).remove();
                  selected_values.reverse();
                  that.orderOptions(selected_values);
                   $(that.item).val(selected_values);

                });              
              },
              update: function(){
                /*Se selecciona todos los elementos y se ordenan*/
                  var ordenElementos = $(this).sortable("toArray", {attribute: 'nz_option_id'} );
                  ordenElementos.reverse();
                  that.orderOptions(ordenElementos);
                  $(that.item).val(ordenElementos);
              }
            }).disableSelection();


            /*BIND OPCIONES*/
            this.items_binds[this.items_binds.length] = $(this.nzitem).find('.nzselectoroptions').sortable({
              connectWith:".nzselectoroptions_d2d_selected,",
              appendTo: ".nzselectoroptions_d2d_selected",
              cancel:".nzoption_disabled",
              cursor: "move",
              distance: 5,
              items: "> div.nzoption" ,
              opacity: 0.5
            }).disableSelection();
 
         
          } 
        }
	 	

    }
	},
  /************************************************************************************************************************************/
  orderOptions: function(ordenElementos){
    var that = this;
    $.each(ordenElementos, function(i, el){
      $(that.item).find('option').each(function(indx, elm){
        if(el == elm.value)
          $(that.item).prepend(elm);
      });
    });

  },
	/************************************************************************************************************************************/
	destroyBinds: function(){
		$.each( this.items_binds, function(index, elem){
			$(elem).unbind();
		});	
		this.items_binds = [];
	},
	/************************************************************************************************************************************/
	hideOptions: function(){
			$(this.nzitem).find('.nzselectoroptions').hide();
			this.destroyBinds();
	}
	/************************************************************************************************************************************/
});
