app.controller('ParentController', function(dataService, httpService, $location) {

	if (performance.navigation.type == 1) {
		console.info("This page is reloaded");
		$location.path('/parent');
		swal('Sorry, it seems you refreshed the page, please reselect your student from the list')
	};

	const vm = this;
	const hs = httpService;
	vm.pinEntry = '';
	vm.currentID = localStorage.getItem('classID');
	vm.studentsArray = [];
	vm.instructorsArray = [];
	localStorage.setItem('notParentView', false);
	vm.currentStudent = dataService.currentStudent;

	httpService.getItem('auth').then(function(res) {
		if (res.data.name) {
			vm.admin = res.data.name.admin;
			vm.name = res.data.name.googleName;
		} else {
			swal({
        title: 'Oops!',
        text: "Please login to continue",
        imageUrl: 'public/assets/images/abamath.png',
        imageWidth: 150,
        imageHeight: 150,
        animation: false
      });
      $location.path('/');
		}
	});

	// functions
	vm.go = function(path) {
		$location.url(path);
	}; // end go

	var attempts = (function() {
		var counter = 0;
		return function() {
			return counter += 1;
		};
	})();

	var showToast = function(message, duration) {
		Materialize.toast(message, duration);
	}; //end showToast

	vm.loadClassInfo = function() {
		hs.getWithID('/private/students', vm.currentID).then(function(res) {
			vm.studentArray = res.data.students;
			vm.instructorsArray = res.data.instructors;
			console.log('got class info');
			dataService.studentArray = vm.studentArray;
			dataService.instructorsArray = vm.instructorsArray;
			for (var i = 0; i < dataService.studentArray.length; i++) {
				console.log(vm.studentArray[i].checkedIn);
			}

		}); //end getWithId
	};

	vm.checkInStudent = function(user) {
		idx = dataService.studentArray.indexOf(user);
		dataService.currentStudent = dataService.studentArray[idx];
		dataService.index = idx;
		if (dataService.currentStudent.initialized == true) {
			// if the student has been checked in on previous days, skip emergencyContact page
			vm.go('/selfCheckout');
		} else {
			vm.go('/emergencyContact');
		}
	}; // end checkInStudent

	vm.checkOutStudent = function(user) {
		if (user.usePin) {
			// check if the current student has selected to use a PIN
			idx = dataService.studentArray.indexOf(user);
			dataService.currentStudent = dataService.studentArray[idx];
			dataService.index = idx;
			// load modal to enter PIN for checkout
			document.getElementById('keypad').style.display = 'block';
		} else {
			idx = dataService.studentArray.indexOf(user);
			dataService.currentStudent = dataService.studentArray[idx];
			dataService.index = idx;
			// if no PIN is required, check-out a student
			if (dataService.currentStudent.receiveTexts == true) {
				its = {
					phone: dataService.currentStudent.emergencyPhone,
					name: dataService.currentStudent.firstName
				};
				console.log('text ', its);
<<<<<<< HEAD
				hs.postItem('/private/comm/text', its );
=======
				// hs.postItem('/private/comm/text', its ).then(function(){
				//
				// });
>>>>>>> master
			}
			dataService.currentStudent.checkedIn = 'false';
			id = dataService.currentStudent.studentID;
			parentID = id.split('$', 1);
			hs.putItem('private/students/init', parentID[0], dataService.currentStudent).then(function(res) {
				console.log('in completeParentReview, res is:', res);
				vm.loadClassInfo();
				showToast('Checked Out!', 2000);
			});
		}
	}; // end checkOutStudent

	vm.enterCheckoutPin = function(thingie, pin) {
		if (pin.length < 4) {
			console.log('nothing happens in this case, PIN too short');
		} else {
			if (pin == dataService.currentStudent.pin) {
				console.log('PIN matches!');
				dataService.currentStudent.checkedIn = 'false';
				id = dataService.currentStudent.studentID;
				parentID = id.split('$', 1);
				hs.putItem('private/students/init', parentID[0], dataService.currentStudent).then(function(res) {
					console.log('in enterCheckoutPin, res is:', res);
				});
				vm.keypadClose();
				showToast('Checked Out!', 2000);
			} else {
				console.log("PIN didn't match!  PIN:", pin, "Student PIN:", dataService.currentStudent.pin);
				let numAttempts = attempts();
				swal({
					title: 'That PIN was incorrect!',
					text: "Please enter the correct PIN",
					imageUrl: 'public/assets/images/abamath.png',
					imageWidth: 150,
					imageHeight: 150
				});
				console.log(numAttempts);
				vm.pinEntry = '';
				if (numAttempts >= 3) {
					objectToSend = {
						phone: dataService.instructorsArray[0].phone
					};
					vm.pinEntry = '';
<<<<<<< HEAD
					hs.postItem('/private/comm/call', objectToSend);
=======
					// hs.postItem('/private/comm/call', objectToSend).then(function(res) {
					//
					// });
>>>>>>> master
					$location.path('/checkoutError');
				}
			}
		}
	}; // end enterCheckoutPin



	vm.loadEmergencyInfo = function() {
		// load currentStudent data from service into vm to be edited
		vm.currentStudent = dataService.currentStudent;
		console.log('in loadEmergencyInfo', dataService.currentStudent);
	}; // end loadEmergencyInfo

	vm.emergencySubmit = function() {
		// reverse last function, saving data from vm back to service
		dataService.currentStudent = vm.currentStudent;
		console.log('in emergencySubmit', dataService.currentStudent);
		vm.go("/selfCheckout");
	}; // end emergencySubmit

	vm.emergencyAlert = function(boolean) {
		swal({
			title: 'Before continuing...',
			text: "You can click on incorrect information to edit",
			imageUrl: 'public/assets/images/abamath.png',
			imageWidth: 150,
			imageHeight: 150
		});
	}; // end emergencyAlert

	vm.selfCheckout = function(boolean) {
		dataService.currentStudent.selfCheck = boolean;
		console.log('in selfCheckout', dataService.currentStudent);
		vm.go('/pinSystem');
	}; // end selfCheckout

	vm.receiveTexts = function(boolean) {
		dataService.currentStudent.receiveTexts = boolean;
		console.log('in receiveTexts', dataService.currentStudent);
		vm.go('/complete');
	}; // end receiveTexts

	vm.loadPinInfo = function() {
		// load currentStudent data from service into vm to go to appropriate PIN page
		vm.currentStudent = dataService.currentStudent;
		console.log('in loadPinInfo', dataService.currentStudent);
	}; // end loadPinInfo

	vm.usePin = function(boolean) {
		dataService.currentStudent.usePin = boolean;
		console.log('in usePin', dataService.currentStudent);
		if (boolean) {
			// vm.go('/pinPad');  // old design, now using modal
			document.getElementById('keypad').style.display = 'block';
		} else {
			vm.go('/receiveTexts');
		}
	}; // end usePin

	vm.enterPin = function(thingie, pin) {
		if (pin.length < 4) {
			console.log('nothing happens in this case, PIN too short');
		} else {
			dataService.currentStudent.pin = pin;
			console.log('in enterPin', dataService.currentStudent);
			document.getElementById('keypad').style.display = 'none';
			vm.go('/receiveTexts');
		}
	}; // end enterPin

	vm.keypadClose = function() {
		document.getElementById('keypad').style.display = 'none';
		vm.pinEntry = '';
	}; // end keypadClose

	vm.completeParentReview = function() {
		dataService.currentStudent.initialized = true;
		dataService.currentStudent.checkedIn = 'true';
		vm.currentStudent = dataService.currentStudent;

		id = dataService.currentStudent.studentID;
		parentID = id.split('$', 1);
		hs.putItem('private/students/init', parentID[0], dataService.currentStudent).then(function(res) {
			console.log('in completeParentReview, res is:', res);
		});
	}; // end completeParentReview


}); // end ParentController
