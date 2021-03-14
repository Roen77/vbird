<template>
  <div>
    <div v-if="images.length === 0"></div>
    <div v-else-if="images.length === 1">
      <v-img :src="`http://localhost:4000/${images[0].src}`" contain aspect-ratio="2" @click=" zoomImages">
      </v-img>
      <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images"></image-zoom>
    </div>
    <div v-else-if="images.length === 2" style="display:flex">
      <v-img :src="`http://localhost:4000/${images[0].src}`" contain style="flex:1" aspect-ratio="2" @click=" zoomImages"></v-img>
      <v-img :src="`http://localhost:4000/${images[1].src}`" conatin style="flex:1" aspect-ratio="2" @click=" zoomImages"></v-img>
      <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images"></image-zoom>
    </div>
    <div v-else-if="images.length > 2" style="display:flex;">
      <v-img :src="`http://localhost:4000/${images[0].src}`" contain style="flex:1" aspect-ratio="2" @click=" zoomImages"></v-img>
      <div style="flex:1; align-items:center; justify-content:center; display:flex; cursor:pointer" @click=" zoomImages">
        <div style="text-align:center;">
          <v-icon>
            mdi-dots-horizontal
          </v-icon>
          <p>
            더보기
          </p>
        </div>
      </div>
      <image-zoom v-if="imageZoomed" :close-modal="closeModal" :images="images"></image-zoom>
    </div>
    <!-- else if -->
  </div>
</template>

<script>
import ImageZoom from './ImageZoom.vue'
export default {
  components: { ImageZoom },
   props: {
      images: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        imageZoomed: false
      }
    },
    methods: {
      closeModal() {
        this.imageZoomed=false;
      },
      zoomImages(){
        this.imageZoomed=true;
      }
    },

}
</script>

<style>

</style>