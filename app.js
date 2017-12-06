var model = {
    items: [{
		date:"-",
		purchase:"-",
		price:"-", 
		}
    ]
};



var myApp = angular.module("myApp", []);

myApp.controller("pController", function ($scope) {
	$scope.RUR = 0;
	$scope.EUR = 0;
	$scope.USD = 0;
    $scope.list = model;
    $scope.addItem = function (date ,text, price,currency) {
       // price = parseFloat(price); // преобразуем введенное значение к числу
		if(price[0] == '+' | price[0] == '-'){
			var buf = price[0];
			price = price.slice(1);
			price = parseFloat(price);
			if(text != "" && !isNaN(parseFloat(price)) && date != undefined && currency != undefined) // если текст установлен и введено число, то добавляем
			{
				$scope.list.items.push({date: date, purchase: text, price: buf + price + ' ' + currency});
				switch(currency){
					case "RUR": 
						if(buf == '+'){
							$scope.RUR = $scope.RUR + +price
						}
						else{
							$scope.RUR = $scope.RUR - +price;
						}
						break;
					case "EUR": 
						if(buf == '+'){
							$scope.EUR = $scope.EUR + +price
						}
						else{
							$scope.EUR = $scope.EUR - +price;
						}
						break;
					case "USD":
						if(buf == '+'){
							$scope.USD = $scope.USD + +price
						}
						else{
							$scope.USD = $scope.USD - +price;
						}
						break;
					default: ;	
			}
		}
	}
}
});

