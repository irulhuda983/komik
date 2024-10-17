<script setup>
import { ref } from "vue";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const props = defineProps(["menuName"]);
const emit = defineEmits(["onClick"]);

const menuName = ref(props.menuName);

const onClickHandler = () => {
    emit("onClick");
};
</script>

<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger @click.prevent="onClickHandler()">
                <slot name="menu-content"></slot>
            </TooltipTrigger>
            <TooltipContent>
                <p>{{ menuName }}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>
