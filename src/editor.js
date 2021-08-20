import * as bold from './icons/bold.svg';
import * as italic from './icons/italic.svg';
import * as underline from './icons/underline.svg';
import * as link from './icons/link.svg';
import * as unorderedList from './icons/list2.svg';
import * as orderedList from './icons/list-numbered.svg';
import * as droplet from './icons/droplet.svg';
import * as fontSize from './icons/font-size.svg';
import { ButtonsChecker } from './buttons-checker.js';
import { CursorRangePosition } from './cursor-range-position.js';

export default class Editor {
	static selector = "";

	constructor(selector) {
		Editor.selector = selector;
		this.buildEditor();
		this.disableTextareaButtonsWrapper();
		this.addLink();
		this.changeColor();
		this.changeFontSize();

		var textarea = document.getElementById(selector);

		textarea.addEventListener("click", this.activateButtons, false);

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
						<li><button class="disabledButton" id="font-sized" type="button">` + fontSize.default + `</button>
							<div id="font-size-container">
								<div class="font-size-input-wrapper">
									<input type="text" id="font-size-input" autocomplete="off">
									<p class="px-paragraph">px</p>
								</div>
								<div class="submit">
									<input type="button" value="Apply" id="apply">
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
			Editor.toggleButtonState(bold);
		}
	}

	/* Enable italic for the typed text */
	enableItalic(event) {
		event.preventDefault();
		var italic = document.getElementById("italic");

		if (!italic.classList.contains("disabledButton")) {
			document.execCommand('italic');
			Editor.toggleButtonState(italic);
		}
	}

	/* Enable underline for the typed text */
	enableUnderline(event) {
		event.preventDefault();
		var underline = document.getElementById("underline");

		if (!underline.classList.contains("disabledButton")) {
			document.execCommand('underline');
			Editor.toggleButtonState(underline);
		}
	}

	/* Enable buleted list for the typed text */
	enableBulleted(event) {
		event.preventDefault();
		let bullet = document.getElementById("bullet");
		let numbered = document.getElementById("numbered");

		if (!bullet.classList.contains("disabledButton")) {
			document.execCommand('insertUnorderedList', false, null);
			Editor.disableOtherListType(numbered);
			Editor.toggleButtonState(bullet);
		}
	}

	/* Enable numbered list for the typed text */
	enableNumbered(event) {
		event.preventDefault();
		let numbered = document.getElementById("numbered");
		let bullet = document.getElementById("bullet");

		if (!numbered.classList.contains("disabledButton")) {
			document.execCommand('insertOrderedList', false, null);
			Editor.disableOtherListType(bullet);
			Editor.toggleButtonState(numbered);
		}
	}

	static disableOtherListType(element) {
		element.classList.remove("item-active");
	}

	static toggleButtonState(element) {
		if (element.classList.contains("item-active")) {
			element.classList.remove("item-active");
		}
		else {
			element.classList.add("item-active");
		}
	}

	activateButtons(event) {
		event = event || window.event;
        let caretPosition = CursorRangePosition.getCaretPosition(event);

        new ButtonsChecker().checkButtonsActive(caretPosition);
	}

	/* Add the color to the current (selected) text */
	static enableTextColor(color) {
		let colorPalete = document.getElementById("color-palete");
		colorPalete.classList.remove("display");

		CursorRangePosition.restoreRangePosition();

		document.execCommand('styleWithCSS', false, true);
	   	document.execCommand('foreColor', false, color);
	}

	changeColor() {
		let range = null;
		document.getElementById("text-color").addEventListener('click', function(e) {
			Editor.toggleContainer("color-palete", "text-color");
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
		Editor.enableTextColor(color);
	}

	changeFontSize() {
		document.getElementById("font-sized").addEventListener('click', function(e) {
			Editor.toggleContainer("font-size-container", "font-sized");
			CursorRangePosition.saveRangePosition();
		});

		document.getElementById("apply").addEventListener('click', function(e) {
			Editor.enableFontSize();
		}, false);

		document.addEventListener('click', function(e) {
			Editor.hidePanel(e, "font-sized", "font-size-container");
		});
	}

	static enableFontSize() {
		let size = document.getElementById("font-size-input").value;
		let fontSizeContainer = document.getElementById("font-size-container");
		fontSizeContainer.classList.remove("display");

		CursorRangePosition.restoreRangePosition();

		let span = document.createElement("SPAN");
		let text = document.createTextNode(document.getSelection());
		span.appendChild(text);
		span.setAttribute("style", "font-size:" + size + "px");

		document.execCommand('insertHTML', false, span.outerHTML);
	}

	addLink() {
		let range = null;
		document.getElementById("link").addEventListener('click', function(e) {
			Editor.toggleContainer("insert-link", "link");
			range = CursorRangePosition.saveSelection();
		});

		document.getElementById("insert").addEventListener('click', function(e) {
			Editor.insertLink(range);
		} , false);

		document.addEventListener('click', function(e) {
			Editor.hidePanel(e, "link", "insert-link");
		});
	}

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

	static toggleContainer(containerId, buttonId) {
		let linkContainer = document.getElementById(containerId);
		if (linkContainer.classList.contains("display")) {
			linkContainer.classList.remove("display");
		}
		else if (!document.getElementById(buttonId).classList.contains("disabledButton")) {
			linkContainer.classList.add("display");
		}
	}
}
