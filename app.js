var Models = [];
var i = 0

var modelFather = {name: "Не выбран",items:[], 	
	RUR : 0,
	EUR : 0,
	USD : 0,};
//var modelMother = {name: "Второй" ,items:[],
	//RUR : 0,
	//EUR : 0,
	//USD : 0};
var selectFilter = "{price: '-'}";
var myApp = angular.module("myApp", []);

myApp.controller("pController", function ($scope) {
	//$scope.RUR = 0;
	//$scope.EUR = 0;
	//$scope.USD = 0;
	$scope.AllList = Models;
    $scope.list = modelFather;
	
	$scope.AddModels = function(nameModel){
		
		$scope.AllList.push({number: i, name: nameModel, items:[],
		RUR : 0,
		EUR : 0,
		USD : 0
		});
		i++;
		//alert ($scope.AllList);
		//alert (Models.name);
	};
	
	$scope.DelModels = function(modelNumber){
		alert(modelNumber);
		$scope.AllList.splice(modelNumber,1);
		
		while(modelNumber  < $scope.AllList.length){
			$scope.AllList[modelNumber].number -= 1;
			modelNumber++;
		}
		--i
		//$scope.AllList.splice(number,number);
	};
	
	$scope.changeList = function(modelFP){
		$scope.list = modelFP;
		//if(modelFP == 1)
			//$scope.list = modelFather;
		//else
			//$scope.list = modelMother;
		alert("Привет " + $scope.list.name);
	};
	
	
    $scope.addItem = function (ThisIsData ,text, price,currency) {
       // price = parseFloat(price); // преобразуем введенное значение к числу
		if(price[0] == '+' | price[0] == '-'){
			var buf = price[0];
			price = price.slice(1);
			price = parseFloat(price);
			
			var DATA = ThisIsData.toLocaleDateString();
			
			if(text != "" && !isNaN(parseFloat(price)) && DATA != undefined && currency != undefined) // если текст установлен и введено число, то добавляем
			{
				$scope.list.items.push({date: DATA, purchase: text, price: buf + price + ' ' + currency});
				switch(currency){
					case "RUR": 
						if(buf == '+'){
							$scope.list.RUR = $scope.list.RUR + +price
							alert($scope.list.RUR);
						}
						else{
							$scope.list.RUR = $scope.list.RUR - +price;
						}
						break;
					case "EUR": 
						if(buf == '+'){
							$scope.list.EUR = $scope.list.EUR + +price
						}
						else{
							$scope.list.EUR = $scope.list.EUR - +price;
						}
						break;
					case "USD":
						if(buf == '+'){
							$scope.list.USD = $scope.list.USD + +price
						}
						else{
							$scope.list.USD = $scope.list.USD - +price;
						}
						break;
					default: break;	
			}
		}
	}
}
});

