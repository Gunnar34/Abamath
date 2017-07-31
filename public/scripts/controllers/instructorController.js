app.controller('InstructorController', InstuctorController);

function InstuctorController(httpService, AuthFactory, $window, $location) {
	const vm = this;

	vm.editB = function(i) {
		vm.users[i].edit = !vm.users[i].edit;
		vm.users[i].notEdit = !vm.users[i].notEdit;
	};

	vm.save = function(index) {
		vm.editB(index);
		let user = vm.users[index];
		httpService.putItem('private/instructor', user._id, {
			phone: user.phone
		}).then(function(res) {
			console.log(res);
		});
	};

	vm.deleteInsctructor = function(index) {
		swal({
			title: 'Are you sure you want to delete this instructor?',
			text: "You won't be able to undo this!",
			imageUrl: 'public/assets/images/abamath.png',
			imageWidth: 150,
			imageHeight: 150,
			animation: false,
			showCancelButton: true,
			confirmButtonColor: '#2196f3',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(function() {
			httpService.deleteItem('private/instructor', vm.users[index]._id).then(function() {
				vm.getInstructors();
				swal({
					title: 'Deleted!',
					text: "The class was deleted",
					imageUrl: 'public/assets/images/abamath.png',
					imageWidth: 150,
					imageHeight: 150,
					animation: false
				});
			})
		})
	};

	httpService.getItem('auth').then(function(res) {
		if (res.data.name) {
			vm.admin = res.data.name.admin;
			vm.name = res.data.name.googleName;
		} else {
			alert('Please Login before viewing this page');
			$location.path('/');
		}
	});

	vm.addUser = function() {
		if (vm.email) {
			let itemToSend = {
				email: vm.email
			};
			httpService.postItem('private/instructor', itemToSend).then(function() {
				vm.email = undefined;
				vm.getInstructors();
			});
		} else {
			//end if
			alert('please enter an email before submitting');
		}
	};

	vm.getInstructors = function() {
		httpService.getItem('private/instructor').then(function(res) {
			vm.users = res.data;
			for (var i = 0; i < vm.users.length; i++) {
				vm.users[i].edit = false;
				vm.users[i].notEdit = true;
			}
		});
	};
} //end InstuctorController
