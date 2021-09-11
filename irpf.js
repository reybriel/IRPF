// TYPES

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

// CONSTANTS

let INSS_TIERS = [
    new Tier(1100.00,  7.5),
    new Tier(2203.48,  9.0),
    new Tier(3305.22, 12.0),
    new Tier(6433.57, 14.0)
];

let IRPF_TIERS = [
    new TierWithDeduction(   0.00,  0.0,   0.00),
    new TierWithDeduction(1903.99,  7.5, 142.80),
    new TierWithDeduction(2826.66, 15.0, 354.80),
    new TierWithDeduction(3751.06, 22.5, 636.13),
    new TierWithDeduction(4664.69, 27.5, 869.36)
];

let DEDUC_DEPS = 189.59;
let DEDUC_PENS = 200.00;

// FUNCTIONS

function round(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calcINSS(salary) {
    let result = INSS_TIERS.map((tier, index, arr) => {
        var prev = 0;

        if (index > 0) prev = arr[index - 1].value;

        if (salary < prev) return 0;

        var min = tier.value;

        if (salary < tier.value) min = salary;

        return tier.calc(min - prev);
    }).reduce((prev, curr) => prev + curr);

    return round(result);
}

function calcIRPF(salary, deps, pens) {
    let base = salary - calcINSS(salary) - DEDUC_DEPS * deps - DEDUC_PENS * pens;
    if (base <= 0) return 0;

    let tier = IRPF_TIERS.find((tier, index, arr) => {
        if (index == arr.length - 1) return true;
        
        let next = arr[index + 1].value;

        return base >= tier.value && base < next;
    });

    return round(tier.calc(base));
}

// SCRIPT

[500, 1000, 2000, 3000, 5000, 10000, 15000].forEach((salary) => {
    let inss = calcINSS(salary);
    let irpf = calcIRPF(salary, 3, 0);
    let balance = salary - inss - irpf;

    console.log('--------------------');
    console.log('Bruto = R$ ' + salary);
    console.log('INSS  = R$ ' + inss);
    console.log('IRPF  = R$ ' + irpf);
    console.log('Saldo = R$ ' + balance);
});