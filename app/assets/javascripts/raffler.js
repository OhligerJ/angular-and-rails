// var app = angular.module("Raffler", []);
var rafflerApp = angular.module("raffler", ['rails']);

rafflerApp.factory('Player',
  function (railsResourceFactory) {
    var resource = railsResourceFactory({
      url: '/players',
      name: 'player'});
    return resource;
});

rafflerApp.controller('RaffleController', ["$scope", 'Player', function($scope, Player) {
  $scope.test = 123;
  Player.query().then(function(result) {
      $scope.players = result;
  });

  $scope.addPlayer = function() {
    var newPlayer = new Player({
        name: $scope.newName,
        rating: 5,
        winner: false
    });
    newPlayer.create().then(function(newlyCreatedPlayer){
        $scope.players.push(newlyCreatedPlayer);
        $scope.newName = "";
    });
  };
  $scope.raffle = function() {
    $scope.players.forEach(function(player){
      player.winner = false;
      player.update();
    });
    var raffleWinner = $scope.players[Math.floor(Math.random()*$scope.players.length)];
    console.log(raffleWinner.name);
    raffleWinner.winner = true;

    raffleWinner.update().then(function(newlyCrownedPlayer){
        console.log("We have a winner!");
    });
  };
}]);

