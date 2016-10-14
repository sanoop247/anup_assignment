var app=angular.module("myApp",['ui.bootstrap','pascalprecht.translate']);

	app.config(function($translateProvider) {
 		 $translateProvider.translations('en', {
    		HEADLINE: 'My ToDo Application',
    		LANG1: 'English',
    		LANG2:'Hindi',
    		button_add:'Add',
    		button_remove:'Remove',
    		Task_id:'Task ID',
    		Task_name:'Task Name',
    		Mark_completed:'Mark Completed',
    		Remove_task:'Remove Task',
    		Cancel:'Cancel'

  		})
  		.translations('hi', {
    		HEADLINE: 'मेरे करने के लिए आवेदन',
    		LANG1: 'अंग्रेज़ी',
    		LANG2: 'हिंदी',
    		button_add:'जोड़ना',
    		button_remove:'हटाना',
    		Task_id:'कार्य आईडी',
    		Task_name:'कार्य का नाम',
    		Mark_completed:'मार्क पूरा',
    		Remove_task:'कार्य हटाना',
    		Cancel:'रद्द करना'

  		});
  		$translateProvider.preferredLanguage('en');
	});



	app.factory('myFact', function() {
		var info=[];
		var langu="";
		var data={
			setdata:function(tid,tname){
				info.push({'taskid':tid,'taskname':tname});
			},
			getdata:function(){
				return info;
			}

		};
		return data;
});

	

	app.controller("myController",['$scope','$uibModal','myFact','$translate',function($scope,$uibModal,myFact,$translate){
		$scope.langChange=function(result){
			$translate.use(result);
			// myFact.setlang(result);
		}
		
		$scope.data=myFact.getdata();
		$scope.cancelTask=function(){
			$scope.taskadd=false;
		}
		$scope.showTask = function () {
			// console.log('opening pop up');
			var modalInstance = $uibModal.open({
				templateUrl: 'popup.html',
				controller:'popupController'
			});
		}
		$scope.removeTask=function(taskid){
			angular.forEach($scope.data,function(value,key){
			angular.forEach(value,function(result,index){
				if(taskid===result){
					$scope.data.splice(key,1);
				}
			})
			})
		}
	}]);

	app.controller('popupController', ['$scope','myFact','$translate','$uibModalInstance',function ($scope,myFact,$translate,$uibModalInstance) {
		$scope.tname_reg = /^[a-zA-Z0-9]+$/;
		$scope.id_reg = /^[0-9]+$/;
		$scope.taskadd=false;
		$scope.count=0;
		$scope.test=[];
			$scope.test=myFact.getdata();

		$scope.cancelTask = function () {
			$uibModalInstance.dismiss('cancel');
		};
		$scope.addTask=function(){
			if($scope._id&&$scope._name){
			angular.forEach($scope.data,function(value,key){
			angular.forEach(value,function(result,index){
				console.log(result);
				if($scope._id==result){
					alert("Duplicate entry!");
					$scope.count=1;
				}
			
				
			})
			})
				if($scope.count==0){
					myFact.setdata($scope._id,$scope._name);
				$scope.taskadd=false;
				
				$scope.cancelTask();
			}

		}
		else{
		alert("Enter numbers only for id and alphanumericals only for name");
	}

	}
	}]); 
