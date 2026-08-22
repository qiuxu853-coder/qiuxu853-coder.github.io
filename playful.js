const links=[...document.querySelectorAll('header nav a')],sections=[...document.querySelectorAll('main section[id]')],cards=[...document.querySelectorAll('.portfolio-card')],head=document.querySelector('.site-head');document.querySelectorAll('.chapter-head h2').forEach(el=>el.dataset.shadow=el.textContent);const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}),{rootMargin:'-35% 0px -55%'});sections.forEach(s=>observer.observe(s));const update=()=>{head.classList.toggle('scrolled',scrollY>30);if(innerWidth>680)cards.forEach((card,i)=>{const next=cards[i+1];card.classList.toggle('is-past',!!next&&next.getBoundingClientRect().top<=64)})};addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();document.addEventListener('pointermove',e=>{const c=document.querySelector('.hero-collage');if(!c||innerWidth<801)return;c.style.transform=`translate(${(e.clientX/innerWidth-.5)*8}px,${(e.clientY/innerHeight-.5)*8}px)`});

const rails={
 '.profile-card':[
  ['20K+','简历数据','参与秋招与春招招聘数据处理，用岗位与技能标签建立人才分类。','assets/project-covers/digital-trade.png'],
  ['30K','绩效数据','整合考勤、评优等数据并输出可视化分析，支持组织决策。','assets/project-covers/women-wealth.png'],
  ['9K+','文本研究','抓取网络评论并完成主题模型、关键词提炼与情绪洞察。','assets/project-covers/ai-marketing.png'],
  ['1500+','活动触达','参与迎新、反诈宣传和职业规划等校园项目的组织执行。','assets/from-about-me/p01-001-X4.png']
 ],
 '#experience':[
  ['2025','品牌内容运营','奇瑞矩阵账号视频发布、周月报整理、热点与汽车产品卖点拆解。','assets/from-about-me/p02-008-X18.png'],
  ['40%','招聘效率','广州银行总部春招简历初筛效率提升，支持招聘流程优化。','assets/project-covers/digital-trade.png'],
  ['6000+','员工绩效','协助完成季度考核，清洗数据并输出可视化报告。','assets/project-covers/women-wealth.png'],
  ['100%','准确交付','税务实习中完成企业账目核验与凭证电子化归档。','assets/from-about-me/p01-002-X7.png']
 ],
 '#projects':[
  ['省级二等奖','统计建模','第十一届全国大学生统计建模大赛省赛二等奖。','assets/evidence/stats-award.png'],
  ['全国二等奖','数字贸易','完成跨境电商市场与店铺运营分析，获全国总决赛二等奖。','assets/project-covers/digital-trade.png'],
  ['省赛晋级','AI 数字营销','400份问卷、6147条有效评论与90+张分析图表。','assets/project-covers/ai-marketing.png'],
  ['结项','创新创业项目','围绕关键矿产供应链与新能源汽车产业完成校级大创。','assets/evidence/innovation-close.png'],
  ['数据叙事','她经济','以数据可视化方式呈现女性经济与财富安全议题。','assets/project-covers/women-wealth.png']
 ],
 '#life':[
  ['40场','辩论训练','在不同议题和立场中训练资料研究、判断与现场表达。','assets/from-about-me/p01-004-X11.png'],
  ['20+','活动报道','参与学院公众号运营、海报设计与活动内容编辑。','assets/from-about-me/p01-003-X9.png'],
  ['10+','班级活动','从生日会到运动节，在具体协作中保持对人的感受。','assets/from-about-me/p01-002-X7.png'],
  ['持续记录','校园切片','把学习、团队与生活中的小发现留进个人档案。','assets/from-about-me/p01-001-X4.png']
 ]
};
Object.entries(rails).forEach(([selector,items])=>{const section=document.querySelector(selector);if(!section)return;const wrap=document.createElement('div');wrap.className='swipe-module';wrap.innerHTML=`<div class="swipe-heading"><div><small>SWIPE LEFT · 左滑看下一张</small><h3>更多成果与切片</h3></div><div class="swipe-nav"><span class="swipe-count" aria-live="polite">01 / ${String(items.length).padStart(2,'0')}</span><div class="swipe-controls"><button type="button" aria-label="上一张">←</button><button type="button" aria-label="下一张">→</button></div></div></div><div class="swipe-rail" tabindex="0" aria-label="可左右滑动的内容卡片">${items.map(([num,title,copy,img],index)=>`<article class="swipe-card" aria-label="第 ${index+1} 张，共 ${items.length} 张"><div class="swipe-image"><img src="${img}" alt="${title}" loading="lazy"></div><div class="swipe-copy"><strong>${num}</strong><h4>${title}</h4><p>${copy}</p></div></article>`).join('')}</div>`;section.append(wrap);const rail=wrap.querySelector('.swipe-rail'),cards=[...rail.children],[prev,next]=wrap.querySelectorAll('button'),count=wrap.querySelector('.swipe-count');const step=()=>cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(rail).columnGap||getComputedStyle(rail).gap||0);const updateRail=()=>{const index=Math.max(0,Math.min(items.length-1,Math.round(rail.scrollLeft/step())));count.textContent=`${String(index+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;prev.disabled=index===0;next.disabled=index===items.length-1};prev.onclick=()=>rail.scrollBy({left:-step(),behavior:'smooth'});next.onclick=()=>rail.scrollBy({left:step(),behavior:'smooth'});rail.addEventListener('scroll',updateRail,{passive:true});updateRail();});
