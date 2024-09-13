import { round, min, percentage } from "../helpers/math.mjs";

class Tier {
  constructor(value, perc) {
    this.value = value;
    this.perc = perc;
  }
}

export class INSSConsultation {
  static TIERS = [
    new Tier(1412.00,  7.5),
    new Tier(2666.68,  9.0),
    new Tier(4000.03, 12.0),
    new Tier(7786.02, 14.0)
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
      return percentage(base - prev, tier.perc);
    };

    const result = INSSConsultation.TIERS
      .map(factor)
      .reduce(sum);

    return round(result);
  }
}