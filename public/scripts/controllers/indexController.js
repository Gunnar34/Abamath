// console.log( 'indexController.js loaded' );

// declare controller
app.controller('IndexController', IndexController);

function IndexController(httpService, AuthFactory, $window, $location, $interval) {
	const vm = this;
	const authFactory = AuthFactory;
	localStorage.setItem('classView', false);
	localStorage.setItem('notParentView', true);

	classView = $interval(function() {
		// if (localStorage.getItem('classView') == 'true') {
		// 	vm.classMenu = true;
		// 	vm.classSub = false;
		// }
		// if (localStorage.getItem('classView') == 'false') {
		// 	vm.classMenu = false;
		// 	vm.classSub = true;
		// }
		if (localStorage.getItem('notParentView') == 'true') {
			vm.notParentView = true;
		}
		if (localStorage.getItem('notParentView') == 'false') {
			vm.notParentView = false;
		}
	}, 10);

	vm.displayLogout = false; // should we display the logout option on the DOM?
	vm.message = {
		text: false,
		type: 'info',
	};

	authFactory.isLoggedIn()
		.then(function(response) {
				if (response.data.status) {
					vm.displayLogout = true;
					authFactory.setLoggedIn(true);
					vm.username = response.data.name;
				} else { // is not logged in on server
					vm.displayLogout = false;
					authFactory.setLoggedIn(false);
				}
			},

			function() {
				vm.message.text = 'Unable to properly authenticate user';
				vm.message.type = 'error';
			});

	vm.logout = function() {
		authFactory.logout()
			.then(function(response) { // success
					authFactory.setLoggedIn(false);
					vm.username = '';
					$window.location.href = '/'; // forces a page reload which will update our NavController
				},

				function(response) { // error
					vm.message.text = 'Unable to logout';
					vm.message.type = 'error';
				});
	};

	// ben test section, remove if merging
	vm.go = function(path) {
		$location.url(path);
	}; //end go function

} // end IndexController
