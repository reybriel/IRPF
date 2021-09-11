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
        new Tier(1100.00,  7.5),
        new Tier(2203.48,  9.0),
        new Tier(3305.22, 12.0),
        new Tier(6433.57, 14.0)
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
        let result = Consultation.INSS_TIERS.map((tier, index, arr) => {
            var prev = 0;
    
            if (index > 0) prev = arr[index - 1].value;
    
            if (this.salary < prev) return 0;
    
            var min = tier.value;
    
            if (this.salary < tier.value) min = this.salary;
    
            return tier.calc(min - prev);
        }).reduce((prev, curr) => prev + curr);
    
        return round(result);
    }

    base() {
        let base = this.salary - this.inss() - Consultation.DEDUC_DEPS * this.deps - Consultation.DEDUC_PENS * this.pens;
        if (base <= 0) return 0;
        return base;
    }

    irpf() {
        let base = this.base();

        let tier = Consultation.IRPF_TIERS.find((tier, index, arr) => {
            if (index == arr.length - 1) return true;
            
            let next = arr[index + 1].value;

            return base >= tier.value && base < next;
        });

        return round(tier.calc(base));
    }

    balance() {
        return this.salary - this.inss() - this.irpf();
    }
}

[500, 1000, 2000, 3000, 5000, 10000, 15000].forEach((salary) => {
    let consultation = new Consultation(salary, 3, 0);

    console.log('--------------------');
    console.log('Bruto = R$ ' + salary);
    console.log('Base  = R$ ' + consultation.base());
    console.log('INSS  = R$ ' + consultation.inss());
    console.log('IRPF  = R$ ' + consultation.irpf());
    console.log('Saldo = R$ ' + consultation.balance());
});