const type = {wired:"Wired Mat", wired_alu:"Wired Mat-Alu", wired_extra:"Wired Mat-Extra",};
function den(value) {return value.toString() + " kg/m³"};
function th(value) {return value.toString() + " mm"};

export default [
																		//63	125		250		500		1000	2000	4000	8000
	{type:type.wired,		density:den(105),	thickness:th(30),	arr:[.03,	.04,	.50,	.80,	.85,	.80,	.85,	.92], },
	{type:type.wired_alu,	density:den(105),	thickness:th(30),	arr:[.02,	.07,	.55,	.80,	.80,	.75,	.80,	.84], },
	{type:type.wired,		density:den(80),	thickness:th(50),	arr:[.10,	.18,	.80,	.95,	.90,	.85,	.90,	.95], },
	{type:type.wired_alu,	density:den(80),	thickness:th(50),	arr:[.20,	.30,	.65,	.85,	.80,	.75,	.60,	.54], },
	{type:type.wired_extra,	density:den(80),	thickness:th(50),	arr:[.10,	.20,	.80,	.90,	.85,	.85,	.95,	.97], },
	{type:type.wired,		density:den(105),	thickness:th(50),	arr:[.15,	.25,	.70,	.85,	.85,	.80,	.55,	.51], },
	{type:type.wired_alu,	density:den(105),	thickness:th(50),	arr:[.15,	.25,	.70,	.85,	.85,	.80,	.55,	.51], },
	{type:type.wired_extra,	density:den(105),	thickness:th(50),	arr:[.09,	.17,	.80,	.85,	.85,	.85,	.95,	.99], },
	{type:type.wired,		density:den(80),	thickness:th(100),	arr:[.35,	.51,	.95,	.95,	.95,	.90,	.90,	.96], },
	{type:type.wired_alu,	density:den(80),	thickness:th(100),	arr:[.55,	.63,	.75,	.85,	.85,	.80,	.55,	.51], },
	{type:type.wired_extra,	density:den(80),	thickness:th(100),	arr:[.38,	.64,	.85,	.90,	.90,	.85,	.95,	.98], },
	{type:type.wired,		density:den(105),	thickness:th(100),	arr:[.45,	.56,	.85,	.95,	.95,	.90,	.90,	.90], },
	{type:type.wired_alu,	density:den(105),	thickness:th(100),	arr:[.50,	.57,	.80,	.80,	.90,	.80,	.55,	.49], },
	{type:type.wired_extra,	density:den(105),	thickness:th(100),	arr:[.45,	.59,	.80,	.85,	.90,	.90,	.90,	.93], },
];