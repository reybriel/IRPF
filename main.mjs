import { INSSConsultation } from "./consultations/inss.mjs";
import { BaseConsultation } from "./consultations/base.mjs";
import { IRPFConsultation } from "./consultations/irpf.mjs";
import { SalaryConsultation } from "./consultations/salary.mjs";

const salary = process.argv[2];
const deps = process.argv[3];
const pens = process.argv[4];

if (isNaN(salary)) {
  console.log('The first argument has to be a number.');
  process.exit(1);
}

if (isNaN(deps)) {
  console.log('The second argument has to be a number.');
  process.exit(1);
}

if (isNaN(pens)) {
  console.log('The third argument has to be a number.');
  process.exit(1);
}

const inss = (new INSSConsultation(salary)).consult();
const base = (new BaseConsultation(salary, inss, deps, pens)).consult();
const irpf = (new IRPFConsultation(base)).consult();
const balance = (new SalaryConsultation(salary, inss, irpf)).consult();

console.log('--- INPUT ----');
console.log('Salário bruto = R$ ' + salary);
console.log('Pensão = R$ ' + pens);
console.log('Dependentes = ' + deps);
console.log('');

console.log('--- OUTPUT ---');
console.log('Base de cálculo = R$ ' + base);
console.log('INSS = R$ ' + inss);
console.log('IRPF = R$ ' + irpf);
console.log('Saldo = R$ ' + balance);
console.log('--------------');