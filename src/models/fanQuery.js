import CONST from "./const";

// Запрос подбора вентилятора
export default class {
  constructor(
    n = 1500, // Частота(об/мин)
    t = 20, // Температура(°C)
    Q = 13000, // Расход(м³/ч)
    Pv = 1000, // Давление полное(Па)
    depth = 1 // Коэффициент глубины колеса (для двустороннего всаса = 2)
  ) {
    this.n = n;
    this.t = t;
    this.Q = Q;
    this.Pv = Pv;
    this.depth = depth;
  }

  get t() {
    return this._t;
  } // Температура(°C)
  set t(value) {
    if (value < CONST.T0) this._t = CONST.T0;
    else this._t = value;
  }

  get export() {
    let obj = {};
    Object.keys(this).forEach(key => {
      if (key === '_t') obj.t = this[key];
      else obj[key] = this[key];
    });
    return obj;
  }

}
