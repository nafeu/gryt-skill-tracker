angular.module('gryt.filters', [])

.filter('progPercent', function() {
  return function(input) {
    var x = input;
    while (x > 5) {
        x -= 5;
    }
    if ((x * 20) == 100) {
        return 0;
    } else {
        return (x * 20);
    }
  };
})

.filter('progColor', function() {
  return function(input) {
  var levelProg = input + 0.5;
  var out = 0;
    var colorList = [

    '#2c3e50',
    '#c0392b',
    '#f39c12',
    '#9b59b6',
    '#16a085',
    '#3498db',
    '#1abc9c',
    '#27ae60',
    '#2980b9',
    '#e74c3c',
    '#2ecc71',
    '#34495e',
    '#8e44ad',
    '#f1c40f',
    '#e67e22',
    '#d35400',
    '#807EFF',
    '#FF549A',
    '#F0B700',
    '#00A9EF',
    '#80CC72',
    '#D08169',
    '#EA3CF3',
    '#6F4CA0',
    '#5B8F9F',
    '#A14E00',
    '#8C9F94',
    '#FE3E02',
    '#BF14C7',
    '#2C7215',
    '#1723AA',
    '#991795',
    '#02DFFE',
    '#F68706',
    '#3589EC',
    '#208416',
    '#E568E8',
    '#F09C1F',
    '#35EC2F',
    '#EA4389',
    '#48E9AB',
    '#185184'

    ];

  while (levelProg > 5) {
    out += 1;
    levelProg -= 5;
  }

  if (out > 40) {
    out -= 39;
  }

  return colorList[out];

  };

})

.filter('level', function() {
  return function(input) {
  var levelProg = input + 0.5;
  var out = 1;

  while (levelProg > 5) {
    out += 1;
    levelProg -= 5;
  }

  return out;

  };

});
