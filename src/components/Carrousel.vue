<template>
  <div class="w-screen h-[500px] brightness-[60%]">
    <swiper
      :modules="[Autoplay]"
      :spaceBetween="10"
      :slidesPerView="1"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      class="w-full h-full"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image" class="w-full h-full object-cover" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const images = [
  "/images/montre1.jpg",
  "/images/montre2.jpg",
  "/images/montre3.jpg",
  "/images/montre4.jpg",
  "/images/montre5.jpg",
];
</script>
