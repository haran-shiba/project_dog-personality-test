console.log("JavaScript connected");
const topScreen = document.getElementById("top-screen");
const questionScreen = document.getElementById("question-screen");
const loadingScreen = document.getElementById("loading-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");

startButton.addEventListener("click", function(){
    topScreen.style.display = "none";
    questionScreen.style.display = "flex";
});
const questions = [
// ===== 1周目(Q1～Q5) =====
//Q1  shiba
{
id:1,
text:"連絡が来ても、返事は気分次第だ",
type:"shiba",
point:1
},
//Q2  husky
{
id:2,
text:"沈黙が続くと何か話したくなる",
type:"husky",
point:1
},
//Q3  pome
{
id:3,
text:"人見知りだが仲良くなると急に距離が近くなる",
type:"pome",
point:1
},
//Q4  toypoo
{
id:4,
text:"実はストーカー気質な部分がある",
type:"toypoo",
point:1
},
//Q5  golden
{
id:5,
text:"初対面でも割とすぐ打ち解けられる",
type:"golden",
point:1
},
// ===== 2周目(Q6～Q10) =====
//Q6  shiba
{
id:6,
text:"気分じゃない時はテコでも動かない",
type:"shiba",
point:1
},
//Q7  husky
{
id:7,
text:"「面白そう」が行動理由の上位に入る",
type:"husky",
point:1
},
//Q8  pome
{
id:8,
text:"高嶺の花と言われたことがある",
type:"pome",
point:1
},
//Q9  toypoo
{
id:9,
text:"写真映りが良いと言われがち",
type:"toypoo",
point:1
},
//Q10  golden
{
id:10,
text:"お土産や手土産を渡すのが好きだ",
type:"golden",
point:1
},
// ===== 3周目(Q11～Q15) =====
//Q11  shiba
{
id:11,
text:"誰かと寝るより一人で自由に寝るのが好き",
type:"shiba",
point:1
},
//Q12  husky
{
id:12,
text:"おっちょこちょいと言われがち",
type:"husky",
point:1
},
//Q13  pome
{
id:13,
text:"怖くても態度には出ない方だ",
type:"pome",
point:1
},
//Q14  toypoo
{
id:14,
text:"一人より誰かと一緒に過ごす時間が好きだ",
type:"toypoo",
point:1
},
//Q15  golden
{
id:15,
text:"頼られると断れないタイプだ",
type:"golden",
point:1
},
// ===== 4周目(Q16～Q20) =====
//Q16  shiba
{
id:16,
text:"人より匂いに敏感な方だ",
type:"shiba",
point:1
},
//Q17  husky
{
id:17,
text:"気になったことはとりあえず試してみたくなる",
type:"husky",
point:1
},
//Q18  pome
{
id:18,
text:"意外と負けず嫌い",
type:"pome",
point:1
},
//Q19  toypoo
{
id:19,
text:"自分磨きにはついお金を使ってしまう",
type:"toypoo",
point:1
},
//Q20  golden
{
id:20,
text:"自分から人を嫌いになることはまずない",
type:"golden",
point:1
},
// ===== 5周目(Q21～Q25) =====
//Q21  shiba
{
id:21,
text:"言葉で説明するより態度で察してほしい時がある",
type:"shiba",
point:2
},
//Q22  husky
{
id:22,
text:"見た目と中身のギャップが激しいと言われる",
type:"husky",
point:2
},
//Q23  pome
{
id:23,
text:"初対面では自然と猫をかぶってしまう",
type:"pome",
point:2
},
//Q24  toypoo
{
id:24,
text:"世渡り上手な方だ",
type:"toypoo",
point:2
},
//Q25  golden
{
id:25,
text:"あまり怒らない方だ",
type:"golden",
point:2
}
];

const questionText = document.getElementById("questionText");
const questionCount = document.getElementById("questionCount");
const progressBar = document.querySelector(".progress");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const loadingText = document.getElementById("loadingText");

const resultDogImg = document.getElementById("resultDogImg");
const resultTitle = document.getElementById("resultTitle");
const resultSubtitle = document.getElementById("resultSubtitle");
const resultDescription = document.getElementById("resultDescription");
const resultPointTitle = document.getElementById("resultPointTitle");
const resultPointText = document.getElementById("resultPointText");

const retryBtn = document.getElementById("retry-btn");
const shareBtn = document.getElementById("share-btn");
const saveBtn = document.getElementById("save-btn");

// 犬種ごとの結果画面に表示する内容
const resultData = {
    shiba: {
        img: "dog-images/shibainu.jpg",
        title: "主導権は我にあり、マイペース王",
        subtitle: "あなたは柴犬タイプ。",
        description: "周りに流されず、自分のペースを大切にするタイプです。基本気分屋で相手から来られるより、自分から行くのを好み、一人の時間は好きだけど、本当のひとりぼっちは少し寂しい。そんな天邪鬼な一面を持っています。でも信頼した相手にはかなり一途です。",
        pointTitle: "ちなみに本物の柴犬は、",
        pointText: "換毛期になると分身ができるレベルで毛が抜けます。掃除機との戦いが始まる季節とも言われています。"
    },
    husky: {
        img: "dog-images/husky.jpg",
        title: "中身はおしゃべりおばさん、好奇心モンスター",
        subtitle: "あなたはハスキータイプ。",
        description: "好奇心旺盛で、新しいことや面白そうなことに目がありません。考えるより先に行動することも多く、周囲からは自由人と思われることも。感情表現が豊かで、じっとしているより何かしている方が好きなタイプです。興味を持ったことには一直線に向かっていきます。",
        pointTitle: "ちなみに本物のハスキーは、",
        pointText: "嬉しいと文句を言うようにしゃべります。飼い主との会話量なら、もしかすると人間以上かもしれません。"
    },
    pome: {
        img: "dog-images/pome.jpg",
        title: "警戒心はSP級、小さき気高い番長",
        subtitle: "あなたはポメラニアンタイプ。",
        description: "初対面では少し警戒心が強いものの、負けず嫌いで芯の強さを持っています。周囲からは近寄りがたく見られることもありますが、実は人一倍まわりをよく見ているタイプです。一度心を開いた相手にはとても情が深く、距離がバグることもあります。",
        pointTitle: "ちなみに本物のポメラニアンは、",
        pointText: "体は小さくても大型犬に本気で立ち向かう勇敢さがあります。自分のことを大型犬だと思っている説もあります。"
    },
    toypoo: {
        img: "dog-images/toypoodle.jpg",
        title: "気づけば懐に入り込む、みんなのアイドル",
        subtitle: "あなたはトイプードルタイプ。",
        description: "人との距離を縮めるのが上手で、自然と周りから可愛がられるタイプです。寂しがり屋で一人より誰かと一緒に過ごすのを好みます。自分磨きが得意で、「どう見られたら魅力的か」を無意識に理解しています。",
        pointTitle: "ちなみに本物のトイプードルは、",
        pointText: "犬の中でもトップクラスの知能を持っています。賢すぎるあまり、飼い主の行動パターンを先読みしてストーカーまがいになることもあるそうです。"
    },
    golden: {
        img: "dog-images/labrador.jpg",
        title: "放っておけない症候群、優しさの押し売り名人係",
        subtitle: "あなたはゴールデンレトリバータイプ。",
        description: "人とのつながりを大切にし、困っている人を見ると放っておけないタイプです。頼られるとつい頑張ってしまい、気付けば周囲のお世話役になっていることも。自分のことより相手を優先してしまう、優しさの塊です。",
        pointTitle: "ちなみに本物のゴールデンレトリバーは、",
        pointText: "飼い主が帰ってくると尻尾を揺さぶり何かしら咥えてプレゼントするそうです。尻尾の勢いが良すぎて、悪気なくモノを破壊してしまうことも。"
    }
};

// 同点時は柴犬 > ハスキー > ポメラニアン > トイプードル > ゴールデンレトリバーの優先順位で判定
const typePriority = ["shiba", "husky", "pome", "toypoo", "golden"];

function determineResult() {
    let winner = typePriority[0];
    let maxScore = -1;

    for (const type of typePriority) {
        if (scores[type] > maxScore) {
            maxScore = scores[type];
            winner = type;
        }
    }

    return winner;
}

let currentQuestionIndex = 0;

// 犬種ごとの得点を入れておく箱(最初は全部0点)
const scores = {
    shiba: 0,
    husky: 0,
    pome: 0,
    toypoo: 0,
    golden: 0
};

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionText.textContent = currentQuestion.text;

    questionCount.textContent =
        `Q${currentQuestion.id} / ${questions.length}`;

    progressBar.style.width =
        `${(currentQuestion.id / questions.length) * 100}%`;
}

// 今表示している質問の犬種(type)に、その質問のポイント(point)を加算する
function addScore() {
    const currentQuestion = questions[currentQuestionIndex];
    scores[currentQuestion.type] += currentQuestion.point;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// 質問が全部終わったら、質問画面を隠してローディング画面を表示する
function finishQuiz() {
    questionScreen.style.display = "none";
    loadingScreen.style.display = "flex";

    // 1秒ごとに「...」を1つずつ増やし、3つになったら結果画面に切り替える
    let dotCount = 0;
    loadingText.textContent = "わんこを呼び出し中";

    const dotInterval = setInterval(function() {
        dotCount++;

        loadingText.textContent =
            "わんこを呼び出し中" + ".".repeat(dotCount);

        if (dotCount >= 3) {
            clearInterval(dotInterval);
            setTimeout(function() {
                showResultScreen();
            }, 1000);
        }
    }, 1000);
}

// ローディング画面を隠して、結果画面を表示する
function showResultScreen() {
    loadingScreen.style.display = "none";
    resultScreen.style.display = "flex";

    const winner = determineResult();
    const data = resultData[winner];

    resultDogImg.src = data.img;
    resultTitle.textContent = data.title;
    resultSubtitle.textContent = data.subtitle;
    resultDescription.textContent = data.description;
    resultPointTitle.textContent = data.pointTitle;
    resultPointText.textContent = data.pointText;
}

yesBtn.addEventListener("click", function() {
    addScore();
    nextQuestion();
});

noBtn.addEventListener("click", function() {
    nextQuestion();
});

// もう一度診断する：状態をリセットしてTOP画面に戻る
retryBtn.addEventListener("click", function() {
    currentQuestionIndex = 0;
    for (const type in scores) {
        scores[type] = 0;
    }
    showQuestion();

    resultScreen.style.display = "none";
    topScreen.style.display = "flex";
});

// シェアする：Web Share APIで診断結果タイトルとURLを共有、非対応ブラウザではURLをコピー
shareBtn.addEventListener("click", function() {
    const shareData = {
        title: resultTitle.textContent,
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(function() {});
    } else {
        navigator.clipboard.writeText(shareData.url).then(function() {
            alert("URLをコピーしました");
        });
    }
});

// 結果を保存する：ボタンを含まないA4横サイズのレイアウトを作って画像として保存
saveBtn.addEventListener("click", function() {
    const winner = determineResult();
    const data = resultData[winner];

    const capture = document.createElement("div");
    capture.className = "export-capture";
    capture.innerHTML = `
        <div class="export-main">
            <div class="export-dog-img">
                <img src="${data.img}" alt="">
            </div>
            <div class="export-content">
                <div class="export-title">
                    <img src="dog-images/kekkatitle-icon.svg" alt="">
                    <h1>${data.title}</h1>
                </div>
                <div class="export-text">
                    <img src="dog-images/kekkaTEXT frame.svg" class="export-text-frame" alt="">
                    <div class="export-text-content">
                        <h3>${data.subtitle}</h3>
                        <p>${data.description}</p>
                    </div>
                </div>
                <div class="export-point">
                    <h3>${data.pointTitle}</h3>
                    <div class="export-point-box">
                        <img src="dog-images/Rectangle 26.png" alt="">
                        <p>${data.pointText}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(capture);

    html2canvas(capture, { scale: 2 }).then(function(canvas) {
        const link = document.createElement("a");
        link.download = "dog-result.png";
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(function(error) {
        console.error(error);
        alert("画像の保存に失敗しました");
    }).finally(function() {
        document.body.removeChild(capture);
    });
});

showQuestion();