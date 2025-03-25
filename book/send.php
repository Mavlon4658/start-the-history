<?php
header("Content-Type: application/json");
$info = json_decode(stripslashes(file_get_contents("php://input")),true);

$lastname = $info['lastname'];
$firstname = $info['firstname'];
$middlename = $info['middlename'];
$country = $info['country'];
$city = $info['city'];
$street = $info['street'];
$house = $info['house'];
$flat = $info['flat'];
$email = $info['email'];
$username = $info['username'];
$phone = $info['phone'];
//В переменную $token нужно вставить токен, который нам прислал @botFather
$token = "6270942722:AAHTRYd-XIBQLzfe0_-TQDOKG7ZK3CE_xl8";

//Сюда вставляем chat_id 1277808905
$chat_id = "1277808905";

//Определяем переменные для передачи данных из нашей формы
if ($lastname) {

//Собираем в массив то, что будет передаваться боту
    $arr = array(
        'lastname' => $lastname,
        'firstname' => $firstname,
        'middlename' => $middlename,
		'country' => $country,
		'city' => $city,
        'street' => $street,
        'house' => $house,
		'flat' => $flat,
		'email' => $email,
        'username' => $username,
        'phone' => $phone,
    );

	$myCurl = curl_init();
	curl_setopt_array($myCurl, array(
		CURLOPT_URL => 'http://92.53.124.200:5000/api/bookAdressPosts',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_POST => true,
		CURLOPT_POSTFIELDS => http_build_query($arr)
	));
$response = curl_exec($myCurl);
curl_close($myCurl);

//Настраиваем внешний вид сообщения в телеграме
    $txt = "<b>Фамилия</b> ".$lastname."%0A";
    $txt .= "<b>Имя</b> ".$firstname."%0A";
    $txt .= "<b>Отчество</b> ".$middlename."%0A";
	$txt .= "<b>Страна</b> ".$country."%0A";
	$txt .= "<b>Город</b> ".$city."%0A";
    $txt .= "<b>Улица</b> ".$street."%0A";
	$txt .= "<b>Дома</b> ".$house."%0A";
	$txt .= "<b>Квартира</b> ".$flat."%0A";
    $txt .= "<b>Емейл</b> ".$email."%0A";
	$txt .= "<b>Ник/имя в тг</b> ".$username."%0A";
	$txt .= "<b>Телефон</b> ".$phone."%0A";

//Передаем данные боту
	// $sendToBD = fopen("http://92.53.124.200:5000/api/bookAdress?name={$name}&phone={$phone}&adress={$adress}&email={$email}","r");
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

//Выводим сообщение об успешной отправке
    if ($sendToTelegram) {
        echo '{"status":"1"}';
    }

//А здесь сообщение об ошибке при отправке
    else {
        echo '{"status":"0"}';
    }
}

?>