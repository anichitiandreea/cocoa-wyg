/*** WYSIWYG EDITOR ***/

import * as bold from './icons/bold.svg';
import * as italic from './icons/italic.svg';
import * as underline from './icons/underline.svg';
import * as link from './icons/link.svg';
import * as unorderedList from './icons/list2.svg';
import * as orderedList from './icons/list-numbered.svg';
import * as droplet from './icons/droplet.svg';

class Editor {
	startContainer = [];
	startOffset = 0;
	endContainer = [];
	endOffset = 0;
	static selector = "";

	constructor(selector) {
		Editor.selector = selector;
		this.buildEditor();
		Editor.preventDefaultClick();
		this.disableTextareaButtonsWrapper();
		this.activateButtons();
		this.addLink();
		this.changeColor();

		document.getElementById("bold").addEventListener('click', this.enableBold, false);
		document.getElementById("italic").addEventListener('click', this.enableItalic, false);
		document.getElementById("underline").addEventListener('click', this.enableUnderline, false);
		document.getElementById("bullet").addEventListener('click', this.enableBulleted, false);
		document.getElementById("numbered").addEventListener('click', this.enableNumbered, false);

		let elements = document.getElementById("color-palete").children;
		for (let index = 0; index < elements.length-1; index++) {
			elements[index].addEventListener('click', function() {
				Editor.completeColor(elements[index].style.backgroundColor)
			}, false);
		}
	}

	buildEditor() {
		const editor = document.createElement('div');
		editor.innerHTML = `
			<div class="textarea-content">
				<div class="textarea-menu" id="editor-menu">
					<ul class="textarea-ul">
						<li><button class="disabledButton" type="button" id="bold">` + bold.default + `</button></li>
						<li><button class="disabledButton" type="button" id="italic">` + italic.default + `</button></li>
						<li><button class="disabledButton" id="underline" type="button">` + underline.default + `</button></li>
						<li><button class="disabledButton" id="bullet" type="button">` + unorderedList.default + `</button></li>
						<li><button class="disabledButton" id="numbered" type="button">` + orderedList.default + `</button></li>
						<li>
							<button type="button" class="hyperlink disabledButton" id="link">` + link.default + `</button>
							<div id="insert-link">
								<input type="text" placeholder="URL" id="url" autocomplete="off" class="link-input">
								<input type="text" placeholder="Text" id="text" autocomplete="off" class="link-input">
								<div class="submit">
									<input type="button" value="Insert" id="insert">
								</div>
							</div>
						</li>
						<li><button class="disabledButton" type="button" id="text-color">` + droplet.default + `</button>
							<div id="color-palete">
								<span class="color-option" style="background-color: #7CC791;"></span>
								<span class="color-option" style="background-color: #8184D6;"></span>
								<span class="color-option" style="background-color: #D9D470;"></span>
								<span class="color-option" style="background-color: #E16E6E;"></span>
								<span class="color-option" style="background-color: #B880CD;"></span>
								<span class="color-option" style="background-color: #32a854;"></span>
								<span class="color-option" style="background-color: #393ebf;"></span>
								<span class="color-option" style="background-color: #c4bc1f;"></span>
								<span class="color-option" style="background-color: #cf1d1d;"></span>
								<span class="color-option" style="background-color: #9038b0;"></span>
								<span class="color-option" style="background-color: #206B36;"></span>
								<span class="color-option" style="background-color: #25287A;"></span>
								<span class="color-option" style="background-color: #7E7814;"></span>
								<span class="color-option" style="background-color: #851212;"></span>
								<span class="color-option" style="background-color: #5C2471;"></span>
								<span class="color-option" style="background-color: #F8F8F8;"></span>
								<span class="color-option" style="background-color: #B0B0B0;"></span>
								<span class="color-option" style="background-color: #585858;"></span>
								<span class="color-option" style="background-color: #282828;"></span>
								<span class="color-option" style="background-color: #181818;"></span>
								<div>
									<input type="text" placeholder="HEX" id="hex-color" autocomplete="off" class="link-input">
									<input type="button" value="Ok" id="insert-hex">
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div id="`+ Editor.selector +`" spellcheck="false" contentEditable=true class="textarea"></div>
			</div>`;

		var textarea = document.getElementById(Editor.selector);

		textarea.parentNode.replaceChild(editor, textarea);
	}

 	/* Prevent the current click to follow the link path */
	static preventDefaultClick() {
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
		Editor.preventDefaultClick();
		var bold = document.getElementById("bold");

		if (!bold.classList.contains("disabledButton")) {
			document.execCommand('bold');
			Editor.checkPreviousState(bold);
		}
	}

	/* Enable italic for the typed text */
	enableItalic() {
		Editor.preventDefaultClick();
		var italic = document.getElementById("italic");

		if (!italic.classList.contains("disabledButton")) {
			document.execCommand('italic');
			Editor.checkPreviousState(italic);
		}
	}

	/* Enable underline for the typed text */
	enableUnderline() {
		Editor.preventDefaultClick();
		var underline = document.getElementById("underline");

		if (!underline.classList.contains("disabledButton")) {
			document.execCommand('underline');
			Editor.checkPreviousState(underline);
		}
	}

	/* Enable buleted list for the typed text */
	enableBulleted() {
		Editor.preventDefaultClick();
		var bullet = document.getElementById("bullet");

		if (!bullet.classList.contains("disabledButton")) {
			document.execCommand('insertUnorderedList', false, null);
			Editor.checkPreviousState(bullet);
		}
	}

	/* Enable numbered list for the typed text */
	enableNumbered() {
		Editor.preventDefaultClick();
		var numbered = document.getElementById("numbered");

		if (!numbered.classList.contains("disabledButton")) {
			document.execCommand('insertOrderedList', false, null);
			Editor.checkPreviousState(numbered);
		}
	}

	/* Check if the button is activated */
	static checkPreviousState(element) {
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
        var caretPosition = Editor.getCaretPosition(event);

        Editor.checkButtonsActive(caretPosition);
	}

	/* Call the function which activate the buttons on every click */
	activateButtons() {
		var textarea = document.getElementById(Editor.selector);

		textarea.addEventListener("click", this.myFunction, false);
	}

	static getCaretPosition(e) {
	  	var range, textNode;

	  	if (document.caretPositionFromPoint) {
	    	range = document.caretPositionFromPoint(e.clientX, e.clientY);
	    	textNode = range.offsetNode;
	  	}
		else if (document.caretRangeFromPoint) {
	    	range = document.caretRangeFromPoint(e.clientX, e.clientY);
	    	textNode = range.startContainer;
	  	}

	 	return textNode.parentElement;
	}

	/* Add the color to the current (selected) text */
	static enableTextColor(color) {
		var colorPalete = document.getElementById("color-palete");
		colorPalete.classList.remove("display");

		Editor.restoreRangePosition();

		document.execCommand('styleWithCSS', false, true);
	   	document.execCommand('foreColor', false, color);
	}

	/* Begin change of text color implementation */
	changeColor() {
		let range = null;
		document.getElementById("text-color").addEventListener('click', function(e) {
			Editor.toggleColorContainer();
			range = Editor.saveSelection();
			Editor.saveRangePosition();
		});

		document.getElementById("insert-hex").addEventListener('click', function(e) {
			Editor.enableTextColor(document.getElementById("hex-color").value);
		});

		document.addEventListener('click', function(e) {
			Editor.hidePanel(e, "text-color", "color-palete");
		});
	}

	/* Complete with default colors */
	static completeColor(color) {
		document.getElementById("hex-color").value = color;
		var colorPalete = document.getElementById("color-palete");
		colorPalete.classList.remove("display");

		Editor.restoreRangePosition();

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
			Editor.insertLink(range);
		} , false);

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
	static insertLink(range) {
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

		if (range.startContainer.id == Editor.selector || range.startContainer.parentNode.closest("#" + Editor.selector)) {
			range.insertNode(createA);
			createA.after(document.createTextNode("\u00A0"));
		}
		else {
			document.getElementById(Editor.selector).innerHTML += displayText;
			document.getElementById(Editor.selector).innerHTML += '&nbsp;';
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
	static saveRangePosition()
	{
	  	var textarea = document.getElementById(Editor.selector);
		var range = window.getSelection().getRangeAt(0);

		var start = range.startContainer,
			end = range.endContainer;

		let A = [];

		while (start !== textarea) {
			A.push(Editor.getNodeIndex(start));
			start = start.parentNode;
		}

		let B = [];

		while (end !== textarea) {
			B.push(Editor.getNodeIndex(end));
			end = end.parentNode;
		}

		this.startContainer = A;
		this.startOffset = range.startOffset;
		this.endContainer = B;
		this.endOffset = range.endOffset;
	}

	/* Restore last position of range */
	static restoreRangePosition()
	{
		var textarea = document.getElementById(Editor.selector);
		textarea.focus();

		var selection = window.getSelection(),
			range = selection.getRangeAt(0);

		var length,
			container,
			startContainer = textarea,
			endContainer = textarea;

		container = this.startContainer;
		length = container.length;

		while (length--) {
			startContainer = startContainer.childNodes[container[length]];
		}

		container = this.endContainer;
		length = container.length;

		while (length--) {
			endContainer = endContainer.childNodes[container[length]];
		}

		range.setStart(startContainer, this.startOffset);
		range.setEnd(endContainer, this.endOffset);

		selection.removeAllRanges();
		selection.addRange(range);
	}

	static getNodeIndex(n) {
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
		if (linkButton !== e.srcElement.closest("#" + button)
			&& linkContainer !== e.srcElement.closest("#" + container)) {
			linkContainer.classList.remove("display");
		}
	}

	/* Disable the buttons when the click is outside Editor */
	disableTextareaButtonsWrapper() {
		document.addEventListener('click', (e) => this.disableTextareaButtons(e), false);
	}

	disableTextareaButtons(e) {
		let textarea = document.getElementById(Editor.selector),
			editor = document.getElementById("editor-menu");
		var buttons = editor.getElementsByTagName("button");

		if (textarea !== e.srcElement.closest("#" + Editor.selector)) {
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
	}

	/* Show color palete panel */
	static toggleColorContainer() {
		let linkContainer = document.getElementById("color-palete");
		if (linkContainer.classList.contains("display")) {
			linkContainer.classList.remove("display");
		}
		else if (!document.getElementById("text-color").classList.contains("disabledButton")) {
			linkContainer.classList.add("display");
		}
	}
}

export default Editor;
