import aCorr from "./noise-acorr.js";

export default class {
  constructor() {
    this.inlet = [];
    this.outlet = [];
    this.case = [];
  }
  get all() {
    return [...this.inlet, ...this.outlet, ...this.case];
  }
  muffle(noise) {
    // Заглушить вентилятор
    let result = {
      freqs: noise.freqs,
      Lwin: noise.Lwin,
      Lwout: noise.Lwout,
      Lwcase: noise.Lwcase,
      get LwinCorr() {
        return aCorr(this.Lwin);
      },
      get LwoutCorr() {
        return aCorr(this.Lwout);
      },
      get LwcaseCorr() {
        return aCorr(this.Lwcase);
      },
    };
    this.inlet.forEach(
      (muffler) => (result.Lwin = muffler.muffle(result.Lwin))
    );
    this.outlet.forEach(
      (muffler) => (result.Lwout = muffler.muffle(result.Lwout))
    );
    this.case.forEach(
      (muffler) => (result.Lwcase = muffler.muffle(result.Lwcase))
    );
    return result;
  }
}
