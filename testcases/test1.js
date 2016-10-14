//test case for checking if added or not.
describe('popcontroller', function() {
  var $controller;
  beforeEach(module('myApp'));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

describe('$scope.add', function() {
    it(' check for adding task', function() {
var modalInstance;
    	   modalInstance = {                    // Create a mock object using spies
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
         		 then: jasmine.createSpy('modalInstance.result.then')
        		}
      	}; 
	      var $scope = {};
	      // var $uibModalInstance={};
	      var controller = $controller('popupController', { $scope: $scope,$uibModalInstance:modalInstance});
	      $scope._id = '123';
	      $scope._name='sanoop';
	      $scope.addTask();
	      expect($scope.test).toEqual(jasmine.objectContaining([Object({taskid: "123",taskname:"sanoop"})])); 
    });
});
 });


describe('mycontroller', function() {
	 var $controller;
  beforeEach(module('myApp'));
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));
  describe('$scope.remove', function() {

  	it('check for removing task',function(){
    	var $scope = {};
      	var controller = $controller('myController', { $scope: $scope});
      	$scope.data[0]={taskid:"123",taskname:"sanoop"};
      	$scope.removeTask('234');
      	console.log($scope.data);
      	expect($scope.data).not.toEqual(jasmine.objectContaining([Object({taskid:"234",taskname:"sanoop"})]));
    });

  });
});
