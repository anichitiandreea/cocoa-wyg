/*** WYSIWYG EDITOR ***/

var editorModule = (function () {
 	function completePreview() {
 		var text = document.getElementById("textarea");
 		var preview = document.getElementById("preview");
 		preview.innerHTML = text.innerHTML;
 	}

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

	function enableBold() {
		editorModule.preventDefaultClick();
		var bold = document.getElementById("bold");

		if(!bold.classList.contains("disabledButton")) {
			document.execCommand('bold');
			checkPreviousState(bold);
		}
	}

	function enableItalic() {
		editorModule.preventDefaultClick();
		var italic = document.getElementById("italic");

		if(!italic.classList.contains("disabledButton")) {
			document.execCommand('italic');
			checkPreviousState(italic);
		}
	}

	function enableUnderline() {
		editorModule.preventDefaultClick();
		var underline = document.getElementById("underline");

		if(!underline.classList.contains("disabledButton")) {
			document.execCommand('underline');
			checkPreviousState(underline);
		}
	}

	function enableBulleted() {
		editorModule.preventDefaultClick();
		var bullet = document.getElementById("bullet");

		if(!bullet.classList.contains("disabledButton")) {
			document.execCommand('insertUnorderedList', false, null);
			checkPreviousState(bullet);
		}
	}

	function enableNumbered() {
		editorModule.preventDefaultClick();
		var numbered = document.getElementById("numbered");

		if(!numbered.classList.contains("disabledButton")) {
			document.execCommand('insertOrderedList', false, null);
			checkPreviousState(numbered);
		}
	}

	function checkPreviousState(element) {
		if(!element.classList.contains("item-active")) {
			element.classList.add("item-active");
		}
		else {
			element.classList.remove("item-active");
		}
	}

	function checkButtonsActive(target) {
		var bold = document.getElementById("bold");
		var italic = document.getElementById("italic");
		var underline = document.getElementById("underline");
		var bullet = document.getElementById("bullet");
		var numbered = document.getElementById("numbered");

		checkClickedElement(target, "B", bold);
		checkClickedElement(target, "I", italic);
		checkClickedElement(target, "U", underline);

		checkClickedULElement(target, "LI", bullet);
		checkClickedOLElement(target, "LI", numbered);
	}

	function checkClickedElement(target, tagName, element) {
		var ok = 1;
		if(target.tagName == tagName) {
			element.classList.add("item-active");
			ok = 0;
		}

	    if(target.firstChild.tagName == tagName) {
	    	element.classList.add("item-active");
	    	ok = 0;
	    }

	    var copyTarget = target;

		while(copyTarget.parentNode && copyTarget.parentNode.tagName !=="BODY") {
		    copyTarget = copyTarget.parentNode;
		    if(copyTarget.tagName == tagName) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
	    }

	    if(!target.classList.contains("textarea-content") && ok == 1) {
			element.classList.remove("item-active");
		}
	}

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

	function getCaretPosition(e) {
	  	var range, textNode, offset;

	  	if (document.caretPositionFromPoint) {
	    	range = document.caretPositionFromPoint(e.clientX, e.clientY);
	    	textNode = range.offsetNode;
	    	offset = range.offset;
	  	} else if (document.caretRangeFromPoint) {
	    	range = document.caretRangeFromPoint(e.clientX, e.clientY);
	    	textNode = range.startContainer;
	    	offset = range.startOffset;
	  	}

	 	return textNode.parentElement;
	}

	function activateButtons() {
		var textarea = document.getElementById("textarea");

		textarea.addEventListener("click", function (event) {
			event = event || window.event;
	    	var target = event.target || event.srcElement;
	        var caretPosition = getCaretPosition(event);

	        checkButtonsActive(caretPosition);
		});
	}

	function completeTextarea() {
		document.getElementById("submit-button").addEventListener('click', function(e) {
	        currentText = document.getElementById("textarea").innerHTML;
	        document.getElementById("textarea-real").innerHTML = currentText;
	    });
	}

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
			hidePanel(e);
		});
	}

	function toggleLinkContainer() {
		let linkContainer = document.getElementById("insert-link");
		if(linkContainer.classList.contains("display")) {
			linkContainer.classList.remove("display");
		}
		else if(!document.getElementById("link").classList.contains("disabledButton")) {
			linkContainer.classList.add("display");
		}
	}

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

	function hidePanel(e) {
		let linkContainer = document.getElementById("insert-link"),
			linkButton = document.getElementById("link");
		if(linkButton !== e.srcElement.closest("#link") && linkContainer !== e.srcElement.closest("#insert-link")) {
			linkContainer.classList.remove("display");
		}
	}

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
		activateButtons: activateButtons
	};

})();

/*** WYSIWYG EDITOR END ***/
