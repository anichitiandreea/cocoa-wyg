export class CursorRangePosition {
  startContainer = [];
  startOffset = 0;
  endContainer = [];
  endOffset = 0;

  constructor() {
  }

  static saveRangePosition()
  {
    let textarea = document.getElementById(Editor.selector);
    let range = window.getSelection().getRangeAt(0);

    let start = range.startContainer,
      end = range.endContainer;

    let A = [], B = [];

    while (start !== textarea) {
      A.push(this.getNodeIndex(start));
      start = start.parentNode;
    }

    while (end !== textarea) {
      B.push(this.getNodeIndex(end));
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

  static getNodeIndex(n) {
    var i = 0;
    while(n = n.previousSibling) {
      i++;
    }

    return i;
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
}
