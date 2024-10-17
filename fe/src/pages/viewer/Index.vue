<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/composables/api.js";

import { MoveLeft, List, SquareArrowRight, SquareArrowLeft } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const isLoading = ref(false);

const detailData = ref([]);

const fetchData = async () => {
    isLoading.value = ref(true);
    try {
        const { data } = await api.get(`/read-komik/${route.params.slug}`);

        detailData.value = data.data;
        isLoading.value = false;
    } catch (error) {
        console.log(error);
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="w-full flex flex-col items-center justify-center">
        <div v-if="!isLoading" class="w-full lg:w-[480px] box-border relative">
            <div class="fixed top-0 left-0 z-20 w-full bg-black/80 backdrop-blur-md px-4 py-3 box-border flex items-center justify-between">
                <div>
                    <div class="flex items-center gap-x-4">
                        <a href="#" @click.prevent="router.push({ name: 'detailKomik', params: { slug: detailData.linkKomik } })">
                            <List class="size-4" />
                        </a>
                        <h1 class="text-sm font-bold">{{ detailData.title }}</h1>
                    </div>
                </div>

                <!-- <div>bookmark</div> -->
            </div>

            <div class="fixed bottom-0 left-0 z-20 w-full bg-black/80 backdrop-blur-md px-4 py-3 box-border flex items-center justify-between">
                <a :href="`/viewer/${detailData.prevCh}`" class="flex items-center gap-x-2 px-2 py-1 rounded border border-white text-xs">
                    <SquareArrowLeft class="size-3" />
                    <div class="font-semibold">Prev</div>
                </a>

                <a :href="`/viewer/${detailData.nextCh}`" class="flex items-center gap-x-2 px-2 py-1 rounded border border-white text-xs">
                    <div class="font-semibold">Next</div>
                    <SquareArrowRight class="size-3" />
                </a>
            </div>
            <div class="w-full box-border pt-6 pb-10">
                <img v-for="(item, i) in detailData.chapters" :src="item.imgUrl" alt="" class="w-full" />
            </div>
        </div>
    </div>
</template>
