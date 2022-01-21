<template>
  <div class="row">
    <div class="col">
      <div>
        Схема:
        <transition appear name="fade-scale" mode="out-in">
          <span v-if="fan?.scheme" class="badge bg-primary">{{
            fan?.scheme
          }}</span>
          <div
            v-else
            class="spinner-border spinner-border-sm text-info"
            role="status"
          ></div>
        </transition>
      </div>
      <!-- <PhysInput :obj="fan" v-for="val in [
										// 	имя		надпись					ед. изм				подсказка				toFixed
										[	'Dmm',		'D',				'мм',				'Диаметр колеса',			0	],
										[	'Q',		'Q',				'м<sup>3</sup>/ч',	'Производительность',		0	],
									]" :valuename="val[0]" :prepend="val[1]" :append="val[2]" :tooltip="val[3]" :tofixed="val[4]" :key="val[0]">
								</PhysInput> -->

      <PhysOutput
        :obj="fan"
        v-for="val in [
          // 	имя		надпись					ед. изм				подсказка				toFixed
          ['Dmm', 'D', 'мм', 'Диаметр колеса', 0],
          ['Nv', 'N', 'кВт', 'Мощность на валу', 2],
          ['Mv', 'M', 'Н·м', 'Момент на валу', 1],
          ['Q', 'Q', 'м<sup>3</sup>/ч', 'Производительность', 0],
          ['Pv', 'P<sub>v</sub>', 'Па', 'Давление полное', 0],
          ['Ps', 'P<sub>s</sub>', 'Па', 'Давление статическое', 0],
          ['η', 'η<sub>v</sub>', '', 'КПД полный', 3],
          ['ηs', 'η<sub>s</sub>', '', 'КПД статический', 3],
          ['u', 'u', 'м/с', 'Окружная скорость', 1],
        ]"
        :valuename="val[0]"
        :prepend="val[1]"
        :append="val[2]"
        :tooltip="val[3]"
        :tofixed="val[4]"
        :key="val[0]"
      >
      </PhysOutput>
      <PhysOutput
        :obj="dim"
        v-for="val in [
          // 	имя		надпись					ед. изм				подсказка				toFixed
          [
            'b1',
            'b<sub>1</sub>',
            (fan?.depth == 2 ? '(×2) ' : '') + 'мм',
            'Ширина колеса на входе',
            0,
          ],
          [
            'b2',
            'b<sub>2</sub>',
            (fan?.depth == 2 ? '(×2) ' : '') + 'мм',
            'Ширина колеса на выходе',
            0,
          ],
        ]"
        :valuename="val[0]"
        :prepend="val[1]"
        :append="val[2]"
        :tooltip="val[3]"
        :tofixed="val[4]"
        :key="val[0]"
      >
      </PhysOutput>
    </div>

    <div class="col">
      <DimDraw :obj="fan" :tofixed="0"> </DimDraw>
    </div>
  </div>
</template>

<script>
import PhysInput from "./PhysInput.vue";
import PhysOutput from "./PhysOutput.vue";
import DimDraw from "./DimDraw/DimDraw.vue";

export default {
  name: "ResultFanCard",
  props: {
    fan: Object,
  },
  components: {
    PhysInput,
    PhysOutput,
    DimDraw,
  },
  computed: {
    dim() {
      // Костыль временный для показа некоторых размеров вентилятора в этой карточке с параметрами. Убрать, когда эти размеры появытся на картинке.
      return {
        b1: this.fan?.dim[10],
        b2: this.fan?.dim[11],
      };
    },
  },
};
</script>
