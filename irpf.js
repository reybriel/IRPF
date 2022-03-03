class Tier {
    constructor(value, perc) {
        this.value = value;
        this.calc = (base) => base * perc / 100;
    }
}

class TierWithDeduction {
    constructor(value, perc, deduc) {
        this.value = value;

        let tier = new Tier(value, perc);
        this.calc = (base) => tier.calc(base) - deduc;
    }
}

function round(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

class Consultation {

    static INSS_TIERS = [
        new Tier(1212.00,  7.5),
        new Tier(2427.35,  9.0),
        new Tier(3641.03, 12.0),
        new Tier(7087.22, 14.0)
    ];
    
    static IRPF_TIERS = [
        new TierWithDeduction(   0.00,  0.0,   0.00),
        new TierWithDeduction(1903.99,  7.5, 142.80),
        new TierWithDeduction(2826.66, 15.0, 354.80),
        new TierWithDeduction(3751.06, 22.5, 636.13),
        new TierWithDeduction(4664.69, 27.5, 869.36)
    ];
    
    static DEDUC_DEPS = 189.59;
    static DEDUC_PENS = 200.00;

    constructor(salary, deps, pens) {
        this.salary = salary;
        this.deps = deps;
        this.pens = pens;
    }

    inss() {
        let sum = (val1, val2) => val1 + val2;
        let result = Consultation.INSS_TIERS.map((tier, index, all) => {
            var prev = 0;
    
            if (index > 0)
                prev = all[index - 1].value;
    
            if (this.salary < prev)
                return 0;

            let base = Math.min(tier.value, this.salary);

            return tier.calc(base - prev);
        }).reduce(sum);
    
        return round(result);
    }

    base() {
        let base = this.salary - this.inss() - Consultation.DEDUC_DEPS * this.deps - Consultation.DEDUC_PENS * this.pens;

        if (base <= 0)
            return 0;

        return round(base);
    }

    irpf() {
        let base = this.base();

        let tier = Consultation.IRPF_TIERS.find((tier, index, all) => {
            if (index == all.length - 1)
                return true;
            
            let next = all[index + 1].value;

            return base >= tier.value && base < next;
        });

        return round(tier.calc(base));
    }

    balance() {
        return round(this.salary - this.inss() - this.irpf());
    }
}

let salary = process.argv[2];
let deps = process.argv[3];
let pens = process.argv[4];

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

let consultation = new Consultation(salary, deps, pens);

console.log('--- INPUT ----');
console.log('Salário bruto = R$ ' + salary);
console.log('Dependentes = ' + deps);
console.log('Pensões = ' + pens);
console.log('');

console.log('--- OUTPUT ---');
console.log('Base de cálculo = R$ ' + consultation.base());
console.log('INSS = R$ ' + consultation.inss());
console.log('IRPF = R$ ' + consultation.irpf());
console.log('Saldo = R$ ' + consultation.balance());
console.log('--------------');