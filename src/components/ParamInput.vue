<script setup lang="ts">import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { format } from "../ys/utils/float"

interface Item {
    key: string,
    text: string
}

const props = defineProps<{
    type: 'basic' | 'percentage' | 'enum'
    modelValue: number | string
    items?: Item[]
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number | string): void
}>()

const formated = computed(() => {
    if (props.type == 'percentage') {
        return format((props.modelValue as number) * 100, 2)
    } else {
        return props.modelValue
    }
})
const input = (e: any) => {
    let v = parseFloat(e.srcElement.value)
    v = props.type == 'percentage' ? v / 100 : v
    emit('update:modelValue', v)
}

const selected = computed(() => {
    if (props.items) {
        for (let i of props.items) {
            if (i.key == props.modelValue) {
                return i.text
            }
        }
    }
    return "";
})
const select = (key: string) => {
    emit('update:modelValue', key)
}
const selAll = (e: Event) => {
    (e.target as HTMLInputElement).select()
}

const showmenu = ref(false)
const menutop = ref(false)
const drop = (e: MouseEvent) => {
    if (showmenu.value) {
        showmenu.value = false
    } else {
        menutop.value = (e.clientY + 200 > window.innerHeight)
        showmenu.value = true
    }
}
</script>

<template>
    <div class="basic-input" v-if="type == 'basic'">
        <input :value="modelValue" @change="input" @focus="selAll" />
    </div>
    <div class="percentage-input" v-else-if="type == 'percentage'">
        <input :value="formated" @change="input" @focus="selAll" />
        <span class="split" />
        <span class="unit">%</span>
    </div>
    <div
        class="enum-input"
        v-else-if="type == 'enum' && items"
        @click="drop"
        @focusout="showmenu = false"
        tabindex="-1"
    >
        <span>{{ selected }}</span>
        <img :class="{ showmenu }" src="/assets/arrow.svg" width="12" />
        <transition name="pop">
            <div :class="{ menu: true, menutop }" v-show="showmenu">
                <div
                    class="menu-item"
                    v-for="item in items"
                    :key="item.key"
                    @click="select(item.key)"
                >
                    <div class="item-text">{{ item.text }}</div>
                </div>
            </div>
        </transition>
    </div>
    <div v-else>?</div>
</template>

<style scoped>
[class$="-input"] {
    display: inline-flex;
    width: 120px;
    height: 24px;
    background-color: white;
    box-shadow: 0 0 2px 0 #0007;
    border-radius: 3px;
    align-items: center;
    user-select: none;
    text-align: left;
}
input {
    border: none;
    background: none;
    padding: 0 5px;
    font-size: 16px;
}
.basic-input input {
    width: 100%;
    height: 100%;
}
.percentage-input input {
    width: 91px;
    height: 100%;
}
.split {
    height: 60%;
    width: 1px;
    border-right: 1px solid #eee;
    margin-left: 1px;
}
.unit {
    flex: 1;
    text-align: center;
}
.enum-input {
    width: 120px;
    padding: 0 5px;
    cursor: pointer;
    position: relative;
}
.enum-input > span {
    flex: 1;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.enum-input > img {
    transform: rotate(0deg);
    transition: transform 200ms ease;
}
.enum-input > img.showmenu {
    transform: rotate(180deg);
}
.menu {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background: #f7f7f7;
    box-shadow: 0 0 4px 0 #0007;
    border-radius: 3px;
    z-index: 2;
}
.menu.menutop {
    top: unset;
    bottom: 100%;
}
.menu-item {
    padding: 5px;
    word-break: break-all;
    word-wrap: break-word;
}
.menu-item:hover {
    background: #f0f0f0;
}
.pop-enter-active,
.pop-leave-active {
    transition: all 200ms ease;
}
.pop-enter-from,
.pop-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>