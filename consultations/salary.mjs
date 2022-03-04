import { round } from "../helpers/math.mjs";

export class SalaryConsultation {
  constructor(salary, inss, irpf) {
    this.salary = salary;
    this.inss = inss;
    this.irpf = irpf;
  }
  
  consult() {
    return round(this.salary - this.inss - this.irpf);
  }
}