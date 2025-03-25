let loginForm = document.querySelector("form");

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(e.target);
	// for (var pair of formData.entries()) {
	// 	console.log(pair[0] + ": " + pair[1]);
	// }
	// console.log(Object.fromEntries(formData));
	fetch("send.php", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(Object.fromEntries(formData)),
	})
		.then(function (res) {
			window.location.href = "https://sth-res.ru/book/thankyou.html";
			// console.log(res);
		})
		.catch(function (res) {
			window.location.href = "https://sth-res.ru/book/thankyou.html";
			// console.log(res);
		});
	// e.preventDefault();
	// let username = document.getElementById("username");
	// let password = document.getElementById("password");

	// if (username.value == "" || password.value == "") {
	// 	alert("Ensure you input a value in both fields!");
	// } else {
	// 	// perform operation with form input
	// 	alert("This form has been successfully submitted!");
	// 	console.log(`This form has a username of ${username.value} and password of ${password.value}`);

	// 	username.value = "";
	// 	password.value = "";
	// }
});
