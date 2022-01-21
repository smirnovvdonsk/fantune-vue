import colors from "./colors";
const STROKE_DASH = [3,3] // Параметр прерывистости для пунктирных кривых
/////////////////////////////////////////////////////////////////////
export class Line { // Заготовка кривой для графика Vega
	constructor({
		name = "",
		dataName = "pressureGraph",
		xScale = "x",
		xField = "flow",
		yScale = "y",
		yField = "fullpres",
		color = colors.pres,
		interpolate = "cardinal",
		width = 1.25
	} = {}) {
		this.name = name;
		this.type = "line";
		this.role = "graph-shadow";
		this.from = {
			data: dataName,
		};
		this.encode = {
			enter: {
				x: {
					scale: xScale,
					field: xField,
				},
				y: {
					scale: yScale,
					field: yField,
				},
				stroke: {
					value: color
				},
				interpolate: {
					value: interpolate
				},
				strokeWidth: {
					value: width
				},
			},
		};

	}
}

export class LineFullPresCoef extends Line { // Заготовка кривой коэффициента полного давления
	constructor(object = {}) {
		super(object);
		this.name = "ψ";
		this.from.data = "SizeLess";
		this.encode.enter.x.scale = "φ";
		this.encode.enter.x.field = "φ";
		this.encode.enter.y.scale = "ψ";
		this.encode.enter.y.field = "ψ";
		this.encode.enter.stroke.value = colors.pres;

	}
}

export class LineStatPresCoef extends LineFullPresCoef { // Заготовка кривой коэффициента статического давления
	constructor(object = {}) {
		super(object);
		this.name = "ψs";
		this.encode.enter.y.field = "ψs";
		this.encode.enter.strokeDash = {value: STROKE_DASH};
	}
}

export class LineFullPres extends Line { // Заготовка кривой полного давления
	constructor(object = {}) {
		super(object);
		this.name = "FullPres";
		this.from.data = "Natural";
		this.encode.enter.x.scale = "Flow";
		this.encode.enter.x.field = "Flow";
		this.encode.enter.y.scale = "Pres";
		this.encode.enter.y.field = "FullPres";
		this.encode.enter.stroke.value = colors.pres;

	}
}

export class LineStatPres extends LineFullPres { // Заготовка кривой статического давления
	constructor(object = {}) {
		super(object);
		this.name = "StatPres";
		this.encode.enter.y.field = "StatPres";
		this.encode.enter.strokeDash = {value: STROKE_DASH};
	}
}

export class LineEffCoef extends Line { // Заготовка кривой КПД для безразмерного графика
	constructor(object = {}) {
		super(object);
		this.name = "η";
		this.from.data = "SizeLess";
		this.encode.enter.x.scale = "φ";
		this.encode.enter.x.field = "φ";
		this.encode.enter.y.scale = "η";
		this.encode.enter.y.field = "η";
		this.encode.enter.stroke.value = colors.eff;
	}
}

export class LineEff extends Line { // Заготовка кривой КПД для натурального графика
	constructor(object = {}) {
		super(object);
		this.name = "η";
		this.from.data = "Natural";
		this.encode.enter.x.scale = "Flow";
		this.encode.enter.x.field = "Flow";
		this.encode.enter.y.scale = "η";
		this.encode.enter.y.field = "η";
		this.encode.enter.stroke.value = colors.eff;
	}
}

export class LineStatEff extends LineEff { //Заготовка кривой статического КПД для натурального графика
	constructor(object = {}) {
		super(object);
		this.name = "ηs";
		this.encode.enter.y.field = "ηs";
		this.encode.enter.strokeDash = {value: STROKE_DASH};
	}
}

export class LinePowerCoef extends Line { // Заготовка кривой коэффициента мощности
	constructor(object = {}) {
		super(object);
		this.name = "λ";
		this.from.data = "SizeLess";
		this.encode.enter.x.scale = "φ";
		this.encode.enter.x.field = "φ";
		this.encode.enter.y.scale = "λ";
		this.encode.enter.y.field = "λ";
		this.encode.enter.stroke.value = colors.power;
	}
}

export class LinePower extends Line { // Заготовка кривой мощности
	constructor(object = {}) {
		super(object);
		this.name = "Power";
		this.from.data = "Natural";
		this.encode.enter.x.scale = "Flow";
		this.encode.enter.x.field = "Flow";
		this.encode.enter.y.scale = "Power";
		this.encode.enter.y.field = "Power";
		this.encode.enter.stroke.value = colors.power;
	}
}