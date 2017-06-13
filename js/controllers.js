angular.module('starter.controllers', [])

.controller('SkillsCtrl', function($scope, $ionicModal, $ionicPopup, $ionicListDelegate, $filter, $localStorage) {

  // Initilization Configurations
  $scope.shouldShowDelete = false;
  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;
  $scope.showTrainSkills = true;
  $scope.data = {
    showDelete: false,
    reorderBtn: false,
    showOption: true,
    deleteBtn: '-outline'
  };

  // Variable Declarations
  $scope.newSubCatExist = null;
  $scope.newSkillInitVal = 0;
  $scope.newSkillSubCats = [];
  $scope.newSkillName = null;
  $scope.newSubSkillName = null;

  // // Mobile Compatibility Helpers
  // $scope.closeKeyboard = function() {
  //   cordova.plugins.Keyboard.close();
  // };

  // Generalized Helpers
  $scope.toggleDeleteBtn = function() {
    if ($scope.data.deleteBtn !== null) $scope.data.deleteBtn = null;
    else $scope.data.deleteBtn = '-outline';
  };
  $scope.checkNameExists = function(list, name) {
    for (var i = 0; i < list.length; i++) {
        if (name == list[i].name) {
            return true;
        }
    }
    return false;
  };
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.skills.splice(fromIndex, 1);
    $scope.skills.splice(toIndex, 0, item);
  };
  $scope.hideDetails = function() {
    for (var i = 0; i < $scope.skills.length; i++) {
        $scope.skills[i].showdetails = false;
    }
  };
  $scope.resetNewSkillVals = function() {
    $scope.newSubCatExist = null;
    $scope.newSkillInitVal = 0;
    $scope.newSkillSubCats = [];
    $scope.newSkillName = null;
    $scope.newSubSkillName = null;
  };
  $scope.checkNameDuplicate = function(list, name) {
    var counter = 0;
    for (var i = 0; i < list.length; i++) {
        if (name == list[i].name) {
            counter += 1;
        }
    }
    if (counter > 1) return true;
    return false;
  };
  $scope.editReset = function(list, item) {
    if ($scope.checkNameDuplicate(list, item.name)) {
        $scope.cannotRename(item.name);
    }
    else if (item.name.length === '')
    {
        $scope.cannotBeNull(item.name);
    }
    else
    {
        item.edit = false;
    }
  };

  // Skill Training Functions
  $scope.generalTrain = function(item) {
    item.gen_progress += 0.5;
    item.analytics.refresh = true;
  };
  $scope.subTrain = function(item, subitem) {
    item.gen_progress += 0.5;
    subitem.sub_progress += 0.5;
    item.analytics.refresh = true;
  };
  $scope.generalRevert = function(item) {
    var subcat_sum = 0;
    for (var i = 0; i < item.subcat.length; i++) {
        subcat_sum += item.subcat[i].sub_progress;
    }
    if ((item.gen_progress != subcat_sum) && (item.gen_progress > 0)) {
        item.gen_progress -= 0.5;
        item.analytics.refresh = true;
    }
  };
  $scope.subRevert = function(item, subitem) {
    if ((item.gen_progress > 0) && (subitem.sub_progress > 0)) {
        item.gen_progress -= 0.5;
        subitem.sub_progress -= 0.5;
        item.analytics.refresh = true;
    }
  };
  $scope.incrementInitVal = function() {
      $scope.newSkillInitVal += 0.5;
  };
  $scope.decrementInitVal = function() {
    if ($scope.newSkillInitVal >= 0.5) {
      $scope.newSkillInitVal -= 0.5;
    }
  };
  $scope.resetSkill = function(item) {
    item.gen_progress = 0;
    item.init_progress = 0;
    for (var i = 0; i < item.subcat.length; i++) {
        item.subcat[i].sub_progress = 0;
    }
    item.analytics.refresh = true;
  };

  // Alert Popups
  $scope.alertMsg = function(msg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Invalid Name',
      template: msg
    });
  };
  $scope.cannotRename = function(name) {
    var alertPopup = $ionicPopup.alert({
      title: 'Cannot rename',
      template: '"'+name+'" already exists'
    });
  };
  $scope.cannotBeNull = function(name) {
    var alertPopup = $ionicPopup.alert({
      title: 'Cannot rename',
      template: 'name cannot be empty'
    });
  };

  // Confirmation Popups
  $scope.confirmSkillReset = function(item) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Confirm Progress Reset',
       template: 'Are you sure you want reset all progress for "' + item.name + '?" (cannot undo)'
     });

     confirmPopup.then(function(res) {
       if(res) {
         $scope.resetSkill(item);
       } else {
         // do nothing
       }
     });
  };

  // Modals
  $ionicModal.fromTemplateUrl('templates/add-skill-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addSkillModal = modal;
  });
  $scope.openModal = function() {
    $scope.addSkillModal.show();
  };
  $scope.closeModal = function() {
    $scope.addSkillModal.hide();
  };
  $scope.$on('$destroy', function() {
    $scope.addSkillModal.remove(); //Cleanup the modal when we're done with it!
  });
  $scope.$on('addSkillModal.hidden', function() {
    $scope.resetNewSkillVals(); // Execute action on hide modal
  });
  $scope.$on('addSkillModal.removed', function() {
    $scope.resetNewSkillVals(); // Execute action on remove modal
  });

  // Skill CRUD Functions
  $scope.onItemDelete = function(item) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete skill: '+item.name,
     template: 'Confirm deletion of "'+item.name+'"?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       $scope.skills.splice($scope.skills.indexOf(item), 1);
     } else {
       console.log('Do not delete');
     }
   });
  };

  $scope.addNewSkill = function(skill) {
    if (skill === null) {
        $scope.alertMsg('Skill name cannot be empty');
    }
    else if (skill === '') {
        $scope.alertMsg('Skill name cannot be empty');
    }
    else if ($scope.checkNameExists($scope.skills, skill))
    {
        $scope.alertMsg('"'+skill+'" already exists');
    }
    else
    {
        var subcategories = [];
        for (var i = 0; i < $scope.newSkillSubCats.length; i++) {
            subcategories.push({
                "name": $scope.newSkillSubCats[i],
                "edit" : false,
                "sub_progress" : 0,
            });
        }
        var skillObj = {
            "name": skill,
            "init_progress": $scope.newSkillInitVal,
            "edit": false,
            "has_sub" : false,
            "showdetails": false,
            "gen_progress": 0.0,
            "subcat": subcategories,
            "analytics": {
                "refresh" : true
            }
        };
        if (subcategories.length > 0) {
            skillObj.has_sub = true;
        }
        $scope.skills.push(skillObj);
        // Close modal and clean up values
        $scope.resetNewSkillVals();
        $scope.closeModal();
    }
  };

  // Subcategory CRUD Functions
  $scope.addSubCatExist = function(item) {

        $scope.popupdata = {};

        function checkSubCatName(name) {
            for (var i = 0; i < item.subcat.length; i++) {
                if (name == item.subcat[i].name) {
                    return true;
                }
            }
            return false;
        }

        var myPopup = $ionicPopup.show({
        template: '<input ng-model="popupdata.name">',
        title: 'Enter a subcategory name',
        subTitle: 'cannot be empty or duplicate',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (checkSubCatName($scope.popupdata.name)) {
                e.preventDefault();
              }
              else if ($scope.popupdata.name.length < 1)
              {
                e.preventDefault();
              }
               else {
                item.has_sub = true;
                item.subcat.push({
                    "name": $scope.popupdata.name,
                    "edit": false,
                    "sub_progress": 0,
                });
                item.showdetails = true;
              }
            }
          }
        ]
        });

  };
  $scope.addNewSubCat = function(subcat) {
    if ($scope.newSkillSubCats.indexOf(subcat) > -1)
    {
        $scope.alertMsg('Cannot add duplicate subcategory');
    }
    else if ((subcat === '') || (subcat === null))
    {
        $scope.alertMsg('Subcategory name cannot be empty');
    }
    else
    {
        $scope.newSkillSubCats.push(subcat);
    }
  };
  $scope.onSubItemDelete = function(item, subitem) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete subcategory "'+subitem.name+'"',
     template: 'Confirm deletion of "'+subitem.name+'"?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       item.subcat.splice(item.subcat.indexOf(subitem), 1);
       if (item.subcat.length === 0) {
        item.showdetails = false;
        item.has_sub = false;
       }
     } else {
       console.log('Do not delete');
     }
   });
  };

  // Application Main
  if ($localStorage.skills == null) {
      $scope.skills = [

        {
            "name" : "click edit icon to rename",
            "edit" : false,
            "showdetails" : false,
            "has_sub" : true,
            "init_progress" : 0,
            "gen_progress": 0,
            "subcat" : [
                {
                    "name" : "click edit icon to rename also",
                    "edit" : false,
                    "sub_progress" : 0,
                },
                {
                    "name" : "these are subcategories, modify them!",
                    "edit" : false,
                    "sub_progress" : 0,
                },
                {
                    "name" : "Begin your journey! 5 HRS = 1 LVL",
                    "edit" : false,
                    "sub_progress" : 0,
                }
            ],
            "analytics" : {
                "refresh" : true,
            }
        }
      ];
      $localStorage.skills = $scope.skills;
  }
  $scope.skills = $localStorage.skills;

})