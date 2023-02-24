<template>
  <div>
    <div id="container" style="width:500px; height:500px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import anychart from 'anychart';
import data from '@/assets/json/data.json';

export default defineComponent({
  name: 'Anychart',
  mounted() {
    var chart = anychart.tagCloud(data.data);

    // 색상
    // chart.normal().fill("색상코드");  //글씨 색 지정
    // chart.selected().fill("#1f66ad");   //클릭했을 때 글씨 색 지정 
    // chart.normal().fontWeight(600);   //글씨 두께 지정 
    // chart.hover().fill("색상코드") //hover 했을 때(마우스 가져다 댔을 때) 글씨 색 지정
    
    // 각도
    chart.angles([0, 30, 90]); //각도 지정 (0,30,90도 안에서만 나타남) 

    // 간격
    // chart.textSpacing(15); //글자 간격 지정 

    // 범위 표현
    chart.colorRange().enabled(true);
    chart.container("container");
    // chart.getCredits().setEnabled(false);
    chart.draw();
  }
});
</script>
