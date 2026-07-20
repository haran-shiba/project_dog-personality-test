<?php
// 回答を1件受け取り、採点・進行管理を行った上で「次の質問」または「最終結果」を返す
session_start();
header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION["quiz"])) {
    http_response_code(400);
    echo json_encode(["error" => "診断セッションが見つかりません。最初からやり直してください。"], JSON_UNESCAPED_UNICODE);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$answer = $input["answer"] ?? null;

if ($answer !== "yes" && $answer !== "no") {
    http_response_code(400);
    echo json_encode(["error" => "answerにはyesかnoを指定してください。"], JSON_UNESCAPED_UNICODE);
    exit;
}

$quiz = &$_SESSION["quiz"];
$current = $quiz["questions"][$quiz["currentIndex"]];

// 「はい」の時だけ、その質問の犬種(type)に配点(point)を加算する
if ($answer === "yes") {
    $quiz["scores"][$current["type"]] += $current["point"];
}

$quiz["currentIndex"]++;

if ($quiz["currentIndex"] < count($quiz["questions"])) {
    $next = $quiz["questions"][$quiz["currentIndex"]];

    echo json_encode([
        "finished" => false,
        "question" => ["text" => $next["text"]],
        "questionNumber" => $quiz["currentIndex"] + 1,
        "totalQuestions" => count($quiz["questions"]),
    ], JSON_UNESCAPED_UNICODE);
} else {
    // 同点時は柴犬 > ハスキー > ポメラニアン > トイプードル > ゴールデンレトリバーの優先順位で判定
    $typePriority = ["shiba", "husky", "pome", "toypoo", "golden"];
    $winner = $typePriority[0];
    $maxScore = -1;

    foreach ($typePriority as $type) {
        if ($quiz["scores"][$type] > $maxScore) {
            $maxScore = $quiz["scores"][$type];
            $winner = $type;
        }
    }

    echo json_encode([
        "finished" => true,
        "result" => $winner,
    ], JSON_UNESCAPED_UNICODE);

    // 診断終了：このセッションの状態は不要になったので破棄する
    unset($_SESSION["quiz"]);
}
