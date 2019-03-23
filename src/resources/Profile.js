const INIT = { name: "", color: "" };

export class Profile {
  constructor({ name, color } = INIT) {
    this.name = name;
    this.color = color;
  }
}
