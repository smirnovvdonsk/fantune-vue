import colors from "./colors";
export class Rule { // Заготовка проецируюшей прямой линии для графика Vega
	constructor({
		name = "",
		width = 0.5,
		color = "Gray",
		strokeDash = [3,5],
		Q = null,
		Pv = null,
		Ps = null,
		η = null,
		ηs = null,
		Nv = null,
	} = {}) {
		this.name = name;
		this.type = "rule";
		this.role = "graph-shadow";
		this.encode = {
			enter: {
				stroke: {
					value: color
				},
				strokeDash: {
					value: strokeDash
				},
				strokeWidth: {
					value: width
				},
				x: {},
				x2: {},
				y: {},
				y2: {},
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
	makeFlow(flow) { // Сделать эту линию проекцией на ось расхода
		this.encode.enter.stroke.value = colors.flow;
		this.encode.enter.x.scale = "Flow";
		this.encode.enter.x.value = flow;
		this.encode.enter.y.signal = "height";
		this.encode.enter.y.mult = 0.0;
		this.encode.enter.y2.signal = "height";
		this.encode.enter.y2.offset = -8;
	}
	makePres(flow, pres) { // Сделать эту линию проекцией на ось давления
		this.encode.enter.stroke.value = colors.pres;
		this.encode.enter.x.value = 30;
		this.encode.enter.x2.scale = "Flow";
		this.encode.enter.x2.value = flow;
		this.encode.enter.y.scale = "Pres";
		this.encode.enter.y.value = pres;
	}
	makeEff(flow, eff) { // Сделать эту линию проекцией на ось КПД
		this.encode.enter.stroke.value = colors.eff;
		this.encode.enter.x.signal = "width";
		this.encode.enter.x.offset = -25;
		this.encode.enter.x2.scale = "Flow";
		this.encode.enter.x2.value = flow;
		this.encode.enter.y.scale = "η";
		this.encode.enter.y.value = eff;
	}
	makePower(flow, power) { // Сделать эту линию проекцией на ось мощности
		this.encode.enter.stroke.value = colors.power;
		this.encode.enter.x.signal = "width";
		this.encode.enter.x.offset = 30;
		this.encode.enter.x2.scale = "Flow";
		this.encode.enter.x2.value = flow;
		this.encode.enter.y.scale = "Power";
		this.encode.enter.y.value = power;
	}
}

export class RuleFlow extends Rule { // Заготовка проецируюшей прямой линии расхода
	constructor(object = {}) {
		super(object);
		this.name = "RuleFlow";
		let flow = this.fantune.workPoint.flow;
		if (!flow) return;
		this.makeFlow(flow);
	}
}

export class RuleFullPres extends Rule { // Заготовка проецируюшей прямой линии полного давления
	constructor(object = {}) {
		super(object);
		this.name = "RuleFullPres";
		let flow = this.fantune.workPoint.flow,
			pres = this.fantune.workPoint.fullPres;
		if (!flow || !pres) return;
		this.makePres(flow, pres);
	}
}

export class RuleStatPres extends Rule { // Заготовка проецируюшей прямой линии статического давления
	constructor(object = {}) {
		super(object);
		this.name = "RuleStatPres";
		let flow = this.fantune.workPoint.flow,
			pres = this.fantune.workPoint.statPres;
		if (!flow || !pres) return;
		this.makePres(flow, pres);
	}
}

export class RuleFullEff extends Rule { // Заготовка проецируюшей прямой линии полного КПД
	constructor(object = {}) {
		super(object);
		this.name = "RuleFullEff";
		let flow = this.fantune.workPoint.flow,
			eff = this.fantune.workPoint.fullEff;
		if (!flow || !eff) return;
		this.makeEff(flow, eff);
	}
}

export class RuleStatEff extends Rule { // Заготовка проецируюшей прямой линии статического КПД
	constructor(object = {}) {
		super(object);
		this.name = "RuleStatEff";
		let flow = this.fantune.workPoint.flow,
			eff = this.fantune.workPoint.statEff;
		if (!flow || !eff) return;
		this.makeEff(flow, eff);
	}
}

export class RulePower extends Rule { // Заготовка проецируюшей прямой линии мощности
	constructor(object = {}) {
		super(object);
		this.name = "RulePower";
		let flow = this.fantune.workPoint.flow,
			power = this.fantune.workPoint.power;
		if (!flow || !power) return;
		this.makePower(flow, power);
	}
}

