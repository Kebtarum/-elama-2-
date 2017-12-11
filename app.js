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
	
	//СОЗДАНИЕ СЧЕТА
	$scope.AddModels = function(nameModel){
		
		$scope.AllList.push({number: i, name: nameModel, items:[],
		RUR : 0,
		EUR : 0,
		USD : 0
		});
		$scope.list = $scope.AllList[i];
		i++;
		//alert ($scope.AllList);
		//alert (Models.name);
	};
	
	//УДАЛЕНИЕ СЧЕТА
	$scope.DelModels = function(modelNumber){
		alert(modelNumber);
		$scope.AllList.splice(modelNumber,1);
		
		while(modelNumber  < $scope.AllList.length){
			$scope.AllList[modelNumber].number -= 1;
			modelNumber++;
		}
		--i
		if($scope.AllList.length == 1)
			$scope.changeList($scope.AllList[0]);
		//$scope.AllList.splice(number,number);
	};
	
	//РЕДАКТИРОВАНИЕ СЧЕТА(ИМЕНИ)
	$scope.EditModels = function(newName,modelNumber){
		//alert(newName);
		$scope.AllList[modelNumber].name = newName;
		//alert($scope.AllList[modelNumber].name);
		myEdit = false;
	};
	
	
	//ВЫБОР СЧЕТА
	$scope.changeList = function(modelFP){
		$scope.list = modelFP;
		//if(modelFP == 1)
			//$scope.list = modelFather;
		//else
			//$scope.list = modelMother;
		//alert("Привет " + $scope.list.name);
	};
	
	
	//ПЕРЕВОД ДЕНЕГ НА ДРУГОЙ СЧЕТ
	$scope.TransferCurrency = function(summ ,currency, number){
		if($scope.AllList[number].number == number)
			return alert("Так нельзя! ");
		var BUF = parseFloat(summ);
		switch(currency){
			case "RUR": 
				if(BUF <= $scope.list.RUR){
					$scope.list.RUR = $scope.list.RUR - BUF;
					alert($scope.list.RUR);
					//alert($scope.list.number);
					//alert(number);
					$scope.AllList[number].RUR += BUF;
					alert("Операция прошла успешна!");
				}
				else
					alert("Не хватает средств");
				break;
			case "EUR": 
				if(BUF <= $scope.list.EUR){
					$scope.list.EUR -= BUF;
					alert($scope.list.USD);
					$scope.AllList[number].EUR += BUF;
					alert("Операция прошла успешна!");
				}
				else
					alert("Не хватает средств");
				break;
			case "USD":
				if(BUF <= $scope.list.USD){
					$scope.list.USD -= BUF;
					alert($scope.list.USD);
					$scope.AllList[number].USD += BUF;
					alert("Операция прошла успешна!");
				}
				else
					alert("Не хватает средств");
				break;
				
			default: break;
		}			
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

