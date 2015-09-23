'use strict';

angular.module('musicPlayerApp')
	.filter('startFrom', function() {
		return function(input, start) {
			start = +start; //parse to int
			return input.slice(start);
		};
	})
	
	.controller('MainCtrl', function ($scope, $http, $rootScope) {
		$scope.currentTrack = 0;
		$scope.pageSize = 5;
		$scope.data=[];
		var defaultData = [];
		$scope.random = false;

		var updateTrack = function(){
			$rootScope.$broadcast('audio.set', 'assets/music/' + $scope.data[$scope.currentTrack].filename, $scope.data[$scope.currentTrack], $scope.currentTrack, $scope.data.length);
		};

		var shuffleArray = function(array) {
			var m = array.length, t, i;

			//while there remain elements to shuffle
			while (m) {
				//Pick a remaining element
				i = Math.floor(Math.random() * m--);

				//And swap it with the current element.
				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}
			return array;
		};

		$scope.randomize = function() {
			if ($scope.random) {
				shuffleArray($scope.data);
				updateTrack();
			} else {
				$scope.data = defaultData.slice();
				updateTrack();
			}
		};

		$scope.chooseTrack = function(index) {
			$scope.currentTrack = index;
			updateTrack();
		};

		$rootScope.$on('audio.next', function(){
			$scope.currentTrack++;
			if ($scope.currentTrack < $scope.data.length){
				updateTrack();
			}else{
				$scope.currentTrack=$scope.data.length-1;
			}
		});

		$rootScope.$on('audio.prev', function(){
			$scope.currentTrack--;
			if ($scope.currentTrack >= 0){
				updateTrack();
			}else{
				$scope.currentTrack = 0;
			}
		});

		$http.get('assets/keygen_musics.json')
			.success(function(response){
				$scope.data = response;
				defaultData = response.slice();
				updateTrack();
			});
	});
