<template>
  <div class=" lg:h-[600px] w-screen h-[400px] brightness-[60%] owerflow-hidden">
    <swiper
      :modules="[Autoplay]"
      :spaceBetween="10"
      :slidesPerView="1"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      class="w-full h-full"
    >
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image" class="w-full h-full object-cover block mx-auto" />
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
  "/images/montre1.png",
  "/images/montre2.jpg",
  "/images/montre3.jpg",
  "/images/montre4.jpg",
  "/images/montre5.png",
];
</script>
