<template>
    <div class="energy solid">
        <div class="header">
            <LighteningBolt :brightness="energy"></LighteningBolt>
            <h2>Energy</h2>

        </div>
    <round-slider
        v-model="energy"
        width="15"
        circle-shape="half-top"
        pathColor="#005840"
        rangeColor="#bef067"
        tooltipColor="#005840"
        borderColor="#005840"
        lineCap="round"
        radius="70"
    />
   

    </div>
</template>

<script>
import RoundSlider from 'vue-round-slider';
import LighteningBolt from './LighteningBolt.vue';
export default{
    components:{
        RoundSlider,
        LighteningBolt
    },
    data(){
        return{
            energy: 50,
        }
    }
}
</script>

<style scoped>
/*
main color: #005840; // dark green
accent color: #bef067; // neon green
*/
.header{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    color: #005840;
}
h2{
    margin:2%;
}
.solid{
    color: #005840;
    border: 1.5px solid #005840;

}
.energy{
    padding: 3%;
    border-radius: 15px;
    height: fit-content;
    color: #55170a;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.glowing-slider {
    filter: drop-shadow(0 0 10px #fed22a);
    /* Alternatively, use box-shadow for a more customizable glow */
    /* box-shadow: 0 0 20px 5px #fed22a; */
}
</style>