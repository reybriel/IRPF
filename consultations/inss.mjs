import { Tier } from "../types/tier.mjs";
import { round, min } from "../helpers/math.mjs";

export class INSSConsultation {
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