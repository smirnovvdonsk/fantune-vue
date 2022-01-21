export default function linterp(xArray, yArray, x) { // Линейная интерполяция
	if (!xArray || !yArray || xArray.length <= 1 || yArray.length <= 1 || xArray.length != yArray.length) return;
	function y(x1, x2, y1, y2) {
		let a = (y1 - y2) / (x1 - x2);
		let b = y1 - a * x1;
		return (x) => a * x + b;
	};
	for (let i = 0; i <= (xArray.length - 1); i++) {
		if (x === xArray[i]) return yArray[i];
		if ((i === 0) && (x < xArray[i])) {
			return y(xArray[i], xArray[i + 1], yArray[i], yArray[i + 1])(x);
		};
		if (i === (xArray.length - 1)) {
			return y(xArray[i - 1], xArray[i], yArray[i - 1], yArray[i])(x);
		};
		if ((x > xArray[i]) && (x < xArray[i + 1])) {
			return y(xArray[i], xArray[i + 1], yArray[i], yArray[i + 1])(x);
		};
	};
}
