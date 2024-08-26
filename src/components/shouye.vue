<template>
    <div>
        <!-- 轮播图 -->
        <div class="block">
            <el-carousel height="300px">
                <el-carousel-item v-for="item in images" :key="item">
                    <img :src="item" alt="无法显示" class="carousel-image" />
                </el-carousel-item>
            </el-carousel>
        </div>


        <!-- 消息通知，以及登录模块 -->
        <div class="content">
            <div class="content-left">

                <div class="content-title">
                    <span class="content-span">新闻动态</span>
                    <a href="" class="content-title-a">+MORE</a>
                </div>

                <div class="content-left-div">
                    <ul>
                        <li class="content-left-li"><a href="/2023/0208/c13276a302312/page.htm"><span>[02-08]</span>
                                2022南航学位航学位与研究生教育十22南航航学位与研究生教育十22南航学学位与育十22南研究生教育十</a></li>
                        <li class="content-left-li"><a href="/2022/1213/c13276a300804/page.htm"><span>[12-13]</span>
                                研究生院/研工部党支部组织全体教职工参观立德树人研工部党支部组织全体教职工参观立德树</a></li>
                        <li class="content-left-li"><a
                                href="/2022/1208/c13276a300297/page.htm"><span>[12-06]</span>我校举行2022年研究生导师培训会举行2022年研究生导师培训举行2022年研究生导师培训举行2022年研究生导师培训</a>
                        </li>
                        <li class="content-left-li"><a
                                href="/2022/1201/c13276a299742/page.htm"><span>[12-01]</span>我校举行2022年研究生“五好”导学团队经验悦享会暨行2022生“五好”导学团队经验悦行2022年研究生“五好”导学团队经验悦</a>
                        </li>
                        <li class="content-left-li"><a href="/2022/1128/c13276a299467/page.htm"><span>[11-28]</span>
                                我校成功举办第十一届“天宫杯” 研究生创新实验研究生创新研究生创新研究生创新研究生创新研究生创新竞</a></li>

                        <li class="content-left-li"><a href="/2023/0208/c13276a302312/page.htm"><span>[02-08]</span>
                                2022南航学位与研究生教育位与研究生位与研究生位与研究生位与研究生位与研究生位与研究生十大亮点工作</a></li>
                        <li class="content-left-li"><a href="/2022/1213/c13276a300804/page.htm"><span>[12-13]</span>
                                研究生院/研工部党支部组织全体教职工参观立德树人研工部党支部组织全体教职工研工部党支部组织全体教职工</a></li>
                        <li class="content-left-li"><a
                                href="/2022/1208/c13276a300297/page.htm"><span>[12-06]</span>我校举行2022年研究生导师培训会行2022年研究生导师行2022年研究生导师行2022年研究生导师</a>
                        </li>
                        <li class="content-left-li"><a
                                href="/2022/1201/c13276a299742/page.htm"><span>[12-01]</span>我校举行2022年研究生“五好”导学团队经验悦享会暨研究生“五好”导学团队经研究生“五好”导学团队经</a>
                        </li>
                        <li class="content-left-li"><a href="/2022/1128/c13276a299467/page.htm"><span>[11-28]</span>
                                我校成功举办第十一届“天宫杯” 研究生创新实验竞届“天宫杯” 研究生创届“天宫杯” 研究生创届“天宫杯” 研究生创</a></li>

                        <li class="content-left-li"><a
                                href="/2022/1201/c13276a299742/page.htm"><span>[12-01]</span>我校举行2022年研究生“五好”导学团队经验悦享会暨研究生“五好”导学团队经研究生“五好”导学团队经</a>
                        </li>
                        <li class="content-left-li"><a
                                href="/2022/1201/c13276a299742/page.htm"><span>[12-01]</span>我校举行2022年研究生“五好”导学团队经验悦享会暨研究生“五好”导学团队经研究生“五好”导学团队经</a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            images: [
                'https://th.bing.com/th/id/OIP.RaODP7FEcKqyU1MKvgVU4AHaE7?rs=1&pid=ImgDetMain',
                'https://th.bing.com/th/id/R.dde42bd056deb1b0756abd2a70c8f5c7?rik=K3tQFthnD88IVQ&riu=http%3a%2f%2fhuxi.cqu.edu.cn%2fstatic%2fupfiles%2f201206%2f20120619101516795-540-360.jpg&ehk=1ygzbE37eGEEv3o1fqqEjk0HeiIa7JLOIzUK1eg9o9M%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
                'https://th.bing.com/th/id/R.52585e0831f0c09a235bf0c5ecff21d2?rik=sBFSDCQzvz7zyQ&riu=http%3a%2f%2fwww.cqud.net%2fupload%2f4c0w%2flqqgjikpqo.jpg&ehk=CHPk%2fkr%2btMHWVe3fBzUZeD93ZO88pQ7pBdpPJys1qu4%3d&risl=&pid=ImgRaw&r=0',
                'https://th.bing.com/th/id/OIP.rCqHdB0B8gvRlZCKUNgDfQHaEg?rs=1&pid=ImgDetMain'
            ]
        };
    }
}
</script>
<style>
* {
    margin: 0;
    padding: 0;
}

.el-carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;
}

.carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

ul,
ol {
    list-style: none;
}

img {
    display: block;
}

a {
    text-decoration: none;
    color: #000;
}

h1,
h2,
h3 {
    font-size: 16px;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

body {
    font-family: Arial, Helvetica, sans-serif;
}

/* 浮动 */
.l {
    float: left;
}

.r {
    float: right;
}

.clear::after {
    content: "";
    display: block;
    clear: both;
}

/* 版心 */
.container {
    width: 1080px;
    margin: 0 auto;
    position: relative;
}

/* 通栏 */
.container-fluid {
    width: 100%;
}



/* 页面样式 */
.banner {
    height: 450px;
    width: 100%;
    overflow: hidden;
    background-image: url("/public/image/title.png");
    background-repeat: no-repeat;
    background-position: center;
}

.banner2 {
    margin-top: 55px;
    margin-left: 20px;
    height: 350px;

    background-image: url("/public/image/title.png");
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
}

.content {
    height: 500px;
    width: 1400px;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
}

.content-left {
    width: 980px;
    height: 500px;
}

.content-right {
    height: 500px;
    width: 420px;
}

.content-title {
    width: 940px;
    position: relative;
    margin-top: 20px;
    background: url(/public/image/title.png) no-repeat left center;
    padding-left: 40px;
    font-family: "Times New Roman", "Arial", "Microsoft YaHei", "SimSun", sans-serif;
    line-height: 1.5;

    color: #404040;
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
    border-bottom: 3px solid #00408a;
    display: inline-block;
    height: 40px;

}

.content-title-a {
    color: #b08a37;
    font-size: 15px;
    float: right;
    margin-top: 20px;
    margin-right: 11px;

}

.content-span {
    color: #404040;
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
    border-bottom: 3px solid #00408a;
    display: inline-block;
    height: 37px;
}

.content-left-div {
    height: 440px;
    width: 100%;
}

.content-left-li {
    border-bottom: 1px dotted #000;
    width: 100%;
    color: #000;
    height: 35px;
    display: flex;
    align-items: center;
}

.content-left-li span {
    margin-right: 30px;
}

.content-ul {
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 100px;
    background-color: #D2ECFF;
    border-radius: 15px;
}

.content-ul a {
    display: flex;
    width: 130px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
}
</style>