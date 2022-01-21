const ΔLA = [-26.2, -16.1, -8.6, -3.2, 0, 1.2, 1, -1.1]; // коррекция А

export default function (Lpw) { // коррекция А
	let sum = Lpw
		.map((item, index) => Math.pow(10, 0.1 * (item + ΔLA[index])))
		.reduce((a, b) => a + b);
	return 10 * Math.log10(sum);
}