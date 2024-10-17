<script setup>
// vue carausle
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
</script>

<template>
    <Carousel :items-to-show="1.5">
        <Slide v-for="slide in 10" :key="slide">
            {{ slide }}
        </Slide>

        <template #addons>
            <Navigation />
            <Pagination />
        </template>
    </Carousel>
</template>
