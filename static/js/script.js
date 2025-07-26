console.log('%cCopyright © 2024 zyyo.net',
    'background-color: #ff00ff; color: white; font-size: 24px; font-weight: bold; padding: 10px;'
);
console.log('%c   /\\_/\\', 'color: #8B4513; font-size: 20px;');
console.log('%c  ( o.o )', 'color: #8B4513; font-size: 20px;');
console.log(' %c  > ^ <', 'color: #8B4513; font-size: 20px;');
console.log('  %c /  ~ \\', 'color: #8B4513; font-size: 20px;');
console.log('  %c/______\\', 'color: #8B4513; font-size: 20px;');

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

/**
 * 切换元素的类名
 * @param {string} selector - CSS选择器
 * @param {string} className - 要切换的类名
 */
function toggleClass(selector, className) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.classList.toggle(className);
    });
}

/**
 * 显示或隐藏弹窗
 * @param {string} [imageURL] - 要在弹窗中显示的图片URL
 */
function pop(imageURL) {
    const tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}

// 弹窗事件监听
const tc = document.querySelector('.tc');
const tc_main = document.querySelector('.tc-main');
if (tc) {
    tc.addEventListener('click', () => pop());
}
if (tc_main) {
    tc_main.addEventListener('click', event => event.stopPropagation());
}



function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}















/**
 * 初始化技能渲染器
 */
function initSkills() {
    if (typeof skillsConfig !== 'undefined' && typeof SkillsRenderer !== 'undefined') {
        const skillsRenderer = new SkillsRenderer(skillsConfig);
        skillsRenderer.init();
        window.skillsRenderer = skillsRenderer; // 暴露到全局以便调试
    }
}

/**
 * 初始化主题切换器
 */
function initThemeSwitcher() {
    const html = document.documentElement;
    const tanChiShe = document.getElementById("github-contribution-chart");
    const themeCheckbox = document.getElementById('myonoffswitch');
    let currentTheme = getCookie("themeState") || "Light";

    function changeTheme(theme) {
        if (tanChiShe) {
            tanChiShe.src = theme === "Dark" 
              ? "https://hub.gitmirror.com/raw.githubusercontent.com/zmj159809/zmj159809/output/github-contribution-grid-snake-dark.svg"
              : "https://hub.gitmirror.com/raw.githubusercontent.com/zmj159809/zmj159809/output/github-contribution-grid-snake.svg";
        }
        html.dataset.theme = theme;
        setCookie("themeState", theme, 365);
        currentTheme = theme;
        if (themeCheckbox) {
            themeCheckbox.checked = theme !== "Dark";
        }
    }

    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            changeTheme(currentTheme === "Dark" ? "Light" : "Dark");
        });
    }

    // 初始化时应用主题
    changeTheme(currentTheme);
}

/**
 * 为项目卡片添加按压效果
 */
function addPressEffectToProjects() {
    const projectList = document.querySelector('.projectList');
    if (!projectList) return;

    projectList.addEventListener('mousedown', event => {
        const projectItem = event.target.closest('.projectItem');
        if (projectItem) {
            projectItem.classList.add('pressed');
        }
    });

    ['mouseup', 'mouseleave'].forEach(eventType => {
        projectList.addEventListener(eventType, event => {
            const projectItem = event.target.closest('.projectItem');
            if (projectItem) {
                projectItem.classList.remove('pressed');
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initSkills();
    initThemeSwitcher();
    addPressEffectToProjects();
});




// 页面加载动画
window.addEventListener('load', () => {
    const pageLoading = document.querySelector("#zyyo-loading");
    if (pageLoading) {
        setTimeout(() => {
            pageLoading.style.opacity = '0';
            // 在动画结束后将其隐藏，以防影响页面交互
            setTimeout(() => pageLoading.style.display = 'none', 500);
        }, 100);
    }
});
