import colors from "./colors";
export class Pin { // Заготовка точки на графике Vega
	constructor({
		name = "",
		color = "Navy",
		Q = null,
		Pv = null,
		Ps = null,
		η = null,
		ηs = null,
		Nv = null,
	} = {}) {
		this.name = name;
		this.type = "symbol";
		this.role = "graph-shadow";
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
		this.encode = {
			enter: {
				shape: {value:"circle",},
				size: {value:"30",},
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
				fill: {
					value: color
				},
				y: {},
				x: {
					scale: "Flow",
					value: this.fantune.workPoint.flow,
				},
			},
		};
	}
	makePres(pres) { // Сделать эту точку проекцией на ось давления
		this.encode.enter.fill.value = colors.pres;
		this.encode.enter.y.scale = "Pres";
		this.encode.enter.y.value = pres;
	}
	makeEff(eff) { // Сделать эту точку проекцией на ось КПД
		this.encode.enter.fill.value = colors.eff;
		this.encode.enter.y.scale = "η";
		this.encode.enter.y.value = eff;
	}
	makePower(power) { // Сделать эту точку проекцией на ось мощности
		this.encode.enter.fill.value = colors.power;
		this.encode.enter.y.scale = "Power";
		this.encode.enter.y.value = power;
	}
}


export class PinFullPres extends Pin { // Заготовка точки на кривой полного давления
	constructor(object = {}) {
		super(object);
		this.name = "PinFullPres";
		let pres = this.fantune.workPoint.fullPres;
		if (!pres) return;
		this.makePres(pres);
	}
}

export class PinStatPres extends Pin { // Заготовка точки на кривой статического давления
	constructor(object = {}) {
		super(object);
		this.name = "PinStatPres";
		let pres = this.fantune.workPoint.statPres;
		if (!pres) return;
		this.makePres(pres);
	}
}

export class PinFullEff extends Pin { // Заготовка точки на кривой полного КПД
	constructor(object = {}) {
		super(object);
		this.name = "PinFullEff";
		let eff = this.fantune.workPoint.fullEff;
		if (!eff) return;
		this.makeEff(eff);
	}
}

export class PinStatEff extends Pin { // Заготовка точки на кривой статического КПД
	constructor(object = {}) {
		super(object);
		this.name = "PinStatEff";
		let eff = this.fantune.workPoint.statEff;
		if (!eff) return;
		this.makeEff(eff);
	}
}

export class PinPower extends Pin { // Заготовка точки на кривой мощности
	constructor(object = {}) {
		super(object);
		this.name = "PinPower";
		let power = this.fantune.workPoint.power;
		if (!power) return;
		this.makePower(power);
	}
}


