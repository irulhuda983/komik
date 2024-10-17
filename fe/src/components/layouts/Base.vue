<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from "vue";
import { RouterView } from "vue-router";
import Menubar from "@/components/layouts/Menubar.vue";
import Navbar from "@/components/layouts/Navbar.vue";
</script>

<template>
    <div class="w-screen h-screen box-border overflow-x-hidden overflow-y-auto flex justify-between relative bg-background text-foreground">
        <div class="w-full transition-all fixed bottom-0 box-border flex-none z-40 box-border overflow-hidden">
            <Menubar />
        </div>

        <div class="relative w-full overflow-x-hidden flex-1">
            <div class="w-full box-border overflow-x-hidden pb-[100px] lg:pb-[20px] flex flex-col items-center">
                <RouterView />
            </div>
        </div>
    </div>
</template>
