import { TierWithDeduction } from "../types/tier_with_deduction.mjs";
import { round } from "../helpers/math.mjs";

export class IRPFConsultation {
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