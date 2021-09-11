class Tier {
    constructor(value, perc) {
        this.value = value;
        this.calc = (base) => base * perc / 100;
    }
}

let INSS_TIERS = [
    new Tier(1100.00,  7.5),
    new Tier(2203.48,  9.0),
    new Tier(3305.22, 12.0),
    new Tier(6433.57, 14.0)
];

function calcINSS(salary) {
    let result = INSS_TIERS.map((tier, index, arr) => {
        var prev = 0;

        if (index > 0) prev = arr[index - 1].value;

        if (salary < prev) return 0;

        var min = tier.value;

        if (salary < tier.value) min = salary;

        return tier.calc(min - prev);
    }).reduce((prev, curr) => prev + curr);

    return Math.round((result + Number.EPSILON) * 100) / 100;
}

function irpf(salary, dependants, pensions) {

}

[500, 1000, 2000, 3000, 5000, 10000].forEach((salary) => {
    let inss = calcINSS(salary);
    console.log(inss);
});