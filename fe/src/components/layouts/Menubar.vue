<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { House, ClipboardList, Star, History } from "lucide-vue-next";
import MenuIcon from "@/components/custom/MenuIcon.vue";

const route = useRoute();
const router = useRouter();
</script>

<template>
    <div class="w-full box-border bg-background border-t border-border p-4 flex items-center justify-between">
        <div class="w-full flex justify-between lg:justify-center items-center gap-x-5 lg:gap-x-10">
            <MenuIcon
                menuName="Home"
                @onClick="
                    () => {
                        router.push({ name: 'dashboard' });
                    }
                "
            >
                <template v-slot:menu-content>
                    <House class="size-6" :class="route.meta.menu == 'dashboard' ? 'text-primary' : 'text-foreground'" />
                </template>
            </MenuIcon>

            <MenuIcon
                menuName="Daftar Komik"
                @onClick="
                    () => {
                        router.push({ name: 'listKomik' });
                    }
                "
            >
                <template v-slot:menu-content>
                    <ClipboardList class="size-6" :class="route.meta.menu == 'komik' ? 'text-primary' : 'text-foreground'" />
                </template>
            </MenuIcon>

            <MenuIcon
                menuName="Favorit"
                @onClick="
                    () => {
                        router.push({ name: 'favorit' });
                    }
                "
            >
                <template v-slot:menu-content>
                    <Star class="size-6" :class="route.meta.menu == 'favorit' ? 'text-primary' : 'text-foreground'" />
                </template>
            </MenuIcon>

            <MenuIcon
                menuName="History"
                @onClick="
                    () => {
                        router.push({ name: 'history' });
                    }
                "
            >
                <template v-slot:menu-content>
                    <History class="size-6" :class="route.meta.menu == 'history' ? 'text-primary' : 'text-foreground'" />
                </template>
            </MenuIcon>
        </div>
    </div>
</template>
