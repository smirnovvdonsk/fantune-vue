
<template>
  <div>
    <div :id="graphid" v-if="fan?.graph"></div>
    <!---->
    <div v-if="fan?.graph" style="display: none">
      <div>
        Это невидимое описание графика. Оно необходимо для обеспечения
        реактивности системы Vue.js, поскольку система не имеет совместимости с
        Vega.js.
      </div>
      <div>
        Очень важно, чтобы в этом описании были все числа, при изменении которых
        должен изменяться график.
      </div>
      <div>
        То есть, если график должен измениться при некотором событии, то в этом
        тексте должно присутствовать хотя бы одно число, которое надёжно
        изменяется при том же событии
      </div>
      <div>
        Также очень важно, чтобы этот текст появлялся и исчезал вместе с
        графиком.
      </div>
      <h4>График строит следующие массивы чисел:</h4>
      <div
        v-for="item in [
          { name: 'Расход', arr: QArray },
          { name: 'Давл. полн.', arr: PvArray },
          { name: 'Давл. стат.', arr: PsArray },
          { name: 'КПД полн.', arr: ηArray },
          { name: 'КПД стат.', arr: ηsArray },
          { name: 'Мощность', arr: NvArray },
        ]"
        :key="item.name"
      >
        {{ item.name }}: {{ item.arr.map((x) => x.toPrecision(4)).join(" | ") }}
      </div>
      <h4>График видит следующие диапазоны чисел:</h4>
      <div
        v-for="item in [
          { name: 'Расход', arr: [Qmin, Qmax] },
          { name: 'Давл.', arr: [Pmin, Pmax] },
          { name: 'КПД', arr: [ηmin, ηmax] },
          { name: 'Мощность', arr: [Nvmin, Nvmax] },
        ]"
        :key="item.name"
      >
        {{ item.name }}: от {{ item.arr[0] }} до {{ item.arr[1] }}
      </div>
      <h4>График строит следующие точки:</h4>
      <div
        v-for="item in [
          { name: 'Расход', pt: QPoint },
          { name: 'Давл. полн.', pt: PvPoint },
          { name: 'Давл. стат.', pt: PsPoint },
          { name: 'КПД полн.', pt: ηPoint },
          { name: 'КПД стат.', pt: ηsPoint },
          { name: 'Мощность', pt: NvPoint },
        ]"
        :key="item.name"
      >
        {{ item.name }}: {{ item.pt }}
      </div>
    </div>
  </div>
</template>

<script>
import * as Lines from "./classGraphMarkLine.js";
import * as Scales from "./classGraphSpaceScale.js";
import * as Axes from "./classGraphAxe.js";
import * as Datas from "./classGraphData.js";
import * as Rules from "./classGraphMarkRule.js";
import * as Texts from "./classGraphMarkText.js";
import * as Pins from "./classGraphMarkPin.js";

import * as vega from "vega";



export default {
  data() {
    return {
      vegaView: {},
    };
  },
  name: "Graph",
  props: {
    fan: Object, // Ссылка на объект, свойство которого будет изменяться
    graphid: {
      // идентификатор объекта DOM, где буте построен график Vega
      type: String,
      default: "fantune-vega-chart",
    },
  },
  mounted() {
    window.onresize = this.refresh; 
    this.refresh();
  },
  updated() {
    this.refresh();
  },
  beforeUnmount() { 
    this.vegaFinalize();
  },
  computed: {
    scales() {
      let obj = this;
      return [
        new Scales.ScaleFlow({ domain: [obj.Qmin, obj.Qmax] }),
        new Scales.ScalePres({ domain: [obj.Pmin, obj.Pmax] }),
        new Scales.ScaleEff({ domain: [obj.ηmin, obj.ηmax] }),
        new Scales.ScalePower({ domain: [obj.Nvmin, obj.Nvmax] }),
      ];
    },
    axes() {
      let obj = this;
      return [
        new Axes.AxeFlow({ title: `Q, ${obj.QRescale.suffix} м³/ч` }),
        new Axes.AxePres(),
        new Axes.AxeEff(),
        new Axes.AxePower({ title: `N, ${obj.NvRescale.suffix}` }),
      ];
    },
    data() {
      let obj = this;
      return [
        new Datas.DataNatural({
          values: obj.φArray.map(function (φ, i) {
            return {
              Flow: obj.QArray[i],
              FullPres: obj.PvArray[i],
              StatPres: obj.PsArray[i],
              η: obj.ηArray[i],
              ηs: obj.ηsArray[i],
              Power: obj.NvArray[i],
            };
          }),
        }),
      ];
    },
    marks() {
      let obj = this;
      return [
        new Lines.LineFullPres(),
        new Lines.LineStatPres(),
        new Lines.LineEff(),
        new Lines.LineStatEff(),
        new Lines.LinePower(),
        new Rules.RuleFlow({ Q: obj.QPoint }),
        new Rules.RuleFullPres({ Q: obj.QPoint, Pv: obj.PvPoint }),
        new Rules.RuleStatPres({ Q: obj.QPoint, Ps: obj.PsPoint }),
        new Rules.RuleFullEff({ Q: obj.QPoint, η: obj.ηPoint }),
        new Rules.RuleStatEff({ Q: obj.QPoint, ηs: obj.ηsPoint }),
        new Rules.RulePower({ Q: obj.QPoint, Nv: obj.NvPoint }),
        new Texts.TextFlow({ Q: obj.QPoint }),
        new Texts.TextFullPres({ Pv: obj.PvPoint }),
        new Texts.TextStatPres({ Ps: obj.PsPoint }),
        new Texts.TextFullEff({ η: obj.ηPoint }),
        new Texts.TextStatEff({ ηs: obj.ηsPoint }),
        new Texts.TextPower({ Nv: obj.NvPoint }),
        new Pins.PinFullPres({ Q: obj.QPoint, Pv: obj.PvPoint }),
        new Pins.PinStatPres({ Q: obj.QPoint, Ps: obj.PsPoint }),
        new Pins.PinFullEff({ Q: obj.QPoint, η: obj.ηPoint }),
        new Pins.PinStatEff({ Q: obj.QPoint, ηs: obj.ηsPoint }),
        new Pins.PinPower({ Q: obj.QPoint, Nv: obj.NvPoint }),
      ];
    },

    φArray() {
      return this.fan.graph.φArray;
    },
    QArray() {
      return this.fan.graph.QArray.map((x) => x / this.QRescale.factor);
    },
    PvArray() {
      return this.fan.graph.PvArray;
    },
    PsArray() {
      return this.fan.graph.PsArray;
    },
    ηArray() {
      return this.fan.graph.ηArray;
    },
    ηsArray() {
      return this.fan.graph.ηsArray;
    },
    NvArray() {
      return this.fan.graph.NvArray.map((x) => x / this.NvRescale.factor);
    },
    MvArray() {
      return this.fan.graph.MvArray;
    },

    Qmin() {
      return this.fan.graph.Qmin / this.QRescale.factor;
    },
    Qmax() {
      return this.fan.graph.Qmax / this.QRescale.factor;
    },
    Pmin() {
      return this.fan.graph.Pmin;
    },
    Pmax() {
      return this.fan.graph.Pmax;
    },
    ηmin() {
      return this.fan.graph.ηmin;
    },
    ηmax() {
      return this.fan.graph.ηmax;
    },
    Nvmin() {
      return this.fan.graph.Nvmin / this.NvRescale.factor;
    },
    Nvmax() {
      return this.fan.graph.Nvmax / this.NvRescale.factor;
    },

    QPoint() {
      return this.fan.graph.QPoint / this.QRescale.factor;
    },
    PvPoint() {
      return this.fan.graph.PvPoint;
    },
    PsPoint() {
      return this.fan.graph.PsPoint;
    },
    ηPoint() {
      return this.fan.graph.ηPoint;
    },
    ηsPoint() {
      return this.fan.graph.ηsPoint;
    },
    NvPoint() {
      return this.fan.graph.NvPoint / this.NvRescale.factor;
    },
    MvPoint() {
      return this.fan.graph.MvPoint;
    },

    QRescaleMatrix() {
      return [
        { limit: 0, factor: 1, suffix: "" },
        { limit: 1000, factor: 1000, suffix: "× 1 000" },
        { limit: 1000000, factor: 1000000, suffix: "× 1 000 000" },
      ];
    },
    QRescale() {
      return this.QRescaleMatrix[
        this.QRescaleMatrix.map(
          (x) => this.fan.graph.Qmax >= x.limit
        ).lastIndexOf(true)
      ];
    },
    NvRescaleMatrix() {
      return [
        { limit: 0, factor: 0.001, suffix: "Вт" },
        { limit: 1, factor: 1, suffix: "кВт" },
        { limit: 1000, factor: 1000, suffix: "МВт" },
        ,
        { limit: 1000000, factor: 1000000, suffix: "ГВт" },
        ,
      ];
    },
    NvRescale() {
      return this.NvRescaleMatrix[
        this.NvRescaleMatrix.map(
          (x) => this.fan.graph.Nvmax >= x.limit
        ).lastIndexOf(true)
      ];
    },
  },
  methods: {
    refresh() {
      let obj = this;
      let spec = {
        version: 5,
        width: -200 + obj.$el.parentElement.clientWidth,
        height: 500,
        padding: "auto",
        legends: [],
        scales: obj.scales,
        axes: obj.axes,
        data: obj.data,
        marks: obj.marks,
      };
      if (this.fan?.graph) {
        this.vegaRender(spec);
        this.$el.parentElement.oncontextmenu = this.saveSVG;
      }
    },
    saveSVG(event) {
      event.preventDefault();
      let blob = new Blob(
        [event.currentTarget.querySelector("svg").outerHTML],
        { type: "image/svg+xml" }
      );
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = `${this.fan.scheme}_d${this.fan.Dmm.toFixed(0)}mm_${
        this.fan.depth == 2 ? "TwinSide_" : ""
      }.svg`;
      a.click();
      window.URL.revokeObjectURL(url);
    },
    vegaRender(spec) {
      //let vueComponent = this;
      this.vegaView = new vega.View(vega.parse(spec), {
        renderer: "svg", // renderer (canvas or svg)
        container: `#${this.graphid}`, // parent DOM container
        hover: true, // enable hover processing
      });
      return this.vegaView.runAsync(); 
    },
    vegaFinalize() {
      this.vegaView.finalize();
    },
  },
};
</script>