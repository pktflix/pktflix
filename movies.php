<?php
// CORS এবং Content-Type সেট করা
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// JSON ফাইল থেকে ডেটা পড়া
$data = json_decode(file_get_contents('assets/movies.json'), true);

// যদি id দেওয়া থাকে তাহলে শুধু সেই movie রিটার্ন করো
if (isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    foreach ($data as $movie) {
        if ($movie['id'] === $id) {
            echo json_encode($movie, JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
    // Movie না পাওয়া গেলে error
    echo json_encode(["error" => "Movie not found"]);
} else {
    // সব movie return করো
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}
