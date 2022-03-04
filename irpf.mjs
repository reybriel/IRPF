import { Tier } from './types/tier.mjs';
import { TierWithDeduction } from './types/tier_with_deduction.mjs';
import { round, min } from './helpers/math.mjs';

// Consultations

class INSSConsultation {
  static TIERS = [
    new Tier(1212.00, 7.5),
    new Tier(2427.35, 9.0),
    new Tier(3641.03, 12.0),
    new Tier(7087.22, 14.0)
  ];

  constructor(salary) {
    this.salary = salary;
  }

  consult() {
    const sum = (val1, val2) => val1 + val2;
    const factor = (tier, index, all) => {
      var prev = 0;

      if (index > 0) prev = all[index - 1].value;

      if (this.salary < prev) return 0;

      const base = min(tier.value, this.salary);
      return tier.calc(base - prev);
    };

    const result = INSSConsultation.TIERS
      .map(factor)
      .reduce(sum);

    return round(result);
  }
}

class BaseConsultation {
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

class IRPFConsultation {
  static TIERS = [
    new TierWithDeduction(0.00, 0.0, 0.00),
    new TierWithDeduction(1903.99, 7.5, 142.80),
    new TierWithDeduction(2826.66, 15.0, 354.80),
    new TierWithDeduction(3751.06, 22.5, 636.13),
    new TierWithDeduction(4664.69, 27.5, 869.36)
  ];

  constructor(base) {
    this.base = base;
  }

  consult() {
    const tier = IRPFConsultation.TIERS.find((tier, index, all) => {
      if (index == all.length - 1)
        return true;

      const next = all[index + 1].value;

      return this.base >= tier.value && this.base < next;
    });

    return round(tier.calc(this.base));
  }
}

class SalaryConsultation {
  constructor(salary, inss, irpf) {
    this.salary = salary;
    this.inss = inss;
    this.irpf = irpf;
  }
  
  consult() {
    return round(this.salary - this.inss - this.irpf);
  }
}

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