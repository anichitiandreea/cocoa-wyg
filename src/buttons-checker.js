export class ButtonsChecker {
  constructor() {}

  /*
    Check for every click if the current cursor position is inside bold, italic etc.
  */
  checkButtonsActive(target) {
    var bold = document.getElementById("bold");
    var italic = document.getElementById("italic");
    var underline = document.getElementById("underline");
    var bullet = document.getElementById("bullet");
    var numbered = document.getElementById("numbered");

    this.checkBoldElement(target, "B", bold, "bold");
    this.checkItalicElement(target, "I", italic, "italic");
    this.checkUnderlineElement(target, "U", underline, "underline");

    this.checkClickedListElement(target, "LI", bullet, "ul");
    this.checkClickedListElement(target, "LI", numbered, "ol");
  }

  /*
    Check if the target clicked is B etc;
    If it is true than activate the coresponding button, else disable it
  */
  checkBoldElement(target, tagName, element, fontWeight) {
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

  /*
    Check if the target clicked is I etc;
    If it is true than activate the coresponding button, else disable it
  */
  checkItalicElement(target, tagName, element, fontStyle) {
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

  /*
    Check if the target clicked is U etc;
    If it is true than activate the coresponding button, else disable it
  */
  checkUnderlineElement(target, tagName, element, textDecoration) {
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

  /*
    Check if the target clicked is an UL element etc;
    If it is true than activate the coresponding button, else disable it
  */
  checkClickedListElement(caretPosition, tagName, element, listType) {
    if (caretPosition.tagName == tagName && caretPosition.closest(listType) != null) {
      element.classList.add("item-active");
    }
    else if (!caretPosition.classList.contains("textarea-content")) {
      element.classList.remove("item-active");
    }

    while(caretPosition.parentNode && caretPosition.parentNode.tagName !=="BODY") {
      caretPosition = caretPosition.parentNode;
      if (caretPosition.tagName == tagName && caretPosition.closest(listType) != null) {
        element.classList.add("item-active");
      }
    }
  }
}
