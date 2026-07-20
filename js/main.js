console.log("JavaScript connected");
const topScreen = document.getElementById("top-screen");
const questionScreen = document.getElementById("question-screen");
const loadingScreen = document.getElementById("loading-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");

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

// 直近で確定した診断結果(犬種キー)。結果画面の表示や画像保存で使う
// 採点そのものはPHP側(api/answer.php)が行い、フロントエンドは結果のキーだけを受け取る
let currentResultType = null;

// 質問文と進捗をまとめて画面に反映する
function renderQuestion(question, questionNumber, totalQuestions) {
    questionText.textContent = question.text;

    questionCount.textContent =
        `Q${questionNumber} / ${totalQuestions}`;

    progressBar.style.width =
        `${(questionNumber / totalQuestions) * 100}%`;
}

// 診断セッションを開始し、1問目を取得して画面に反映する(この時点では画面はまだ切り替えない)
function fetchFirstQuestion() {
    $.getJSON("api/start.php")
        .done(function(data) {
            renderQuestion(data.question, data.questionNumber, data.totalQuestions);
        })
        .fail(function() {
            questionText.textContent = "問題を読み込めませんでした。PHPが動作する環境で開いているかご確認ください。";
        });
}

// ページ読み込み時に1問目を先読みしておく(スタートボタンを押した瞬間に表示できるように)
fetchFirstQuestion();

// 回答を1件送信する：採点・進行管理はPHP側(api/answer.php)が行い、
// 「次の質問」または「最終結果」のどちらかが返ってくる
function submitAnswer(answer) {
    $.ajax({
        url: "api/answer.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ answer: answer }),
        dataType: "json"
    })
        .done(function(data) {
            if (data.finished) {
                currentResultType = data.result;
                finishQuiz();
            } else {
                renderQuestion(data.question, data.questionNumber, data.totalQuestions);
            }
        })
        .fail(function() {
            alert("回答の送信に失敗しました。もう一度お試しください。");
        });
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

    const data = resultData[currentResultType];

    resultDogImg.src = data.img;
    resultTitle.textContent = data.title;
    resultSubtitle.textContent = data.subtitle;
    resultDescription.textContent = data.description;
    resultPointTitle.textContent = data.pointTitle;
    resultPointText.textContent = data.pointText;
}

startButton.addEventListener("click", function() {
    topScreen.style.display = "none";
    questionScreen.style.display = "flex";
});

yesBtn.addEventListener("click", function() {
    submitAnswer("yes");
});

noBtn.addEventListener("click", function() {
    submitAnswer("no");
});

// もう一度診断する：TOP画面に戻り、次回のスタートに備えて新しいセッションを先読みする
retryBtn.addEventListener("click", function() {
    resultScreen.style.display = "none";
    topScreen.style.display = "flex";
    fetchFirstQuestion();
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
    const data = resultData[currentResultType];

    const capture = document.createElement("div");
    capture.className = "export-capture";
    capture.innerHTML = `
        <div class="export-main">
            <div class="export-dog-img">
                <img src="${data.img}" alt="">
            </div>
            <div class="export-content">
                <div class="export-title">
                    <img src="dog-images/kekkatitle-icon-export.png" alt="">
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
        canvas.toBlob(function(blob) {
            const file = new File([blob], "dog-result.png", { type: "image/png" });

            // iOS(Safari)は「download属性」でのファイル保存に対応していないため、
            // 共有シート経由で「画像を保存」してもらう(PC・AndroidはダウンロードでOKなので対象外)
            const isIOS = /iP(hone|od|ad)/.test(navigator.platform) ||
                (navigator.userAgent.includes("Mac") && "ontouchend" in document);

            if (isIOS && navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({
                    files: [file],
                    title: "あなたをわんこに例えると？",
                }).catch(function() {});
            } else {
                // PC・Androidなど：従来通りファイルとして自動ダウンロード
                const link = document.createElement("a");
                link.download = "dog-result.png";
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            }
        }, "image/png");
    }).catch(function(error) {
        console.error(error);
        alert("画像の保存に失敗しました");
    }).finally(function() {
        document.body.removeChild(capture);
    });
});