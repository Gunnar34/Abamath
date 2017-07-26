app.controller('ParentController', function(dataService, $location) {

  const vm = this;
  vm.pinEntry = '';

  // dataService.currentStudent = dataService.currentStudent;
  // vm.currentStudent = {};
  // vm.studentObjectToSend = {
  //   // selfCheck: Boolean,
  //   // receiveTexts: Boolean,
  //   // usePin: Boolean,
  //   // pin: 0
  // };

  vm.dummyKid = {
    studentid: 30,
    firstName: 'Peta',
    lastName: 'Malark',
    grade: '4th',
    emergency: 'No one cares'
  };//this can be deleted just dummy data

  vm.dummyKid2 = {
    studentid: 30,
    firstName: 'Snorgarml',
    lastName: 'Blarginton',
    grade: '3rd'
  }; //this can be deleted just dummy data

  vm.studentArray = [];
  vm.studentArray.push(vm.dummyKid); //this can be deleted just dummy data
  vm.studentArray.push(vm.dummyKid2); //this can be deleted just dummy data

  // functions
  vm.go = function(path) {
    $location.url(path);
  }; // end go

  vm.checkInStudent = function(index) {
    dataService.currentStudent = vm.studentArray[index];
    // eventually, put in a call (to server?) to get currentStudent from class array
    // dataService.currentStudent = vm.studentArray[index];
    console.log(dataService.currentStudent);
    vm.go('/emergencyContact');
  }; // end checkInStudent

  vm.emergencyAlert = function(boolean) {
    alert('You can edit the info directly on this page.');
  }; // end emergencyAlert

  vm.selfCheckout = function(boolean) {
    dataService.currentStudent.selfCheck = boolean;
    console.log(dataService.currentStudent);
    vm.go('/receiveTexts');
  }; // end selfCheckout

  vm.receiveTexts = function(boolean) {
    dataService.currentStudent.receiveTexts = boolean;
    console.log(dataService.currentStudent);
    vm.go('/pinSystem');
  }; // end receiveTexts

  vm.usePin = function(boolean) {
    dataService.currentStudent.usePin = boolean;
    console.log(dataService.currentStudent);
    if (boolean) {
      vm.go('/pinPad');
    } else {
      vm.go('/complete');
    }
  }; // end usePin

  vm.enterPin = function(thingie, pin) {
    dataService.currentStudent.pin = pin;
    console.log(dataService.currentStudent);
    vm.go('/complete');
  }; // end enterPin

}); // end ParentController
