import * as bold from './icons/bold.svg';
import * as italic from './icons/italic.svg';
import * as underline from './icons/underline.svg';
import * as link from './icons/link.svg';
import * as unorderedList from './icons/list2.svg';
import * as orderedList from './icons/list-numbered.svg';
import * as droplet from './icons/droplet.svg';
import { ButtonsChecker } from './buttons-checker.js';
import { CursorRangePosition } from './cursor-range-position.js';

export default class Editor {
	static selector = "";

	constructor(selector) {
		Editor.selector = selector;
		this.buildEditor();
		this.disableTextareaButtonsWrapper();
		this.activateButtons();
		this.addLink();
		this.changeColor();

		document.getElementById("bold").addEventListener('mousedown', this.enableBold, false);
		document.getElementById("italic").addEventListener('mousedown', this.enableItalic, false);
		document.getElementById("underline").addEventListener('mousedown', this.enableUnderline, false);
		document.getElementById("bullet").addEventListener('mousedown', this.enableBulleted, false);
		document.getElementById("numbered").addEventListener('mousedown', this.enableNumbered, false);

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

	/* Enable bold for the typed text */
	enableBold(event) {
		event.preventDefault();
		var bold = document.getElementById("bold");

		if (!bold.classList.contains("disabledButton")) {
			document.execCommand('bold');
			Editor.checkPreviousState(bold);
		}
	}

	/* Enable italic for the typed text */
	enableItalic(event) {
		event.preventDefault();
		var italic = document.getElementById("italic");

		if (!italic.classList.contains("disabledButton")) {
			document.execCommand('italic');
			Editor.checkPreviousState(italic);
		}
	}

	/* Enable underline for the typed text */
	enableUnderline(event) {
		event.preventDefault();
		var underline = document.getElementById("underline");

		if (!underline.classList.contains("disabledButton")) {
			document.execCommand('underline');
			Editor.checkPreviousState(underline);
		}
	}

	/* Enable buleted list for the typed text */
	enableBulleted(event) {
		event.preventDefault();
		var bullet = document.getElementById("bullet");

		if (!bullet.classList.contains("disabledButton")) {
			document.execCommand('insertUnorderedList', false, null);
			Editor.checkPreviousState(bullet);
		}
	}

	/* Enable numbered list for the typed text */
	enableNumbered(event) {
		event.preventDefault();
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

	myFunction(event) {
		event = event || window.event;
        var caretPosition = CursorRangePosition.getCaretPosition(event);

        new ButtonsChecker().checkButtonsActive(caretPosition);
	}

	/* Call the function which activate the buttons on every click */
	activateButtons() {
		var textarea = document.getElementById(Editor.selector);

		textarea.addEventListener("click", this.myFunction, false);
	}

	/* Add the color to the current (selected) text */
	static enableTextColor(color) {
		var colorPalete = document.getElementById("color-palete");
		colorPalete.classList.remove("display");

		CursorRangePosition.restoreRangePosition();

		document.execCommand('styleWithCSS', false, true);
	   	document.execCommand('foreColor', false, color);
	}

	/* Begin change of text color implementation */
	changeColor() {
		let range = null;
		document.getElementById("text-color").addEventListener('click', function(e) {
			Editor.toggleColorContainer();
			range = CursorRangePosition.saveSelection();
			CursorRangePosition.saveRangePosition();
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

		CursorRangePosition.restoreRangePosition();

		document.execCommand('styleWithCSS', false, true);
	   	document.execCommand('foreColor', false, color);
	}

	/* Add link pipeline */
	addLink() {
		let range = null;
		document.getElementById("link").addEventListener('click', function(e) {
			Editor.toggleLinkContainer();
			range = CursorRangePosition.saveSelection();
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
