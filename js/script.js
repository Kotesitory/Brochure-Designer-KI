//Edit events
 		/*function saveEdits() {

			//get the editable element
			var editElem = document.getElementById("edit");

			//get the edited element content
			var userVersion = editElem.innerHTML;

			//save the content to local storage
			localStorage.userEdits = userVersion;

			//write a confirmation to the user
			document.getElementById("update").innerHTML="Edits saved!";

		}

		function checkEdits() {

			//find out if the user has previously saved edits
			if(localStorage.userEdits!=null)
			document.getElementById("edit").innerHTML = localStorage.userEdits;
		}*/

		let dm_empty = [];
		let ids = 0;
		let lastFocus;
		let fontSizeUpLimit = 100;
		let fontSizeDownLimit = 10;

		var colorPicker = new iro.ColorPicker('#color-picker-container', {width: 150});
		function onColorChange(color, changes) {	
  			let radios = document.getElementsByName('target');	
  			let val;	
  			for(var i = 0; i < radios.length; i++){	
  				if(radios[i].checked)	
  					val = radios[i].value;	
  			}	
  			if(lastFocus != null){	
  				if(val == 0)	
  					lastFocus.style.color = color.hexString;	
  				else if(val == 1)	
  					lastFocus.style.background = color.hexString;	
  			}	
		}

		colorPicker.on('color:change', onColorChange);

		function setInputFilter(textbox, inputFilter) {
		  	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
		    	textbox.addEventListener(event, function() {
			      	if (inputFilter(this.value)) {
			        	this.oldValue = this.value;
			        	this.oldSelectionStart = this.selectionStart;
			        	this.oldSelectionEnd = this.selectionEnd;
			      	} else if (this.hasOwnProperty("oldValue")) {
			        	this.value = this.oldValue;
			        	this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			      	}
			    	});
		  	});
		}
		function drag_start(event) {
			var target = event.target;
			if(event.target.classList.contains("image")) target = event.target.parentNode;
		    var style = window.getComputedStyle(target, null);
		    var bodyRect = document.body.getBoundingClientRect();
    		var elemRect = target.getBoundingClientRect();
    		var height   = elemRect.top - bodyRect.top;
    		var width   = elemRect.left - bodyRect.left;
		    event.dataTransfer.setData("text/plain", (width - event.clientX) + ',' + (height - event.clientY) + ',' + target.id);
		} 
		function drag_over(event) { 
		    event.preventDefault(); 
		    return false; 
		} 
		function drop(event) { 
		    var offset = event.dataTransfer.getData("text/plain").split(',');
		    var dm = document.getElementById(offset[2]);
		    if(dm == null){
		    	return;
		    }
		    if(dm.classList.contains("image")) 
		    	dm = dm.parentNode;
		    var bodyRect = document.body.getBoundingClientRect();
		    var elemRect;
		    if(event.target.classList.contains("dragme")){
		    	elemRect = event.target.parentElement.getBoundingClientRect();
		    	event.target.parentElement.appendChild(dm);
		    }else if(event.target.classList.contains("image")){
		    	elemRect = event.target.parentNode.parentNode.getBoundingClientRect();
		    	event.target.parentElement.parentElement.appendChild(dm);
		    }else{
		    	elemRect = event.target.getBoundingClientRect();
		    	event.target.appendChild(dm);
		    }
    		var height   = elemRect.top - bodyRect.top;
    		var width   = elemRect.left - bodyRect.left;
		    dm.style.left = (event.clientX + parseInt(offset[0], 10) - width) + 'px';
		    dm.style.top = (event.clientY + parseInt(offset[1], 10) - height) + 'px';
		    
		    event.preventDefault();
		    return false;
		}
		function closeImage(event){
			event.stopPropagation();
			var div = event.target.parentElement;
			div.parentElement.removeChild(div);
		}
		function addTextBox(event){
			var dragable = document.createElement('div');
			dragable.draggable = true;
			dragable.classList.add('dragme');
			dragable.classList.add('text-box');
			dragable.appendChild(document.createTextNode('Enter Text...'));
			dragable.id = ids;
			dm_empty[ids] = true;
			ids++;
			dragable.addEventListener('dragstart', drag_start, false);
			dragable.addEventListener('dblclick', focusText, false);
			dragable.addEventListener('click', function(event){event.stopPropagation();}, false);
			dragable.addEventListener('blur', blurText, false);
			document.getElementById('working-area').appendChild(dragable);
		}
		function focusText(event){
			event = event || window.event;
			let elem = event.target;
			let index = parseInt(elem.id);
			lastFocus = this;
			var style = window.getComputedStyle(elem, null).getPropertyValue('font-size');
			var fontSize = parseInt(style);
			document.getElementById('font-size').value = fontSize; 
			if(dm_empty[index]){
				elem.innerHTML = "";
				elem.style.color = "black";
				dm_empty[index] = false;
			}
			elem.contentEditable = true;
			elem.focus();
			return false;
		}
		function blurText(event){
			event = event || window.event;
			var index = parseInt(event.target.id);
		    event.target.contentEditable = false;
		    if(event.target.innerHTML === ""){
		    	event.target.innerHTML = "Enter Text..."
		    	event.target.style.color = "gray";
		    	dm_empty[index] = true;
		    }
		    //document.getElementById('font-size').value = '';
		    return false;
		}
		function addImage(event){
			let div = document.createElement('div');
			div.draggable = true;
			let img = document.createElement('img');
			if(document.getElementById('preview') == null){
				return;
			}
			img.src = document.getElementById('preview').src;
			img.classList.add('image');
			let value = event.target.getAttribute('value', 0);
			if(value == 2){
				img.classList.add('rounded-image');
			}
			if(value == 3){
				img.classList.add('circle-image');
			}
			div.classList.add('dragme');
			div.classList.add('image-box');
			div.id = ids;
			dm_empty[ids] = false;
			ids++;
			let span = document.createElement('span');
			span.innerHTML = '&#10006;';
			span.classList.add('close');
			span.addEventListener('click', closeImage, false);
			div.appendChild(span);
			div.appendChild(img);
			div.addEventListener('dragstart', drag_start, true);
			div.addEventListener('click', hide, false);
			document.getElementById('working-area').appendChild(div);
		}
		function layout(event){
			let div;
			let iter = event.target.getAttribute('value', 0);
			let workingArea = document.getElementById('working-area');
			while(workingArea.hasChildNodes()){
				workingArea.removeChild(workingArea.lastChild);
			}
			var brochure;
			for(let j = 0; j < 2; j++){
				if(iter != 1 || j != 1){
					brochure = document.createElement('div');
					brochure.classList.add('brochure' + iter);
					workingArea.appendChild(brochure);
				}
				var side = (j == 0)?'front' : 'back';
				for(let i = 0; i < iter; i++){
					div = document.createElement('div');
					div.id = 'area' + (j*iter + i);
					div.classList.add('drag-area' + iter);
					div.classList.add('drag-area');
					div.classList.add('drag-area-' + side);
					div.addEventListener('dragover',drag_over,false); 
					div.addEventListener('drop',drop,false);
					brochure.appendChild(div);
				}
			}
		}
		function hide(event){
			let span = event.target.children[0];
			if(span.classList.contains('hidden'))
				span.classList.remove('hidden');
			else
				span.classList.add('hidden');
		}
		function readURL(input) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	            	let img = document.createElement('img');
	                img.src = e.target.result;
	                img.id = 'preview';
					img.width = 150
	                img.height = 200;
	                let div = document.getElementById('img-preview');
	                while(div.hasChildNodes()){
						div.removeChild(div.lastChild);
					}
	                div.appendChild(img);
	            };

	            reader.readAsDataURL(input.files[0]);
	        }
	    }
	    function sizeDownFont(event){
	    	if(document.getElementById('font-size').value > fontSizeDownLimit){
		    	document.getElementById('font-size').value--;
		    	resizeFont(event);
		    }
	    }
	    function sizeUpFont(event){
	    	if(document.getElementById('font-size').value < fontSizeUpLimit){
		    	document.getElementById('font-size').value++;
		    	resizeFont(event);
		    }
	    }
	    function resizeFont(event){
	    	if(event)
	    		event.stopPropagation();
	    	if(lastFocus){
	    		if(document.getElementById('font-size').value < fontSizeDownLimit){
	    			document.getElementById('font-size').value = fontSizeDownLimit;
	    		}
	    		let fontS = document.getElementById('font-size').value;
	    		lastFocus.style.fontSize = fontS + 'px';
	    		setTimeout(function() {lastFocus.contentEditable = true; lastFocus.focus();}, 10);
	    	}
	    	return false;
	    }
	    function boldFont(event){
			event.stopPropagation();
			if(lastFocus != null){
				let bold = window.getComputedStyle(lastFocus, null).getPropertyValue('font-weight');
				if(bold == 400){
					lastFocus.style.fontWeight = 'bold';
				}
				else{
					lastFocus.style.fontWeight = 'normal';
				}
			}
		}
		function italicFont(event){
			event.stopPropagation();
			if(lastFocus != null){
				let italic = window.getComputedStyle(lastFocus, null).getPropertyValue('font-style');
				if(italic === 'normal'){
					lastFocus.style.fontStyle = 'italic';
				}
				else{
					lastFocus.style.fontStyle = 'normal';
				}
			}
		}
	    function setBgImage(input, side){
	    	if (input.files && input.files[0]) {
	            var reader = new FileReader();
	            reader.onload = function (e) {
	            	var drag_areas = document.getElementsByClassName('drag-area-' + side);
	    			for(var i = 0; i < drag_areas.length; i++){
	    				drag_areas[i].style.backgroundImage = 'url(' + e.target.result + ')';
	    			}
	            };

	            reader.readAsDataURL(input.files[0]);
	        }	
	    }
	    function saveBrochure(event){
			var worker = html2pdf().from(document.getElementById('working-area')).save();
	    }
		window.onload = function(){ 
			document.getElementById('addText').addEventListener('click', addTextBox, false);
			let btns = document.getElementsByClassName('addImage');
			for(var i = 0; i < btns.length; i++){
				btns[i].addEventListener('click', addImage, false);
			}
			document.getElementById('one-part').addEventListener('click', layout, false);
			document.getElementById('two-part').addEventListener('click', layout, false);
			document.getElementById('three-part').addEventListener('click', layout, false);
			document.body.addEventListener('keydown', function(e) {
    			if(e.key == "Escape"){
    				document.activeElement.blur();
    			}
    			if(e.key == "Delete"){
    				if(document.activeElement.classList.contains("dragme"))
    				document.activeElement.parentNode.removeChild(document.activeElement);
    			}
			});
			setInputFilter(document.getElementById("font-size"), function(value) {
  				return /^\d*$/.test(value) && (value === "" || (parseInt(value) <= fontSizeUpLimit));
			});
		}