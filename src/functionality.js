/*** WYSIWYG EDITOR ***/

var editorModule = (function () {
	/* Complete preview with the text from the Editor */
 	function completePreview() {
 		var text = document.getElementById("textarea");
 		var preview = document.getElementById("preview");
 		preview.innerHTML = text.innerHTML;
 	}

 	/* Prevent the current click to follow the link path */
	function preventDefaultClick() {
		$('#bold').bind('mousedown',function(e)
	    {
	        e.preventDefault();
	    });

	    $('#italic').bind('mousedown',function(e)
	    {
	        e.preventDefault();
	    });

	    $('#underline').bind('mousedown',function(e)
	    {
	        e.preventDefault();
	    });

	    $('#bullet').bind('mousedown',function(e)
	    {
	        e.preventDefault();
	    });

	    $('#numbered').bind('mousedown',function(e)
	    {
	        e.preventDefault();
	    });
	}

	/* Enable bold for the typed text */
	function enableBold() {
		editorModule.preventDefaultClick();
		var bold = document.getElementById("bold");

		if(!bold.classList.contains("disabledButton")) {
			document.execCommand('bold');
			checkPreviousState(bold);
		}
	}

	/* Enable italic for the typed text */
	function enableItalic() {
		editorModule.preventDefaultClick();
		var italic = document.getElementById("italic");

		if(!italic.classList.contains("disabledButton")) {
			document.execCommand('italic');
			checkPreviousState(italic);
		}
	}

	/* Enable underline for the typed text */
	function enableUnderline() {
		editorModule.preventDefaultClick();
		var underline = document.getElementById("underline");

		if(!underline.classList.contains("disabledButton")) {
			document.execCommand('underline');
			checkPreviousState(underline);
		}
	}

	/* Enable buleted list for the typed text */
	function enableBulleted() {
		editorModule.preventDefaultClick();
		var bullet = document.getElementById("bullet");

		if(!bullet.classList.contains("disabledButton")) {
			document.execCommand('insertUnorderedList', false, null);
			checkPreviousState(bullet);
		}
	}

	/* Enable numbered list for the typed text */
	function enableNumbered() {
		editorModule.preventDefaultClick();
		var numbered = document.getElementById("numbered");

		if(!numbered.classList.contains("disabledButton")) {
			document.execCommand('insertOrderedList', false, null);
			checkPreviousState(numbered);
		}
	}

	function completeWithColor() {
		var colorPalete = document.getElementById("color-palete");
		var currentColor = document.getElementById("hex-color");
		colorPalete.classList.remove("display");
	}

	/* Check if the button is activated */
	function checkPreviousState(element) {
		if(!element.classList.contains("item-active")) {
			element.classList.add("item-active");
		}
		else {
			element.classList.remove("item-active");
		}
	}

	/* Check for every click if the current cursor position is inside bold, italic, etc;*/ 
	function checkButtonsActive(target) {
		var bold = document.getElementById("bold");
		var italic = document.getElementById("italic");
		var underline = document.getElementById("underline");
		var bullet = document.getElementById("bullet");
		var numbered = document.getElementById("numbered");

		checkBoldElement(target, "B", bold, "bold");
		checkItalicElement(target, "I", italic, "italic");
		checkUnderlineElement(target, "U", underline, "underline");

		checkClickedULElement(target, "LI", bullet);
		checkClickedOLElement(target, "LI", numbered);
	}

	/* Check if the target clicked is B, I, DIV etc;
	   If it is true than activate the coresponding button, else disable it */
	function checkBoldElement(target, tagName, element, fontWeight) {
		var ok = 1;
		console.log(target.style.fontWeight);
		console.log(target);
		if(target.style.fontWeight == fontWeight) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the curent target element
		if(target.tagName == tagName) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the first child of target
	    if(target.firstChild.tagName == tagName) {
	    	element.classList.add("item-active");
	    	ok = 0;
	    }

	    if(target.firstChild != null && target.firstChild.nodeType != 3) {
		    if(target.firstChild.style.fontWeight == fontWeight) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
		}

	    var copyTarget = target;

	    // Iterate all the parents of clicked element
		while(copyTarget.parentNode && copyTarget.parentNode.tagName !== "BODY") {
		    copyTarget = copyTarget.parentNode;
		    if(copyTarget.tagName == tagName || copyTarget.style.fontWeight == fontWeight) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
	    }

	    // If none of the targets match the curent tag name than remove the activated button color
	    if(!target.classList.contains("textarea-content") && ok == 1) {
			element.classList.remove("item-active");
		}
	}

	/* Check if the target clicked is B, I, DIV etc;
	   If it is true than activate the coresponding button, else disable it */
	function checkItalicElement(target, tagName, element, fontStyle) {
		var ok = 1;
		console.log(target.style.fontStyle);
		if(target.style.fontStyle == fontStyle) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the curent target element
		if(target.tagName == tagName) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the first child of target
	    if(target.firstChild.tagName == tagName) {
	    	element.classList.add("item-active");
	    	ok = 0;
	    }

	    if(target.firstChild != null && target.firstChild.nodeType != 3) {
		    if(target.firstChild.style.fontStyle == fontStyle) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
		}

	    var copyTarget = target;

	    // Iterate all the parents of clicked element
		while(copyTarget.parentNode && copyTarget.parentNode.tagName !== "BODY") {
		    copyTarget = copyTarget.parentNode;
		    if(copyTarget.tagName == tagName || copyTarget.style.fontStyle == fontStyle) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
	    }

	    // If none of the targets match the curent tag name than remove the activated button color
	    if(!target.classList.contains("textarea-content") && ok == 1) {
			element.classList.remove("item-active");
		}
	}

	/* Check if the target clicked is B, I, DIV etc;
	   If it is true than activate the coresponding button, else disable it */
	function checkUnderlineElement(target, tagName, element, textDecoration) {
		var ok = 1;
		console.log(target.style.textDecoration);
		if(target.style.textDecoration == textDecoration) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the curent target element
		if(target.tagName == tagName) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the first child of target
	    if(target.firstChild.tagName == tagName) {
	    	element.classList.add("item-active");
	    	ok = 0;
	    }

	    if(target.firstChild != null && target.firstChild.nodeType != 3) {
		    if(target.firstChild.style.textDecoration == textDecoration) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
		}

	    var copyTarget = target;

	    // Iterate all the parents of clicked element
		while(copyTarget.parentNode && copyTarget.parentNode.tagName !== "BODY") {
		    copyTarget = copyTarget.parentNode;
		    if(copyTarget.tagName == tagName || copyTarget.style.textDecoration == textDecoration) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
	    }

	    // If none of the targets match the curent tag name than remove the activated button color
	    if(!target.classList.contains("textarea-content") && ok == 1) {
			element.classList.remove("item-active");
		}
	}

	/* Check if the target clicked is an UL element etc;
	   If it is true than activate the coresponding button, else disable it */
	function checkClickedULElement(caretPosition, tagName, element) {
		if(caretPosition.tagName == tagName && caretPosition.closest("ul") != null) {
        	element.classList.add("item-active");
        }
        else if(!caretPosition.classList.contains("textarea-content")) {
        	element.classList.remove("item-active");
        }

        while(caretPosition.parentNode && caretPosition.parentNode.tagName !=="BODY") {
		    caretPosition = caretPosition.parentNode;
		    if(caretPosition.tagName == tagName && caretPosition.closest("ul") != null) {
		    	element.classList.add("item-active");
		    }
	    }
	}

	/* Check if the target clicked is an OL etc;
	   If it is true than activate the coresponding button, else disable it */
	function checkClickedOLElement(caretPosition, tagName, element) {
		if(caretPosition.tagName == tagName && caretPosition.closest("ol") != null) {
        	element.classList.add("item-active");
        }
        else if(!caretPosition.classList.contains("textarea-content")) {
        	element.classList.remove("item-active");
        }

        while(caretPosition.parentNode && caretPosition.parentNode.tagName !=="BODY") {
		    caretPosition = caretPosition.parentNode;
		    if(caretPosition.tagName == tagName && caretPosition.closest("ol") != null) {
		    	element.classList.add("item-active");
		    }
	    }
	}

	/* Get the element at the position of the caret */
	function getCaretPosition(e) {
	  	var range, textNode, offset;

	  	if (document.caretPositionFromPoint) {
	    	range = document.caretPositionFromPoint(e.clientX, e.clientY);
	    	textNode = range.offsetNode;
	  	} else if (document.caretRangeFromPoint) {
	    	range = document.caretRangeFromPoint(e.clientX, e.clientY);
	    	textNode = range.startContainer;
	  	}

	 	return textNode.parentElement;
	}

	/* Call the function which activate the buttons on every click */
	function activateButtons() {
		var textarea = document.getElementById("textarea");

		textarea.addEventListener("click", function (event) {
			event = event || window.event;
	    	var target = event.target || event.srcElement;
	        var caretPosition = getCaretPosition(event);

	        checkButtonsActive(caretPosition);
		});
	}

    // old
	function completeTextarea() {
		document.getElementById("submit-button").addEventListener('click', function(e) {
	        currentText = document.getElementById("textarea").innerHTML;
	        document.getElementById("textarea-real").innerHTML = currentText;
	    });
	}

	function enableTextColor(range, color) {
		var colorPalete = document.getElementById("color-palete");
		colorPalete.classList.remove("display");
		restoreRangePosition();
		document.execCommand('styleWithCSS', false, true);
	   	document.execCommand('foreColor', false, color);
	}

	function changeColor() {
		let range = null;
		document.getElementById("text-color").addEventListener('click', function(e) {
			toggleColorContainer();
			range = saveSelection();
			console.log(range)
			saveRangePosition();
		});

		document.getElementById("insert-hex").addEventListener('click', function(e) {
			enableTextColor(range, document.getElementById("hex-color").value);
		});

		document.addEventListener('click', function(e) {
			hidePanel(e, "text-color", "color-palete");		});
	}

	function completeColor(color) {
		document.getElementById("hex-color").value = color;
		var colorPalete = document.getElementById("color-palete");
		colorPalete.classList.remove("display");
		restoreRangePosition();
		document.execCommand('styleWithCSS', false, true);
	   	document.execCommand('foreColor', false, color);
	}

	/* Add link pipeline */
	function addLink() {
		let range = null;
		document.getElementById("link").addEventListener('click', function(e) {
			toggleLinkContainer();
			range = saveSelection();
		});

		document.getElementById("insert").addEventListener('click', function(e) {
			insertLink(range, range.startContainer);
		});

		document.addEventListener('click', function(e) {
			hidePanel(e, "link", "insert-link");
		});
	}

	/* Show link panel */
	function toggleLinkContainer() {
		let linkContainer = document.getElementById("insert-link");
		if(linkContainer.classList.contains("display")) {
			linkContainer.classList.remove("display");
		}
		else if(!document.getElementById("link").classList.contains("disabledButton")) {
			linkContainer.classList.add("display");
		}
	}

	/* Insert link in the Editor */
	function insertLink(range, container) {
		let url = document.getElementById("url").value,
			text = document.getElementById("text").value;

		document.getElementById("text").value = "";
		document.getElementById("url").value = "";

		let createA = document.createElement('a'),
		    createAText = document.createTextNode(text);
	    createA.setAttribute('href', url);
	    createA.setAttribute('id', 'myUrl');
	    createA.appendChild(createAText);	

	    let displayText = "<a href='" + url + "' id='myUrl'>" + text + "</a>";

		document.getElementById("insert-link").classList.remove("display");
		let textarea = document.getElementById("textarea");

		if(container.id == "textarea" || container.parentNode.closest("#textarea")) {
			range.insertNode(createA);
			createA.after( document.createTextNode("\u00A0") );
		}
		else {
			document.getElementById("textarea").innerHTML += displayText;
			document.getElementById("textarea").innerHTML += '&nbsp;';
		}		
	}

	/* Save the current position of the caret */
	function saveSelection() {
	    if (window.getSelection) {
	        sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            return sel.getRangeAt(0);
	        }
	    } 
	    else if (document.selection && document.selection.createRange) {
	        return document.selection.createRange();
	    }

	    return null;
	}

	function saveRangePosition()
	  {
	  	var bE = document.getElementById("textarea");
	  var range=window.getSelection().getRangeAt(0);
	  var sC=range.startContainer,eC=range.endContainer;

	  A=[];while(sC!==bE){A.push(getNodeIndex(sC));sC=sC.parentNode}
	  B=[];while(eC!==bE){B.push(getNodeIndex(eC));eC=eC.parentNode}

	  window.rp={"sC":A,"sO":range.startOffset,"eC":B,"eO":range.endOffset};
	  }

	  function restoreRangePosition()
	  {
	  	var bE = document.getElementById("textarea");
	  bE.focus();
	  var sel=window.getSelection(),range=sel.getRangeAt(0);
	  var x,C,sC=bE,eC=bE;

	  C=rp.sC;x=C.length;while(x--)sC=sC.childNodes[C[x]];
	  C=rp.eC;x=C.length;while(x--)eC=eC.childNodes[C[x]];

	  range.setStart(sC,rp.sO);
	  range.setEnd(eC,rp.eO);
	  sel.removeAllRanges();
	  sel.addRange(range)
	  }

	function getNodeIndex(n){var i=0;while(n=n.previousSibling)i++;return i}


	/* Close link panel when you click on insert button or inside panel */
	function hidePanel(e, button, container) {
		let linkContainer = document.getElementById(container),
			linkButton = document.getElementById(button);
		if(linkButton !== e.srcElement.closest("#" + button) && linkContainer !== e.srcElement.closest("#" + container)) {
			linkContainer.classList.remove("display");
		}
	}

	/* Disable the buttons when the click is outside Editor */
	function disableTextareaButtons() {
		document.addEventListener('click', function(e) {
			let textarea = document.getElementById("textarea"),
			    editor = document.getElementById("editor-menu"),
			    buttons = editor.getElementsByTagName("button");

			if(textarea !== e.srcElement.closest("#textarea")) {
				if(editor !== e.srcElement.closest("#editor-menu")) {
					for(var i = 0; i <= buttons.length; i++) {
						buttons[i].classList.add("disabledButton");
						buttons[i].classList.remove("item-active");
					}
				}
			}
			else {
				for(var i = 0; i <= buttons.length; i++) {
					buttons[i].classList.remove("disabledButton");
				}
			}
		});
	}

	/* Show color palete panel */
	function toggleColorContainer() {
		let linkContainer = document.getElementById("color-palete");
		if(linkContainer.classList.contains("display")) {
			linkContainer.classList.remove("display");
		}
		else if(!document.getElementById("text-color").classList.contains("disabledButton")) {
			linkContainer.classList.add("display");
		}
	}

	return {
		preventDefaultClick: preventDefaultClick,
		enableBold: enableBold,
		enableItalic: enableItalic,
		enableUnderline: enableUnderline,
		enableBulleted: enableBulleted,
		enableNumbered: enableNumbered,
		completeTextarea: completeTextarea,
		addLink: addLink,
		disableTextareaButtons: disableTextareaButtons,
		completePreview: completePreview,
		checkButtonsActive: checkButtonsActive,
		activateButtons: activateButtons,
		changeColor: changeColor,
		enableTextColor: enableTextColor,
		completeColor: completeColor
	};

})();

/*** WYSIWYG EDITOR END ***/
