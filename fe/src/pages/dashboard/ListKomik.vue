<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/composables/api.js";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LogoImg from "@/assets/img/logo.png";

import Favorit from "./part/Favorit.vue";
import { ChevronsLeft, ChevronsRight, Heart, Clock } from "lucide-vue-next";

const router = useRouter();

const isLoading = ref(false);
const dataset = ref([]);
const page = ref(1);
const prevPage = ref(null);
const nextPage = ref(null);

const fetchData = async (pages) => {
    isLoading.value = ref(true);
    try {
        const { data } = await api.get(`/komik?page=${pages}`);

        dataset.value = data.data.komik;
        page.value = data.data.currentPage;
        prevPage.value = data.data.prevPage;
        nextPage.value = data.data.nextPage;
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

const changePage = async (pages) => {
    if (!pages) {
        return;
    }
    // page.value = pages;
    fetchData(pages);
};

const viewChar = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    }
    return str;
};

onMounted(() => {
    fetchData(page.value);
});
</script>

<template>
    <div class="w-full lg:w-[480px] box-border px-4 pb-10">
        <div class="w-full box-border grid grid-cols-3 gap-x-3 gap-y-5 py-4 border-b border-border">
            <div v-for="(item, i) in dataset" class="w-full">
                <div class="w-full box-border rounded-md cursor-pointer" @click.prevent="router.push({ name: 'detailKomik', params: { slug: item.slug } })">
                    <div class="w-full box-border overflow-hidden flex items-center justify-center rounded-md">
                        <img :src="`${item.imageUrl}?resize=260,300`" alt="" />
                    </div>

                    <div class="w-full box-border mt-2">
                        <div class="flex items-center gap-x-3">
                            <div v-for="(gn, ingn) in item.genre" class="text-xs font-light text-primary">{{ gn }}</div>
                        </div>
                        <h1 class="text-sm font-semibold mb-2">{{ viewChar(item.title, 16) }}</h1>

                        <div class="w-full flex items-center justify-between">
                            <div class="text-xs">Ch. {{ item.lastCh }}</div>
                            <div class="text-xs text-primary flex items-center gap-x-1 justify-center">
                                <Heart class="size-3" />
                                <span>{{ item.reader }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full box-border flex items-center justify-center gap-x-3 py-4">
            <div>
                <button v-if="prevPage" @click.prevent="changePage(prevPage)" class="flex items-center rounded border border-white px-2 py-1 text-sm gap-x-1">
                    <ChevronsLeft class="size-4" />
                    <div>Prev</div>
                </button>
                <button v-else class="flex items-center rounded border border-muted text-muted px-2 py-1 text-sm gap-x-1 font-semibold cursor-not-allowed">
                    <ChevronsLeft class="size-4" />
                    <div>Prev</div>
                </button>
            </div>
            <div class="bg-secondary text-primary px-2 py-1 text-sm rounded font-semibold border border-secondary">Page {{ page }}</div>
            <div>
                <button v-if="nextPage" @click.prevent="changePage(nextPage)" class="flex items-center rounded border border-white px-2 py-1 text-sm gap-x-1">
                    <div>Next</div>
                    <ChevronsRight class="size-4" />
                </button>
                <button v-else class="flex items-center rounded border border-muted text-muted px-2 py-1 text-sm gap-x-1 font-semibold cursor-not-allowed">
                    <div>Next</div>
                    <ChevronsRight class="size-4" />
                </button>
            </div>
        </div>
    </div>
</template>
