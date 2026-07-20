<?php
// 診断セッションを開始する：質問をシャッフルしてセッションに保存し、1問目だけを返す
session_start();
header("Content-Type: application/json; charset=utf-8");

$jsonText = file_get_contents(__DIR__ . "/questions.json");
$questions = json_decode($jsonText, true);
shuffle($questions);

// type(犬種)・point(配点)はここから先フロントエンドには渡さず、セッション内に保持する
$_SESSION["quiz"] = [
    "questions" => $questions,
    "currentIndex" => 0,
    "scores" => ["shiba" => 0, "husky" => 0, "pome" => 0, "toypoo" => 0, "golden" => 0],
];

$current = $questions[0];

echo json_encode([
    "question" => ["text" => $current["text"]],
    "questionNumber" => 1,
    "totalQuestions" => count($questions),
], JSON_UNESCAPED_UNICODE);
