<script setup lang="ts">import { computed } from 'vue';

const props = defineProps<{
    modelValue: number
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', v: number): void
}>()
const btnClass = computed(() => ({
    'value-btn': true,
    one: props.modelValue == 1,
    zero: props.modelValue == 0
}))
const click = () => {
    if (props.modelValue == 0) {
        emit('update:modelValue', 0.5)
    } else if (props.modelValue == 0.5) {
        emit('update:modelValue', 1)
    } else {
        emit('update:modelValue', 0)
    }
}
</script>
<template>
    <div :class="btnClass" @click="click">
        <span class="blank">
            <slot />
        </span>
        <span class="fill">
            <slot />
        </span>
    </div>
</template>


<style scoped>
.value-btn {
    width: 48px;
    height: 24px;
    display: inline-block;
    border-radius: 3px;
    box-shadow: 0 0 2px 0 #0007;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    user-select: none;
}
.blank {
    background: white;
    color: #3694ff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
}
.fill {
    background: #3694ff;
    color: white;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    clip-path: polygon(0 0, 60% 0, 40% 100%, 0 100%);
    transition: clip-path 200ms ease;
}
.value-btn.one .fill {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.value-btn.zero .fill {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
}
</style>