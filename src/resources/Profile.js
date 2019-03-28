const INIT = { _id: "", name: "", color: "" };

export class Profile {
  constructor({ _id, name, color } = INIT) {
    this.id = _id;
    this.name = name;
    this.color = color;
  }
}
