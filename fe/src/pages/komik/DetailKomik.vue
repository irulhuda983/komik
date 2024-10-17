<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/composables/api.js";
import { detailKomik } from "@/composables/komik.js";

import { House, Plus, UserRoundCheck, Eye } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);

const detailData = ref([]);

const fetchData = async () => {
    isLoading.value = ref(true);
    try {
        const { data } = await api.get(`/komik/${route.params.slug}/detail`);

        detailData.value = data.data;
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

const viewChar = (str, maxLength) => {
    if (str?.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    }
    return str;
};

const getViews = (data) => {
    if (!data) {
        return;
    }
    const num = data.reduce((sum, item) => sum + parseInt(item.view), 0);

    if (num >= 1_000_000_000) {
        // Jika angka lebih besar atau sama dengan 1 miliar
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + " T";
    } else if (num >= 1_000_000) {
        // Jika angka lebih besar atau sama dengan 1 juta
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + " JT";
    } else if (num >= 1_000) {
        // Jika angka lebih besar atau sama dengan 1 ribu
        return (num / 1_000).toFixed(1).replace(/\.0$/, "") + " Rb";
    } else {
        // Jika angka lebih kecil dari 1 ribu
        return num.toString();
    }
};

const formatAngka = (number) => {
    return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
    }).format(number);
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div v-if="!isLoading" class="w-full lg:w-[480px] box-border">
        <div class="w-full h-[280px] relative overflow-hidden bg-no-repeat bg-cover bg-center" :style="`background-image: url(${detailData.cover}?resize=450,200&quality=60)`">
            <div class="w-full h-full box-border bg-black/30">
                <!-- header -->
                <div class="w-full flex items-center justify-between p-4">
                    <div class="cursor-pointer" @click.prevent="router.go(-1)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path
                                d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
                            />
                        </svg>
                    </div>
                    <div class="flex gap-x-2 items-center">
                        <button class="bg-white rounded-full text-black text-xs px-2 py-1 flex items-center justify-center gap-x-1">
                            <Plus class="size-3" />
                            <div>Favorit</div>
                        </button>
                        <button class="bg-white rounded-full text-black text-xs p-1 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path
                                    fill-rule="evenodd"
                                    d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <!-- end header -->

                <!-- desc -->
                <div class="w-full box-border p-4 pb-6">
                    <div class="text-xs font-light">{{ detailData.info ? detailData.info[5] : null }}</div>
                    <div class="font-bold text-lg">{{ detailData.title }}</div>
                    <div class="text-sm mb-3">{{ detailData.genre ? detailData.genre.join(", ") : null }}</div>
                    <div class="text-sm">{{ viewChar(detailData.desc, 100) }}</div>
                    <div class="flex gap-x-4 mt-2">
                        <div class="flex items-center gap-x-2">
                            <UserRoundCheck class="size-4" />
                            <div class="text-xs">{{ getViews(detailData.chapters) }}</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-x-3 mt-4">
                        <button class="px-4 py-1 text-xs border border-white rounded">{{ detailData.rekapCh ? detailData.rekapCh[0].ch : null }}</button>
                        <button class="px-4 py-1 text-xs border border-white rounded">{{ detailData.rekapCh ? detailData.rekapCh[1].ch : null }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full box-border">
            <div class="w-full box-border p-4 border-y border-border">
                <h1 class="text-sm font-bold">Daftar Chapter</h1>
            </div>

            <div class="w-full">
                <div
                    v-for="(item, i) in detailData.chapters"
                    :key="i"
                    class="w-full border-b border-border p-4 cursor-pointer"
                    @click.prevent="router.push({ name: 'viewer', params: { slug: item.url } })"
                >
                    <div class="w-full flex items-center justify-between">
                        <div class="text-sm">
                            <div class="font-bold">{{ item.title }}</div>
                            <div class="flex items-center gap-x-1 text-xs">
                                <Eye class="size-4" />
                                <div>{{ item.view ? formatAngka(item.view) : 0 }}</div>
                            </div>
                        </div>

                        <div class="text-sm">{{ item.date }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
