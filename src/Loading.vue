<template>
    <div id="app">
        <div class="loader">
            <div class="loading-1"></div>
            <div class="loading-2">Loading...</div>
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
#app{
    width: 100%; height: 100vh; height: 100vh; z-index: 99999; padding-top: 40vh; position: fixed; top: 0; left: 0;
    background-color: rgba(0, 0, 0, 0.8);
}
.loader {
    width: 40vw;
    margin: 0px auto 70px;
    position: relative;
}

.loader .loading-1 {
    position: relative;
    width: 100%;
    height: 10px;
    border: 1px solid #69d2e7;
    border-radius: 10px;
    animation: turn 4s linear 1.75s infinite;
}

.loader .loading-1:before {
    content: "";
    display: block;
    position: absolute;
    width: 0%;
    height: 100%;
    background: #69d2e7;
    box-shadow: 10px 0px 15px 0px #69d2e7;
    animation: load 2s linear infinite;
}

.loader .loading-2 {
    width: 100%;
    position: absolute;
    top: 10px;
    color: #69d2e7;
    font-size: 22px;
    text-align: center;
    animation: bounce 2s linear infinite;
}

@keyframes load {
    0% {
        width: 0%;
    }
    87.5%,
    100% {
        width: 100%;
    }
}

@keyframes turn {
    0% {
        transform: rotateY(0deg);
    }
    6.25%,
    50% {
        transform: rotateY(180deg);
    }
    56.25%,
    100% {
        transform: rotateY(360deg);
    }
}

@keyframes bounce {
    0%,
    100% {
        top: 10px;
    }
    12.5% {
        top: 30px;
    }
}

</style>


