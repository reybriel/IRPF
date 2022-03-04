import { round } from "../helpers/math.mjs";

export class BaseConsultation {
  static DEDUC_DEPS = 189.59;

  constructor(salary, inss, deps, pens) {
    this.salary = salary;
    this.inss = inss;
    this.deps = deps;
    this.pens = pens;
  }

  consult() {
    const base = this.salary - this.inss - BaseConsultation.DEDUC_DEPS * this.deps - this.pens;

    if (base <= 0) return 0;

    return round(base);
  }
}
