const INIT = { status: "up" };

export class Health {
  constructor({ status } = INIT) {
    this.status = status;
  }
}
