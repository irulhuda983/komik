<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/composables/api.js";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LogoImg from "@/assets/img/logo.png";

import Favorit from "./part/Favorit.vue";
import { Heart, Clock } from "lucide-vue-next";

const router = useRouter();

const isLoading = ref(false);
const most = ref([]);
const latest = ref([]);

const fetchData = async () => {
    isLoading.value = ref(true);
    try {
        const { data } = await api.get("/latest");

        most.value = data.data.most;
        latest.value = data.data.latest;
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

const viewChar = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    }
    return str;
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="w-full lg:w-[480px] box-border">
        <div class="w-full box-border mb-5">
            <Carousel v-slot="{ canScrollNext }" class="relative w-full">
                <CarouselContent>
                    <CarouselItem v-for="(item, i) in most" :key="i">
                        <div class="w-full relative">
                            <div class="w-full h-52 bg-cover" :style="`background-image: url(${item.imageUrl})`"></div>
                            <div class="absolute top-0 bottom-0 w-full h-full box-border bg-black/40">
                                <div class="absolute bottom-0 w-full p-3">
                                    <a href="#" @click.prevent="router.push({ name: 'detailKomik', params: { slug: item.slug } })" class="block text-foreground font-bold text-lg mb-2">{{
                                        item.title
                                    }}</a>

                                    <div class="inline-block px-3 py-1.5 bg-primary rounded text-xs font-semibold">{{ item.chUp }} Chapter</div>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </div>

        <div class="w-full box-border mb-5">
            <div class="flex items-center justify-between p-4">
                <h1 class="font-bold text-base">Manga Populer Hari Ini</h1>
            </div>

            <div class="w-full box-border px-4">
                <Carousel
                    class="relative w-full"
                    :opts="{
                        align: 'start',
                    }"
                >
                    <CarouselContent>
                        <CarouselItem v-for="(item, i) in latest.manga" :key="i" class="basis-1/3 lg:basis-1/4">
                            <div class="w-full box-border rounded-md cursor-pointer" @click.prevent="router.push({ name: 'detailKomik', params: { slug: item.slug } })">
                                <div class="w-full box-border overflow-hidden flex items-center justify-center rounded-md">
                                    <img :src="`${item.imageUrl}?resize=260,300`" alt="" />
                                </div>

                                <div class="w-full box-border mt-2">
                                    <div class="text-xs font-light">{{ item.genre }}</div>
                                    <h1 class="text-sm font-semibold mb-3">{{ viewChar(item.title, 11) }}</h1>

                                    <div class="w-full flex items-center justify-between">
                                        <div class="text-xs">Ch. {{ item.lastCh }}</div>
                                        <div class="text-xs text-primary flex items-center gap-x-1 justify-center">
                                            <Heart class="size-3" />
                                            <span>{{ item.reader }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>

        <div class="w-full box-border mb-5">
            <div class="flex items-center justify-between p-4">
                <h1 class="font-bold text-base">Manhwa Populer Hari Ini</h1>
            </div>

            <div class="w-full box-border px-4">
                <Carousel
                    class="relative w-full"
                    :opts="{
                        align: 'start',
                    }"
                >
                    <CarouselContent>
                        <CarouselItem v-for="(item, i) in latest.manhwa" :key="i" class="basis-1/3 lg:basis-1/4">
                            <div class="w-full box-border rounded-md cursor-pointer" @click.prevent="router.push({ name: 'detailKomik', params: { slug: item.slug } })">
                                <div class="w-full box-border overflow-hidden flex items-center justify-center rounded-md">
                                    <img :src="`${item.imageUrl}?resize=260,300`" alt="" />
                                </div>

                                <div class="w-full box-border mt-2">
                                    <div class="text-xs font-light">{{ item.genre }}</div>
                                    <h1 class="text-sm font-semibold mb-3">{{ viewChar(item.title, 12) }}</h1>

                                    <div class="w-full flex items-center justify-between">
                                        <div class="text-xs">Ch. {{ item.lastCh }}</div>
                                        <div class="text-xs text-primary flex items-center gap-x-1 justify-center">
                                            <Heart class="size-3" />
                                            <span>{{ item.reader }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>

        <div class="w-full box-border mb-5">
            <div class="flex items-center justify-between p-4">
                <h1 class="font-bold text-base">Manhua Populer Hari Ini</h1>
            </div>

            <div class="w-full box-border px-4">
                <Carousel
                    class="relative w-full"
                    :opts="{
                        align: 'start',
                    }"
                >
                    <CarouselContent>
                        <CarouselItem v-for="(item, i) in latest.manhua" :key="i" class="basis-1/3 lg:basis-1/4">
                            <div class="w-full box-border rounded-md cursor-pointer" @click.prevent="router.push({ name: 'detailKomik', params: { slug: item.slug } })">
                                <div class="w-full box-border overflow-hidden flex items-center justify-center rounded-md">
                                    <img :src="`${item.imageUrl}?resize=260,300`" alt="" />
                                </div>

                                <div class="w-full box-border mt-2">
                                    <div class="text-xs font-light">{{ item.genre }}</div>
                                    <h1 class="text-sm font-semibold mb-3">{{ viewChar(item.title, 12) }}</h1>

                                    <div class="w-full flex items-center justify-between">
                                        <div class="text-xs">Ch. {{ item.lastCh }}</div>
                                        <div class="text-xs text-primary flex items-center gap-x-1 justify-center">
                                            <Heart class="size-3" />
                                            <span>{{ item.reader }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </div>
        </div>

        <div class="w-full box-border mb-5">
            <div class="flex items-center justify-between p-4">
                <h1 class="font-bold text-base">Terbaru</h1>
            </div>

            <div class="w-full px-4 box-border grid grid-cols-3 gap-x-3 gap-y-5">
                <div v-for="(item, i) in latest.all" class="w-full box-border rounded-md cursor-pointer" @click.prevent="router.push({ name: 'detailKomik', params: { slug: item.slug } })">
                    <div class="w-full relative box-border overflow-hidden flex items-center justify-center rounded-md">
                        <img :src="`${item.imageUrl}?resize=260,300`" alt="" />
                        <div class="absolute text-white top-1 left-2 rounded-full bg-primary size-5 flex items-center justify-center text-[7pt] font-bold">UP</div>
                    </div>

                    <div class="w-full box-border mt-2">
                        <div class="text-xs font-light">{{ item.genre }}</div>
                        <h1 class="text-sm font-semibold mb-1">{{ viewChar(item.title, 12) }}</h1>

                        <div class="w-full flex items-center justify-between">
                            <div class="text-xs">Ch. {{ item.lastCh }}</div>
                        </div>
                        <div class="text-xs text-primary flex items-center gap-x-1 justify-start">
                            <Clock class="size-3" />
                            <span>{{ item.updatedAt }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
