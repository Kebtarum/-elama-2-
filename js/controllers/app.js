var Models = [];
var i = 0;
var j = 0;
var modelFather = {name: "Не выбран",items:[], 	
	RUR : 0,
	EUR : 0,
	USD : 0,};
//var modelMother = {name: "Второй" ,items:[],
	//RUR : 0,
	//EUR : 0,
	//USD : 0};

var myApp = angular.module("myApp", []);

myApp.controller("pController", function ($scope) {
	//$scope.RUR = 0;
	//$scope.EUR = 0;
	//$scope.USD = 0;
	$scope.AllList = Models;
    $scope.list = modelFather;
	
	//СОЗДАНИЕ СЧЕТА
	$scope.AddModels = function(nameModel){
		for(var i = 0; i < $scope.AllList.length; i++){
			if(nameModel == $scope.AllList[i].name)
				return alert("Счёт с данным названием уже существует");
		}
		if(nameModel != undefined){
			$scope.AllList.push({number: i, name: nameModel, items:[],
			RUR : 0,
			EUR : 0,
			USD : 0
			});
			$scope.list = $scope.AllList[i];
			i++;
			//alert ($scope.AllList);
			//alert (Models.name);
		}
		else
			return alert('Введите название счёта!');
	};
	
	//УДАЛЕНИЕ СЧЕТА
	$scope.DelModels = function(modelNumber){
		var TrFls = confirm("Вы хотите удалить счёт " + $scope.AllList[modelNumber].name + "?");
		if(TrFls){
			$scope.AllList.splice(modelNumber,1);
		
			while(modelNumber  < $scope.AllList.length){
				$scope.AllList[modelNumber].number -= 1;
				modelNumber++;
			}
			--i
			if($scope.AllList.length == 1)
				$scope.changeList($scope.AllList[0]);
			//$scope.AllList.splice(number,number);
		}
		
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
		//alert(modelFP[0]);
		$scope.list = modelFP;
		//alert($scope.list);
		//if(modelFP == 1)
			//$scope.list = modelFather;
		//else
			//$scope.list = modelMother;
		//alert("Привет " + $scope.list.name);
	};
	
	
	//ПЕРЕВОД ДЕНЕГ НА ДРУГОЙ СЧЕТ
	$scope.TransferCurrency = function(summ ,currency, numberModel){
		//alert(numberModel);
		//alert($scope.AllList[numberModel].number);
		if($scope.list.number == numberModel)
			return alert("Так нельзя! ");
		var BUF = parseFloat(summ);
		switch(currency){
			case "RUR": 
				if(BUF <= $scope.list.RUR){
					$scope.list.RUR = +($scope.list.RUR - BUF).toFixed(2);
					//alert($scope.list.RUR);
					//alert($scope.list.number);
					//alert(number);
					$scope.AllList[numberModel].RUR = +($scope.AllList[numberModel].RUR  + BUF).toFixed(2);
					alert("Операция прошла успешна!");
				}
				else
					alert("Не хватает средств");
				break;
			case "EUR": 
				if(BUF <= $scope.list.EUR){
					$scope.list.EUR = ($scope.list.EUR - BUF).toFixed(2);
					//alert($scope.list.USD);
					$scope.AllList[numberModel].EUR = +($scope.AllList[numberModel].EUR  + BUF).toFixed(2);
					alert("Операция прошла успешна!");
				}
				else
					alert("Не хватает средств");
				break;
			case "USD":
				if(BUF <= $scope.list.USD){
					$scope.list.USD = ($scope.list.USD - BUF).toFixed(2);
					//alert($scope.list.USD);
					$scope.AllList[numberModel].USD = +($scope.AllList[numberModel].USD  + BUF).toFixed(2);
					alert("Операция прошла успешна!");
				}
				else
					alert("Не хватает средств");
				break;
				
			default: break;
		}			
	};
	
	
	//ОБМЕН ВАЛЮТЫ
	$scope.switchCurrency = function(price ,FROM,TO){
	if((price.indexOf('-') >= 0) || (price.indexOf('+') >= 0)){
		return alert("В сумме не должно быть никаких знаков");
	}
		if(FROM != TO){
		var BUF = parseFloat(price);
		switch(FROM){
			case "RUR":
				if(price <= $scope.list.RUR){
					$scope.list.RUR -= BUF;
					if(TO == 'EUR'){
						$scope.list.EUR = +($scope.list.EUR + 0.0144143 * BUF).toFixed(2);
						alert("Операция прошла успешна!");
					}
					else{
						$scope.list.USD = +($scope.list.USD + 0.01697 * BUF).toFixed(2);
						alert("Операция прошла успешна!");
					}
				}
				else
					alert('Не хватает средств');
				break;
			case "EUR": 
				if(price <= $scope.list.EUR){
					$scope.list.EUR -= BUF;
					if(TO == 'RUR'){
						$scope.list.RUR = +($scope.list.RUR + 69.3753683 * BUF).toFixed(2);
						alert("Операция прошла успешна!");
					}
					else{
						$scope.list.USD = +($scope.list.USD + 1.1773 * BUF).toFixed(2);
						alert("Операция прошла успешна!");
					}
				}
				else
					alert('Не хватает средств');
				break;
			case "USD":
				if(price <= $scope.list.USD){
					$scope.list.USD -= BUF;
					if(TO == 'RUR'){
						$scope.list.RUR = +($scope.list.RUR + 57.9275192 * BUF).toFixed(2)
						alert("Операция прошла успешна!");
					}
					else{
						$scope.list.EUR = +($scope.list.EUR + 0.849401172 * BUF).toFixed(2);
						alert("Операция прошла успешна!");
					}
				}
				else
					alert('Не хватает средств');
				break;
				
			default: break;
		}
		}
		else
			return alert("Бессмысленно");
	};
	
	/////////////УДАЛЕНИЕ РАСХОДОВ И ДОХОДОВ
	$scope.DelList = function(NUMBER){
		var TrFls = confirm("Вы хотите удалить операцию?");
		if(TrFls){
			var OldPrice = $scope.list.items[NUMBER].price.slice(1);
			switch($scope.list.items[NUMBER].currency){
				case "RUR":
					if($scope.list.items[NUMBER].price[0] == '+'){
						$scope.list.RUR = $scope.list.RUR - +OldPrice;
						//alert($scope.list.RUR);
					}
					else{
						$scope.list.RUR = $scope.list.RUR + +OldPrice;
					}break;
				case "EUR":
					if($scope.list.items[NUMBER].price[0] == '+'){
						$scope.list.EUR = $scope.list.EUR - +OldPrice;
						//alert($scope.list.RUR);
					}
					else{
						$scope.list.EUR = $scope.list.EUR + +OldPrice;
					}
					break;
				case "USD":
					if($scope.list.items[NUMBER].price[0] == '+'){
						$scope.list.USD = $scope.list.USD - +OldPrice;
						//alert($scope.list.RUR);
					}
					else{
						$scope.list.USD = $scope.list.USD + +OldPrice;
					}
					break;
				default: break;
				};
			$scope.list.items.splice(NUMBER,1);
		
			while(NUMBER  < $scope.list.items.length){
				$scope.list.items[NUMBER].number -= 1;
				NUMBER++;
			}
			//$scope.AllList.splice(number,number);
		}
		
	};
	
	/////////////////////РЕДАКТИРОВАНИЕ РАСХОДОВ И ДОХОДОВ
	$scope.EditList = function(NUMBER ,DATA, TEXT, PRICE, CURRENCY){
		if(PRICE[0] == '+' | PRICE[0] == '-'){
			var buf = PRICE[0];
			var OldPrice = $scope.list.items[NUMBER].price.slice(1);
			PRICE = PRICE.slice(1);
			PRICE = parseFloat(PRICE);
			var ReData = DATA.toLocaleDateString();
			if(TEXT != "" && !isNaN(PRICE) && DATA != undefined && CURRENCY != undefined){
				$scope.list.items[NUMBER].date = ReData;
				$scope.list.items[NUMBER].comment = TEXT;
				switch($scope.list.items[NUMBER].currency){
					case "RUR":
						if($scope.list.items[NUMBER].price[0] == '+'){
							$scope.list.RUR = $scope.list.RUR - +OldPrice;
							//alert($scope.list.RUR);
						}
						else{
							$scope.list.RUR = $scope.list.RUR + +OldPrice;
						}break;
					case "EUR":
						if($scope.list.items[NUMBER].price[0] == '+'){
							$scope.list.EUR = $scope.list.EUR - +OldPrice;
							//alert($scope.list.RUR);
						}
						else{
							$scope.list.EUR = $scope.list.EUR + +OldPrice;
						}
						break;
					case "USD":
						if($scope.list.items[NUMBER].price[0] == '+'){
							$scope.list.USD = $scope.list.USD - +OldPrice;
							//alert($scope.list.RUR);
						}
						else{
							$scope.list.USD = $scope.list.USD + +OldPrice;
						}
						break;
					default: break;
				};
				$scope.list.items[NUMBER].price = buf + PRICE;
				$scope.list.items[NUMBER].currency = CURRENCY;
				switch(CURRENCY){
					case "RUR": 
						if(buf == '+'){
							$scope.list.RUR = $scope.list.RUR + +PRICE
							//alert($scope.list.RUR);
						}
						else{
							$scope.list.RUR = $scope.list.RUR - +PRICE;
								}
						break;
					case "EUR": 
						if(buf == '+'){
							$scope.list.EUR = $scope.list.EUR + +PRICE
						}
						else{
							$scope.list.EUR = $scope.list.EUR - +PRICE;
						}
						break;
					case "USD":
						if(buf == '+'){
					$scope.list.USD = $scope.list.USD + +PRICE
						}
						else{
							$scope.list.USD = $scope.list.USD - +PRICE;
						}
						break;
					default: break;	
				}
			}
			else
				return alert("Вы не все ввели!");
		}
		else
			return alert("Вы забыли ввести '+' или '-' в сумме!");
	};
	
	
	/////ФИЛЬТРЫ
	$scope.thisDay = function(){
		var TDay = new Date();
		//alert("вроде");
		return TDay.toLocaleDateString();
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
				var j = $scope.list.items.length;
				$scope.list.items.push({number: j ,date: DATA, comment: text, price: buf + price, currency: currency});
				//alert($scope.list.items[0].number);
				//alert($scope.list.items[1].number);
				switch(currency){
					case "RUR": 
						if(buf == '+'){
							$scope.list.RUR = +($scope.list.RUR + +price).toFixed(2);
							//alert($scope.list.RUR);
						}
						else{
							$scope.list.RUR = +($scope.list.RUR - +price).toFixed(2);
						}
						break;
					case "EUR": 
						if(buf == '+'){
							$scope.list.EUR = +($scope.list.EUR + +price).toFixed(2);
						}
						else{
							$scope.list.EUR = +($scope.list.EUR - +price).toFixed(2);
						}
						break;
					case "USD":
						if(buf == '+'){
							$scope.list.USD = +($scope.list.USD + +price).toFixed(2);
						}
						else{
							$scope.list.USD = +($scope.list.USD - +price).toFixed(2);
						}
						break;
					default: break;	
				}
			}
		}
	}
});

