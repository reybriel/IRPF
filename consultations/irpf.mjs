import { round, percentage } from "../helpers/math.mjs";

class Tier {
  constructor(value, perc, deduc) {
    this.value = value;
    this.perc = perc;
    this.deduc = deduc;
  }
}

export class IRPFConsultation {
  static TIERS = [
    new Tier(   0.00,  0.0,   0.00),
    new Tier(2259.21,  7.5, 169.44),
    new Tier(2286.66, 15.0, 381.44),
    new Tier(3751.06, 22.5, 662.77),
    new Tier(4664.69, 27.5, 896.00)
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

    return round(percentage(this.base, tier.perc) - tier.deduc);
  }
}