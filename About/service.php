<?php
// get posted url
$url = $_POST['url'];

//get data for URL
$data = file_get_contents_curl($url);

//Curl Function
function file_get_contents_curl($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
	//browser's user agent string (UA) 
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.47 Safari/537.36');
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);       
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

// Convert all HTML entities to their applicable characters
function cleanStr($str)
{
    return html_entity_decode(strip_tags($str), ENT_QUOTES, 'UTF-8');
}

// return HD link for video download
function hd_finallink($curl_content)
{
    $regex = '/hd_src_no_ratelimit:"([^"]+)"/';
    if (preg_match($regex, $curl_content, $match)) {
        return $match[1];

    } else {return;}
}

// return SD link for video download
function sd_finallink($curl_content)
{
    $regex = '/sd_src_no_ratelimit:"([^"]+)"/';
    if (preg_match($regex, $curl_content, $match1)) {
        return $match1[1];

    } else {return;}
}

// return tile of video 
function getTitle($curl_content)
{
    $title = null;
    if (preg_match('/h2 class="uiHeaderTitle"?[^>]+>(.+?)<\/h2>/', $curl_content, $matches)) {
        $title = $matches[1];
    } elseif (preg_match('/title id="pageTitle">(.+?)<\/title>/', $curl_content, $matches)) {
        $title = $matches[1];
    }
    return cleanStr($title);
}

$hdlink = hd_finallink($data);
$sdlink = sd_finallink($data);
$title = gettitle($data);

$message = array();

if ($sdlink != "") {
    $message = array(
        'type' => 'success',
        'title' => $title,
        'hd_download_url' => $hdlink,
        'sd_download_url' => $sdlink,

    );
} else {
    $message = array(
        'type' => 'failure',
        'message' => 'Error retrieving the download link for the url. Please try again later',
    );
}
// create json array
echo json_encode($message);
?>