import colors from "./colors";
export class Text { // Заготовка подписи на оси для графика Vega
	constructor({
		name = "",
		text = "",
		color = "Navy",
		Q = null,
		Pv = null,
		Ps = null,
		η = null,
		ηs = null,
		Nv = null,
	} = {}) {
		this.name = name;
		this.type = "text";
		this.role = "graph-shadow";
		this.encode = {
			enter: {
				fontWeight: {
					value: "normal"
				},
				fontSize: {
					value: 10
				},
				align: {},
				baseline: {},
				opacity: {
					value: 1
				},
				strokeOpacity: {
					value: 0
				},
				strokeWidth: {
					value: 0
				},
				stroke: {
					value: "white"
				},
				text: {
					value: text
				},
				fill: {
					value: color
				},
				y: {},
				x: {},
			},
		};
		this.fantune = {
			workPoint: {
				flow: Q,
				fullPres: Pv,
				statPres: Ps,
				fullEff: η,
				statEff: ηs,
				power: Nv,
			},
		};
	}
}

export class TextHorizontal extends Text { // Заготовка подписи на горизонтальной оси для графика Vega
	constructor(object = {}) {
		super(object);
		this.encode.enter.align.value = "center";
	}
	makeFlow(flow) { // Сделать эту подпись проекцией на ось расхода
		this.encode.enter.fill.value = colors.flow;
		this.encode.enter.text.value = +(flow.toPrecision(4));
		this.encode.enter.x.scale = "Flow";
		this.encode.enter.x.value = flow;
		this.encode.enter.y.signal = "height";
		this.encode.enter.y.offset = -2;
	}
}

export class TextVertical extends Text { // Заготовка подписи на вертикальной оси для графика Vega
	constructor(object = {}) {
		super(object);
		this.encode.enter.align.value = "left";
		this.encode.enter.baseline.value = "middle";
		this.encode.enter.x.value = 2;
	}
	makePres(pres) { // Сделать эту подпись проекцией на ось давления
		this.encode.enter.fill.value = colors.pres;
		this.encode.enter.text.value = +(pres.toFixed(0));
		this.encode.enter.y.scale = "Pres";
		this.encode.enter.y.value = pres;
	}
	makeEff(eff) { // Сделать эту подпись проекцией на ось КПД
		this.encode.enter.fill.value = colors.eff;
		this.encode.enter.text.value = +(eff.toFixed(2));
		this.encode.enter.align.value = "right";
		this.encode.enter.x = {signal:"width",offset:-2}
		this.encode.enter.y.scale = "η";
		this.encode.enter.y.value = eff;
	}
	makePower(power) { // Сделать эту подпись проекцией на ось мощности
		this.encode.enter.fill.value = colors.power;
		this.encode.enter.text.value = +(power.toPrecision(3));
		this.encode.enter.align.value = "right";
		this.encode.enter.x = {signal:"width",offset:78}
		this.encode.enter.y.scale = "Power";
		this.encode.enter.y.value = power;
	}
}

export class TextFlow extends TextHorizontal { // Заготовка подписи на оси расхода
	constructor(object = {}) {
		super(object);
		this.name = "TextFlow";
		this.encode.enter.fontWeight.value = "bold";
		let flow = this.fantune.workPoint.flow;
		if (!flow) return;
		this.makeFlow(flow);
	}
}

export class TextFullPres extends TextVertical { // Заготовка подписи на оси полного давления
	constructor(object = {}) {
		super(object);
		this.name = "TextFullPres";
		this.encode.enter.fontWeight.value = "bold";
		let pres = this.fantune.workPoint.fullPres;
		if (!pres) return;
		this.makePres(pres);
	}
}

export class TextStatPres extends TextVertical { // Заготовка подписи на оси статического давления
	constructor(object = {}) {
		super(object);
		this.name = "TextStatPres";
		let pres = this.fantune.workPoint.statPres;
		if (!pres) return;
		this.makePres(pres);
	}
}

export class TextFullEff extends TextVertical { // Заготовка подписи на оси полного КПД
	constructor(object = {}) {
		super(object);
		this.name = "TextFullEff";
		this.encode.enter.fontWeight.value = "bold";
		let eff = this.fantune.workPoint.fullEff;
		if (!eff) return;
		this.makeEff(eff);
	}
}

export class TextStatEff extends TextVertical { // Заготовка подписи на оси статического КПД
	constructor(object = {}) {
		super(object);
		this.name = "TextStatEff";
		let eff = this.fantune.workPoint.statEff;
		if (!eff) return;
		this.makeEff(eff);
	}
}

export class TextPower extends TextVertical { // Заготовка подписи на оси мощности
	constructor(object = {}) {
		super(object);
		this.name = "TextPower";
		this.encode.enter.fontWeight.value = "bold";
		let power = this.fantune.workPoint.power;
		if (!power) return;
		this.makePower(power);
	}
}


