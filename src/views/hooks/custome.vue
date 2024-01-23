<template>
  <div>
    <img id="woman1" width="300" height="400" src="@/assets/images/woman1.png" alt="" />
    <div @click="copyText" style="cursor: pointer">点我复制~</div>
  </div>
</template>

<script setup>
import useToBase64 from "@/hooks/imgToBase64.js";
import useCopy from "@/hooks/useCopy.js";
useToBase64({ el: "#woman1" }).then(res => {
  console.log("base64Url", res.baseUrl);
});
const copy = useCopy();
const copyText = e => {
  copy(e.target.innerText);
};
</script>

<style lang="scss" scoped></style>
