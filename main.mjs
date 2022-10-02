import { INSSConsultation } from "./consultations/inss.mjs";
import { BaseConsultation } from "./consultations/base.mjs";
import { IRPFConsultation } from "./consultations/irpf.mjs";
import { SalaryConsultation } from "./consultations/salary.mjs";
import { validate } from "./commands/validator.mjs";

validate(process.argv, process.exit);

const salary = process.argv[2];
const deps = process.argv[3];
const pens = process.argv[4];

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