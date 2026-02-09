<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HuiMeng│绘梦官网</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            /* 强制使用原生字体 */
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: #000; /* 底部兜底为纯黑 */
            color: #d0d0d8; 
            line-height: 1.55; 
            font-size: 13px;
            /* 简单背景图 */
            background-image: url('http://enginecat.cn/img/sj/page/25.10.19/1.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            background-attachment: fixed; /* 固定背景图 */
        }

        a { text-decoration: none; color: #00bfff; }
        a:hover { color: #009acd; }
        .container { 
            width: 85%;
            max-width: 1000px; /* 恢复电脑版最大宽度 */
            margin: 0 auto; 
            padding: 0.7rem 0; /* 恢复电脑版 padding */
            /* 移除 transform: scale(0.75); */
            /* min-width: fit-content; */ /* 可能不再需要 */
        }

        /* 手机版界面缩小 10% */
        @media (max-width: 768px) {
            .container {
                transform: scale(0.9); /* 缩小 10% */
                transform-origin: top center; /* 从顶部中心缩放 */
                min-width: fit-content; /* 防止容器过度压缩 */
            }
        }


        /* 导航栏 */
        header {
            background: rgba(10, 20, 40, 0.85);
            backdrop-filter: blur(6px);
            position: sticky;
            top: 0;
            z-index: 100;
            height: 2.6rem; /* 恢复电脑版高度 */
            display: flex;
            align-items: center;
        }

         @media (max-width: 768px) {
            header {
                 height: calc(2.6rem * 0.9); /* 适应缩放 */
            }
        }

        .nav-title {
            width: 100%;
            text-align: center;
            font-size: 1.25rem; /* 恢复电脑版字体大小 */
            color: #e0f0ff;
            font-weight: bold;
            letter-spacing: 0.8px; /* 恢复电脑版字母间距 */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding: 0 10px; /* 恢复电脑版 padding */
        }

         @media (max-width: 768px) {
            .nav-title {
                 font-size: calc(1.25rem * 0.9); /* 适应缩放 */
                 padding: 0 calc(10px * 0.9); /* 适应缩放 */
            }
        }

        .announcements {
            background-color: rgba(15, 15, 25, 0.6);
            padding: 0.5rem 0; /* 恢复电脑版 padding */
            margin-top: 0;
            border-bottom: 1px solid #333; /* 恢复电脑版边框 */
        }

         @media (max-width: 768px) {
            .announcements {
                 padding: calc(0.5rem * 0.9) 0; /* 适应缩放 */
                 border-bottom-width: calc(1px * 0.9); /* 适应缩放 */
            }
        }

        .announcement-list {
            display: flex;
            flex-direction: column;
            gap: 0.4rem; /* 恢复电脑版 gap */
        }

         @media (max-width: 768px) {
            .announcement-list {
                 gap: calc(0.4rem * 0.9); /* 适应缩放 */
            }
        }

        .announcement-item-link {
            display: block;
            background-color: rgba(32, 32, 42, 0.85);
            padding: 0.6rem; /* 恢复电脑版 padding */
            border-radius: 7px; /* 恢复电脑版圆角 */
            border-left: 3px solid #00bfff; /* 恢复电脑版边框 */
            transition: transform 0.2s, background-color 0.2s;
            color: inherit;
            text-decoration: none;
        }

         @media (max-width: 768px) {
            .announcement-item-link {
                 padding: calc(0.6rem * 0.9); /* 适应缩放 */
                 border-radius: calc(7px * 0.9); /* 适应缩放 */
                 border-left-width: calc(3px * 0.9); /* 适应缩放 */
            }
        }

        .announcement-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .announcement-title {
            font-weight: bold;
            font-size: 12.5px; /* 恢复电脑版字体大小 */
            color: #d0f0ff;
        }

         @media (max-width: 768px) {
            .announcement-title {
                 font-size: calc(12.5px * 0.9); /* 适应缩放 */
            }
        }

        .announcement-date {
            color: #777;
            font-size: 11.5px; /* 恢复电脑版字体大小 */
            white-space: nowrap;
        }

         @media (max-width: 768px) {
            .announcement-date {
                 font-size: calc(11.5px * 0.9); /* 适应缩放 */
            }
        }

        .section {
            background-color: rgba(22, 22, 32, 0.6); /* 模块背景改为60 */
            margin: 1.1rem 0; /* 恢复电脑版 margin */
            padding: 1.4rem; /* 恢复电脑版 padding */
            border-radius: 9px; /* 恢复电脑版圆角 */
            border: 1px solid #444c5a; /* 恢复电脑版边框 */
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.25); /* 恢复电脑版阴影 */
        }

         @media (max-width: 768px) {
            .section {
                 margin: calc(1.1rem * 0.9) 0; /* 适应缩放 */
                 padding: calc(1.4rem * 0.9); /* 适应缩放 */
                 border-radius: calc(9px * 0.9); /* 适应缩放 */
                 border-width: calc(1px * 0.9); /* 适应缩放 */
                 box-shadow: 0 calc(2px * 0.9) calc(7px * 0.9) rgba(0, 0, 0, 0.25); /* 适应缩放 */
            }
        }

        .section h2 {
            color: #d0f0ff;
            border-left: 3px solid #00bfff; /* 恢复电脑版边框 */
            padding-left: 9px; /* 恢复电脑版 padding */
            margin-bottom: 1.1rem; /* 恢复电脑版 margin */
            font-size: 1.4rem; /* 恢复电脑版字体大小 */
            font-weight: bold;
        }

         @media (max-width: 768px) {
            .section h2 {
                 border-left-width: calc(3px * 0.9); /* 适应缩放 */
                 padding-left: calc(9px * 0.9); /* 适应缩放 */
                 margin-bottom: calc(1.1rem * 0.9); /* 适应缩放 */
                 font-size: calc(1.4rem * 0.9); /* 适应缩放 */
            }
        }

        /* 重新设计卡片样式 */
        .card {
            background: linear-gradient(135deg, rgba(40, 40, 50, 0.4), rgba(30, 30, 40, 0.3)); /* 渐变半透明背景 */
            padding: 0.9rem; /* 恢复电脑版 padding */
            margin-bottom: 0.8rem; /* 恢复电脑版 margin */
            border-radius: 7px; /* 恢复电脑版圆角 */
            border: 1px solid rgba(74, 85, 104, 0.4); /* 半透明边框 */
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05); /* 内外阴影增加层次感 */
            position: relative; /* 为伪元素定位 */
        }

        /* 添加细微的纹理效果 */
        .card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.03) 50%, transparent 51%), 
                linear-gradient(-45deg, transparent 49%, rgba(255, 255, 255, 0.03) 50%, transparent 51%);
            background-size: 4px 4px;
            border-radius: 7px;
            pointer-events: none;
        }

        @media (max-width: 768px) {
            .card {
                 padding: calc(0.9rem * 0.9); /* 适应缩放 */
                 margin-bottom: calc(0.8rem * 0.9); /* 适应缩放 */
                 border-radius: calc(7px * 0.9); /* 适应缩放 */
                 border-width: calc(1px * 0.9); /* 适应缩放 */
            }
             .card::before {
                 background-size: calc(4px * 0.9) calc(4px * 0.9);
                 border-radius: calc(7px * 0.9);
            }
        }


        .gold { color: #d4af37; font-weight: bold; }
        .red { color: #ff4757; font-weight: bold; }
        .event-name { color: #FFD700; font-weight: bold; } /* 用于突出事件名称 */

        .btn {
            display: inline-block;
            background-color: #00bfff;
            color: #000;
            padding: 0.6rem 1.2rem; /* 恢复电脑版 padding */
            border-radius: 6px; /* 恢复电脑版圆角 */
            font-weight: bold;
            margin: 0.35rem 0.35rem 0 0; /* 恢复电脑版 margin */
            transition: 0.25s;
            border: none;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
            font-size: 12.5px; /* 恢复电脑版字体大小 */
            box-shadow: 0 2px 5px rgba(0, 191, 255, 0.3); /* 恢复电脑版阴影 */
        }

         @media (max-width: 768px) {
            .btn {
                 padding: calc(0.6rem * 0.9) calc(1.2rem * 0.9); /* 适应缩放 */
                 border-radius: calc(6px * 0.9); /* 适应缩放 */
                 margin: calc(0.35rem * 0.9) calc(1.2rem * 0.9) 0 0; /* 适应缩放 */
                 font-size: calc(12.5px * 0.9); /* 适应缩放 */
                 box-shadow: 0 calc(2px * 0.9) calc(5px * 0.9) rgba(0, 191, 255, 0.3); /* 适应缩放 */
            }
        }

        .btn:hover {
            background-color: #009acd;
            transform: translateY(-1px); /* 恢复电脑版效果 */
            box-shadow: 0 3px 8px rgba(0, 191, 255, 0.45); /* 恢复电脑版阴影 */
        }

        @media (max-width: 768px) {
            .btn:hover {
                 transform: translateY(calc(-1px * 0.9)); /* 适应缩放 */
                 box-shadow: 0 calc(3px * 0.9) calc(8px * 0.9) rgba(0, 191, 255, 0.45); /* 适应缩放 */
            }
        }

        .btn-channel { background-color: #12B7F5; }
        .btn-channel:hover { background-color: #0fa5e0; }

        table { width: 100%; border-collapse: collapse; margin: 0.7rem 0; /* 恢复电脑版 margin */ font-size: 12.5px; /* 恢复电脑版字体大小 */ }
        th, td { padding: 0.6rem; /* 恢复电脑版 padding */ text-align: left; border-bottom: 1px solid #333; /* 恢复电脑版边框 */ }
        th { background-color: rgba(42, 58, 74, 0.7); color: #e0e8f0; }
        tr:hover { background-color: rgba(40, 40, 40, 0.6); }

        @media (max-width: 768px) {
            table {
                 margin: calc(0.7rem * 0.9) 0; /* 适应缩放 */
                 font-size: calc(12.5px * 0.9); /* 适应缩放 */
            }
             th, td {
                 padding: calc(0.6rem * 0.9); /* 适应缩放 */
                 border-bottom-width: calc(1px * 0.9); /* 适应缩放 */
            }
        }


        .difficulty-normal { color: #4CAF50; }
        .difficulty-hard { color: #FF9800; }
        .difficulty-extreme { color: #F44336; }
        .difficulty-legend { color: #9C27B0; }
        .difficulty-apocalypse { color: #FF5722; font-weight: bold; }

        footer {
            text-align: center;
            padding: 1.3rem; /* 恢复电脑版 padding */
            background-color: rgba(0, 0, 0, 0.7);
            margin-top: 1.6rem; /* 恢复电脑版 margin */
            border-top: 1px solid #333; /* 恢复电脑版边框 */
            font-size: 12.5px; /* 恢复电脑版字体大小 */
            color: #aaa;
        }

        @media (max-width: 768px) {
            footer {
                 padding: calc(1.3rem * 0.9); /* 适应缩放 */
                 margin-top: calc(1.6rem * 0.9); /* 适应缩放 */
                 border-top-width: calc(1px * 0.9); /* 适应缩放 */
                 font-size: calc(12.5px * 0.9); /* 适应缩放 */
            }
        }

        ul { padding-left: 1.4rem; /* 恢复电脑版 padding */ margin-top: 0.4rem; /* 恢复电脑版 margin */ font-size: 12.5px; /* 恢复电脑版字体大小 */ }
        li { margin-bottom: 0.3rem; /* 恢复电脑版 margin */ }

        @media (max-width: 768px) {
            ul {
                 padding-left: calc(1.4rem * 0.9); /* 适应缩放 */
                 margin-top: calc(0.4rem * 0.9); /* 适应缩放 */
                 font-size: calc(12.5px * 0.9); /* 适应缩放 */
            }
             li {
                 margin-bottom: calc(0.3rem * 0.9); /* 适应缩放 */
            }
        }
    </style>
</head>
<body>

    <!-- 导航栏 -->
    <header>
        <div class="container">
            <div class="nav-title">HuiMeng│绘梦生存服</div>
        </div>
    </header>

    <!-- 公告板块 -->
    <section class="announcements">
        <div class="container">
                        <div class="announcement-list">
                <a href="https://pd.qq.com/s/2mdnpb76e?b=2" target="_blank" class="announcement-item-link">
                    <div class="announcement-content">
                        <span class="announcement-title">重要公告│《变异村庄》通关演示</span>
                        <span class="announcement-date">2026年2月7日</span>
                    </div>
                </a>
                <a href="https://pd.qq.com/s/d3ttfmth3?b=2" target="_blank" class="announcement-item-link">
                    <div class="announcement-content">
                        <span class="announcement-title">重要公告│ 服务器延期开服通知</span>
                        <span class="announcement-date">2026年1月28日</span>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- 主体内容 -->
    <main class="container">

        <!-- 开头介绍 -->
        <section id="intro" class="section">
            <h2>· HuiMeng│绘梦 S2赛季 ·</h2>
            <div class="card">
                <p>虽然服务器已开启多年，但也经历了多次重置。您现在玩到的版本是 <strong>2026年2月15日</strong> 开放的 <span class="gold">绘梦S2赛季</span>。因此，服务器其实还是一个朝气蓬勃，活力满满的新生服务器！</p>
                <p><strong>类型：</strong> 货币生存服</p>
                <p><strong>核心特色：</strong> 连锁砍树、连锁挖矿、全自动地皮、260+商品货币商店、9大原创副本</p>
                <p><strong>服主：</strong> <span class="gold">云亦</span> | <strong>管理员：</strong> <span class="gold">天秤</span></p>
                <div style="margin-top: 1.1rem;"> <!-- 恢复电脑版 margin -->
                    <a href="https://qun.qq.com/universal-share/share?ac=1&authKey=35gl02JZVWg%2FFUA7wluZB4fXlmsP4e59e%2BGGorSwUI6mzY%2FbsAyIpuUdetuN2taK&busi_data=eyJncm91cENvZGUiOiIxMDQ3NDU1NDQ3IiwidG9rZW4iOiIxYjhXZ21HZzNEZEdvTko0N3hTSWxQcGZweGhqUjR0dTJUT2pVR2FOcHc3dldFUUxiQ25aaVRlazdNUk55Q2JIIiwidWluIjoiMzE3Nzk5NTc1NSJ9&data=IFFQE-RN6sGyfdaAzMBRXFGSwqKhfCkT-p4CBHrzYiy5MV4VV-47VLVb8CwHazRl-yPt3HJGra7DyHV_PnrWog&svctype=4&tempid=h5_group_info" target="_blank" class="btn">加入QQ群</a>
                    <a href="https://pd.qq.com/s/gaak2r98t" target="_blank" class="btn btn-channel">进入QQ频道</a>
                </div>
            </div>
        </section>

        <!-- 祈愿抽奖 -->
        <section id="prayer" class="section">
            <h2>· 祈愿抽奖 ·</h2>
            <div class="card">
                <p><strong></strong> 略表心意：200金币（1抽）｜虔诚祈愿：1900金币（10抽）</p>
            </div>
            <div class="card">
                <p><strong>🎁 概率：</strong> 灰(48%)、蓝(20%)、金(17%)、橙(11%)、<span class="red">红(5%)</span></p>
                <p><strong></strong>    单抽和10连抽会出现前四等级以及少数红色物品。</p>
                <p><strong>💡 红色奖品：</strong> 含“饿鬼道”武器等稀有装备</p>
            </div>
            <div class="card">
                <p><strong>★ 保底：</strong> 150抽保底红装，每触发一次-5抽，最多叠20层</p>
                <p><strong></strong> 10连抽时，若次数中含有保底，保底会正常进行，剩余次数会计算至下一级。</p>
            </div>
        </section>

        <!-- 全自动地皮 -->
        <section id="dipi" class="section">
            <h2>·全自动地皮 ·</h2> <!-- 标题已修改 -->
            <div class="card">
                <p>· 地皮范围57X57，不限高。</p>
                <p>· 价格：5000金币，每个人都买得起。</p>
                <p>· 要求：在线达到3小时即可购买。</p>
            </div>
            <div class="card">
                <p>· 地皮属于二分法，拐弯式创建，减少区块占用。四面八方都会有邻居，只有新地皮才会在边界</p>
            </div>
            <div class="card">
                <p><strong>🏠 地皮复活点：</strong> 雪球菜单有地皮复活的开关，打开后可以在地皮复活，不占用床的复活点，打开复活后自动传送到地皮</p>
            </div>
            <div class="card">
                <p><strong>🛠️ 关闭地皮复活：</strong> 关闭后，复活点将不在地皮，可以复活在原本的复活点，也就是床的复活点。</p>
            </div>
        </section>

       <!-- 副本挑战 -->
<section id="fuwen" class="section">
    <h2>· 副本挑战 ·</h2>
    <div class="card">
        <p>难度：普通 → 困难 → 极限 → 传奇 → 归墟｜奖励随难度提升</p>
    </div>
    <div class="dungeon-grid">
        <div class="dungeon-card difficulty-normal">
            <div class="dungeon-name">深海沉墟 / 变异村庄</div>
            <div class="dungeon-level">普通</div>
        </div>
        <div class="dungeon-card difficulty-hard">
            <div class="dungeon-name">实验基地 / 熔火炼狱</div>
            <div class="dungeon-level">困难</div>
        </div>
        <div class="dungeon-card difficulty-extreme">
            <div class="dungeon-name">冰河时代 / 时序回廊</div>
            <div class="dungeon-level">极限</div>
        </div>
        <div class="dungeon-card difficulty-legend">
            <div class="dungeon-name">幽灵骑士 / 罪域囚笼</div>
            <div class="dungeon-level">传奇</div>
        </div>
        <div class="dungeon-card difficulty-apocalypse">
            <div class="dungeon-name">暗影主宰</div>
            <div class="dungeon-level">归墟</div>
        </div>
    </div>
</section>

<style>
/* === 副本挑战专属样式 === */
.dungeon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 0.9rem;
    margin-top: 0.7rem;
}

.dungeon-card {
    background: rgba(30, 35, 45, 0.7);
    border-radius: 8px;
    padding: 0.9rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-left: 4px solid;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
    transition: transform 0.2s, box-shadow 0.2s;
}

.dungeon-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
}

.dungeon-name {
    font-weight: bold;
    color: #e0f0ff;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 140px;
}

.dungeon-level {
    font-weight: bold;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.2);
    font-size: 12px;
}

/* 沿用原有难度颜色 */
.dungeon-card.difficulty-normal { border-left-color: #4CAF50; }
.dungeon-card.difficulty-hard   { border-left-color: #FF9800; }
.dungeon-card.difficulty-extreme{ border-left-color: #F44336; }
.dungeon-card.difficulty-legend { border-left-color: #9C27B0; }
.dungeon-card.difficulty-apocalypse { border-left-color: #FF5722; }

/* 手机端适配 */
@media (max-width: 768px) {
    .dungeon-grid {
        grid-template-columns: 1fr;
        gap: 0.8rem;
    }
    .dungeon-name {
        max-width: 120px;
        font-size: 12.5px;
    }
}
</style>

        <!-- 技能商店 -->
        <section id="skill" class="section">
            <h2>· 技能商店 ·</h2>
            <div class="card">
                <p>· 手持指定物品使用，打副本可获得代币。</p>
            </div>
            <div class="card">
                <p>· <strong>强心剂</strong><br>
                获得全部正面buff，在商店中购买（一次性）</p>
            </div>
            <div class="card">
                <p>· <strong>筋斗云</strong><br>
                拥有飞行，能上天下地，建筑党福利，不需要搭方块了（视角抬头：上升，视角中间：悬浮，低头：下降）</p>
            </div>
            <div class="card">
                <p>· <strong>移动光源</strong><br>
                副手持火把，获得亮度，和模组一样。</p>
            </div>
            <div class="card">
                <p>· <strong>闪光弹</strong><br>
                对附近10格范围玩家触发8秒闪光致盲。</p>
            </div>
            <div class="card">
                <p>· <strong>灵魂锁链</strong><br>
                抬头拉取附近20格生物到自己身边，低头拉取玩家</p>
            </div>
            <div class="card">
                <p>· <strong>喷火枪</strong><br>
                喷出一道长6格的火焰，对前发10格的敌人造成伤害，是为数不多的远程技能，抬头开启，低头关闭</p>
            </div>
            <div class="card">
                <p>· <strong>拔刀剑</strong><br>
                发出一道剑气(有三种伤害不同的剑气)，对范围内生物造成伤害(清小兵推荐)</p>
            </div>
            <div class="card">
                <p>· <strong>护身图腾</strong><br>
                手持岩浆膏自动装备副手，对前方敌人造成高频伤害(不影响主手)</p>
            </div>
            <div class="card">
                <p>· <strong>陨灭炮</strong><br>
                手持烈焰棒下蹲，向前方释放爆炸射线，对范围生物造成大量伤害，对boss额外造成血条伤害</p>
            </div>
            <div class="card">
                <p>· 这里只是部分技能，更多请去技能商店查看。</p>
            </div>
        </section>

        <!-- 随机事件（独立卡片展示） -->
        <section id="random-events" class="section">
            <h2>· 随机事件 ·</h2>
            <div class="card">
                <p>· <strong>触发条件：</strong>每天晚上触发一次，随机触发一种事件。</p>
            </div>
            <div class="card">
                <p>· <strong>幸运方块</strong><br>
                玩家获得幸运方块，猜在上面可以开箱。</p>
            </div>
            <div class="card">
                <p>· <strong>幸运女神</strong><br>
                小概率出现，给予钻石、或金块。</p>
            </div>
            <div class="card">
                <p>· <strong>代币事件</strong><br>
                随机选择一名玩家，给予随机代币。</p>
            </div>
            <div class="card">
                <p>· <strong>雷电</strong><br>
                随机雷击一名玩家，造成巨额伤害。</p>
            </div>
            <div class="card">
                <p>· <strong>满级速掘</strong><br>
                全部玩家，享受一晚上的急迫buff，满级。</p>
            </div>
            <div class="card">
                <p>· <strong>财产分割</strong><br>
                随机选择一名玩家，扣除100-1000金币。</p>
            </div>
            <div class="card">
                <p>· <strong>诡影之夜</strong><br>
                触发时间：随机事件概率触发，倒计时60s，期间会显示规则，整个血月持续600秒（整个晚上）。<br>
                届时副本入口将关闭，副本内玩家不会强制退出，并获得抗性和血量回复(≈送一次通关次数)，玩家间伤害将关闭(技能不受影响)，死亡掉落将开启。除副本和禁技能区域外，玩家周围60×60将随机且不间断生成僵尸，杀死一只僵尸掉落1-3代币。</p>
            </div>
        </section>

        <!-- 天赋殿堂 -->
        <section id="talent" class="section">
            <h2>· 天赋殿堂 ·</h2>
            <div class="card">
                <p>· <strong>天赋殿堂：</strong></p>
                <ul>
                    <li>天赋可以获得永久buff效果（抗性，力量，速度，生命恢复，生命提升）</li>
                    <li>购买后，默认为1级，可以升级天赋，每个天赋最高等级都不一样</li>
                    <li>天赋购买需要使用代币和副本凭证</li>
                </ul>
            </div>
        </section>

        <!-- 特色玩法 -->
        <section id="features" class="section">
            <h2>· 特色玩法 ·</h2>

            <!-- 货币商店（放在最前，含完整素材分类） -->
            <div class="card">
                <p>· <strong>货币商店：</strong></p>
                <ul>
                    <li><strong>农作物类：</strong> 小麦、胡萝卜、马铃薯、甜菜根、南瓜、西瓜等</li>
                    <li><strong>矿物类：</strong> 煤炭、铁锭、金锭、钻石、绿宝石、下界合金等</li>
                    <li><strong>战利品类：</strong> 怪物掉落物、装备、药水、附魔书、稀有材料等</li>
                    <li>总计 <span class="gold">260+</span> 商品，万物皆可买！</li>
                </ul>
            </div>

             <!-- 回收商店（移到货币商店下方，使用素材文字） -->
            <div class="card">
                <p>· <strong>回收商店：</strong></p>
                <ul>
                    <li><strong>农作物类：</strong> 小麦、胡萝卜、马铃薯、甜菜根、南瓜、西瓜等</li>
                    <li><strong>矿物类：</strong> 煤炭、铁锭、金锭、钻石、绿宝石、下界合金等</li>
                    <li><strong>战利品类：</strong> 怪物掉落物、装备、药水、附魔书、稀有材料等</li>
                    <li>以上三种类型都可以兑换金币！</li>
                </ul>
            </div>

            <!-- 全服喊话 -->
            <div class="card">
                <p>· <strong>全服喊话：</strong></p>
                <ul>
                    <li><strong>聊天栏喊话：</strong>喊话内容会显示在聊天栏。</li>
                    <li><strong>屏幕喊话：</strong>喊话内容会显示在屏幕。</li>
                </ul>
            </div>

            <!-- 随机红包雨 -->
            <div class="card">
                <p>· <strong>随机红包雨：</strong></p>
                <ul>
                    <li>每个人都是随机金额，900秒刷新一次。</li>
                    <li>领取时间：15秒内，低头移动</li>
                    <li>红包雨金额：150~600金币。</li>
                </ul>
            </div>

        </section>

        <!-- 关于维度 -->
        <section id="dimension" class="section">
            <h2>· 关于维度 ·</h2>
            <div class="card">
                <p>· 绘梦服一共有17个主世界。属于平行维度，一模一样地形。</p>
                <p>· 公会/地皮/生存/玩法/公共设施，这些都是单独维度，不会受主维度影响</p>
                <p>· 每个公会（人数≥5，创建天数≥10）都有专属维度，外人无法抄家，可以大胆公开公会位置，公会规则自定</p>
                <p>· 会长控制室：仅会长可以进入，给予身份，取消身份，重置所有人身份（详情见群公告）</p>
            </div>
        </section>

        <!-- 雪球菜单 -->
        <section id="snowball-menu" class="section">
            <h2>· 雪球菜单 ·</h2>
            <div class="card">
                <p><strong>个人信息</strong><br>
                  查看在线分钟，在线小时，金币数量，代币数量，签到天数，世界时间</p>
            </div>
            <div class="card">
                <p><strong>快捷传送</strong><br>
                  生存区随机传送，以及各种主要设施。</p>
            </div>
            <div class="card">
                <p><strong>玩家互传</strong><br>
                  选择想传送玩家申请，对方同意后可自动传送</p>
            </div>
            <div class="card">
                <p><strong>金币转账</strong><br>
                  为指定玩家转账金币，玩家交易的不二之选</p>
            </div>
            <div class="card">
                <p><strong>其他功能</strong><br>
                  原地去世，改生存，开关地皮复活，设置复活点(只能生存改)</p>
            </div>
        </section>

        <!-- 小游戏 -->
        <section id="mini-games" class="section">
            <h2>· 小游戏 ·</h2>
            <div class="card">
                <p>  为了避免大家无聊，生存腻了可以玩小游戏解压，可以邀请其他人一起玩噢</p>
            </div>
            <div class="card">
                <p><strong>跑酷</strong><br>
                  暂时没有，敬请期待。<br>
                  均为绘梦服原创制作，到达终点均有不同奖励</p>
            </div>
            <div class="card">
                <p><strong>躲猫猫</strong><br>
                  躲藏者藏丛里，可获得隐身，找时机换位置，躲避抓捕，倒计时结束获胜。 猎人抓捕全部玩家，获得胜利,靠近玩家就能逮捕,拥有速度3</p>
            </div>
            <div class="card">
                <p><strong>甩锅大战</strong><br>
                  传统玩法，躲避持锅者，持锅者负责甩锅给别人，倒计时结束炸锅，剩1人获胜</p>
            </div>
            <div class="card">
                <p><strong>环数靶场</strong><br>
                单人原创小游戏，利用弓弩打靶子，打目标方块环数。达到15环可获得金币奖励，并全服播报。</p>
            </div>
        </section>

    </main>

    <footer>
        <p>© 2026 HuiMeng│绘梦 Minecraft服务器</p>
        <p>S2赛季 · 2026.02.15开启</p>
    </footer>

</body>
</html>
