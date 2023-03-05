<template>
  <div>
    <div id="container"></div>
  </div>
  <div>
    <button @click="showCloud">click</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import data from '@/assets/json/data2.json';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

interface Data {
  text: string;
  frequency: number;
  hasText?: boolean;
  size: number;
  font?: string;
  weight?: string;
  style?: string;
  padding?: number;
  rotate?: number;
  x?: number;
  x0?: number;
  x1?: number;
  xoff?: number;
  y?: number;
  y0?: number;
  y1?: number;
  yoff?: number;
  height?: number;
  width?: number;
}

export default defineComponent({
  name: 'D3',
  data() {
    return {
      width: 800,
      height: 400
    };
  },
  mounted() {
    d3.select("#container").append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
    this.showCloud();
  },
  methods: {
    showCloud() {
      d3.select("g").remove();
      //scale.linear: 선형적인 스케일로 표준화를 시킨다. 
      //domain: 데이터의 범위, 입력 크기
      //range: 표시할 범위, 출력 크기 
      //clamp: domain의 범위를 넘어간 값에 대하여 domain의 최대값으로 고정시킨다.
      var wordScale = d3.scaleLinear().domain([0, 1000]).range([0, 150]).clamp(true);
      
      cloud().size([this.width, this.height])
        //클라우드 레이아웃에 데이터 전달
        .words(data.data)
        .rotate(function (d:Data) {
            return d.text.length > 3 ? 0 : 90;
            // return ~~(Math.random() * 90);
        })
        //스케일로 각 단어의 크기를 설정
        .fontSize(function (d:Data) {
            return wordScale(d.frequency);
        })
        //클라우드 레이아웃을 초기화 > end이벤트 발생 > 연결된 함수 작동  
        .on("end", this.draw)
        .start();

    },
    draw(words:Data[]) {
      var keywords = ["Javascript", "HTML", "vue"]
      var svg = d3.select("svg")
        .append("g")
        .attr("transform", `translate(${this.width / 2}, ${this.height / 2})`)
 
      var cloud = svg.selectAll("text").data(words);
      
      //Entering words
      cloud.enter()
        .append("text")
        .style("font-family", "overwatch")
        .style("fill", function (d:Data) {
            return (keywords.indexOf(d.text) > -1 ? "#fbc280" : "#405275");
        })
        .style("fill-opacity", .5)
        .attr("text-anchor", "middle") 
        .attr('font-size', function (d:Data) {
            return d.size;
        })
        .attr("transform", function (d:Data) {
            return `translate(${[d.x, d.y]})rotate(${d.rotate})`;
        })
        .text(function (d:any) {
            return d.text;
        }); 

        //Entering and existing words
        cloud.transition()
          .duration(600)
          .style("font-size", function (d:Data) {
              return `${d.size}px`;
          })
          .attr("transform", function (d:Data) {
              return `translate(${[d.x, d.y]}) rotate(${d.rotate})`;
          })
          .style("fill-opacity", 1); 
        
        //Exiting words
        /* cloud.exit()
          .transition()
          .duration(200)
          .style('fill-opacity', 1e-6)
          .attr('font-size', 1)
          .remove(); */
    }
  }
});
</script>
