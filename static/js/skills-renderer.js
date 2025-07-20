// Skills 渲染器
// 根据配置动态生成技能部分的HTML和样式

class SkillsRenderer {
    constructor(config) {
        this.config = config;
        this.skillsContainer = null;
    }

    // 初始化技能部分
    init() {
        if (!this.config.enabled) {
            this.hideSkillsSection();
            return;
        }

        this.skillsContainer = document.querySelector('.skill');
        if (!this.skillsContainer) {
            console.error('技能容器未找到');
            return;
        }

        this.render();
        this.addStyles();
        
        if (this.config.display.animations.entrance) {
            this.addEntranceAnimations();
        }
    }

    // 隐藏技能部分
    hideSkillsSection() {
        const skillSection = document.querySelector('.skill').parentElement;
        if (skillSection) {
            skillSection.style.display = 'none';
        }
    }

    // 渲染技能HTML
    render() {
        const skillsHTML = this.generateSkillsHTML();
        this.skillsContainer.innerHTML = skillsHTML;
    }

    // 生成技能HTML
    generateSkillsHTML() {
        const skills = this.config.skills;
        let html = '<div class="skills-grid">';

        skills.forEach((skill, index) => {
            html += this.generateSkillItem(skill, index);
        });

        html += '</div>';
        return html;
    }

    // 生成单个技能项
    generateSkillItem(skill, index) {
        const animationDelay = this.config.display.animations.entrance ? 
            `style="animation-delay: ${index * this.config.display.animations.stagger}ms"` : '';

        return `
            <div class="skill-item" data-skill="${skill.name}" ${animationDelay}>
                <div class="skill-icon-wrapper">
                    <i class="${skill.icon}" 
                       style="color: ${skill.color}; font-size: var(--skill-icon-size)"></i>
                </div>
                ${this.config.display.showNames ? `
                    <div class="skill-name">${skill.name}</div>
                ` : ''}
                ${this.config.display.showLevelBars && skill.level ? `
                    <div class="skill-level">
                        <div class="skill-level-bar">
                            <div class="skill-level-fill" 
                                 style="width: ${skill.level}%; background-color: ${skill.color}"></div>
                        </div>
                        <span class="skill-level-text">${skill.level}%</span>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // 添加样式
    addStyles() {
        const styleId = 'skills-dynamic-styles';
        let existingStyle = document.getElementById(styleId);
        
        if (existingStyle) {
            existingStyle.remove();
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = this.generateCSS();
        document.head.appendChild(style);
    }

    // 生成CSS样式
    generateCSS() {
        const { itemsPerRow, iconSize, animations } = this.config.display;

        return `
            :root {
                --skill-icon-size: ${iconSize.desktop}px;
                --skills-per-row: ${itemsPerRow.desktop};
            }

            .skills-grid {
                display: grid;
                grid-template-columns: repeat(var(--skills-per-row), 1fr);
                gap: 20px;
                padding: 0;
                max-width: 100%;
            }

            .skill-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding: 15px;
                border-radius: 12px;
                background: var(--item_bg_color);
                backdrop-filter: blur(var(--card_filter));
                -webkit-backdrop-filter: blur(var(--card_filter));
                transition: all 0.3s ease;
                ${animations.entrance ? `
                    opacity: 0;
                    transform: translateY(20px);
                    animation: skillEnter 0.6s ease forwards;
                ` : ''}
            }

            ${animations.hover ? `
                .skill-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
                }

                .skill-item:hover .skill-icon-wrapper i {
                    transform: scale(1.1) rotate(5deg);
                }
            ` : ''}

            .skill-icon-wrapper {
                margin-bottom: 8px;
                transition: transform 0.3s ease;
            }

            .skill-icon-wrapper i {
                transition: all 0.3s ease;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            }

            .skill-name {
                font-size: 14px;
                font-weight: 500;
                color: var(--text_color);
                margin-bottom: 8px;
                line-height: 1.2;
            }

            .skill-level {
                width: 100%;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 12px;
            }

            .skill-level-bar {
                flex: 1;
                height: 4px;
                background: var(--item_hover_color);
                border-radius: 2px;
                overflow: hidden;
            }

            .skill-level-fill {
                height: 100%;
                border-radius: 2px;
                transition: width 0.8s ease-out;
            }

            .skill-level-text {
                color: var(--item_left_text_color);
                font-size: 11px;
                font-weight: 500;
                min-width: 35px;
                text-align: right;
            }

            @keyframes skillEnter {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* 平板适配 */
            @media (max-width: 1024px) {
                :root {
                    --skill-icon-size: ${iconSize.tablet}px;
                    --skills-per-row: ${itemsPerRow.tablet};
                }
                
                .skills-grid {
                    gap: 15px;
                }
                
                .skill-item {
                    padding: 12px;
                }
            }

            /* 手机适配 */
            @media (max-width: 768px) {
                :root {
                    --skill-icon-size: ${iconSize.mobile}px;
                    --skills-per-row: ${itemsPerRow.mobile};
                }
                
                .skills-grid {
                    gap: 12px;
                }
                
                .skill-item {
                    padding: 10px;
                }
                
                .skill-name {
                    font-size: 12px;
                }
            }

            /* 小屏手机适配 */
            @media (max-width: 480px) {
                :root {
                    --skills-per-row: 2;
                }
            }
        `;
    }

    // 添加入场动画
    addEntranceAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1
        });

        // 观察所有技能项
        setTimeout(() => {
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                observer.observe(item);
            });
        }, 100);
    }

    // 更新配置
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.init();
    }

    // 添加新技能
    addSkill(skill) {
        this.config.skills.push(skill);
        this.render();
    }

    // 移除技能
    removeSkill(skillName) {
        this.config.skills = this.config.skills.filter(s => s.name !== skillName);
        this.render();
    }

    // 获取当前配置
    getConfig() {
        return this.config;
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillsRenderer;
} else if (typeof window !== 'undefined') {
    window.SkillsRenderer = SkillsRenderer;
}
