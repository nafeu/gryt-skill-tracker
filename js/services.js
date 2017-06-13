angular.module('starter.services', [])

.factory('dateKey', function() {
    var dt = new Date();
    return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
})

.factory('skillGraph', function() {
    return {
        chart: function(skillset) {
            var output = {};
            for (var i = 0; i < skillset.length; i++) {
                for (var j = 0; j < Object.keys(skillset[i].activity).length; j++) {
                    if (output[Object.keys(skillset[i].activity)[j]] === null) {
                        output[Object.keys(skillset[i].activity)[j]] = skillset[i].activity[Object.keys(skillset[i].activity)[j]];
                    } else {
                        output[Object.keys(skillset[i].activity)[j]] += skillset[i].activity[Object.keys(skillset[i].activity)[j]];
                    }
                }
            }
            return {
                plots: function() {
                    var out = [];
                    if (skillset.length > 0) {
                        for (var i = 0; i < Object.keys(output).length; i++) {
                            out.push(output[Object.keys(output)[i]]);
                        }
                    }
                    return out;
                },
                labels: function() {

                    var out = [];
                    for (var i = 0; i < Object.keys(output).length; i++) {
                        out.push('');
                    }
                    return out;
                },
                startDate: function() {
                    var outDate = new Date(Object.keys(output)[0]);
                    outDate.setDate(outDate.getDate() + 1);
                    return outDate.toDateString();
                },
                endDate: function() {
                    var outDate = new Date(Object.keys(output)[Object.keys(output).length-1]);
                    outDate.setDate(outDate.getDate() + 1);
                    return outDate.toDateString();
                }
            };
        },
    };
})

.factory('analytics', function() {
    return {

        totalHours: function(skillset) {
            var output = 0.0;
            for (var i = skillset.length - 1; i >= 0; i--) {
                output += skillset[i].progress;
            }
            return output;
        }

    };
});
