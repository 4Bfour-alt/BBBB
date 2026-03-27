/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Twitter, ArrowUpRight, Search, Filter, ChevronRight, Play } from 'lucide-react';

// --- Types ---
interface Work {
  id: number;
  title: string;
  category: string;
  description: string;
  cover: string;
  bilibiliUrl: string;
  color: string;
  featured?: boolean;
}

// --- Data ---
const WORKS: Work[] = [
  {
    id: 1,
    title: "遗忘轮回・雾馆寻踪",
    category: "AI布偶风格",
    description: "在这个充满迷雾的古老馆驿中，探索遗忘与轮回的秘密。独特的 AI 布偶视觉风格，带你进入一个既诡异又迷人的梦幻世界。",
    cover: "https://i.postimg.cc/W3GqRvbf/260322遗忘轮回_雾馆寻踪_02121.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV15ZQ2BDED9/",
    color: "from-purple-500/40 to-pink-500/40",
    featured: true
  },
  {
    id: 2,
    title: "时间便利店",
    category: "AI吉卜力风格",
    description: "在街角的尽头，有一家只在深夜营业的便利店。这里不卖商品，只交换遗失的时间。温暖的吉卜力画风，带你找回那些被遗忘的珍贵瞬间。",
    cover: "https://i.postimg.cc/FzhdNB76/时间便利店.png",
    bilibiliUrl: "https://www.bilibili.com/video/BV1DfwQzDEjb/?spm_id_from=333.1387.homepage.video_card.click&vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-blue-500/40 to-cyan-500/40",
    featured: true
  },
  {
    id: 3,
    title: "钟馗墨斩妖・水墨神话",
    category: "AI水墨风格",
    description: "以传统水墨为骨，AI 算法为魂。展现钟馗斩妖除魔的飒爽英姿，在黑白虚实间重构东方神话的视觉张力。",
    cover: "https://i.postimg.cc/wjFdGbpX/260225中国风钟馗_01843.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV13PAQzpEv9/?spm_id_from=333.1387.homepage.video_card.click",
    color: "from-indigo-500/40 to-purple-500/40",
    featured: true
  },
  {
    id: 4,
    title: "西行黑神话・天定西行路",
    category: "AI游戏概念风格",
    description: "重走西行路，再续黑神话。以 AI 视角重塑宏大的暗黑神话世界，在宿命与反抗的交织中，见证天命人的觉醒。",
    cover: "https://i.postimg.cc/ZnJB4MCG/西行黑神话_天定西行_01471.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV13MZRBUE7U/?spm_id_from=333.1387.homepage.video_card.click&vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-orange-500/40 to-red-500/40"
  },
  {
    id: 5,
    title: "西行黑神话・紧箍咒",
    category: "AI游戏概念风格",
    description: "金箍束首，是枷锁也是宿命。在 AI 的笔触下，重新诠释那段关于束缚与挣扎的史诗篇章，探索黑神话背后的深层意蕴。",
    cover: "https://i.postimg.cc/FzhdNB7C/西行黑神话_紧箍咒_00433.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1Evf7BbEfS/?spm_id_from=333.1387.upload.video_card.click&vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-emerald-500/40 to-teal-500/40"
  },
  {
    id: 6,
    title: "西行黑神话・人参果",
    category: "AI游戏概念风格",
    description: "万寿山五庄观，三千年一开花，三千年一结果。以 AI 视角重现这枚充满禁忌与长生诱惑的仙果，在诡谲的氛围中探寻西游背后的阴暗面。",
    cover: "https://i.postimg.cc/pLkt61HB/西行黑神话_人参果_00866.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV1C7fwBREYz/?spm_id_from=333.1387.upload.video_card.click&vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-gray-500/40 to-blue-500/40"
  },
  {
    id: 7,
    title: "九州浩劫・凶神相繇",
    category: "AI游戏概念风格",
    description: "上古凶神相繇降世，九首蛇身，所到之处尽成泽国。在 AI 的重构下，展现这场关乎九州存亡的宏大浩劫。",
    cover: "https://i.postimg.cc/4yX7sSmF/九州浩劫_00000.jpg",
    bilibiliUrl: "https://www.bilibili.com/video/BV18vckzpEPP/?spm_id_from=333.1387.upload.video_card.click&vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-red-900/40 to-black/40"
  },
  {
    id: 8,
    title: "阴缘",
    category: "Blender风格化",
    description: "阴阳交错，缘起缘灭。在 Blender 的风格化渲染下，探索一段跨越生死的奇幻故事。",
    cover: "https://i.postimg.cc/qqph45zQ/500001624247757_1_192_01662.png",
    bilibiliUrl: "https://www.bilibili.com/video/BV1kC8eeiEaZ/?vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-red-900/40 to-black/40"
  },
  {
    id: 9,
    title: "数码宝贝Butter-Fly",
    category: "虚幻5动画",
    description: "在虚幻引擎 5 的强大渲染下，重温那段关于勇气与友情的冒险。无限大的梦想，在数码世界中再次启航。",
    cover: "https://i.postimg.cc/zBCHmrXQ/1427645354_1_192_00455.png",
    bilibiliUrl: "https://www.bilibili.com/video/BV1bU421Z79D/?vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-blue-600/40 to-purple-600/40"
  },
  {
    id: 10,
    title: "1999保密档案",
    category: "虚幻5动画",
    description: "一段尘封已久的往事，一份绝密的保密档案。在虚幻引擎 5 的写实渲染下，揭开 1999 年那个不为人知的秘密。",
    cover: "https://i.postimg.cc/Hxw8Ggsf/1147838131_1_208_00358.png",
    bilibiliUrl: "https://www.bilibili.com/video/BV1Jz4y1q7bc/?vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-yellow-500/40 to-blue-500/40"
  },
  {
    id: 11,
    title: "囍-冥婚",
    category: "虚幻5动画",
    description: "红白喜事，阴阳两界。在虚幻引擎 5 的极致光影下，展现一段中式民俗恐怖的视觉奇观。",
    cover: "https://i.postimg.cc/NM62hcfZ/1033863878_1_208_00363.png",
    bilibiliUrl: "https://www.bilibili.com/video/BV1FY4y117Fu/?vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-red-900/40 to-black/40"
  },
  {
    id: 12,
    title: "小鹏G7车色篇",
    category: "虚幻5动画",
    description: "在虚幻引擎 5 的写实渲染下，展现小鹏 G7 极致的车身质感与色彩美学。流动的光影，勾勒出未来的出行方式。",
    cover: "https://i.postimg.cc/mkTzB5t5/输出_00109.png",
    bilibiliUrl: "https://www.bilibili.com/video/BV1EL37zxESk/?vd_source=27ed1e38f4dc7244128882f613c578b9",
    color: "from-zinc-700/40 to-orange-700/40"
  }
];

const CATEGORIES = ["全部", "数字艺术", "动态图形", "概念艺术", "虚幻5动画", "视觉特效"];

// --- Components ---

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl py-6' : 'bg-transparent py-12'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-widest text-glow">叁贰号制造厂</Link>
        <div className="flex gap-8 md:gap-12 text-[10px] tracking-[0.3em] uppercase font-bold">
          <Link to="/" className="hover:text-white transition-colors text-white/60">首页</Link>
          <Link to="/works" className="hover:text-white transition-colors text-white/60">全部作品</Link>
          <Link to="/about" className="hover:text-white transition-colors text-white/60">关于</Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-8">叁贰号制造厂</h2>
          <div className="flex gap-6">
            <SocialLink 
              icon={<img src="https://i.postimg.cc/8k3nFznD/b-zhan-(1).png" className="w-8 h-8 object-contain" alt="B站" referrerPolicy="no-referrer" />} 
              href="https://space.bilibili.com/502450?spm_id_from=333.788.0.0" 
            />
            <SocialLink 
              icon={<img src="https://i.postimg.cc/3wDsRDY1/xiao-hong-shu.png" className="w-8 h-8 object-contain" alt="小红书" referrerPolicy="no-referrer" />} 
              href="https://www.xiaohongshu.com/user/profile/632d682800000000150181f5" 
            />
            <SocialLink 
              icon={<img src="https://i.postimg.cc/XqwHSwKn/xin-pian-chang.png" className="w-8 h-8 object-contain" alt="新片场" referrerPolicy="no-referrer" />} 
              href="https://www.xinpianchang.com/u14449334" 
            />
          </div>
        </div>
        <div className="flex flex-col md:items-end justify-between">
          <div className="text-right">
            <p className="text-[10px] tracking-[0.5em] text-white/50 uppercase mb-4">联系我们</p>
            <a href="mailto:czb874643177@126.com" className="text-xl md:text-2xl font-light hover:text-glow transition-all">czb874643177@126.com</a>
          </div>
          <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase mt-12">
            © 2026 叁贰号制造厂. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', scale: 1.1 }}
      className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 transition-all"
    >
      {icon}
    </motion.a>
  );
}

function WorkCard({ work }: { work: Work; key?: any }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 border border-white/10"
    >
      <img
        src={work.cover}
        alt={work.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">{work.category}</span>
        <h3 className="text-xl font-bold mb-4 transition-all">{work.title}</h3>
        <p className="text-sm text-white/60 line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {work.description}
        </p>
        <a 
          href={work.bilibiliUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/80 hover:text-white"
        >
          立即观看 <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

// --- Pages ---

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showDesc, setShowDesc] = useState(false);
  const featuredWorks = WORKS.filter(w => w.featured);
  const currentWork = featuredWorks[currentIndex];

  const nextWork = () => {
    setShowDesc(false);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredWorks.length);
  };
  const prevWork = () => {
    setShowDesc(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredWorks.length) % featuredWorks.length);
  };

  const variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : direction < 0 ? '-100%' : 0,
      opacity: 0
    }),
    animate: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : direction < 0 ? '100%' : 0,
      opacity: 0
    })
  };

  return (
    <div className="pt-0">
      {/* Hero Slider */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center pt-48 pb-24 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`bg-${currentWork.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
            style={{ 
              backgroundImage: `url(${currentWork.cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(120px) saturate(1.2)',
            }} 
          />
        </AnimatePresence>
        <div className="surreal-bg opacity-30" />
        
        <div className="relative w-full max-w-7xl px-6 md:px-12 z-10">
          <div className="relative w-full aspect-video glass-card shadow-2xl group overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentWork.id}
                custom={direction}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${currentWork.cover})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent" />
                
                <div className="absolute inset-0 flex flex-col justify-center p-12 md:p-20 max-w-3xl z-20">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <span className="text-xs font-bold tracking-[0.5em] uppercase text-white/40 mb-6 block">
                      精选作品 / {currentWork.category}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8">
                      {currentWork.title}
                    </h1>
                    <div className="flex items-center gap-8">
                      <a
                        href={currentWork.bilibiliUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white text-black rounded-full text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3 hover:scale-105"
                      >
                        观看动态 <Play className="w-4 h-4 fill-current" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="absolute bottom-10 right-10 flex items-center gap-6 z-30">
              <div className="flex flex-col items-end gap-1 mr-6">
                <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase">精选</span>
                <div className="text-xl font-bold tracking-tighter">
                  <span className="text-white">0{currentIndex + 1}</span>
                  <span className="text-white/50 mx-2">/</span>
                  <span className="text-white/50">0{featuredWorks.length}</span>
                </div>
              </div>
              <button onClick={prevWork} className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-all bg-black/20 backdrop-blur-sm">←</button>
              <button onClick={nextWork} className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition-all bg-black/20 backdrop-blur-sm">→</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase mb-4 block">作品集</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">精选动态呈现</h2>
          </div>
          <Link to="/works" className="group flex items-center gap-4 text-sm font-bold tracking-widest uppercase text-white/40 hover:text-white transition-all">
            查看全部作品 <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WORKS.slice(0, 6).map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </section>

      {/* Quick About */}
      <section className="py-40 relative overflow-hidden bg-black border-y border-white/5 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative rounded-[40px] overflow-hidden bg-white/[0.02] border border-white/10 backdrop-blur-3xl flex items-center justify-center p-12 md:p-20 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
            <img 
              src="https://i.postimg.cc/903BWxWX/Four-B.png" 
              alt="4B Factory Logo" 
              className="w-48 md:w-64 h-auto object-contain transition-all duration-1000 group-hover:scale-110" 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[10px] tracking-[0.6em] text-white/50 uppercase mb-8 block font-bold">ABOUT STUDIO</span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[1.1] text-white">
              用数字艺术，<br />
              <span className="text-white/40">定义</span>动态艺术<span className="text-white/40">边界</span>
            </h2>
            <p className="text-xl text-white/50 leading-relaxed mb-14 max-w-xl font-light">
              深耕动态展示、动态图形与数字艺术领域。叁贰号制作厂，以专业打磨每一像素，用心呈现每一帧故事。
            </p>
            <Link to="/about" className="group relative inline-flex items-center gap-6 px-12 py-6 border border-white/20 text-white rounded-full text-xs font-bold tracking-[0.2em] uppercase overflow-hidden transition-all hover:bg-white hover:text-black hover:pr-16">
              <span className="relative z-10">探索制作厂的故事</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function AllWorks() {
  return (
    <div className="pt-56 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-24">
        <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase mb-4 block">作品库</span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">全部作品</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {WORKS.map(work => (
            <WorkCard key={work.id} work={work} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="pt-56 pb-32 px-6 md:px-12 max-w-4xl mx-auto min-h-screen">
      <span className="text-[10px] tracking-[0.5em] text-white/50 uppercase mb-4 block">关于我们</span>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16">数字时代的<br />动态炼金术士</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-white/80 leading-relaxed mb-12 font-light">
          叁贰号制造厂成立于 2024 年，是一个由动态艺术家、技术极客和创意导演组成的独立工作室。致力于探索AI数字媒介的无限可能，为动态艺术展示、动画艺术设计和商业项目提供最具前沿性的动态方案。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h3 className="text-glow text-lg font-bold tracking-widest uppercase mb-6">核心领域</h3>
            <ul className="space-y-4 text-white/60 text-sm tracking-wide">
              <li>• AI 视频艺术设计</li>
              <li>• AI漫剧番剧</li>
              <li>• 动态图形设计 (Motion Graphics)</li>
              <li>• 3D 数字艺术与渲染</li>
              <li>• 实验性影像创作</li>
            </ul>
          </div>
          <div>
            <h3 className="text-glow text-lg font-bold tracking-widest uppercase mb-6">我们的理念</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              在这个AI绽放的时代，我们追求的是纯粹的动态艺术。不盲从于速度，只专注于创造经得起时间考验的视频作品。
            </p>
          </div>
        </div>

        <div className="bg-white/5 rounded-3xl p-10 border border-white/10">
          <h3 className="text-2xl font-bold mb-6">寻求合作？</h3>
          <p className="text-white/60">
            无论你是有趣的商业项目，还是想进行艺术跨界合作，我们都非常期待听到你的想法。
          </p>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <ScrollToTop />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<AllWorks />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
