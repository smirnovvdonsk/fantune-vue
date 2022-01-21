export class Data { // Заготовка таблицы точек для графика Vega с методами
	constructor({
		name = "",
		values = [],
	} = {}) {
		this.name = name;
		this.values = values;
	}
	addPoint(object) { // Прямое добавление поименованного объекта - точки на графике
		this.values.push(object);
	}
	addVarArray(varName, arr = []) { // Добавление массива одной величины - одномерного массива
		for (let i=0; i<=(arr.length-1); i++) {
			if (typeof(this.values[i]) == "object") {
				this.values[i][varName] = arr[i];
			} else {
				this.addPoint({[varName]:arr[i]});
			};
		};
	}
}

export class DataSizeLess extends Data { // Заготовка таблицы точек для графика безразмерных характеристик Vega с методами
	constructor(object = {}) {
		super(object);
		this.name = "SizeLess";
	}
}

export class DataNatural extends Data { // Заготовка таблицы точек для графика натуральных характеристик Vega с методами
	constructor(object = {}) {
		super(object);
		this.name = "Natural";
	}
}