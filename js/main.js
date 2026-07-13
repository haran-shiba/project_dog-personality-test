console.log("JavaScript connected");
const topScreen = document.getElementById("top-screen");
const questionScreen = document.getElementById("question-screen");
const loadingScreen = document.getElementById("loading-screen");
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
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

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
}

yesBtn.addEventListener("click", function() {
    addScore();
    nextQuestion();
});

noBtn.addEventListener("click", function() {
    nextQuestion();
});

showQuestion();