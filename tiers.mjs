export class Tier {
  constructor(value, perc) {
    this.value = value;
    this.calc = (base) => base * perc / 100;
  }
}

export class TierWithDeduction {
  constructor(value, perc, deduc) {
    this.value = value;

    const tier = new Tier(value, perc);
    this.calc = (base) => tier.calc(base) - deduc;
  }
}