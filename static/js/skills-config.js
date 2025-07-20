// Skills 配置文件
// 可以轻松配置技能项目，包括图标、名称、颜色等

const skillsConfig = {
    // 技能部分的标题
    title: "技能",
    
    // 是否显示技能部分
    enabled: true,
    
    // 技能列表配置
    skills: [
        {
            name: "Golang",
            icon: "fab fa-golang",
            color: "#00ADD8",
            level: 80
        },
        {
            name: "Rust",
            icon: "fab fa-rust",
            color: "#CE422B",
            level: 30
        },
        {
            name: "C",
            icon: "fas fa-code",
            color: "#A8B9CC",
            level: 30
        },
        {
            name: "Python",
            icon: "fab fa-python",
            color: "#3776AB",
            level: 10
        },
        {
            name: "HTML5",
            icon: "fab fa-html5",
            color: "#E34F26",
            level: 50
        },
        {
            name: "CSS3",
            icon: "fab fa-css3-alt",
            color: "#1572B6",
            level: 50
        },
        {
            name: "JavaScript",
            icon: "fab fa-js-square",
            color: "#F7DF1E",
            level: 50
        },
        {
            name: "Linux",
            icon: "fab fa-linux",
            color: "#FCC624",
            level: 80
        },
        {
            name: "Git",
            icon: "fab fa-git-alt",
            color: "#F05032",
            level: 85
        },
        {
            name: "Docker",
            icon: "fab fa-docker",
            color: "#2496ED",
            level: 70
        },
        {
            name: "Database",
            icon: "fas fa-database",
            color: "#336791",
            level: 70
        },
        {
            name: "Server",
            icon: "fas fa-server",
            color: "#6C757D",
            level: 80
        }
    ],
    
    // 显示配置
    display: {
        // 每行显示的图标数量
        itemsPerRow: {
            desktop: 6,  // 桌面端每行6个
            tablet: 4,   // 平板每行4个
            mobile: 3    // 手机每行3个
        },
        
        // 是否显示技能名称
        showNames: true,
        
        // 是否显示技能等级条
        showLevelBars: true,
        
        // 图标大小 (px)
        iconSize: {
            desktop: 48,
            tablet: 40,
            mobile: 36
        },
        
        // 动画效果
        animations: {
            hover: true,        // 悬停动画
            entrance: true,     // 入场动画
            stagger: 100        // 错峰动画延迟 (ms)
        }
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = skillsConfig;
} else if (typeof window !== 'undefined') {
    window.skillsConfig = skillsConfig;
}
