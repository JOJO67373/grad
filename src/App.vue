<script setup lang="ts">
import { computed, ref } from "vue"
import { format } from "./ys/utils/float";
import { simulationChart } from "./ys/simulate";
import Chart from 'chart.js/auto';

import ParamInput from './components/ParamInput.vue';
import ValueButton from "./components/ValueButton.vue";

const items = {
    sands: [
        { key: 'hpp', text: '生命值%' },
        { key: 'atkp', text: '攻击力%' },
        { key: 'defp', text: '防御力%' },
        { key: 'er', text: '充能' },
        { key: 'em', text: '精通' },
    ],
    goblet: [
        { key: 'hpp', text: '生命值%' },
        { key: 'atkp', text: '攻击力%' },
        { key: 'defp', text: '防御力%' },
        { key: 'pyroDB', text: '伤害加成' },
        { key: 'em', text: '精通' },
    ],
    circlet: [
        { key: 'hpp', text: '生命值%' },
        { key: 'atkp', text: '攻击力%' },
        { key: 'defp', text: '防御力%' },
        { key: 'cr', text: '暴击率' },
        { key: 'cd', text: '暴击伤害' },
        { key: 'hb', text: '治疗加成' },
        { key: 'em', text: '精通' },
    ],
}

const stat = ref({
    base: {
        baseHP: 9865,
        baseATK: 673,
        baseDEF: 626,
    },
    mains: {
        flower: 'hp',
        plume: 'atk',
        sands: 'atkp',
        goblet: 'pyroDB',
        circlet: 'cr',
    },
    art: {
        hp: 6652,
        atk: 712,
        def: 233,
        em: 138,
        cr: 0.447,
        cd: 0.303,
        er: 0.369,
    },
    weights: {
        hpp: 0,
        atkp: 1,
        defp: 0,
        cr: 1,
        cd: 1,
        em: 0,
        er: 0,
    }
})

const nhp = computed(() => {
    let ret = (stat.value.art.hp - 4780) / stat.value.base.baseHP
    Array('sands', 'goblet', 'circlet').forEach(type => {
        if ((stat.value.mains as any)[type] == 'hpp') {
            ret -= 0.466
        }
    });
    return ret / (0.0583 * 0.85)
})
const natk = computed(() => {
    let ret = (stat.value.art.atk - 311) / stat.value.base.baseATK
    Array('sands', 'goblet', 'circlet').forEach(type => {
        if ((stat.value.mains as any)[type] == 'atkp') {
            ret -= 0.466
        }
    });
    return ret / (0.0583 * 0.85)
})
const ndef = computed(() => {
    let ret = stat.value.art.def / stat.value.base.baseDEF
    Array('sands', 'goblet', 'circlet').forEach(type => {
        if ((stat.value.mains as any)[type] == 'defp') {
            ret -= 0.466
        }
    });
    return ret / (0.0729 * 0.85)
})
const nem = computed(() => {
    let ret = stat.value.art.em
    Array('sands', 'goblet', 'circlet').forEach(type => {
        if ((stat.value.mains as any)[type] == 'em') {
            ret -= 186.5
        }
    });
    return ret / (23.31 * 0.85)
})
const ncr = computed(() => {
    let ret = stat.value.art.cr
    if (stat.value.mains.circlet == 'cr') {
        ret -= 0.311
    }
    return ret / (0.0389 * 0.85)
})
const ncd = computed(() => {
    let ret = stat.value.art.cd
    if (stat.value.mains.circlet == 'cd') {
        ret -= 0.622
    }
    return ret / (0.0777 * 0.85)
})
const ner = computed(() => {
    let ret = stat.value.art.er
    if (stat.value.mains.sands == 'er') {
        ret -= 0.518
    }
    return ret / (0.0648 * 0.85)
})
const nall = computed(() => {
    return stat.value.weights.hpp * nhp.value
        + stat.value.weights.atkp * natk.value
        + stat.value.weights.defp * ndef.value
        + stat.value.weights.em * nem.value
        + stat.value.weights.cr * ncr.value
        + stat.value.weights.cd * ncd.value
        + stat.value.weights.er * ner.value
})

const show = ref(false)
const artComment = ref('')
const artLevel = ref('')
let gradChart = undefined
const start = () => {
    if (gradChart) {
        gradChart.destroy()
    }
    let ctx = document.getElementById('grad-chart') as HTMLCanvasElement
    let { config, comment, level } = simulationChart(stat.value.base, stat.value.mains, stat.value.weights, 20000, 300, nall.value)
    artComment.value = comment
    artLevel.value = level
    // @ts-ignore
    gradChart = new Chart(ctx, config)
    show.value = true
}
</script>

<template>
    <div class="subtitle">角色面板白字</div>
    <div class="param-row">
        <span>生命值：</span>
        <param-input type="basic" v-model="stat.base.baseHP" />
    </div>
    <div class="param-row">
        <span>攻击力：</span>
        <param-input type="basic" v-model="stat.base.baseATK" />
    </div>
    <div class="param-row">
        <span>防御力：</span>
        <param-input type="basic" v-model="stat.base.baseDEF" />
    </div>
    <div class="subtitle">圣遗物主词条</div>
    <div class="param-row">
        <span>沙：</span>
        <param-input type="enum" v-model="stat.mains.sands" :items="items.sands" />
    </div>
    <div class="param-row">
        <span>杯：</span>
        <param-input type="enum" v-model="stat.mains.goblet" :items="items.goblet" />
    </div>
    <div class="param-row">
        <span>头：</span>
        <param-input type="enum" v-model="stat.mains.circlet" :items="items.circlet" />
    </div>
    <div class="subtitle">圣遗物面板</div>
    <div class="param-row">
        <span>+生命值：</span>
        <param-input type="basic" v-model="stat.art.hp" />
    </div>
    <div class="param-row">
        <span>+攻击力：</span>
        <param-input type="basic" v-model="stat.art.atk" />
    </div>
    <div class="param-row">
        <span>+防御力：</span>
        <param-input type="basic" v-model="stat.art.def" />
    </div>
    <div class="param-row">
        <span>+精通：</span>
        <param-input type="basic" v-model="stat.art.em" />
    </div>
    <div class="param-row">
        <span>+暴击率：</span>
        <param-input type="percentage" v-model="stat.art.cr" />
    </div>
    <div class="param-row">
        <span>+暴击伤害：</span>
        <param-input type="percentage" v-model="stat.art.cd" />
    </div>
    <div class="param-row">
        <span>+充能：</span>
        <param-input type="percentage" v-model="stat.art.er" />
    </div>
    <div class="subtitle">有效词条</div>
    <div class="btns">
        <value-button v-model="stat.weights.hpp">生</value-button>
        <value-button v-model="stat.weights.atkp">攻</value-button>
        <value-button v-model="stat.weights.defp">防</value-button>
        <value-button v-model="stat.weights.em">精</value-button>
        <value-button v-model="stat.weights.cr">暴</value-button>
        <value-button v-model="stat.weights.cd">爆</value-button>
        <value-button v-model="stat.weights.er">充</value-button>
    </div>
    <div class="split" />
    <div class="result">
        <span class="affix">生：{{ format(nhp, 1) }}</span>
        <span class="affix">攻：{{ format(natk, 1) }}</span>
        <span class="affix">防：{{ format(ndef, 1) }}</span>
        <span class="affix">精：{{ format(nem, 1) }}</span>
        <span class="affix">暴：{{ format(ncr, 1) }}</span>
        <span class="affix">爆：{{ format(ncd, 1) }}</span>
        <span class="affix">充：{{ format(ner, 1) }}</span>
    </div>
    <div class="result">
        <span>当前词条数：</span>
        <span>{{ format(nall, 1) }}</span>
    </div>
    <div class="result">
        <div class="button" @click="start">练度评估</div>
    </div>
    <div v-show="show">
        <div class="result">{{ artComment }}</div>
        <div class="level">{{ artLevel }}</div>
        <div>圣遗物-体力成长曲线</div>
        <div class="comment">绿色区域表示标准差，在正态分布假设下，实际词条数落在绿色区域的概率为68.2%</div>
        <div class="chart-container">
            <canvas id="grad-chart" />
        </div>
        <div class="comment">小毕业：18天自回体，毕业：2万体力</div>
        <div
            class="comment"
        >圣遗物-体力曲线的计算方式是随机生成满级圣遗物，如果主词条正确则尝试配装。由于实际中不会把每个圣遗物都升满级来决定是否接受，因此这里的练度评估比较保守</div>
    </div>
</template>

<style>
body {
    box-sizing: border-box;
}
* {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
}
#app {
    text-align: center;
    font-size: 16px;
}
.subtitle {
    font-weight: bolder;
    margin-top: 12px;
    margin-bottom: 6px;
    color: blue;
}
.comment {
    font-size: 12px;
    color: gray;
}
.comment::before {
    content: "· ";
}
.param-row {
    padding: 5px;
}
.btns .value-btn {
    margin: 0 5px;
}
.split {
    height: 1px;
    border-bottom: 1px solid lightgray;
    margin: 10px 0;
}
.result {
    margin: 10px 0;
}
.affix {
    font-size: 12px;
    word-break: keep-all;
    white-space: nowrap;
    margin: 0 5px;
}
.button {
    display: inline-flex;
    height: 28px;
    line-height: 28px;
    background-color: #3694ff;
    box-shadow: 0 0 2px 0 #0007;
    border-radius: 3px;
    align-items: center;
    user-select: none;
    padding: 0 10px;
    color: white;
    cursor: pointer;
}
.button:hover {
    filter: brightness(1.2);
}
.chart-container {
    height: 400px;
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
}
.level {
    font-size: 20px;
    font-weight: bolder;
    margin-bottom: 10px;
}
</style>
