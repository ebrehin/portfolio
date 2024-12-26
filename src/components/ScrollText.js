import React, { useEffect, useState } from 'react';
import "../styles/components.css";

const ScrollText = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transformStyle = {
    transform: `translateY(${-scrollPosition * 0.3}px)`, // Direction inversée
    opacity: Math.min(1, scrollPosition / 500) // Apparition progressive
  };

  return (
    <div className="scroll-text-container">
      <div 
        className="scroll-text-content"
        style={transformStyle}
      >
        <h1>Votre texte qui défile ici</h1>
        <p>将束慢丽表腿陈也花！底弄乱孤按差科间温一莫以枪惊练并？最意带格跳罗靠熟肯计梦担幸却势！乱元望拉错类上细结笔衣陈红录彩？似活区型知兴英！弄论索结香气。室懂远战令娜关藸京表第这善！势其料杰脱穿处几放血！注较供彩娘精！紧千校束姐答！音吃破究章战即牛青封！间做伴战岛管吉始特求社海科旅深？自广沙沙音。既卫收空位仅代位架养密作玛大少？做朝克参够行祖新叶胡沙忍套？娜久劳钟于？学置据级沙普达本陈所章拉倒枪！近才！</p>
        <p>将束慢丽表腿陈也花！底弄乱孤按差科间温一莫以枪惊练并？最意带格跳罗靠熟肯计梦担幸却势！乱元望拉错类上细结笔衣陈红录彩？似活区型知兴英！弄论索结香气。室懂远战令娜关藸京表第这善！势其料杰脱穿处几放血！注较供彩娘精！紧千校束姐答！音吃破究章战即牛青封！间做伴战岛管吉始特求社海科旅深？自广沙沙音。既卫收空位仅代位架养密作玛大少？做朝克参够行祖新叶胡沙忍套？娜久劳钟于？学置据级沙普达本陈所章拉倒枪！近才！</p>
      </div>
    </div>
  );
};

export default ScrollText;