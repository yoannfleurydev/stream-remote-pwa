const INIT = { status: "down" };

export class Health {
  constructor({ status } = INIT) {
    this.status = status;
  }
}
