/*** WYSIWYG EDITOR ***/

export class Editor {
	constructor(selector) {
		this.selector = selector;
		this.buildEditor();
		this.preventDefaultClick();
		this.disableTextareaButtons();
		this.activateButtons();
		this.addLink();
		//this.changeColor();
	}

	buildEditor() {
		const editor = document.createElement('div');
		editor.innerHTML = `
		<div style="display: flex;flex-direction: column;justify-content: center;align-items: center;height: 100%;">
	        <div class="textarea-content">
	            <div class="textarea-menu" id="editor-menu">
	                <ul class="textarea-ul">
	                    <li><button onclick="editor.enableBold();" class="disabledButton" type="button" id="bold" title="Bold"><i class="fas fa-bold"></i></button></li>
	                    <li><button onclick="editor.enableItalic();" class="disabledButton" type="button" id="italic" title="Italic"><i class="fas fa-italic"></i></button></li>
	                    <li><button onclick="editor.enableUnderline();" class="disabledButton" id="underline" type="button" title="Underline"><i class="fas fa-underline"></i></button></li>
	                    <li><button onclick="editor.enableBulleted();" class="disabledButton" id="bullet" type="button" title="Bulleted list"><i class="fas fa-list"></i></button></li>
	                    <li><button onclick="editor.enableNumbered();" class="disabledButton" id="numbered" type="button" title="Numbered list"><i class="fas fa-list-ol"></i></button></li>
	                    <li>
	                        <button type="button" class="hyperlink disabledButton" title="Hyperlink" id="link"><i class="fas fa-link"></i></button>
	                        <div id="insert-link">
	                            <input type="text" placeholder="URL" id="url" autocomplete="off" class="link-input">
	                            <input type="text" placeholder="Text" id="text" autocomplete="off" class="link-input" style="margin-bottom: 0;">
	                            <div class="submit" style="width: 100%;">
	                                <input type="button" value="Insert" id="insert">
	                            </div>
	                        </div>
	                    </li>
	                </ul>
	            </div>
	            <div id="textarea" spellcheck="false" contentEditable=true class="description" data-text="Description" style="outline: none;"></div>
	            <textarea id="textarea-real" name="details" style="display: none;"></textarea>
	        </div>
	    </div>`;

		var textarea = document.getElementById(this.selector);

		textarea.parentNode.replaceChild(editor, textarea);
	}

	/* Complete preview with the text from the Editor */
 	completePreview() {
 		var text = document.getElementById("textarea");
 		var preview = document.getElementById("preview");
 		preview.innerHTML = text.innerHTML;
 	}

 	/* Prevent the current click to follow the link path */
	preventDefaultClick() {
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
	enableBold() {
		this.preventDefaultClick();
		var bold = document.getElementById("bold");

		if (!bold.classList.contains("disabledButton")) {
			document.execCommand('bold');
			this.checkPreviousState(bold);
		}
	}

	/* Enable italic for the typed text */
	enableItalic() {
		this.preventDefaultClick();
		var italic = document.getElementById("italic");

		if (!italic.classList.contains("disabledButton")) {
			document.execCommand('italic');
			this.checkPreviousState(italic);
		}
	}

	/* Enable underline for the typed text */
	enableUnderline() {
		this.preventDefaultClick();
		var underline = document.getElementById("underline");

		if (!underline.classList.contains("disabledButton")) {
			document.execCommand('underline');
			this.checkPreviousState(underline);
		}
	}

	/* Enable buleted list for the typed text */
	enableBulleted() {
		this.preventDefaultClick();
		var bullet = document.getElementById("bullet");

		if (!bullet.classList.contains("disabledButton")) {
			document.execCommand('insertUnorderedList', false, null);
			this.checkPreviousState(bullet);
		}
	}

	/* Enable numbered list for the typed text */
	enableNumbered() {
		this.preventDefaultClick();
		var numbered = document.getElementById("numbered");

		if (!numbered.classList.contains("disabledButton")) {
			document.execCommand('insertOrderedList', false, null);
			this.checkPreviousState(numbered);
		}
	}

	completeWithColor() {
		var colorPalete = document.getElementById("color-palete");
		var currentColor = document.getElementById("hex-color");
		colorPalete.classList.remove("display");
	}

	/* Check if the button is activated */
	checkPreviousState(element) {
		if (!element.classList.contains("item-active")) {
			element.classList.add("item-active");
		}
		else {
			element.classList.remove("item-active");
		}
	}

	/* Check for every click if the current cursor position is inside bold, italic, etc;*/
	static checkButtonsActive(target) {
		var bold = document.getElementById("bold");
		var italic = document.getElementById("italic");
		var underline = document.getElementById("underline");
		var bullet = document.getElementById("bullet");
		var numbered = document.getElementById("numbered");

		Editor.checkBoldElement(target, "B", bold, "bold");
		Editor.checkItalicElement(target, "I", italic, "italic");
		Editor.checkUnderlineElement(target, "U", underline, "underline");

		Editor.checkClickedULElement(target, "LI", bullet);
		Editor.checkClickedOLElement(target, "LI", numbered);
	}

	/* Check if the target clicked is B etc;
	   If it is true than activate the coresponding button, else disable it */
	static checkBoldElement(target, tagName, element, fontWeight) {
		var ok = 1;

		if (target.style.fontWeight == fontWeight) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the curent target element
		if (target.tagName == tagName) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the first child of target
	    if (target.firstChild.tagName == tagName) {
	    	element.classList.add("item-active");
	    	ok = 0;
	    }

	    if (target.firstChild != null && target.firstChild.nodeType != 3) {
		    if (target.firstChild.style.fontWeight == fontWeight) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
		}

	    var copyTarget = target;

	    // Iterate all the parents of clicked element
		while (copyTarget.parentNode && copyTarget.parentNode.tagName !== "BODY") {
		    copyTarget = copyTarget.parentNode;
		    if (copyTarget.tagName == tagName || copyTarget.style.fontWeight == fontWeight) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
	    }

	    // If none of the targets match the curent tag name than remove the activated button color
	    if (!target.classList.contains("textarea-content") && ok == 1) {
			element.classList.remove("item-active");
		}
	}

	/* Check if the target clicked is I etc;
	   If it is true than activate the coresponding button, else disable it */
	static checkItalicElement(target, tagName, element, fontStyle) {
		var ok = 1;

		if (target.style.fontStyle == fontStyle) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the curent target element
		if (target.tagName == tagName) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the first child of target
	    if (target.firstChild.tagName == tagName) {
	    	element.classList.add("item-active");
	    	ok = 0;
	    }

	    if (target.firstChild != null && target.firstChild.nodeType != 3) {
		    if (target.firstChild.style.fontStyle == fontStyle) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
		}

	    var copyTarget = target;

	    // Iterate all the parents of clicked element
		while (copyTarget.parentNode && copyTarget.parentNode.tagName !== "BODY") {
		    copyTarget = copyTarget.parentNode;
		    if (copyTarget.tagName == tagName || copyTarget.style.fontStyle == fontStyle) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
	    }

	    // If none of the targets match the curent tag name than remove the activated button color
	    if (!target.classList.contains("textarea-content") && ok == 1) {
			element.classList.remove("item-active");
		}
	}

	/* Check if the target clicked is U etc;
	   If it is true than activate the coresponding button, else disable it */
	static checkUnderlineElement(target, tagName, element, textDecoration) {
		var ok = 1;

		if (target.style.textDecoration == textDecoration) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the curent target element
		if (target.tagName == tagName) {
			element.classList.add("item-active");
			ok = 0;
		}

		// Check the first child of target
	    if (target.firstChild.tagName == tagName) {
	    	element.classList.add("item-active");
	    	ok = 0;
	    }

	    if (target.firstChild != null && target.firstChild.nodeType != 3) {
		    if (target.firstChild.style.textDecoration == textDecoration) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
		}

	    var copyTarget = target;

	    // Iterate all the parents of clicked element
		while (copyTarget.parentNode && copyTarget.parentNode.tagName !== "BODY") {
		    copyTarget = copyTarget.parentNode;
		    if (copyTarget.tagName == tagName || copyTarget.style.textDecoration == textDecoration) {
		    	element.classList.add("item-active");
		    	ok = 0;
		    }
	    }

	    // If none of the targets match the curent tag name than remove the activated button color
	    if (!target.classList.contains("textarea-content") && ok == 1) {
			element.classList.remove("item-active");
		}
	}

	/* Check if the target clicked is an UL element etc;
	   If it is true than activate the coresponding button, else disable it */
	static checkClickedULElement(caretPosition, tagName, element) {
		if (caretPosition.tagName == tagName && caretPosition.closest("ul") != null) {
        	element.classList.add("item-active");
        }
        else if (!caretPosition.classList.contains("textarea-content")) {
        	element.classList.remove("item-active");
        }

        while(caretPosition.parentNode && caretPosition.parentNode.tagName !=="BODY") {
		    caretPosition = caretPosition.parentNode;
		    if (caretPosition.tagName == tagName && caretPosition.closest("ul") != null) {
		    	element.classList.add("item-active");
		    }
	    }
	}

	/* Check if the target clicked is an OL etc;
	   If it is true than activate the coresponding button, else disable it */
	static checkClickedOLElement(caretPosition, tagName, element) {
		if (caretPosition.tagName == tagName && caretPosition.closest("ol") != null) {
        	element.classList.add("item-active");
        }
        else if (!caretPosition.classList.contains("textarea-content")) {
        	element.classList.remove("item-active");
        }

        while(caretPosition.parentNode && caretPosition.parentNode.tagName !=="BODY") {
		    caretPosition = caretPosition.parentNode;
		    if (caretPosition.tagName == tagName && caretPosition.closest("ol") != null) {
		    	element.classList.add("item-active");
		    }
	    }
	}

	myFunction(event) {
		event = event || window.event;
    	var target = event.target || event.srcElement;
        var caretPosition = Editor.getCaretPosition(event);

        Editor.checkButtonsActive(caretPosition);
	}

	/* Call the function which activate the buttons on every click */
	activateButtons() {
		var textarea = document.getElementById("textarea");

		textarea.addEventListener("click", this.myFunction, false);
	}

	static getCaretPosition(e) {
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

    // old
	completeTextarea() {
		document.getElementById("submit-button").addEventListener('click', function(e) {
	        currentText = document.getElementById("textarea").innerHTML;
	        document.getElementById("textarea-real").innerHTML = currentText;
	    });
	}

	/* Add the color to the current (selected) text */
	enableTextColor(range, color) {
		var colorPalete = document.getElementById("color-palete");
		colorPalete.classList.remove("display");

		this.restoreRangePosition();

		document.execCommand('styleWithCSS', false, true);
	   	document.execCommand('foreColor', false, color);
	}

	/* Begin change of text color implementation */
	changeColor() {
		let range = null;
		document.getElementById("text-color").addEventListener('click', function(e) {
			toggleColorContainer();
			range = saveSelection();
			saveRangePosition();
		});

		document.getElementById("insert-hex").addEventListener('click', function(e) {
			enableTextColor(range, document.getElementById("hex-color").value);
		});

		document.addEventListener('click', function(e) {
			hidePanel(e, "text-color", "color-palete");		});
	}

	/* Complete with default colors */
	completeColor(color) {
		document.getElementById("hex-color").value = color;
		var colorPalete = document.getElementById("color-palete");
		colorPalete.classList.remove("display");

		restoreRangePosition();

		document.execCommand('styleWithCSS', false, true);
	   	document.execCommand('foreColor', false, color);
	}

	/* Add link pipeline */
	addLink() {
		let range = null;
		document.getElementById("link").addEventListener('click', function(e) {
			Editor.toggleLinkContainer();
			range = Editor.saveSelection();
		});

		document.getElementById("insert").addEventListener('click', function(e) {
			Editor.insertLink(range, range.startContainer);
		});

		document.addEventListener('click', function(e) {
			Editor.hidePanel(e, "link", "insert-link");
		});
	}

	/* Show link panel */
	static toggleLinkContainer() {
		let linkContainer = document.getElementById("insert-link");
		if (linkContainer.classList.contains("display")) {
			linkContainer.classList.remove("display");
		}
		else if (!document.getElementById("link").classList.contains("disabledButton")) {
			linkContainer.classList.add("display");
		}
	}

	/* Insert link in the Editor */
	static insertLink(range, container) {
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

		if (container.id == "textarea" || container.parentNode.closest("#textarea")) {
			range.insertNode(createA);
			createA.after(document.createTextNode("\u00A0"));
		}
		else {
			document.getElementById("textarea").innerHTML += displayText;
			document.getElementById("textarea").innerHTML += '&nbsp;';
		}
	}

	/* Save the current position of the caret */
	static saveSelection() {
	    if (window.getSelection) {
	        let sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            return sel.getRangeAt(0);
	        }
	    }
	    else if (document.selection && document.selection.createRange) {
	        return document.selection.createRange();
	    }

	    return null;
	}

	/* Save curent position */
	saveRangePosition()
	{
	  	var textarea = document.getElementById("textarea");
		var range = window.getSelection().getRangeAt(0);

		var start = range.startContainer,
			end = range.endContainer;

		A=[];

		while (start !== textarea) {
			A.push(getNodeIndex(start));
			start = start.parentNode;
		}

		B=[];

		while (end !== textarea) {
			B.push(getNodeIndex(end));
			end = end.parentNode;
		}

		window.response = {"startContainer":A, "startOffset":range.startOffset, "endContainer":B, "endOffset":range.endOffset};
	}

	/* Restore last position of range */
	restoreRangePosition()
	{
		var textarea = document.getElementById("textarea");
		textarea.focus();

		var selection = window.getSelection(),
			range = selection.getRangeAt(0);

		var length,
			container,
			startContainer = textarea,
			endContainer = textarea;

		container = response.startContainer;
		length = container.length;

		while (length--) {
			startContainer = startContainer.childNodes[container[length]];
		}

		container = response.endContainer;
		length = container.length;

		while (length--) {
			endContainer = endContainer.childNodes[container[length]];
		}

		range.setStart(startContainer, response.startOffset);
		range.setEnd(endContainer, response.endOffset);

		selection.removeAllRanges();
		selection.addRange(range);
	}

	getNodeIndex(n) {
		var i=0;
		while(n = n.previousSibling) {
			i++;
		}

		return i;
	}

	/* Close link panel when you click on insert button or inside panel */
	static hidePanel(e, button, container) {
		let linkContainer = document.getElementById(container),
			linkButton = document.getElementById(button);
		if (linkButton !== e.srcElement.closest("#" + button) && linkContainer !== e.srcElement.closest("#" + container)) {
			linkContainer.classList.remove("display");
		}
	}

	/* Disable the buttons when the click is outside Editor */
	disableTextareaButtons() {
		document.addEventListener('click', function(e) {
			let textarea = document.getElementById("textarea"),
			    editor = document.getElementById("editor-menu");
			var buttons = editor.getElementsByTagName("button");

			if (textarea !== e.srcElement.closest("#textarea")) {
				if (editor !== e.srcElement.closest("#editor-menu")) {
					for (var i = 0; i < buttons.length; i++) {
						buttons[i].classList.add("disabledButton");
						buttons[i].classList.remove("item-active");
					}
				}
			}
			else {
				for (let index = 0; index < buttons.length; index++) {
					buttons[index].classList.remove("disabledButton");
				}
			}
		});
	}

	/* Show color palete panel */
	toggleColorContainer() {
		let linkContainer = document.getElementById("color-palete");
		if (linkContainer.classList.contains("display")) {
			linkContainer.classList.remove("display");
		}
		else if (!document.getElementById("text-color").classList.contains("disabledButton")) {
			linkContainer.classList.add("display");
		}
	}
}
