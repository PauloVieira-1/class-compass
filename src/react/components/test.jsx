class Note {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  toString() {
    return this.title + " : " + this.content;
  }

  toNumber() {
    return parseInt(this.content);
  }

  toDate() {
    return new Date(this.content);
  }

  print() {}

  get title() {
    return this._title;
  }
  get content() {
    return this._content;
  }

  set title(title) {
    this._title = title;
  }
  set content(content) {
    this._content = content;
  }
}

export default Note;
