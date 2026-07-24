// 題庫設定
const questions = [
    {
        title: "1. 你目前主要帳號的「粉絲數/追蹤人數」大約是多少？",
        options: [
            { text: "🐣 低於 1,000 人（剛起步 / 籌備中）", key: "follower", val: "low" },
            { text: "🌱 1,000 - 5,000 人（有少量基礎）", key: "follower", val: "mid" },
            { text: "🚀 5,000 人以上（已有穩定客群）", key: "follower", val: "high" }
        ]
    },
    {
        title: "2. 你最主要的商業變現模式是什麼？",
        options: [
            { text: "賣教練課 / 1對1諮詢 / 高單價服務", key: "type", val: "monetize" },
            { text: "賣保健品 / 直銷商品 / 實體門市 / 團購", key: "type", val: "product" },
            { text: "打造個人 IP / 目前尚無特定產品，想接業配", key: "type", val: "traffic" }
        ]
    },
    {
        title: "3. 你個人對於「鏡頭前露臉/分享日常」的接受度？",
        options: [
            { text: "非常高！喜歡分享生活、講話有個人特色", key: "style", val: "persona" },
            { text: "可以露臉，但只想乾貨輸出，不想公開私生活", key: "style", val: "expert" },
            { text: "盡量不露臉（偏好產品實拍、字卡或旁白配音）", key: "style", val: "product_only" }
        ]
    },
    {
        title: "4. 顧客向你購買時，最看重什麼？",
        options: [
            { text: "對我個人的信任度與專業解方", key: "trust", val: "person" },
            { text: "產品本身的功效、CP 值與體驗感", key: "trust", val: "item" },
            { text: "我的生活態度、氛圍感與審美", key: "trust", val: "vibe" }
        ]
    },
    {
        title: "5. 你每週能投入在短影音製作的時間？",
        options: [
            { text: "每週不到 3 小時（希望精準高效，不浪費時間）", key: "time", val: "low" },
            { text: "每週 3-6 小時（可穩定每週拍 2-3 支片）", key: "time", val: "mid" }
        ]
    }
];

let currentStep = 0;
let userAnswers = {};

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
});

function renderQuestion() {
    const q = questions[currentStep];
    const total = questions.length;

    document.getElementById('step-tag').innerText = `步驟 ${currentStep + 1} / ${total}`;
    document.getElementById('progress-text').innerText = `${Math.round(((currentStep + 1) / total) * 100)}%`;
    document.getElementById('question-title').innerText = q.title;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;
        btn.onclick = () => handleSelect(opt.key, opt.val);
        container.appendChild(btn);
    });
}

function handleSelect(key, val) {
    userAnswers[key] = val;
    currentStep++;

    if (currentStep < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-card').classList.add('hidden');
    document.getElementById('result-card').classList.remove('hidden');

    const isLowFollower = userAnswers.follower === 'low';
    const followerNotice = document.getElementById('follower-notice');
    const followerText = document.getElementById('follower-notice-text');

    // 粉絲數判斷與建議
    if (isLowFollower) {
        followerNotice.classList.remove('hidden');
        followerText.innerText = "由於目前粉絲數低於 1,000 人，帳號首要任務是「擴大流量與破圈」！建議前期先撥出 50% 的精力製作【流量型/痛點共鳴型】影片，先吸引精準人群關注，再做信任轉換。";
    } else {
        followerNotice.classList.add('hidden');
    }

    // 計算定位方向
    let resultType = "";
    let resultDesc = "";
    let resultIdeas = [];
    let resultAction = "";

    if (userAnswers.type === 'monetize') {
        resultType = "🎯 高轉換專業信任型（適合：教練課 / 諮詢 / 高單價服務）";
        resultDesc = "你的重點不在於追求幾萬大流量，而是吸引「精準痛點」客群。影片務必傳遞權威感與清晰的解答方案。";
        resultIdeas = [
            "<b>痛點破解：</b>『為什麼你練了半年都沒效果？3 個常見死角』",
            "<b>學員案例：</b>『學員 A 如何在 30 天內改善XXX問題（數據與過程）』",
            "<b>快問快答：</b>整理私訊最常被問到的 3 個新手疑問並一一解答"
        ];
        resultAction = "每支影片結尾都要加上清晰的 CTA（如：『私訊我領取免費評估表』）。";

    } else if (userAnswers.type === 'product') {
        resultType = "🛍️ 產品體驗/情境轉化型（適合：保健品 / 直銷商品 / 實體門市）";
        resultDesc = "觀眾想看的是『這產品能幫我解決什麼生活問題』，不要生硬講成分，要講「使用場景與改變」。";
        resultIdeas = [
            "<b>情境帶入：</b>『每天下午 3 點就想睡？我最近的救急保養小習慣』",
            "<b>開箱體驗：</b>沉浸式使用過程，展現質感與真實反饋",
            "<b>小白闢謠：</b>『市面上保健品那麼多，教你 3 秒看懂該怎麼挑』"
        ];
        resultAction = "拍攝 3 支不同生活情境的短影片，測試哪種開頭（Hook）最吸引目標族群。";

    } else {
        resultType = "🔥 人設博眼球/流量型（適合：個人 IP / 創作者 / 拓展知名度）";
        resultDesc = "你的魅力與觀點是最大武器！需要靠情緒共鳴、觀點碰撞或風格展現來累積粉絲基數。";
        resultIdeas = [
            "<b>強烈觀點：</b>『關於XX這件事，90% 的人都想錯了...』",
            "<b>日常 Vlog：</b>『自媒體人真實的一天：我如何規劃自己的時間？』",
            "<b>挑戰企劃：</b>『挑戰 30 天每天做XX，結果會怎樣？』"
        ];
        resultAction = "確立你的個人語氣與視覺風格，並保持穩定的更新頻率。";
    }

    document.getElementById('result-type').innerText = resultType;
    document.getElementById('result-desc').innerText = resultDesc;
    document.getElementById('result-action').innerText = resultAction;

    const ideasContainer = document.getElementById('result-ideas');
    ideasContainer.innerHTML = '';
    resultIdeas.forEach(idea => {
        const p = document.createElement('p');
        p.style.margin = "8px 0";
        p.innerHTML = `• ${idea}`;
        ideasContainer.appendChild(p);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function restartQuiz() {
    currentStep = 0;
    userAnswers = {};
    document.getElementById('quiz-card').classList.remove('hidden');
    document.getElementById('result-card').classList.add('hidden');
    renderQuestion();
}