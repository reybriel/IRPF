export class Tier {
  constructor(value, perc) {
    this.value = value;
    this.calc = (base) => base * perc / 100;
  }
}