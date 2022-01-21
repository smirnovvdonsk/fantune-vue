import CONST from "./const";
const αdBlimit = 163; // Предел шумоглушения в децибелах, соответствующий коэффициенту звукопоглощения α, равному единице

function α(dB) {
  // Коэффициент звукопоглощения из децибелов
  dB = Math.abs(dB);
  if (dB <= αdBlimit) {
    return 1 - 1 / Math.pow(10, dB / 10);
  } else return 1;
}
function dB(α) {
  // Децибелы из коэффициента звукопоглощения
  α = Math.abs(α);
  if (α <= 1) {
    let res = 10 * Math.log10(1 / (1 - α));
    if (res == Infinity) res = αdBlimit;
    return res;
  } else return αdBlimit;
}

class Octave {
  constructor() {
    this.dB = 0;
  }
  get dB() {
    return this._dB;
  }
  set dB(value) {
    this._dB = Math.abs(value);
  }
  get α() {
    return α(this.dB);
  }
  set α(value) {
    this.dB = dB(Math.abs(value));
  }
}

export default class {
  constructor({
    name = "",
    dBArray = null, // Массив по частотам с характеристиками в в децибелах
    αArray = null, // Массив по частотам с характеристиками в коэффициентах звукопоглощения α
  } = {}) {
    this.name = name;
    this.freqs = CONST.FREQS;
    this.freqs.forEach((freq) => (this[freq.toString()] = new Octave()));

    if (Array.isArray(dBArray) && dBArray.length) this.dBArray = dBArray;
    else this.αArray = αArray;
  }

  get αArray() {
    return this.freqs.map((freq) => this[freq.toString()].α);
  }
  set αArray(arr) {
    if (Array.isArray(arr) && arr.length) {
      this.freqs.forEach((freq, i) => (this[freq.toString()].α = arr[i]));
    } else {
      this.freqs.forEach((freq) => (this[freq.toString()].α = 0));
    }
  }

  get dBArray() {
    return this.freqs.map((freq) => this[freq.toString()].dB);
  }
  set dBArray(arr) {
    if (Array.isArray(arr) && arr.length) {
      this.freqs.forEach((freq, i) => (this[freq.toString()].dB = arr[i]));
    } else {
      this.freqs.forEach((freq) => (this[freq.toString()].dB = 0));
    }
  }

  muffle(inputArray) {
    // Заглушить шум
    return inputArray.map((item, i) => item - this.dBArray[i]);
  }
}
