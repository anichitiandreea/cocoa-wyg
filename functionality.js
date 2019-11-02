/*** WYSIWYG EDITOR ***/

var editorModule = (function () {

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
		if(!document.getElementById("bold").classList.contains("disabledButton")) {
			document.execCommand('bold');
		}
	}

	function enableItalic() {
		if(!document.getElementById("italic").classList.contains("disabledButton")) {
			document.execCommand('italic');
		}
	}

	function enableUnderline() {
		if(!document.getElementById("underline").classList.contains("disabledButton")) {
			document.execCommand('underline');
		}
	}

	function enableBulleted() {
		if(!document.getElementById("bullet").classList.contains("disabledButton")) {
			document.execCommand('insertUnorderedList', false, null);
		}
	}

	function enableNumbered() {
		if(!document.getElementById("numbered").classList.contains("disabledButton")) {
			document.execCommand('insertOrderedList', false, null);
		}
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
	    createA.appendChild(createAText);	

	    let displayText = "<a href='" + url + "'>" + text + "</a>";

		document.getElementById("insert-link").classList.remove("display");
		let textarea = document.getElementById("textarea");
		if(container.id == "textarea" || container.parentNode.closest("#textarea")) {
			range.insertNode(createA);
			createA.after( document.createTextNode("\u00A0") )	;
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
		disableTextareaButtons: disableTextareaButtons
	};

})();

/*** WYSIWYG EDITOR END ***/
