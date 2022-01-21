export class Scale { // Заготовка пространственной шкалы для графика Vega с методами
	constructor({
		name = "x",
		type = "linear", // линейная или логарифмическая или...
		range = "width", // пространственное измерение
		domain = [0, 1], //минимум и максимум
		zero = false, // Обязательно ли отображать ноль или он может быть за пределами графика
		nice = true, // нужно ли округлять значения сетки
		//nice = 1, // нужно ли округлять значения сетки
	} = {}) {
		this.name = name;
		this.type = type;
		this.range = range;
		this.domain = domain;
		this.zero = zero;
		this.nice = nice;
	}
	set minimum(value) {
		this.domain[0] = value;
	}
	set maximum(value) {
		this.domain[1] = value;
	}
	get minimum() {
		return this.domain[0];
	}
	get maximum() {
		return this.domain[1]
	}
}

export class ScaleHorisontal extends Scale { // Заготовка горизонтальной шкалы
	constructor(object = {}) {
		super(object);
		this.nice = true;
		this.range = "width";
	}
}

export class ScaleVertical extends Scale { // Заготовка вертикальной шкалы
	constructor(object = {}) {
		super(object);
		this.nice = 1;
		this.range = "height";
	}
}

export class ScaleFlowCoef extends ScaleHorisontal { // Заготовка шкалы коэффициента производительности
	constructor(object = {}) {
		super(object);
		this.name = "φ";
	}
}

export class ScaleFlow extends ScaleHorisontal { // Заготовка шкалы производительности
	constructor(object = {}) {
		super(object);
		this.name = "Flow";
	}
}

export class ScalePresCoef extends ScaleVertical { // Заготовка шкалы коэффициента полного давления
	constructor(object = {}) {
		super(object);
		this.name = "ψ";
	}
}

export class ScalePres extends ScaleVertical { // Заготовка шкалы полного давления
	constructor(object = {}) {
		super(object);
		this.name = "Pres";
	}
}

export class ScaleEff extends ScaleVertical { // Заготовка шкалы коэффициента производительности
	constructor(object = {}) {
		super(object);
		this.name = "η";
	}
}

export class ScalePowerCoef extends ScaleVertical { // Заготовка шкалы коэффициента мощности
	constructor(object = {}) {
		super(object);
		this.name = "λ";
	}
}

export class ScalePower extends ScaleVertical { // Заготовка шкалы мощности
	constructor(object = {}) {
		super(object);
		this.name = "Power";
	}
}