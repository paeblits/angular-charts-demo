'use strict';


/* ********************************************************* */
/* ********************************************************* */
/* NOTE: All controllers are currently housed in this single
         file. However, best practice is separate the
         controllers as well as the services.
         Also note that the controllers are "chained"
         together, similar to app.js.
         
         ie:
         angular.module().controller().controller();

/* ********************************************************* */
/* ********************************************************* */




/* Load the visualization package and the "corechart" which is used for bar, line, and scatter */
google.load("visualization", "1", {packages:["corechart", "gauge"]});
/* initialize the angular app once the package is loaded */
/* angular.bootstrap is a global API for manually starting an angular app */
google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['myApp']);
});

angular.module('myApp.controllers', []).
controller('MainController', ['$scope',function($scope) {
  // main controller will be empty for now
  // can be used for the functions that apply to the whole page
  // such as the increase speed and decrease speed functions in each controller
}])




/* ********************************************************* */
/* * * * * * * * * * * Line Chart Controller * * * * * * * * */
/* ********************************************************* */
.controller('LineChartCtrl', ['$scope',function($scope) {
  $scope.interval = 1000;
  $scope.limitRange = true;
  $scope.dataPoints = 8;
  var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
  ]);

  var options = {
      title: 'Company Performance'
  };

  var chart = new google.visualization.LineChart(document.getElementById('line_chart'));

  chart.draw(data, options);

  var value1, value2, random, add, rows = 0;
  var time;

  function callback() {
    if($scope.limitRange) {
      if(data.getNumberOfRows() > $scope.dataPoints-1) {
        while(data.getNumberOfRows() > $scope.dataPoints-1) {
          data.removeRow(0);
        }
      }
    }
    var d = new Date();
    time = (d.getMilliseconds() * 10).toString();
    rows = data.getNumberOfRows();
    //data.removeRow(rows);
    random = Math.round(100 * Math.random());
    value1 = parseInt(data.getFormattedValue(rows-1,1));
    value2 = parseInt(data.getFormattedValue(rows-1,2));
    value1 = add ? value1 + random : value1 - random;
    value2 = !add ? value2 + random : value2 - random;
    data.addRow([time, value1, value2]);
    chart.draw(data, options);
    add = !add;
    setTimeout(callback, $scope.interval);
  }

  setTimeout( callback, $scope.interval );

  $scope.increaseSpeed = function() {
      if($scope.interval === 1000) {
          $scope.interval = 200;
      } else if ($scope.interval === 200) {
          $scope.interval = 100;
      }
  }

  $scope.decreaseSpeed = function() {
    if($scope.interval === 100) {
        $scope.interval = 200;
    } else if ($scope.interval === 200) {
        $scope.interval = 1000;
    }
  }
}])




/* ********************************************************* */
/* * * * * * * * * Scatter Chart Controller * * * * * * * *  */
/* ********************************************************* */
.controller('ScatterChartCtrl', ['$scope',function($scope) {
  $scope.interval = 1000;
  $scope.limitRange = true;
  $scope.dataPoints = 8;
  var data = google.visualization.arrayToDataTable([
      ['time', 'series1'],
      [ 0,      12]
  ]);

  var options = {
      title: 'Time vs. Amount comparison',
      hAxis: {title: 'time', minValue: 0, maxValue: 15},
      vAxis: {title: 'amount', minValue: 0, maxValue: 15},
      legend: 'none'
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('scatter_chart'));

  chart.draw(data, options);

  var counter = 1;
  var value, random, add, rows = 0;

  function callback() {
    if($scope.limitRange) {
      if(data.getNumberOfRows() > $scope.dataPoints) {
        while(data.getNumberOfRows() > $scope.dataPoints) {
          data.removeRow(0);
        }
      }
    }
    //var d = new Date();
    rows = data.getNumberOfRows();
    //data.removeRow(rows);
    random = Math.round(6 * Math.random());
    value = parseInt(data.getFormattedValue(rows-1,1));
    value = add ? value + random : value - random;
    data.addRow([counter, value]);
    chart.draw(data, options);
    counter ++;
    add = !add;
    setTimeout(callback, $scope.interval);
  }

  setTimeout( callback, $scope.interval );

  $scope.increaseSpeed = function() {
      if($scope.interval === 1000) {
          $scope.interval = 200;
      } else if ($scope.interval === 200) {
          $scope.interval = 100;
      }
  }

  $scope.decreaseSpeed = function() {
    if($scope.interval === 100) {
        $scope.interval = 200;
    } else if ($scope.interval === 200) {
        $scope.interval = 1000;
    }
  }
  
}])




/* ********************************************************* */
/* * * * * * * * * Scatter Chart Controller * * * * * * * *  */
/* ********************************************************* */
.controller('BarChartCtrl', ['$scope',function($scope) {
  $scope.interval = 1000;
  var data = google.visualization.arrayToDataTable([
    ['Year', 'Sales', 'Expenses'],
    ['2004',  1000,      400],
    ['2005',  1170,      460],
    ['2006',  660,       1120],
    ['2007',  1030,      540]
  ]);

  var options = {
    title: 'Company Performance',
    vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}}
  };

  var chart = new google.visualization.BarChart(document.getElementById('bar_chart'));

  chart.draw(data, options);

  var value1, value2, value3, value4, value5, value6, value7, value8;
  var random, add, rows = 0;
  var time;

  function callback() {
      rows = data.getNumberOfRows();
      //data.removeRow(rows);
      value1 = parseInt(data.getFormattedValue(0,1));
      value2 = parseInt(data.getFormattedValue(0,2));
      value3 = parseInt(data.getFormattedValue(1,1));
      value4 = parseInt(data.getFormattedValue(1,2));
      value5 = parseInt(data.getFormattedValue(2,1));
      value6 = parseInt(data.getFormattedValue(2,2));
      value7 = parseInt(data.getFormattedValue(3,1));
      value8 = parseInt(data.getFormattedValue(3,2));
      random = Math.round(10 * Math.random());
      value1 =  add ? value1 + random : value1 - random;
      value2 = !add ? value2 + random : value2 - random;
      value3 =  add ? value3 + random : value3 - random;
      value4 = !add ? value4 + random : value4 - random;
      value5 =  add ? value5 + random : value5 - random;
      value6 = !add ? value6 + random : value6 - random;
      value7 =  add ? value7 + random : value7 - random;
      value8 = !add ? value8 + random : value8 - random;
      data.setCell(0,1, value1);
      data.setCell(0,2, value2);
      data.setCell(1,1, value3);
      data.setCell(1,2, value4);
      data.setCell(2,1, value5);
      data.setCell(2,2, value6);
      data.setCell(3,1, value7);
      data.setCell(3,2, value8);
      chart.draw(data, options);
      add = !add;
      setTimeout(callback, $scope.interval);
    }
  
  setTimeout( callback, $scope.interval );

  $scope.increaseSpeed = function() {
      if($scope.interval === 1000) {
          $scope.interval = 200;
      } else if ($scope.interval === 200) {
          $scope.interval = 100;
      }
  }

  $scope.decreaseSpeed = function() {
    if($scope.interval === 100) {
        $scope.interval = 200;
    } else if ($scope.interval === 200) {
        $scope.interval = 1000;
    }
  }

}])




/* ********************************************************* */
/* * * * * * * * * Gauge Chart Controller * * * * * * * *  */
/* ********************************************************* */
.controller('GaugeChartCtrl', ['$scope',function($scope) {
  $scope.interval = 1000;
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Memory', 80],
    ['CPU', 55],
    ['Network', 68]
  ]);

  var options = {
    width: 400, height: 120,
    redFrom: 90, redTo: 100,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5
  };

  var chart = new google.visualization.Gauge(document.getElementById('gauge_chart'));

  chart.draw(data, options);

  // adds data to the first gauge, note the first param in setValue is 0
  function callbackOne() {
    data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
    setTimeout( callbackOne, $scope.interval );
  }
  // adds data to the second gauge
  function callbackTwo() {
    data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
    chart.draw(data, options);
    setTimeout( callbackTwo, $scope.interval );
  }
  // adds data to the third gauge
  function callbackThree() {
    data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
    chart.draw(data, options);
    setTimeout( callbackThree, $scope.interval );
  }

  setTimeout( callbackOne,   $scope.interval );
  setTimeout( callbackTwo,   $scope.interval );
  setTimeout( callbackThree, $scope.interval );

  $scope.increaseSpeed = function() {
      if($scope.interval === 1000) {
          $scope.interval = 200;
      } else if ($scope.interval === 200) {
          $scope.interval = 100;
      }
  }

  $scope.decreaseSpeed = function() {
    if($scope.interval === 100) {
        $scope.interval = 200;
    } else if ($scope.interval === 200) {
        $scope.interval = 1000;
    }
  }

}]);





