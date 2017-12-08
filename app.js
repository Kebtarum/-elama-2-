//var model = {
  //  items: [{
	//	date:"-",
	//	purchase:"-",
	//	price:"-", 
	//	}
   // ]
//};

var modelFather = {items:[], 	
	RUR : 0,
	EUR : 0,
	USD : 0,};
var modelMother = {items:[],
	RUR : 0,
	EUR : 0,
	USD : 0};
var selectFilter = "{price: '-'}";
var myApp = angular.module("myApp", []);

myApp.controller("pController", function ($scope) {
	//$scope.RUR = 0;
	//$scope.EUR = 0;
	//$scope.USD = 0;
    $scope.list = modelFather;

	$scope.changeList = function(modelFP){
		if(modelFP == 1)
			$scope.list = modelFather;
		
		else
			$scope.list = modelMother;
	};
	
	
    $scope.addItem = function (ThisIsData ,text, price,currency) {
       // price = parseFloat(price); // преобразуем введенное значение к числу
		if(price[0] == '+' | price[0] == '-'){
			alert(price);
			var buf = price[0];
			price = price.slice(1);
			price = parseFloat(price);
			alert(price);
			
			var DATA = ThisIsData.toLocaleDateString();
			
			if(text != "" && !isNaN(parseFloat(price)) && DATA != undefined && currency != undefined) // если текст установлен и введено число, то добавляем
			{
				$scope.list.items.push({date: DATA, purchase: text, price: buf + price + ' ' + currency});
				alert(price);
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

