import * as Scales from './classGraphSpaceScale.js'; // Заготовки пространственных шкал для графика Vega
import * as Axes from './classGraphAxe.js'; // Заготовки осей для графика Vega
import * as Datas from './classGraphData.js'; // Заготовки таблицы точек для графика Vega
import * as Lines from './classGraphMarkLine.js'; // Заготовки кривых для графика Vega
import * as Rules from './classGraphMarkRule.js'; // Заготовки проецируюших прямых линий для графика Vega
import * as Texts from './classGraphMarkText.js'; // Заготовки подписей на осях для графика Vega
import * as Pins from './classGraphMarkPin.js'; // Заготовки подписей на осях для графика Vega


////////////////////////////////////

export class Graph { // Минималистичная заготовка графика Vega с методами
	constructor() {
		this.version = 5;
		this.width = 840;
		this.height = 300;
		this.padding = "auto";
		this.marks = [];
		this.scales = [];
		this.legends = [];
		this.axes = [];
		this.data = [];
	}
	async vegaRender(selector, width, height) {
		if (width) this.width = width;
		if (height) this.height = height;
		let view = new vega.View(vega.parse(this), {
			renderer: 'svg',  // renderer (canvas or svg)
			container: selector,   // parent DOM container
			hover: true,       // enable hover processing
			//resize: 'fit', // Это может не работать
		});
		return view.runAsync();
	}
	getJSON() {
		return JSON.stringify(this);
	}
	getScaleByName(name) {
		let result;
		this.scales.forEach(function (item) {
			if (item.name == name) result = item;
		});
		return result;
	}
	getDataByName(name) {
		let result;
		this.data.forEach(function (item) {
			if (item.name == name) result = item;
		});
		return result;
	}
	getMarkByName(name) {
		let result;
		this.marks.forEach(function (item) {
			if (item.name == name) result = item;
		});
		return result;
	}
	getAxeByName(name) {
		let result;
		this.axes.forEach(function (item) {
			if (item.name == name) result = item;
		});
		return result;
	}
}

export class GraphSizeLess extends Graph { // Заготовка безразмерного графика Vega с методами
	constructor(φGArray, ψGArray, ψsGArray, ηGArray, λGArray) {
		super();
		this.width = 500;
		this.height = 200;
		this.scales.push(	new Scales.ScaleFlowCoef()	);;
		this.scales.push(	new Scales.ScalePresCoef()	);
		this.scales.push(	new Scales.ScaleEff()		);
		this.scales.push(	new Scales.ScalePowerCoef()	);
		this.axes.push(		new Axes.AxeFlowCoef()		);
		this.axes.push(		new Axes.AxePresCoef()		);
		this.axes.push(		new Axes.AxeEff()			);
		this.axes.push(		new Axes.AxePowerCoef()		);
		this.data.push(		new Datas.DataSizeLess()	);
		this.marks.push(	new Lines.LineFullPresCoef());
		this.marks.push(	new Lines.LineStatPresCoef());
		this.marks.push(	new Lines.LineEffCoef()		);
		this.marks.push(	new Lines.LinePowerCoef()	);

		this.refreshData(φGArray, ψGArray, ψsGArray, ηGArray, λGArray);
	}
	refreshData(φGArray, ψGArray, ψsGArray, ηGArray, λGArray) {
		this.scaleFlowCoef.minimum = Math.min.apply(null, φGArray);
		this.scaleFlowCoef.maximum = Math.max.apply(null, φGArray);

		this.dataSizeLess.addVarArray("φ", φGArray);
		this.dataSizeLess.addVarArray("ψ", ψGArray);
		this.dataSizeLess.addVarArray("ψs", ψsGArray);

		this.scalePresCoef.minimum = Math.min.apply(null, ψGArray.concat(ψsGArray));
		this.scalePresCoef.maximum = Math.max.apply(null, ψGArray.concat(ψsGArray));

		this.dataSizeLess.addVarArray("η", ηGArray);

		this.scaleEff.minimum = Math.min.apply(null, ηGArray);
		this.scaleEff.maximum = Math.max.apply(null, ηGArray);

		this.dataSizeLess.addVarArray("λ", λGArray);
		
		this.scalePowerCoef.minimum = Math.min.apply(null, λGArray);
		this.scalePowerCoef.maximum = Math.max.apply(null, λGArray);
	}
	get scaleFlowCoef() {
		return this.getScaleByName("φ");
	}
	get scalePresCoef() {
		return this.getScaleByName("ψ");
	}
	get scaleEff() {
		return this.getScaleByName("η");
	}
	get scalePowerCoef() {
		return this.getScaleByName("λ");
	}
	get dataSizeLess() {
		return this.getDataByName("SizeLess");
	}
}


export class GraphNatural extends Graph { // Заготовка натурального графика Vega с методами
	constructor(QGArray, PvGArray, PsGArray, ηGArray, ηsGArray, NvGArray, Q=null, Pv=null, Ps=null, η=null, ηs=null, Nv=null) {
		super();
		this.width = 500;
		this.height = 440;
		this.scales.push(	new Scales.ScaleFlow()	);;
		this.scales.push(	new Scales.ScalePres()	);
		this.scales.push(	new Scales.ScaleEff()	);
		this.scales.push(	new Scales.ScalePower()	);
		this.axes.push(		new Axes.AxeFlow()		);
		this.axes.push(		new Axes.AxePres()		);
		this.axes.push(		new Axes.AxeEff()		);
		this.axes.push(		new Axes.AxePower()		);
		this.data.push(		new Datas.DataNatural()	);
		this.marks.push(	new Lines.LineFullPres());
		this.marks.push(	new Lines.LineStatPres());
		this.marks.push(	new Lines.LineEff()		);
		this.marks.push(	new Lines.LineStatEff()	);
		this.marks.push(	new Lines.LinePower()	);

		this.refreshData(QGArray, PvGArray, PsGArray, ηGArray, ηsGArray, NvGArray, Q, Pv, Ps, η, ηs, Nv);
	}
	refreshData(QGArray, PvGArray, PsGArray, ηGArray, ηsGArray, NvGArray, Q=null, Pv=null, Ps=null, η=null, ηs=null, Nv=null) {
		function rescaleNumber(valueArray, rescaleMatrix) { // Для указанного массива величины возвращает номер в матрице
			let minimum = Math.min.apply(null, valueArray),
				maximum = Math.max.apply(null, valueArray),
				limitNumber = 0;
			rescaleMatrix.forEach( (item,index) => { if (minimum >= item.limit) {limitNumber = index} } );
			return limitNumber;
		};
		function rescaleValue(value, rescaleMatrix, rescaleNumber) {
			let factor = rescaleMatrix[rescaleNumber].factor;
			if (factor == 1) {
				return value;
			} else { 
				return value / factor;
			}
		}
		function rescaleArray(valueArray, rescaleMatrix, rescaleNumber) {
			return valueArray.map( item => rescaleValue(item, rescaleMatrix, rescaleNumber) );
		}
		
		let rescaleFlowMatrix = [
			{ limit: 0,			factor:1,		suffix:""},
			{ limit: 1000,		factor:1000,	suffix:"× 1 000"},
			{ limit: 1000000,	factor:1000000,	suffix:"× 1 000 000"},
		];
		
		let rescaleFlowNumber = rescaleNumber(QGArray, rescaleFlowMatrix);
		this.axeFlow.title = "Q, ";
		this.axeFlow.title += rescaleFlowMatrix[rescaleFlowNumber].suffix;
		this.axeFlow.title += " м³/ч";
		QGArray = rescaleArray(QGArray, rescaleFlowMatrix, rescaleFlowNumber);
		Q = rescaleValue(Q, rescaleFlowMatrix, rescaleFlowNumber);
		
		this.dataNatural.addVarArray("Flow", QGArray);
		this.dataNatural.addVarArray("FullPres", PvGArray);
		this.dataNatural.addVarArray("StatPres", PsGArray);

		this.scaleFlow.minimum = Math.min.apply(null, QGArray);
		this.scaleFlow.maximum = Math.max.apply(null, QGArray);

		this.scalePres.minimum = Math.min.apply(null, PvGArray.concat(PsGArray));
		this.scalePres.maximum = Math.max.apply(null, PvGArray.concat(PsGArray));

		this.dataNatural.addVarArray("η", ηGArray);
		this.dataNatural.addVarArray("ηs", ηsGArray);

		this.scaleEff.minimum = Math.min.apply(null, ηGArray.concat(ηsGArray));
		this.scaleEff.maximum = Math.max.apply(null, ηGArray.concat(ηsGArray));

		let rescalePowerMatrix = [
			{ limit: 0,		factor:1/1000,	suffix:"Вт"},
			{ limit: 1,		factor:1,		suffix:"кВт"},
			{ limit: 1000,	factor:1000,	suffix:"МВт"},
		];
		let rescalePowerNumber = rescaleNumber(NvGArray, rescalePowerMatrix);
		this.axePower.title = "N, ";
		this.axePower.title += rescalePowerMatrix[rescalePowerNumber].suffix;
		NvGArray = rescaleArray(NvGArray, rescalePowerMatrix, rescalePowerNumber);
		Nv = rescaleValue(Nv, rescalePowerMatrix, rescalePowerNumber);
		
		this.dataNatural.addVarArray("Power", NvGArray);
		
		this.scalePower.minimum = Math.min.apply(null, NvGArray);
		this.scalePower.maximum = Math.max.apply(null, NvGArray);
		

		this.marks = this.marks.filter( (item) => ((item.type !== "rule") && (item.type !== "text") && (item.type !== "symbol")) ); // Очистка графика от проекций
		this.marks.push( new Rules.RuleFlow({Q}));
		this.marks.push( new Rules.RuleFullPres({Q, Pv}));
		this.marks.push( new Rules.RuleStatPres({Q, Ps}));
		this.marks.push( new Rules.RuleFullEff({Q, η}));
		this.marks.push( new Rules.RuleStatEff({Q, ηs}));
		this.marks.push( new Rules.RulePower({Q, Nv}));
		this.marks.push( new Texts.TextFlow({Q}));
		this.marks.push( new Texts.TextFullPres({Pv}));
		this.marks.push( new Texts.TextStatPres({Ps}));
		this.marks.push( new Texts.TextFullEff({η}));
		this.marks.push( new Texts.TextStatEff({ηs}));
		this.marks.push( new Texts.TextPower({Nv}));
		this.marks.push( new Pins.PinFullPres({Q, Pv}));
		this.marks.push( new Pins.PinStatPres({Q, Ps}));
		this.marks.push( new Pins.PinFullEff({Q, η}));
		this.marks.push( new Pins.PinStatEff({Q, ηs}));
		this.marks.push( new Pins.PinPower({Q, Nv}));
	}
	get scaleFlow() {
		return this.getScaleByName("Flow");
	}
	get scalePres() {
		return this.getScaleByName("Pres");
	}
	get scaleEff() {
		return this.getScaleByName("η");
	}
	get scalePower() {
		return this.getScaleByName("Power");
	}
	get axeFlow() {
		return this.getAxeByName("Flow");
	}
	get axePower() {
		return this.getAxeByName("Power");
	}
	get dataNatural() {
		return this.getDataByName("Natural");
	}
}