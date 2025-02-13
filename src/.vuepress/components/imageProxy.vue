<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import axios from 'axios'
const props = defineProps({
    src: {
        type: String,
        required: true,
    }
})
const imgUrl = ref('')
const status = ref(0)    // 0: loading, 1: success, 2: error

const loadImage = () => {
    axios.get(`https://env-00jxhapj7v5l.dev-hz.cloudbasefunction.cn/proxy/imageProxy?imageUrl=${props.src}`, {
        timeout: 1000,
    })
        .then(res => {
            console.log(111);
            console.log(res);
            if (res.data.message == '图片获取失败') {
                imgUrl.value = '';
                status.value = 2;
            } else {
                imgUrl.value = res.data.body;
                status.value = 1;
            }
        }).catch(err => {
            imgUrl.value = '';
            status.value = 2;
            console.log(222);
            console.log(err);
            // console.log(status.value);
        })
}

const targetElement = ref(null); // 使用 ref 来绑定目标元素
const observer = ref(null); // 用于存储 IntersectionObserver 实例
// 创建 IntersectionObserver 实例
const createObserver = () => {
    observer.value = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // console.log('元素在可视区内');
                loadImage()
                if (observer.value && targetElement.value) {
                    observer.value.unobserve(targetElement.value);
                }
            } else {
                // console.log('元素不在可视区内');
            }
        });
    }, {
        root: null, // 默认为视口
        threshold: 0.1 // 交叉比例，当 10% 显示在视口时触发
    });
};

// 在 mounted 钩子中启动观察
onMounted(() => {
    createObserver();
    if (targetElement.value) {
        observer.value.observe(targetElement.value);
    }
});

// 在 beforeUnmount 钩子中清除观察
onBeforeUnmount(() => {
    if (observer.value && targetElement.value) {
        observer.value.unobserve(targetElement.value);
    }
});

</script>
<template>
    <div ref="targetElement" :class="status === 1 ? '' : 'no-image'">
        <img v-if="status === 1" :src="imgUrl" alt="" tabindex="0" loading="lazy">
        <template v-else-if="status === 2">
            <svg t="1739451438290" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="1649" width="200" height="200">
                <path
                    d="M829.952 237.2096c0 39.2192 32.1536 71.0656 71.68 71.0656 39.5776 0 71.68-31.8464 71.68-71.0656 0-39.2704-32.1024-71.1168-71.68-71.1168-39.5264 0-71.68 31.8464-71.68 71.1168z"
                    p-id="1650"></path>
                <path
                    d="M751.9232 924.672H71.8336V71.4752h1003.6224v406.272c25.4464 5.12 49.5616 12.4928 71.68 24.576V71.5264c0-39.2192-32.1536-71.1168-71.68-71.1168H71.8336c-39.5776 0-71.68 31.8976-71.68 71.1168v853.0944c0 39.2704 32.1024 71.1168 71.68 71.1168h749.056c-32.6656-19.7632-45.8752-41.472-68.9664-71.1168z"
                    p-id="1651"></path>
                <path
                    d="M1147.136 548.352a254.5664 254.5664 0 0 0-122.88-31.232 255.3856 255.3856 0 0 0-143.104 43.52l-62.1056-82.1248a107.6224 107.6224 0 0 0-95.744-42.1376 107.2128 107.2128 0 0 0-79.7696 47.104l-119.9616-158.72c-20.992-27.648-54.272-45.824-89.088-42.6496-34.816 1.024-67.072 18.7904-86.4256 47.5136l-230.5536 343.04a35.328 35.328 0 0 0 10.0352 49.2544 35.9424 35.9424 0 0 0 49.664-9.8816l230.4-342.9376a35.4816 35.4816 0 0 1 28.8256-15.872 36.3008 36.3008 0 0 1 29.696 14.2336l154.368 204.1344c7.424 9.8816 19.456 14.6944 31.8464 14.08a35.8912 35.8912 0 0 0 28.8256-19.5584l19.8144-39.3728a35.4816 35.4816 0 0 1 28.8256-19.5072 35.2256 35.2256 0 0 1 31.8976 13.9264l66.1504 87.552a250.6752 250.6752 0 0 0-58.6752 161.3312c0 58.2144 19.8144 111.8208 53.1456 154.624a255.6928 255.6928 0 0 0 201.9328 98.304c140.8 0 255.0272-113.2032 255.0272-252.928a252.5696 252.5696 0 0 0-132.1472-221.696z m0 356.2496a183.2448 183.2448 0 0 1-122.88 47.0016 183.296 183.296 0 0 1-96.0512-26.9824 181.0944 181.0944 0 0 1-87.04-154.5728c0-37.7856 11.6736-72.9088 31.5904-101.9392a183.296 183.296 0 0 1 151.5008-79.5648 183.1936 183.1936 0 0 1 122.88 47.0016 180.4288 180.4288 0 0 1 0 269.056z"
                    p-id="1652"></path>
                <path
                    d="M987.9552 884.3264c0 19.8656 16.2304 35.9936 36.3008 35.9936a36.1472 36.1472 0 0 0 36.2496-35.9936 36.1472 36.1472 0 0 0-36.3008-35.9936 36.1472 36.1472 0 0 0-36.2496 35.9936zM1024.256 631.04c-25.6512 0-46.4384 20.6336-46.4384 46.08 0 25.3952 20.7872 138.0352 46.4384 138.0352 25.6 0 46.3872-112.64 46.3872-138.0864a46.2336 46.2336 0 0 0-46.4384-46.0288z"
                    p-id="1653"></path>
            </svg>
            <span>糟糕，图片不见了！</span>
        </template>
        <template v-else>
            <svg t="1739453552440" class="icon loading-icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="3291" width="200" height="200">
                <path
                    d="M510.5 958.7c-60.4 0-119-11.8-174.2-35.2-53.3-22.5-101.1-54.8-142.2-95.9s-73.3-88.9-95.9-142.2C74.9 630.2 63 571.6 63 511.2s11.8-119 35.2-174.2c22.5-53.3 54.8-101.1 95.9-142.2S283 121.5 336.3 99c55.2-23.3 113.8-35.2 174.2-35.2 49.3 0 97.8 8 144.1 23.7 26.1 8.9 40.1 37.3 31.2 63.4-7.1 20.8-26.5 33.9-47.3 33.9-5.3 0-10.8-0.9-16.1-2.7-35.9-12.2-73.6-18.4-111.9-18.4-92.8 0-180 36.1-245.7 101.8C199.2 331.1 163 418.4 163 511.2c0 92.8 36.1 180 101.8 245.7 65.6 65.6 152.9 101.8 245.7 101.8s180-36.1 245.7-101.8C821.8 691.3 858 604 858 511.2c0-58.6-14.9-116.6-43-167.6-13.3-24.2-4.6-54.6 19.6-67.9 24.2-13.3 54.6-4.6 67.9 19.6 36.3 65.7 55.4 140.4 55.4 215.9 0 60.4-11.8 119-35.2 174.2-22.5 53.3-54.8 101.1-95.9 142.2-41.1 41.1-88.9 73.3-142.2 95.9-55.1 23.3-113.7 35.2-174.1 35.2z"
                    p-id="3292"></path>
            </svg>
            <span>加载中...</span>
        </template>
    </div>

</template>
<style lang="scss" scoped>
div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
        max-width: 100%;
        height: auto;
    }
}

.no-image {
    height: 300px;
    overflow: hidden;
    background-color: #464545;
    flex-direction: column;
    gap: 10px;
    color: #878787;
    svg {
        height: 60px;
        fill: #878787;
    }

}
</style>
