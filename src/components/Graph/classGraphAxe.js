import colors from "./colors";
export class Axe { // Заготовка оси для графика Vega с методами
	constructor({
		name = "Flow",
		orient = "bottom", // bottom | left | right | top
		title = "Q, м³/ч", // Подпись у оси
		scale = "x", // имя соответствующей шкалы
		format = "d", // формат подписанных чисел
		grid = true, // сетка
	} = {}) {
		this.name = name;
		this.orient = orient;
		this.title = title;
		this.scale = scale;
		this.format = format;
		this.grid = grid;
	}
}

export class AxeFlowCoef extends Axe { // Заготовка оси коэффициента производительности
	constructor(object = {}) {
		super(object);
		this.name = "φ";
		this.orient = "bottom";
		this.title = "φ (Коэф. производительности)";
		this.scale = "φ";
		this.format = ".3";
	}
}

export class AxeFlow extends Axe { // Заготовка оси производительности
	constructor(object = {}) {
		super(object);
		this.name = "Flow";
		this.orient = "bottom";
		this.scale = "Flow";
		this.format = ".5";
		//this.gridColor = "#ffdddd";
		this.domainColor = colors.flow;
		this.labelColor = this.domainColor;
		this.titleColor = this.domainColor;
	}
}

export class AxePresCoef extends Axe { // Заготовка оси коэффициента давления
	constructor(object = {}) {
		super(object);
		this.name = "ψ";
		this.orient = "left";
		this.title = "ψ (Коэф. давления)";
		this.scale = "ψ";
		this.format = ".3";
	}
}

export class AxePres extends Axe { // Заготовка оси давления
	constructor(object = {}) {
		super(object);
		this.name = "Pres";
		this.orient = "left";
		this.title = "p, Па";
		this.scale = "Pres";
		this.format = "d";
	}
}

export class AxeEff extends Axe { // Заготовка оси полного КПД
	constructor(object = {}) {
		super(object);
		this.name = "η";
		this.orient = "right";
		this.title = "η (КПД)";
		this.scale = "η";
		this.format = ".3";
		//this.gridColor = "#ddffdd";
		this.domainColor = colors.eff;
		this.labelColor = this.domainColor;
		this.offset = 0;
		this.titleAngle = 270;
		this.titlePadding = 15;
		this.titleColor = this.domainColor;
	}
}

export class AxePowerCoef extends Axe { // Заготовка оси коэффициента мощности
	constructor(object = {}) {
		super(object);
		this.name = "λ";
		this.orient = "right";
		this.title = "λ (Коэф. мощности)";
		this.scale = "λ";
		this.format = ".3";
		//this.gridColor = "#ffdddd";
		this.domainColor = colors.power;
		this.labelColor = this.domainColor;
		this.offset = 60;
		this.titleAngle = 270;
		this.titlePadding = 15;
		this.titleColor = this.domainColor;
	}
}

export class AxePower extends Axe { // Заготовка оси мощности
	constructor(object = {}) {
		super(object);
		this.name = "Power";
		this.orient = "right";
		this.scale = "Power";
		this.format = ".5";
		//this.gridColor = "#ffdddd";
		this.domainColor = colors.power;
		this.labelColor = this.domainColor;
		this.offset = 80;
		this.titleAngle = 270;
		this.titlePadding = 15;
		this.titleColor = this.domainColor;
	}
}