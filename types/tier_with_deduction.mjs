import { Tier } from "./tier.mjs";

export class TierWithDeduction {
  constructor(value, perc, deduc) {
    this.value = value;

    const tier = new Tier(value, perc);
    this.calc = (base) => tier.calc(base) - deduc;
  }
}