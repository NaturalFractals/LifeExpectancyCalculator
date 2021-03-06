define('app',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'utilities/readFile', 'jquery', 'bootstrap'], function (exports, _aureliaFramework, _aureliaFetchClient, _readFile, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _readFile.ReadFile), _dec(_class = function () {
    function App(httpClient, readFile) {
      _classCallCheck(this, App);

      this.httpClient = httpClient;
      this.readFile = readFile;
      this.message = 'Life Expectancy Calculator';
    }

    App.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var data, data2;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.httpClient.fetch('/api/life-expectancy/get.json');

              case 2:
                data = _context.sent;
                _context.next = 5;
                return data.json();

              case 5:
                data2 = _context.sent;

                this.readFile.getStateList(data2);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = "Life Expectancy Calculator";
      config.map([{
        route: ['', 'personalinfo'], moduleId: 'aboutyou/personalinfo',
        name: 'personalinfo', title: 'Personal Info', nav: true
      }, {
        route: 'myhealth', moduleId: 'health/myhealth',
        name: 'myhealth', title: 'My Health', nav: true
      }, {
        route: 'occupation', moduleId: 'occupation/occupation',
        name: 'occupation', title: 'Occupation', nav: true
      }, {
        route: 'results', moduleId: 'results/results',
        name: 'results', title: 'Results', nav: true
      }, {
        route: 'jsonfile', moduleId: 'services/lifeExpectancy.json!json',
        name: 'jsonfile', title: 'Json File', nav: true
      }]);
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('aboutyou/capitalize-converter',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var CapitalizeValueConverter = exports.CapitalizeValueConverter = function () {
        function CapitalizeValueConverter() {
            _classCallCheck(this, CapitalizeValueConverter);
        }

        CapitalizeValueConverter.prototype.toView = function toView(value) {
            return value.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };

        return CapitalizeValueConverter;
    }();
});
define('aboutyou/personalinfo',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../services/data/stateData', 'ion-rangeslider', '../utilities/slider', '../utilities/calculations/calculateResults', '../utilities/calculations/calculateOccupation', '../services/data/occupationData'], function (exports, _aureliaFramework, _aureliaRouter, _user, _stateData, _ionRangeslider, _slider, _calculateResults, _calculateOccupation, _occupationData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.personalinfo = undefined;

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var personalinfo = exports.personalinfo = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _stateData.StateData, _slider.Slider, _calculateResults.CalculateResults, _calculateOccupation.CalculateOccupation, _occupationData.OccupationData), _dec(_class = function () {
        function personalinfo(router, user, stateData, slider, calculateResults, calculateOccupation, occupationData) {
            _classCallCheck(this, personalinfo);

            this.slider = slider;
            this.router = router;
            this.user = user;
            this.stateData = stateData;
            this.calculateResults = calculateResults;
            this.calculateOccupation = calculateOccupation;
            this.occupationData = occupationData;
            if (this.occupationData.laborArray.length == 0) calculateOccupation.loadOccupation();
        }

        personalinfo.prototype.gender = function gender(person) {
            person.checkgender = !person.checkgender;
            person.gender = person.checkgender ? 'Male' : 'Female';
            console.log(person);
        };

        personalinfo.prototype.checkspouse = function checkspouse() {
            this.user.clientPersonalInfo.checkspouse = !this.user.clientPersonalInfo.checkspouse;
        };

        personalinfo.prototype.checkState = function checkState(person) {
            var state = person.state;
            if (state != "Please Select") {
                var self = this;
                person.currentCountyArray = [];
                state = state.toLowerCase();
                var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
                countyWithLifeArrays.forEach(function (data) {
                    var currentCountyInfo = data.split(":");
                    person.currentCountyArray.push(currentCountyInfo[0]);
                });
                person.currentCountyArray.pop();
            } else person.county = "Please Select";
        };

        personalinfo.prototype.checkLifeExpectancy = function checkLifeExpectancy(person) {
            console.log(person);
            if (person.county != "Please Select") {
                var state = person.state;
                state = state.toLowerCase();
                var countyWithLifeArrays = this.stateData.stateToCountyMap.get(state).split(',');
                countyWithLifeArrays.forEach(function (data) {
                    var currentCountyInfo = data.split(":");

                    if (currentCountyInfo[0].indexOf(person.county.trim().toLowerCase()) != -1) {
                        person.countyLifeExpectancy = person.checkgender ? currentCountyInfo[2] : currentCountyInfo[1];
                    }
                });
            }
        };

        personalinfo.prototype.checkMaritalStatus = function checkMaritalStatus(person) {
            if (person.maritalStatus == "Single/Never Married") {
                person.isSingle = true;
                person.isMarried = false;
                person.isWidowed = false;
                person.isDivorced = false;
            } else if (person.maritalStatus == "Married/Cohabitated") {
                person.isMarried = true;
                person.isSingle = false;
                person.isWidowed = false;
                person.isDivorced = false;
            } else if (person.maritalStatus == "Widowed") {
                person.isWidowed = true;
                person.isSingle = false;
                person.isMarried = false;
                person.isDivorced = false;
            } else if (person.maritalStatus == "Divorced") {
                person.isDivorced = true;
                person.isSingle = false;
                person.isMarried = false;
                person.isWidowed = false;
            } else {
                person.isSingle = false;
                person.isMarried = false;
                person.isWidowed = false;
                person.isDivorced = false;
            }
        };

        personalinfo.prototype.myhealth = function myhealth() {
            this.router.navigate('#/myhealth');
        };

        personalinfo.prototype.occupation = function occupation() {
            this.router.navigate('#/occupation');
        };

        personalinfo.prototype.submit = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.user.clientPersonalInfo.education && this.user.clientPersonalInfo.education !== "Please Select") {
                                    this.calculateResults.calculateEducation(this.user.clientPersonalInfo, this.user.clientResults);
                                }
                                this.calculateResults.addExpectancies(this.user.clientResults);

                                console.log("=======CLIENT=======");
                                console.log(this.user.clientPersonalInfo);
                                console.log(this.user.clientResults);

                                if (this.user.clientPersonalInfo.checkspouse) {
                                    if (this.user.spousePersonalInfo.education && this.user.spousePersonalInfo.education !== "Please Select") {
                                        this.calculateResults.calculateEducation(this.user.spousePersonalInfo, this.user.spouseResults);
                                    }
                                    this.calculateResults.addExpectancies(this.user.spouseResults);

                                    console.log("=======SPOUSE=======");
                                    console.log(this.user.spousePersonalInfo);
                                    console.log(this.user.spouseResults);
                                }

                                _context.next = 8;
                                return this.calculateResults.getLifeTableData(this.user.clientPersonalInfo, this.user.clientResults, this.user.spousePersonalInfo, this.user.spouseResults);

                            case 8:

                                this.router.navigate('#/results');

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function submit() {
                return _ref.apply(this, arguments);
            }

            return submit;
        }();

        personalinfo.prototype.attached = function attached() {
            this.slider.createAgeSlider();
        };

        return personalinfo;
    }()) || _class);
});
define('health/myhealth',['exports', 'jquery', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculations/calculateMyHealth', 'jquery-ui-dist'], function (exports, _jquery, _aureliaFramework, _aureliaRouter, _user, _calculateMyHealth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.myhealth = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var myhealth = exports.myhealth = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _calculateMyHealth.CalculateMyHealth), _dec(_class = function () {
        function myhealth(router, user, calculateMyHealth) {
            _classCallCheck(this, myhealth);

            this.formHeightWeight = "";

            this.calculateMyHealth = calculateMyHealth;
            this.router = router;
            this.user = user;
        }

        myhealth.prototype.checkHeight = function checkHeight(person) {
            var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(person.height);
            person.validHeight = valid;
            person.heightError = valid ? "" : "has-error";
            if (valid) {
                var feetAndInches = person.height.split("'");
                person.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
            }

            if (person.validWeight) {
                this.calculateBMI(person);
            }
        };

        myhealth.prototype.calculateBMI = function calculateBMI(person) {
            if (person.validHeight) {
                this.calculateMyHealth.calculateBMI(person);
                person.validBMI = true;
                this.setIconType(person, false);
                person.iconType = "./src/health/images/" + person.iconType + ".jpg";
            }
            person.validWeight = true;
            person.formHeightWeight = true;
        };

        myhealth.prototype.setIconType = function setIconType(person, spouse) {
            switch (true) {
                case person.bmi < 18.5:
                    person.iconType = "underweight";
                    break;
                case person.bmi >= 18.5 && person.bmi < 25:
                    person.iconType = "normal";
                    break;
                case person.bmi >= 25 && person.bmi < 30:
                    person.iconType = "overweight";
                    break;
                case person.bmi > 30 && person.bmi < 35:
                    person.iconType = "obese";
                    break;
                default:
                    person.iconType = "extremely-obese";
                    break;
            }
            return person;
        };

        myhealth.prototype.diabetes = function diabetes(person) {
            person.checkdiabetes = !person.checkdiabetes;
        };

        myhealth.prototype.mental = function mental(person) {
            person.checkmental = !person.checkmental;
        };

        myhealth.prototype.smoking = function smoking(person) {
            person.checksmoking = !person.checksmoking;
        };

        myhealth.prototype.stillSmoking = function stillSmoking(person) {
            person.checkStillSmoking = !person.checkStillSmoking;
        };

        myhealth.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        myhealth.prototype.submit = function submit() {
            var check = true;

            function exerciseCalculations(person, calc, results) {
                if (person.exercisePerWeek && person.exercisePerWeek != "Please Select") {
                    if (person.bmi) {
                        calc.calculateExercise(person);
                        results.exercise = person.exerciseLifeExpectancy;
                    } else {
                        check = false;
                        alert("We need a BMI to factor in your exercise per week");
                    }
                }
            }

            function smokerCalculations(person, calc, results) {
                if (person.checksmoking) {
                    if (person.kindOfSmoker && person.kindOfSmoker != "Please Select") {
                        if (person.checkStillSmoking) {
                            calc.calculateSmoker(person);
                            results.smoker = person.smokerLifeExpectancy;
                        }
                    } else {
                        check = false;
                        alert("Enter what kind of smoker you are");
                    }

                    if (!person.checkStillSmoking && person.ageQuitSmoking && person.ageQuitSmoking != "Please Select") {
                        calc.calculateSmoker(person);
                        results.smoker = person.smokerLifeExpectancy;
                    } else if (!person.checkStillSmoking && (person.ageQuitSmoking || person.ageQuitSmoking != "Please Select")) {
                        check = false;
                        alert("Enter what age you quit smoking");
                    }
                }
            }

            exerciseCalculations(this.user.clientMyHealth, this.calculateMyHealth, this.user.clientResults);
            smokerCalculations(this.user.clientMyHealth, this.calculateMyHealth, this.user.clientResults);
            this.calculateMyHealth.calculateHealthRank(this.user.clientMyHealth, this.user.clientResults);
            this.calculateMyHealth.calculateMentalHealth(this.user.clientMyHealth, this.user.clientResults);
            this.calculateMyHealth.calculateAgeOfParents(this.user.clientMyHealth, this.user.clientResults, this.user.clientPersonalInfo.gender);
            this.calculateMyHealth.calculateAlcoholConsumption(this.user.clientMyHealth, this.user.clientPersonalInfo, this.user.clientResults);
            console.log(this.user.clientMyHealth);

            if (this.user.clientPersonalInfo.checkspouse) {
                exerciseCalculations(this.user.spouseMyHealth, this.calculateMyHealth, this.user.spouseResults);
                smokerCalculations(this.user.spouseMyHealth, this.calculateMyHealth, this.user.spouseResults);
                this.calculateMyHealth.calculateHealthRank(this.user.spouseMyHealth, this.user.spouseResults);
                this.calculateMyHealth.calculateMentalHealth(this.user.spouseMyHealth, this.user.spouseResults);
                this.calculateMyHealth.calculateAgeOfParents(this.user.spouseMyHealth, this.user.spouseResults, this.user.clientPersonalInfo.gender);
                this.calculateMyHealth.calculateAlcoholConsumption(this.user.spouseMyHealth, this.user.spouseMyHealth, this.user.spouseResults);
                console.log(this.user.spouseMyHealth);
            }

            if (check) this.router.navigate('#/personalinfo');
        };

        myhealth.prototype.attached = function attached() {
            (0, _jquery2.default)('#height-tooltip').tooltip({
                content: "Your height is used to calculate your <b>Body Mass Index (BMI)</b>."
            });

            (0, _jquery2.default)('#weight-tooltip').tooltip({
                content: "Your weight is used to calculate your <b>Body Mass Index (BMI)</b>."
            });

            (0, _jquery2.default)('#exercise-tooltip').tooltip({
                content: "For every 1 minute of exercise, you get 7 minutes of extra life.<br><b>- National Institute of Health</b>"
            });

            (0, _jquery2.default)('#health-rank-tooltip').tooltip({
                content: "How you view your health impacts your life expectancy."
            });

            (0, _jquery2.default)('#mental-tooltip').tooltip({
                content: "The serious mental conditions we account for include:<br>" + "<b>Bipolar Disorder</b>, <br>" + "<b>Schizophrenia</b>, <br>" + "<b>Drug & Alcohol Abuse</b>, <br>" + "<b>Recurrent Depression</b>."
            });

            (0, _jquery2.default)('#spouse-height-tooltip').tooltip({
                content: "Your height is used to calculate your <b>Body Mass Index (BMI)</b>."
            });

            (0, _jquery2.default)('#spouse-weight-tooltip').tooltip({
                content: "Your weight is used to calculate your <b>Body Mass Index (BMI)</b>."
            });

            (0, _jquery2.default)('#spouse-exercise-tooltip').tooltip({
                content: "For every 1 minute of exercise, you get 7 minutes of extra life.<br><b>- National Institute of Health</b>"
            });

            (0, _jquery2.default)('#spouse-health-rank-tooltip').tooltip({
                content: "How you view your health impacts your life expectancy."
            });

            (0, _jquery2.default)('#spouse-mental-tooltip').tooltip({
                content: "The serious mental conditions we account for include:<br>" + "<b>Bipolar Disorder</b>, <br>" + "<b>Schizophrenia</b>, <br>" + "<b>Drug & Alcohol Abuse</b>, <br>" + "<b>Recurrent Depression</b>."
            });
        };

        return myhealth;
    }()) || _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/user',['exports', 'aurelia-framework', '../services/data/personalInfoData', '../services/data/myHealthData', '../services/data/occupationData', '../services/data/resultsData'], function (exports, _aureliaFramework, _personalInfoData, _myHealthData, _occupationData, _resultsData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.User = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var User = exports.User = (_dec = (0, _aureliaFramework.singleton)(), _dec(_class = function User() {
        _classCallCheck(this, User);

        this.clientPersonalInfo = new _personalInfoData.PersonalInfoData();
        this.spousePersonalInfo = new _personalInfoData.PersonalInfoData();

        this.clientMyHealth = new _myHealthData.MyHealthData();
        this.spouseMyHealth = new _myHealthData.MyHealthData();

        this.clientOccupation = new _occupationData.OccupationData();
        this.spouseOccupation = new _occupationData.OccupationData();

        this.clientResults = new _resultsData.ResultsData();
        this.spouseResults = new _resultsData.ResultsData();
    }) || _class);
});
define('occupation/occupation',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/calculations/calculateOccupation', '../services/data/occupationData'], function (exports, _aureliaFramework, _aureliaRouter, _user, _calculateOccupation, _occupationData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.occupation = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var occupation = exports.occupation = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _calculateOccupation.CalculateOccupation, _occupationData.OccupationData), _dec(_class = function () {
        function occupation(router, user, calculateOccupation, occupationData) {
            _classCallCheck(this, occupation);

            this.router = router;
            this.user = user;
            this.calculateOccupation = calculateOccupation;
            this.occupationData = occupationData;
            this.occupationData.currentJobArray = this.occupationData.laborArray;
        }

        occupation.prototype.allowDrop = function allowDrop(ev) {
            ev.preventDefault();
        };

        occupation.prototype.drag = function drag(ev) {
            ev.dataTransfer.setData("tonberry", ev.target.innerText);
            ev.dataTransfer.setData("occu-name", ev.srcElement.textContent);
            return true;
        };

        occupation.prototype.removeDrop = function removeDrop(ev) {
            ev.dataTransfer.set;
        };

        occupation.prototype.drop = function drop(ev) {
            ev.preventDefault();
            if (ev.target.id === "spouse-drop-box") {
                this.user.spouseOccupation.occupationArray.push(ev.dataTransfer.getData("occu-name"));
                var index = this.occupationData.currentJobArray.indexOf(ev.dataTransfer.getData("occu-name"));
                this.occupationData.currentJobArray.splice(index, 1);
            }
            if (ev.target.id === "drop-box") {
                this.user.clientOccupation.occupationArray.push(ev.dataTransfer.getData("occu-name"));
                var index = this.occupationData.currentJobArray.indexOf(ev.dataTransfer.getData("occu-name"));
                this.occupationData.currentJobArray.splice(index, 1);
            }
            var current;
            var data = ev.dataTransfer.getData("tonberry");
            var elements = document.getElementsByClassName("current-buttons");
            var occupationName;
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].textContent.trim() === data.trim()) {
                    current = elements[i];
                    occupationName = elements[i].textContent.trim();
                }
            }
            ev.currentTarget.appendChild(current);
        };

        occupation.prototype.income = function income(person) {
            person.checkincome = !person.checkincome;
        };

        occupation.prototype.checkOccupation = function checkOccupation(person, occupationName) {
            person.type = occupationName.type;
            switch (true) {
                case occupationName.type.trim() === "Skilled/Unskilled":
                    this.occupationData.currentJobArray = this.occupationData.laborArray;
                    break;
                case occupationName.type.trim() === "Industry":
                    this.occupationData.currentJobArray = this.occupationData.industryArray;
                    break;
                case occupationName.type.trim() === "Public Service":
                    this.occupationData.currentJobArray = this.occupationData.publicServiceArray;
                    break;
                case occupationName.type.trim() === "Management":
                    this.occupationData.currentJobArray = this.occupationData.managementArray;
                    break;
            }
        };

        occupation.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        occupation.prototype.submit = function submit() {
            var check = true;
            if (this.user.clientOccupation.occupationArray.length != 0) this.calculateOccupation.calculationOccupation(this.user.clientOccupation);
            if (this.user.spouseOccupation.occupationArray.length != 0) this.calculateOccupation.calculationOccupation(this.user.spouseOccupation);
            if (this.user.clientOccupation.checkincome) {
                if (!isNaN(this.user.clientOccupation.income)) {
                    this.calculateOccupation.calculateIncome(this.user.clientOccupation, this.user.clientPersonalInfo.gender, this.user.clientResults);
                } else {
                    check = false;
                    alert('Enter a valid income');
                }
            }

            if (this.user.clientPersonalInfo.checkspouse) {
                if (this.user.spouseOccupation.checkincome) {
                    if (!isNaN(this.user.spouseOccupation.income)) {
                        this.calculateOccupation.calculateIncome(this.user.spouseOccupation, this.user.spousePersonalInfo.gender, this.user.spouseResults);
                    } else {
                        check = false;
                        alert('Enter a valid income');
                    }
                }
            }

            if (check) this.router.navigate('#/personalinfo');
        };

        return occupation;
    }()) || _class);
});
define('results/results',['exports', 'aurelia-framework', 'aurelia-router', '../services/user', '../utilities/chart', '../utilities/calculations/calculateResults', '../utilities/slider'], function (exports, _aureliaFramework, _aureliaRouter, _user, _chart, _calculateResults, _slider) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.results = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var results = exports.results = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _user.User, _chart.Chart, _calculateResults.CalculateResults, _slider.Slider), _dec(_class = function () {
        function results(router, user, chart, calculateResults, slider) {
            _classCallCheck(this, results);

            this.router = router;
            this.user = user;
            this.chart = chart;
            this.calculateResults = calculateResults;
            this.slider = slider;
        }

        results.prototype.checkSpouseDeath = function checkSpouseDeath(person) {
            person.checkSpouseDeath = !person.checkSpouseDeath;
        };

        results.prototype.spouseDies = function spouseDies(person) {
            console.log(person.spouseDeath);
        };

        results.prototype.attached = function attached() {
            this.slider.createSpouseDiesSlider();
            console.log(this.user.clientResults.clientTableAge);
            var chartTuples = [];
            if (this.user.clientPersonalInfo.checkspouse) {
                chartTuples = [{
                    name: 'Client',
                    data: this.user.clientResults.clientTuples
                }, {
                    name: 'Co-client',
                    data: this.user.spouseResults.spouseTuples
                }, {
                    name: 'Average',
                    data: this.user.clientResults.averageTuples
                }];
            } else {
                chartTuples = [{
                    name: 'Client',
                    data: this.user.clientResults.clientTuples
                }, {
                    name: 'Average',
                    data: this.user.clientResults.averageTuples
                }];
            }

            this.chart.createChart('chart-container', this.user.clientPersonalInfo.age, chartTuples);
        };

        results.prototype.back = function back() {
            this.router.navigate('#/personalinfo');
        };

        return results;
    }()) || _class);
});
define('utilities/chart',['exports', 'aurelia-framework', 'highcharts', '../services/user'], function (exports, _aureliaFramework, _highcharts, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Chart = undefined;

    var HighCharts = _interopRequireWildcard(_highcharts);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Chart = exports.Chart = (_dec = (0, _aureliaFramework.inject)(_user.User), _dec(_class = function () {
        function Chart(user) {
            _classCallCheck(this, Chart);

            this.user = user;
        }

        Chart.prototype.createChart = function createChart(containerID, age, chartTuples) {
            Highcharts.chart(containerID, {
                title: {
                    text: 'Life Expectancy'
                },
                xAxis: {
                    title: {
                        text: 'Age'
                    }
                },
                plotOptions: {
                    series: {
                        pointStart: age
                    }
                },
                yAxis: {
                    title: {
                        text: 'Chance of Living'
                    }
                },
                series: chartTuples
            });
        };

        return Chart;
    }()) || _class);
});
define('utilities/readFile',['exports', 'aurelia-framework', '../services/data/stateData', '../services/data/occupationData', '../services/data/myHealthData'], function (exports, _aureliaFramework, _stateData, _occupationData, _myHealthData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ReadFile = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var ReadFile = exports.ReadFile = (_dec = (0, _aureliaFramework.inject)(_stateData.StateData, _occupationData.OccupationData, _myHealthData.MyHealthData), _dec(_class = function () {
        function ReadFile(stateData, occupationData, myHealthData) {
            _classCallCheck(this, ReadFile);

            this.stateData = stateData;
            this.occupationData = occupationData;
            this.myHealthData = myHealthData;
        }

        ReadFile.prototype.getStateList = function getStateList(jsonData) {
            var self = this;
            jsonData.forEach(function (stateObject) {
                self.stateData.stateSet.add(stateObject.State.toLowerCase());
            });
            this.getCountyList(jsonData);
        };

        ReadFile.prototype.getCountyList = function getCountyList(jsonData) {
            var self = this;
            jsonData.forEach(function (stateObject) {
                if (self.stateData.stateToCountyMap.has(stateObject.State.toLowerCase())) {
                    var existingValues = self.stateData.stateToCountyMap.get(stateObject.State.toLowerCase());

                    existingValues += " " + stateObject.County.toLowerCase() + ":" + stateObject.Male + ":" + stateObject.Female + ",";
                    self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), existingValues);
                } else self.stateData.stateToCountyMap.set(stateObject.State.toLowerCase(), stateObject.County.toLowerCase() + ":" + stateObject.Male + ":" + stateObject.Female + ",");
            });
        };

        ReadFile.prototype.getCategoryList = function getCategoryList(jsonData) {
            var self = this;
            jsonData.forEach(function (jobObject) {
                self.occupationData.occupationCategorySet.add(jobObject.Category);
                var existingValues = self.occupationData.categoryToJobMap.get(jobObject.Category);
                if (existingValues === undefined) existingValues = "";
                existingValues += " " + jobObject.Occupation + ":";
                self.occupationData.categoryToJobMap.set(jobObject.Category, existingValues);
            });
        };

        ReadFile.prototype.getOccupationDeathNumber = function getOccupationDeathNumber(jsonData, arrayOccupations) {
            var self = this;
            var deathTotal = 0;
            jsonData.forEach(function (jobObject) {
                arrayOccupations.forEach(function (userOccupation) {
                    if (userOccupation.trim() === jobObject.Occupation.trim()) {
                        deathTotal += parseInt(jobObject.Deaths);
                    }
                });
            });
            return deathTotal;
        };

        ReadFile.prototype.getAlcoholConsumption = function getAlcoholConsumption(person, jsonData, jsonValue) {
            var self = this;
            jsonData.forEach(function (weekObject) {
                if (weekObject.Consumption === jsonValue) {
                    console.log(weekObject.Consumption);
                    console.log(weekObject.Years);
                    person.alcoholConsumptionImpact = parseFloat(weekObject.Years);
                }
            });
        };

        return ReadFile;
    }()) || _class);
});
define('utilities/slider',['exports', 'aurelia-framework', '../services/user', 'ion-rangeslider', '../utilities/calculations/calculateResults'], function (exports, _aureliaFramework, _user, _ionRangeslider, _calculateResults) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Slider = undefined;

    var ionRangeSlider = _interopRequireWildcard(_ionRangeslider);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Slider = exports.Slider = (_dec = (0, _aureliaFramework.inject)(_user.User, _calculateResults.CalculateResults), _dec(_class = function () {
        function Slider(user, calculateResults) {
            _classCallCheck(this, Slider);

            this.user = user;
            this.calculateResults = calculateResults;
        }

        Slider.prototype.createAgeSlider = function createAgeSlider() {
            var _this = this;

            $("#age").ionRangeSlider({
                grid: true,
                min: 0,
                max: 100,
                from: this.user.clientPersonalInfo.age,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.user.clientPersonalInfo.age = data.from;
                }
            });

            $("#spouseage").ionRangeSlider({
                grid: true,
                min: 0,
                max: 100,
                from: this.user.spousePersonalInfo.age,
                step: 1,
                onFinish: function onFinish(data) {
                    _this.user.spousePersonalInfo.age = data.from;
                }
            });
        };

        Slider.prototype.createSpouseDiesSlider = function createSpouseDiesSlider() {
            var _this2 = this;

            $("#spouseDies").ionRangeSlider({
                grid: true,
                min: this.user.spousePersonalInfo.age,
                max: 100,
                from: this.user.spousePersonalInfo.age + 20,
                step: 1,
                onFinish: function onFinish(data) {
                    _this2.user.clientResults.spouseDeath = data.from;
                    _this2.calculateResults.calculateSpouseDiesEarly(_this2.user.clientPersonalInfo, _this2.user.clientResults, _this2.user.spousePersonalInfo, _this2.user.spouseResults);
                }
            });
        };

        return Slider;
    }()) || _class);
});
define('services/data/myHealthData',["exports"], function (exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var MyHealthData = exports.MyHealthData = function MyHealthData() {
                _classCallCheck(this, MyHealthData);

                this.height;
                this.heightInInches;
                this.weight;
                this.bmi;
                this.formHeightWeight = false;
                this.exerciseLifeExpectancy = 0;

                this.validHeight = false;
                this.validWeight = false;
                this.validBMI = false;
                this.iconType = "underweight";
                this.heightError = "";

                this.exercisePerWeek;
                this.healthRank;
                this.checkdiabetes = false;
                this.checkmental = false;
                this.alcoholPerWeek;
                this.alcoholConsumptionImpact = 0;

                this.checksmoking = false;
                this.checkStillSmoking = true;
                this.kindOfSmoker;
                this.ageQuitSmoking;
                this.smokerLifeExpectancy = 0;

                this.ageOfParents;
        };
});
define('services/data/occupationData',['exports'], function (exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
                value: true
        });

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var OccupationData = exports.OccupationData = function OccupationData() {
                _classCallCheck(this, OccupationData);

                this.checkincome = false;
                this.income = 0;
                this.incomeLifeExpectancy = 0;

                this.occupationType = ['Skilled/Unskilled', 'Industry', 'Public Service', 'Management'];
                this.type = 'Skilled/Unskilled';

                this.occupationCategorySet = new Set();
                this.categoryToJobMap = new Map();
                this.occupationChangeInLifeExpectancy = 0;

                this.laborArray = [];
                this.industryArray = [];
                this.publicServiceArray = [];
                this.managementArray = [];
                this.currentJobArray = [];

                this.occupationArray = [];
        };
});
define('services/data/personalInfoData',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.PersonalInfoData = undefined;

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var _dec, _class;

        var PersonalInfoData = exports.PersonalInfoData = (_dec = (0, _aureliaFramework.transient)(), _dec(_class = function PersonalInfoData() {
                _classCallCheck(this, PersonalInfoData);

                this.checkspouse = false;

                this.age = 30;
                this.checkgender = true;
                this.gender = 'male';

                this.education;
                this.race = 'white';

                this.maritalStatus;
                this.isSingle = false;
                this.isMarried = false;
                this.yearsOfMarriage = 0;
                this.isWidowed = false;
                this.yearsSinceSpousePassing = 0;
                this.isDivorced = false;
                this.yearsOfDivorce = 0;

                this.state = "Please Select";
                this.county = 'Please Select';
                this.countyLifeExpectancy;
                this.expectedYearsLeft;

                this.currentCountyArray = [];
        }) || _class);
});
define('services/data/resultsData',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
                value: true
        });
        exports.ResultsData = undefined;

        function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                        throw new TypeError("Cannot call a class as a function");
                }
        }

        var _dec, _class;

        var ResultsData = exports.ResultsData = (_dec = (0, _aureliaFramework.transient)(), _dec(_class = function ResultsData() {
                _classCallCheck(this, ResultsData);

                this.checkSpouseDeath = false;
                this.spouseDeath;

                this.education = 0;
                this.marital = 0;
                this.county = 0;

                this.exercise = 0;
                this.smoker = 0;
                this.healthrank = 0;
                this.diabetes = 0;
                this.mental = 0;
                this.parentAges = 0;
                this.alcohol = 0;

                this.income = 0;

                this.overallLifeExpectancy = 0;

                this.clientTuples = [];
                this.clientTableAge = [];
                this.clientTableValue = [];

                this.spouseTuples = [];
                this.spouseTableAge = [];
                this.spouseTableValue = [];

                this.averageTuples = [];
                this.averageTableAge = [];
                this.averageTableValue = [];

                this.finalLifeExpectancy = 0;
        }) || _class);
});
define('services/data/stateData',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var StateData = exports.StateData = function StateData() {
        _classCallCheck(this, StateData);

        this.stateSet = new Set();
        this.stateToCountyMap = new Map();
    };
});
define('utilities/calculations/calculateMyHealth',['exports', 'aurelia-framework', 'aurelia-fetch-client', '../../services/user', '../readFile'], function (exports, _aureliaFramework, _aureliaFetchClient, _user, _readFile) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CalculateMyHealth = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CalculateMyHealth = exports.CalculateMyHealth = (_dec = (0, _aureliaFramework.inject)(_user.User, _readFile.ReadFile, _aureliaFetchClient.HttpClient), _dec(_class = function () {
        function CalculateMyHealth(user, readFile, httpClient) {
            _classCallCheck(this, CalculateMyHealth);

            this.user = user;
            this.readFile = readFile;
            this.httpClient = httpClient;
        }

        CalculateMyHealth.prototype.calculateBMI = function calculateBMI(person) {
            var metricWeight = person.weight * 0.45;
            var metricHeight = person.heightInInches * 0.025;
            var metricHeightSquared = metricHeight * metricHeight;
            person.bmi = (metricWeight / metricHeightSquared).toPrecision(4);
        };

        CalculateMyHealth.prototype.calculateExercise = function calculateExercise(person) {
            var exerciseLifeExpectancy = 0;

            if (person.exercisePerWeek) {
                var bmi = person.bmi;

                if (person.exercisePerWeek.indexOf("0") !== -1) {
                    exerciseLifeExpectancy = 0;
                    if (bmi >= 18.5 && bmi < 25) exerciseLifeExpectancy -= 4.7;else if (bmi >= 25 && bmi < 30) exerciseLifeExpectancy -= 3.9;else if (bmi >= 30 && bmi < 35) exerciseLifeExpectancy -= 5.0;else if (bmi >= 35) exerciseLifeExpectancy -= 7.2;
                } else if (person.exercisePerWeek.indexOf("Less") !== -1) {
                    exerciseLifeExpectancy = 1.8;
                    if (bmi >= 18.5 && bmi <= 24.9) exerciseLifeExpectancy -= 2.4;else if (bmi >= 25 && bmi < 30) exerciseLifeExpectancy -= 1.8;else if (bmi >= 30 && bmi < 35) exerciseLifeExpectancy -= 3.2;else if (bmi >= 35) exerciseLifeExpectancy -= 6.2;
                } else if (person.exercisePerWeek.indexOf("Approximately") !== -1) {
                    exerciseLifeExpectancy = 3.4;
                    if (bmi >= 18.5 && bmi <= 24.9) exerciseLifeExpectancy -= 0;else if (bmi >= 25 && bmi < 30) exerciseLifeExpectancy -= 0;else if (bmi >= 30 && bmi < 35) exerciseLifeExpectancy -= 1.6;else if (bmi >= 35) exerciseLifeExpectancy -= 4.5;
                } else if (person.exercisePerWeek.indexOf("More") !== -1) {
                    exerciseLifeExpectancy = 4.5;
                    if (bmi >= 18.5 && bmi <= 24.9) exerciseLifeExpectancy -= 0;else if (bmi >= 25 && bmi < 30) exerciseLifeExpectancy -= 0;else if (bmi >= 30 && bmi < 35) exerciseLifeExpectancy -= 1.6;else if (bmi >= 35) exerciseLifeExpectancy -= 4.5;
                }
            }
            person.exerciseLifeExpectancy = exerciseLifeExpectancy;
        };

        CalculateMyHealth.prototype.calculateHealthRank = function calculateHealthRank(person, personResults) {
            if (person.healthRank == "I'm in great health") personResults.healthrank = 3.8;else if (person.healthRank == "I'm in poor health") personResults.healthrank = -3.8;else personResults.healthRank = 0;
        };

        CalculateMyHealth.prototype.calculateSmoker = function calculateSmoker(person) {
            var smokerLifeExpectancy = 0;
            var stillSmoking = person.checkStillSmoking;
            var kindOfSmoker = person.kindOfSmoker;

            if (kindOfSmoker.indexOf("Light") !== -1) {
                smokerLifeExpectancy = -4.8;

                if (!stillSmoking) {
                    var age = person.ageQuitSmoking;
                    if (age.indexOf("25") !== -1) smokerLifeExpectancy += 4.8;else if (age.indexOf("35") !== -1) smokerLifeExpectancy += 4.8;else if (age.indexOf("45") !== -1) smokerLifeExpectancy += 4.8;else if (age.indexOf("60") !== -1) smokerLifeExpectancy += 3;
                }
            } else if (kindOfSmoker.indexOf("Average") !== -1) {
                smokerLifeExpectancy -= 6.8;

                if (!stillSmoking) {
                    var age = person.ageQuitSmoking;
                    if (age.indexOf("25") !== -1) smokerLifeExpectancy += 6.8;else if (age.indexOf("35") !== -1) smokerLifeExpectancy += 6.8;else if (age.indexOf("45") !== -1) smokerLifeExpectancy += 6;else if (age.indexOf("60") !== -1) smokerLifeExpectancy += 3;
                }
            } else if (kindOfSmoker.indexOf("Heavy") !== -1) {
                smokerLifeExpectancy -= 8.8;

                if (!stillSmoking) {
                    var age = person.ageQuitSmoking;
                    if (age.indexOf("25") !== -1) smokerLifeExpectancy += 8.8;else if (age.indexOf("35") !== -1) smokerLifeExpectancy += 8.8;else if (age.indexOf("45") !== -1) smokerLifeExpectancy += 6;else if (age.indexOf("60") !== -1) smokerLifeExpectancy += 3;
                }
            }
            person.smokerLifeExpectancy = smokerLifeExpectancy;
        };

        CalculateMyHealth.prototype.calculateMentalHealth = function calculateMentalHealth(person, personResults) {
            if (person.checkmental) {
                personResults.mental = -9;
            } else {
                personResults.mental = 0;
            }
        };

        CalculateMyHealth.prototype.calculateAgeOfParents = function calculateAgeOfParents(person, personResults, gender) {
            var parentAges = 0;
            if (person.ageOfParents == "Both after the age of 75" || person.ageOfParents == "They are both still alive and older than 75") {
                if (gender == "Male" || gender == 'male') parentAges += 4.2;else if (gender == "Female") parentAges += 3.5;
            } else if (person.ageOfParents == "Both before the age of 75") {
                if (gender == "Male" || gender == 'male') parentAges -= 4.2;else if (gender == "Female") parentAges -= 3.5;
            }

            personResults.parentAges = parentAges;
        };

        CalculateMyHealth.prototype.calculateAlcoholConsumption = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(personHealth, personInfo, personResults) {
                var jsonName, alcohol, jsonValueToSearch, jsonData, json;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                jsonName = personInfo.race.toLowerCase() + "-" + personInfo.gender + ".json";
                                alcohol = personHealth.alcoholPerWeek;
                                _context.t0 = true;
                                _context.next = _context.t0 === (alcohol === '8 or more') ? 5 : _context.t0 === (alcohol === 'Less than 2') ? 7 : _context.t0 === (alcohol === 'Between 2 and 7') ? 9 : 11;
                                break;

                            case 5:
                                jsonValueToSearch = 'more than 8 drinks';
                                return _context.abrupt('break', 13);

                            case 7:
                                jsonValueToSearch = 'less than 2 drinks';
                                return _context.abrupt('break', 13);

                            case 9:
                                jsonValueToSearch = 'between 2 and 7 drinks';
                                return _context.abrupt('break', 13);

                            case 11:
                                jsonValueToSearch = 'None';
                                return _context.abrupt('break', 13);

                            case 13:
                                _context.next = 15;
                                return this.httpClient.fetch('/api/alcohol-table/' + jsonName);

                            case 15:
                                jsonData = _context.sent;
                                _context.next = 18;
                                return jsonData.json();

                            case 18:
                                json = _context.sent;

                                this.readFile.getAlcoholConsumption(personHealth, json, jsonValueToSearch);

                                personResults.alcohol = personHealth.alcoholConsumptionImpact;

                            case 21:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function calculateAlcoholConsumption(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return calculateAlcoholConsumption;
        }();

        return CalculateMyHealth;
    }()) || _class);
});
define('utilities/calculations/calculateOccupation',['exports', 'aurelia-framework', '../../services/user', 'aurelia-fetch-client', 'utilities/readFile', '../../services/data/occupationData'], function (exports, _aureliaFramework, _user, _aureliaFetchClient, _readFile, _occupationData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CalculateOccupation = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CalculateOccupation = exports.CalculateOccupation = (_dec = (0, _aureliaFramework.inject)(_user.User, _aureliaFetchClient.HttpClient, _readFile.ReadFile, _occupationData.OccupationData), _dec(_class = function () {
        function CalculateOccupation(user, httpClient, readFile, occupationData) {
            _classCallCheck(this, CalculateOccupation);

            this.user = user;
            this.httpClient = httpClient;
            this.readFile = readFile;
            this.occupationData = occupationData;
        }

        CalculateOccupation.prototype.calculateIncome = function calculateIncome(person, gender, results) {
            var incomeLifeExpectancy = 0;

            if (person.checkincome) {
                if (parseFloat(person.income) >= 188996) {
                    if (gender == "male" || gender == "Male") incomeLifeExpectancy += 2.34;else if (gender == "Female") incomeLifeExpectancy += 2.91;
                } else {
                    if (gender == "male" || gender == "Male") incomeLifeExpectancy += 0.32;else if (gender == "Female") incomeLifeExpectancy += 0.04;
                }
            }

            person.incomeLifeExpectancy = incomeLifeExpectancy;
            results.income = incomeLifeExpectancy;
        };

        CalculateOccupation.prototype.loadOccupation = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
                var data, loadedData;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.httpClient.fetch('/api/occupation-table/occupation.json');

                            case 2:
                                data = _context.sent;
                                _context.next = 5;
                                return data.json();

                            case 5:
                                loadedData = _context.sent;

                                this.readFile.getCategoryList(loadedData);
                                this.createJobArrays("Manual Labor");
                                this.createJobArrays("Industry");
                                this.createJobArrays("Public Service");
                                this.createJobArrays("Management");

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function loadOccupation() {
                return _ref.apply(this, arguments);
            }

            return loadOccupation;
        }();

        CalculateOccupation.prototype.calculationOccupation = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(person) {
                var data, loadedData;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.httpClient.fetch('/api/occupation-table/occupation.json');

                            case 2:
                                data = _context2.sent;
                                _context2.next = 5;
                                return data.json();

                            case 5:
                                loadedData = _context2.sent;

                                person.occupationChangeInLifeExpectancy = this.readFile.getOccupationDeathNumber(loadedData, person.occupationArray);

                            case 7:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function calculationOccupation(_x) {
                return _ref2.apply(this, arguments);
            }

            return calculationOccupation;
        }();

        CalculateOccupation.prototype.createJobArrays = function createJobArrays(type) {
            var currentArray = [];
            var listToArray = this.occupationData.categoryToJobMap.get(type).split(":");
            listToArray.forEach(function (job) {
                currentArray.push(job);
            });

            currentArray.pop();
            switch (true) {
                case type === 'Manual Labor':
                    this.occupationData.laborArray = currentArray;
                    break;
                case type === 'Industry':
                    this.occupationData.industryArray = currentArray;
                    break;
                case type === 'Public Service':
                    this.occupationData.publicServiceArray = currentArray;
                    break;
                case type === 'Management':
                    this.occupationData.managementArray = currentArray;
                    break;
            }
        };

        return CalculateOccupation;
    }()) || _class);
});
define('utilities/calculations/calculateResults',['exports', 'aurelia-framework', 'aurelia-fetch-client', '../../services/user'], function (exports, _aureliaFramework, _aureliaFetchClient, _user) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.CalculateResults = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var CalculateResults = exports.CalculateResults = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _user.User), _dec(_class = function () {
        function CalculateResults(httpClient, user) {
            _classCallCheck(this, CalculateResults);

            this.httpClient = httpClient;
            this.user = user;
        }

        CalculateResults.prototype.getLifeTableData = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(client, clientResults, spouse, spouseResults) {
                var clientEthnicityExpectancy, clientResultsData, spouseResultsData, spouseEthnicityExpectancy;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.httpClient.fetch('/api/life-table/' + client.race.toLowerCase() + '-' + client.gender.toLowerCase() + '.json');

                            case 2:
                                clientEthnicityExpectancy = _context.sent;
                                _context.next = 5;
                                return clientEthnicityExpectancy.json();

                            case 5:
                                clientResultsData = _context.sent;

                                this.setUserExpectedAge(clientResultsData, client);

                                if (!this.user.clientMyHealth.checkdiabetes) {
                                    _context.next = 10;
                                    break;
                                }

                                _context.next = 10;
                                return this.calculateDiabetes(clientResultsData, client, clientResults);

                            case 10:
                                _context.next = 12;
                                return this.calculateCounty(clientResultsData, client, clientResults);

                            case 12:
                                if (!client.checkspouse) {
                                    _context.next = 25;
                                    break;
                                }

                                _context.next = 15;
                                return this.httpClient.fetch('/api/life-table/' + spouse.race.toLowerCase() + '-' + spouse.gender.toLowerCase() + '.json');

                            case 15:
                                spouseEthnicityExpectancy = _context.sent;
                                _context.next = 18;
                                return spouseEthnicityExpectancy.json();

                            case 18:
                                spouseResultsData = _context.sent;

                                this.setUserExpectedAge(spouseResultsData, spouse);

                                if (!this.user.spouseMyHealth.checkdiabetes) {
                                    _context.next = 23;
                                    break;
                                }

                                _context.next = 23;
                                return this.calculateDiabetes(spouseResultsData, spouse, spouseResults);

                            case 23:
                                _context.next = 25;
                                return this.calculateCounty(spouseResultsData, spouse, spouseResults);

                            case 25:

                                this.getTestTuples(clientResultsData, client, clientResults, spouseResultsData, spouse, spouseResults);

                            case 26:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getLifeTableData(_x, _x2, _x3, _x4) {
                return _ref.apply(this, arguments);
            }

            return getLifeTableData;
        }();

        CalculateResults.prototype.setUserExpectedAge = function setUserExpectedAge(data, person) {
            data.forEach(function (value) {
                var currentAgeArray = [];
                currentAgeArray[0] = parseInt(value.Age.slice(0, 2));
                currentAgeArray[1] = parseInt(value.Age.slice(3, 5));
                if ((currentAgeArray[0] === person.age || currentAgeArray[1] === person.age) && person.age <= currentAgeArray[0]) {
                    person.expectedYearsLeft = parseInt(value.Number);
                }
            });
        };

        CalculateResults.prototype.calculateDiabetes = function calculateDiabetes(personResultsData, person, personResults) {
            var self = this;
            var age;
            var check50 = true;

            personResultsData.forEach(function (value, i) {
                if (i > 0) {
                    var initialValue = parseInt(personResultsData[person.age].Number);
                    var less = parseFloat(personResultsData[i].Number);
                    var more = parseFloat(personResultsData[i - 1].Number);

                    if (check50) {
                        if (self.getPercent(initialValue, less, more, .50) != false) {
                            var number = self.getPercent(initialValue, less, more, .50);
                            age = parseInt(personResultsData[i - 1].Age) + number;
                            check50 = false;
                        }
                    }
                }
            });

            personResults.diabetes = 0;

            if (age < 70) personResults.diabetes = 5.4;else if (age >= 70 && age < 80) personResults.diabetes = 4.0;else if (age >= 80 && age < 90) personResults.diabetes = 2.5;else if (age >= 90 && age < 100) personResults.diabetes = 1.0;else if (age >= 100) personResults.diabetes = 0;

            personResults.overallLifeExpectancy -= personResults.diabetes;
        };

        CalculateResults.prototype.calculateCounty = function calculateCounty(personResultsData, person, personResults) {
            var self = this;
            var age;
            var check50 = true;

            personResultsData.forEach(function (value, i) {
                if (i > 0) {
                    var initialValue = parseInt(personResultsData[person.age].Number);
                    var less = parseFloat(personResultsData[i].Number);
                    var more = parseFloat(personResultsData[i - 1].Number);

                    if (check50) {
                        if (self.getPercent(initialValue, less, more, .50) != false) {
                            var number = self.getPercent(initialValue, less, more, .50);
                            age = parseInt(personResultsData[i - 1].Age) + number;
                            check50 = false;
                        }
                    }
                }
            });

            var county = parseFloat(person.countyLifeExpectancy);
            personResults.county = county - (county + age) / 2;
            if (isNaN(personResults.county)) personResults.county = 0;

            personResults.overallLifeExpectancy += personResults.county;
        };

        CalculateResults.prototype.calculateEducation = function calculateEducation(person, results) {
            var educationLifeExpectancy = 0;
            var education = person.education;
            if (education.indexOf("Didn't") !== -1) {
                if (person.gender == 'Male' || person.gender == 'male') educationLifeExpectancy -= 2;else if (person.gender == 'Female') educationLifeExpectancy -= 0.4;
            }
            if (education.indexOf("trade school") !== -1) {
                if (person.gender == 'Male' || person.gender == 'male') educationLifeExpectancy -= 0.4;else if (person.gender == 'Female') educationLifeExpectancy += 0.25;
            }
            if (education.indexOf("college") !== -1) {
                if (person.gender == 'Male' || person.gender == 'male') educationLifeExpectancy += 3;else if (person.gender == 'Female') educationLifeExpectancy += 1.9;
            }

            results.education = educationLifeExpectancy;
        };

        CalculateResults.prototype.addExpectancies = function addExpectancies(personResults) {
            personResults.overallLifeExpectancy = 0;

            personResults.overallLifeExpectancy += personResults.education;
            personResults.overallLifeExpectancy += personResults.marital;

            personResults.overallLifeExpectancy += personResults.exercise;
            personResults.overallLifeExpectancy += personResults.smoker;
            personResults.overallLifeExpectancy += personResults.healthrank;
            personResults.overallLifeExpectancy += personResults.diabetes;
            personResults.overallLifeExpectancy += personResults.mental;
            personResults.overallLifeExpectancy += personResults.parentAges;
            personResults.overallLifeExpectancy += personResults.alcohol;
            personResults.overallLifeExpectancy += personResults.county;

            personResults.overallLifeExpectancy += personResults.income;
        };

        CalculateResults.prototype.getPercent = function getPercent(initialValue, currentValue, pastValue, percentage) {
            if (currentValue < initialValue * percentage) {
                var difference = pastValue - currentValue;
                var number = (pastValue - initialValue * percentage) / difference;
                return number;
            } else return false;
        };

        CalculateResults.prototype.getTestTuples = function getTestTuples(clientResultsData, client, clientResults, spouseResultsData, spouse, spouseResults) {
            var clientTuples = [];
            var clientTableAge = [];
            var clientTableValue = [];
            var self = this;
            var age, more, less, difference, number, check90, check75, check50, check25, check10;
            var self = this;

            var averageTuples = [];
            var averageTableAge = [];
            var averageTableValue = [];

            check90 = true;
            check75 = true;
            check50 = true;
            check25 = true;
            check10 = true;

            clientResultsData.forEach(function (value, i) {
                if (parseInt(value.Age) >= client.age) {
                    var initialValue = parseInt(clientResultsData[client.age].Number);

                    if (i > 0) {
                        age = clientResultsData[i - 1].Age;
                        less = parseFloat(clientResultsData[i].Number);
                        more = parseFloat(clientResultsData[i - 1].Number);

                        if (check90) {
                            if (self.getPercent(initialValue, less, more, .90) != false) {
                                number = self.getPercent(initialValue, less, more, .90);
                                averageTableAge.push((parseInt(age) + number).toFixed(2));
                                averageTableValue.push("90%");
                                check90 = false;
                            }
                        }
                        if (check75) {
                            if (self.getPercent(initialValue, less, more, .75) != false) {
                                number = self.getPercent(initialValue, less, more, .75);
                                averageTableAge.push((parseInt(age) + number).toFixed(2));
                                averageTableValue.push("75%");
                                check75 = false;
                            }
                        }
                        if (check50) {
                            if (self.getPercent(initialValue, less, more, .50) != false) {
                                number = self.getPercent(initialValue, less, more, .50);
                                averageTableAge.push((parseInt(age) + number).toFixed(2));
                                averageTableValue.push("50%");
                                check50 = false;
                            }
                        }
                        if (check25) {
                            if (self.getPercent(initialValue, less, more, .25) != false) {
                                number = self.getPercent(initialValue, less, more, .25);
                                averageTableAge.push((parseInt(age) + number).toFixed(2));
                                averageTableValue.push("25%");
                                check25 = false;
                            }
                        }
                        if (check10) {
                            if (self.getPercent(initialValue, less, more, .10) != false) {
                                number = self.getPercent(initialValue, less, more, .10);
                                averageTableAge.push((parseInt(age) + number).toFixed(2));
                                averageTableValue.push("10%");
                                check10 = false;
                            }
                        }
                    }

                    averageTuples.push([parseInt(value.Age), parseInt(value.Number)]);
                }
            });

            var spouseAverageTuples = [];
            var spouseAverageTableAge = [];
            var spouseAverageTableValue = [];

            check90 = true;
            check75 = true;
            check50 = true;
            check25 = true;
            check10 = true;

            if (client.checkspouse) {
                spouseResultsData.forEach(function (value, i) {
                    if (parseInt(value.Age) >= client.age) {
                        var initialValue = parseInt(spouseResultsData[spouse.age].Number);

                        if (i > 0) {
                            age = spouseResultsData[i - 1].Age;
                            less = parseFloat(spouseResultsData[i].Number);
                            more = parseFloat(spouseResultsData[i - 1].Number);

                            if (check90) {
                                if (self.getPercent(initialValue, less, more, .90) != false) {
                                    number = self.getPercent(initialValue, less, more, .90);
                                    spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                    spouseAverageTableValue.push("90%");
                                    check90 = false;
                                }
                            }
                            if (check75) {
                                if (self.getPercent(initialValue, less, more, .75) != false) {
                                    number = self.getPercent(initialValue, less, more, .75);
                                    spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                    spouseAverageTableValue.push("75%");
                                    check75 = false;
                                }
                            }
                            if (check50) {
                                if (self.getPercent(initialValue, less, more, .50) != false) {
                                    number = self.getPercent(initialValue, less, more, .50);
                                    spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                    spouseAverageTableValue.push("50%");
                                    check50 = false;
                                }
                            }
                            if (check25) {
                                if (self.getPercent(initialValue, less, more, .25) != false) {
                                    number = self.getPercent(initialValue, less, more, .25);
                                    spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                    spouseAverageTableValue.push("25%");
                                    check25 = false;
                                }
                            }
                            if (check10) {
                                if (self.getPercent(initialValue, less, more, .10) != false) {
                                    number = self.getPercent(initialValue, less, more, .10);
                                    spouseAverageTableAge.push((parseInt(age) + number).toFixed(2));
                                    spouseAverageTableValue.push("10%");
                                    check10 = false;
                                }
                            }
                        }

                        spouseAverageTuples.push([parseInt(value.Age), parseInt(value.Number)]);
                    }
                });
            }

            check90 = true;
            check75 = true;
            check50 = true;
            check25 = true;
            check10 = true;

            clientResultsData.forEach(function (value, i) {
                if (parseInt(value.Age) >= client.age) {
                    var initialValue = parseInt(clientResultsData[client.age].Number);

                    if (clientResults.checkSpouseDeath && parseInt(value.Age) === client.age + (clientResults.spouseDeath - spouse.age)) {
                        difference = parseInt(clientResultsData[i - 1].Number) - parseInt(clientResultsData[i].Number);
                        value.Number -= difference * .66;
                    } else if (clientResults.checkSpouseDeath && (client.gender === 'male' || client.gender === 'Male') && parseInt(value.Age) === client.age + (clientResults.spouseDeath - spouse.age) + 1) {
                        difference = parseInt(clientResultsData[i - 1].Number) - parseInt(clientResultsData[i].Number);
                        value.Number -= difference * .30;
                    }

                    if (parseInt(value.Age) <= 67) value.Number = parseInt(value.Number) - self.user.clientOccupation.occupationChangeInLifeExpectancy;

                    if (client.gender == 'male' || client.gender == 'Male') {
                        if (parseInt(value.Age) >= 28 && parseInt(value.Age) <= 70) {
                            difference = parseInt(clientResultsData[i - 1].Number) - parseInt(clientResultsData[i].Number);
                            if (client.maritalStatus == 'Single/Never Married') value.Number -= difference * .32;else if (client.maritalStatus == 'Married/Cohabitated') value.Number += difference * .15;else if (client.maritalStatus == 'Widowed') value.Number -= difference * .32;else if (client.maritalStatus == 'Divorced') value.Number -= difference * .32;
                        }
                    } else if (client.gender == 'Female') {
                        if (parseInt(value.Age) >= 25 && parseInt(value.Age) <= 70) {
                            difference = parseInt(clientResultsData[i - 1].Number) - parseInt(clientResultsData[i].Number);
                            if (client.maritalStatus == 'Single/Never Married') value.Number -= difference * .32;else if (client.maritalStatus == 'Married/Cohabitated') value.Number += difference * .15;else if (client.maritalStatus == 'Widowed') value.Number -= difference * .32;else if (client.maritalStatus == 'Divorced') value.Number -= difference * .32;
                        }
                    }

                    if (i > 0) {
                        age = clientResultsData[i - 1].Age;
                        less = parseFloat(clientResultsData[i].Number);
                        more = parseFloat(clientResultsData[i - 1].Number);

                        if (check90) {
                            if (self.getPercent(initialValue, less, more, .90) != false) {
                                number = self.getPercent(initialValue, less, more, .90);
                                clientTableAge.push((parseInt(age) + number + parseFloat(clientResults.overallLifeExpectancy)).toFixed(2));
                                clientTableValue.push("90%");
                                check90 = false;
                            }
                        }
                        if (check75) {
                            if (self.getPercent(initialValue, less, more, .75) != false) {
                                number = self.getPercent(initialValue, less, more, .75);
                                clientTableAge.push((parseInt(age) + number + parseFloat(clientResults.overallLifeExpectancy)).toFixed(2));
                                clientTableValue.push("75%");
                                check75 = false;
                            }
                        }
                        if (check50) {
                            if (self.getPercent(initialValue, less, more, .50) != false) {
                                number = self.getPercent(initialValue, less, more, .50);
                                clientTableAge.push((parseInt(age) + number + parseFloat(clientResults.overallLifeExpectancy)).toFixed(2));
                                clientTableValue.push("50%");

                                clientResults.finalLifeExpectancy = (parseInt(age) + number + parseFloat(clientResults.overallLifeExpectancy)).toFixed(2);
                                check50 = false;
                            }
                        }
                        if (check25) {
                            if (self.getPercent(initialValue, less, more, .25) != false) {
                                number = self.getPercent(initialValue, less, more, .25);
                                clientTableAge.push((parseInt(age) + number + parseFloat(clientResults.overallLifeExpectancy)).toFixed(2));
                                clientTableValue.push("25%");
                                check25 = false;
                            }
                        }
                        if (check10) {
                            if (self.getPercent(initialValue, less, more, .10) != false) {
                                number = self.getPercent(initialValue, less, more, .10);
                                clientTableAge.push((parseInt(age) + number + parseFloat(clientResults.overallLifeExpectancy)).toFixed(2));
                                clientTableValue.push("10%");
                                check10 = false;
                            }
                        }
                    }

                    if (parseInt(value.Age) + clientResults.overallLifeExpectancy < client.age) {} else clientTuples.push([parseInt(value.Age) + Math.trunc(clientResults.overallLifeExpectancy), parseInt(value.Number)]);
                } else if (parseInt(value.Age) < client.age) {
                        if (client.gender == 'male' || client.gender == 'Male') {
                            if (parseInt(value.Age) >= 28 && parseInt(value.Age) <= 70) {
                                difference = parseInt(clientResultsData[i - 1].Number) - parseInt(clientResultsData[i].Number);
                                var ageAtMarriage = parseInt(value.Age) - client.yearsOfMarriage;

                                if (client.maritalStatus == 'Single/Never Married') value.Number -= difference * .32;else if (client.maritalStatus == 'Married/Cohabitated') {
                                        if (ageAtMarriage > parseInt(value.Age)) value.Number -= difference * .32;else value.Number += difference * .15;
                                    } else if (client.maritalStatus == 'Widowed') {
                                        ageAtMarriage -= client.yearsSinceSpousePassing;
                                        var ageAtPassing = parseInt(value.Age) - client.yearsSinceSpousePassing;

                                        if (ageAtMarriage - 28 > 0) value.Number -= difference * .32;else if (ageAtMarriage < ageAtPassing) value.Number += difference * .15;else {
                                                    if (parseInt(value.Age) == ageAtPassing) {
                                                        value.Number -= difference * .32;
                                                        value.Number -= difference * .66;
                                                    } else if (parseInt(value.Age) == ageAtPassing + 1) {
                                                        value.Number -= difference * .32;
                                                        value.Number -= difference * .30;
                                                    } else value.Number -= difference * .32;
                                                }
                                    } else if (client.maritalStatus == 'Divorced') {
                                        ageAtMarriage -= client.yearsOfDivorce;
                                        var ageAtDivorce = parseInt(value.Age) - client.yearsOfDivorce;

                                        if (ageAtMarriage - 28 > 0) value.Number -= difference * .32;else if (ageAtMarriage < ageAtDivorce) value.Number += difference * .15;else value.Number -= difference * .32;
                                    }
                            }
                        } else if (client.gender == 'Female') {
                            if (parseInt(value.Age) >= 25 && parseInt(value.Age) <= 70) {
                                difference = parseInt(clientResultsData[i - 1].Number) - parseInt(clientResultsData[i].Number);
                                var ageAtMarriage = parseInt(value.Age) - client.yearsOfMarriage;

                                if (client.maritalStatus == 'Single/Never Married') value.Number -= difference * .32;else if (client.maritalStatus == 'Married/Cohabitated') {
                                        if (ageAtMarriage > parseInt(value.Age)) value.Number -= difference * .32;else value.Number += difference * .15;
                                    } else if (client.maritalStatus == 'Widowed') {
                                        ageAtMarriage -= client.yearsSinceSpousePassing;
                                        var ageAtPassing = parseInt(value.Age) - client.yearsSinceSpousePassing;

                                        if (ageAtMarriage - 25 > 0) value.Number -= difference * .32;else if (ageAtMarriage < ageAtPassing) value.Number += difference * .15;else {
                                                    if (parseInt(value.Age) == ageAtPassing) {
                                                        value.Number -= difference * .32;
                                                        value.Number -= difference * .66;
                                                    } else if (parseInt(value.Age) == ageAtPassing + 1) {
                                                        value.Number -= difference * .32;
                                                        value.Number -= difference * .30;
                                                    } else value.Number -= difference * .32;
                                                }
                                    } else if (client.maritalStatus == 'Divorced') {
                                        ageAtMarriage -= client.yearsOfDivorce;
                                        var ageAtDivorce = parseInt(value.Age) - client.yearsOfDivorce;

                                        if (ageAtMarriage - 25 > 0) value.Number -= difference * .32;else if (ageAtMarriage < ageAtDivorce) value.Number += difference * .15;else value.Number -= difference * .32;
                                    }
                            }
                        }

                        if (parseInt(value.Age) + clientResults.overallLifeExpectancy > client.age && i <= client.age + clientResults.overallLifeExpectancy) {
                            clientTuples.push([client.age + Math.abs(client.age - i - 1), parseInt(value.Number)]);
                        }
                    }
            });

            var spouseTuples = [];
            var spouseTableAge = [];
            var spouseTableValue = [];

            check90 = true;
            check75 = true;
            check50 = true;
            check25 = true;
            check10 = true;

            if (client.checkspouse) {
                spouseResultsData.forEach(function (value, i) {
                    if (parseInt(value.Age) >= spouse.age) {
                        var initialValue = parseInt(spouseResultsData[spouse.age].Number);

                        if (parseInt(value.Age) <= 67) value.Number = parseInt(value.Number) - self.user.spouseOccupation.occupationChangeInLifeExpectancy;

                        if (spouse.gender == 'male' || spouse.gender == 'Male') {
                            if (parseInt(value.Age) >= 28 && parseInt(value.Age) <= 70) {
                                difference = parseInt(spouseResultsData[i - 1].Number) - parseInt(spouseResultsData[i].Number);
                                if (spouse.maritalStatus == 'Single/Never Married') value.Number -= difference * .32;else if (spouse.maritalStatus == 'Married/Cohabitated') value.Number += difference * .15;else if (spouse.maritalStatus == 'Widowed') value.Number -= difference * .32;else if (spouse.maritalStatus == 'Divorced') value.Number -= difference * .32;
                            }
                        } else if (spouse.gender == 'Female') {
                            if (parseInt(value.Age) >= 25 && parseInt(value.Age) <= 70) {
                                difference = parseInt(spouseResultsData[i - 1].Number) - parseInt(spouseResultsData[i].Number);
                                if (spouse.maritalStatus == 'Single/Never Married') value.Number -= difference * .32;else if (spouse.maritalStatus == 'Married/Cohabitated') value.Number += difference * .15;else if (spouse.maritalStatus == 'Widowed') value.Number -= difference * .32;else if (spouse.maritalStatus == 'Divorced') value.Number -= difference * .32;
                            }
                        }

                        if (i > 0) {
                            age = spouseResultsData[i - 1].Age;
                            less = parseFloat(spouseResultsData[i].Number);
                            more = parseFloat(spouseResultsData[i - 1].Number);

                            if (check90) {
                                if (self.getPercent(initialValue, less, more, .90) != false) {
                                    number = self.getPercent(initialValue, less, more, .90);
                                    spouseTableAge.push((parseInt(age) + number + parseFloat(spouseResults.overallLifeExpectancy)).toFixed(2));
                                    spouseTableValue.push("90%");
                                    check90 = false;
                                }
                            }
                            if (check75) {
                                if (self.getPercent(initialValue, less, more, .75) != false) {
                                    number = self.getPercent(initialValue, less, more, .75);
                                    spouseTableAge.push((parseInt(age) + number + parseFloat(spouseResults.overallLifeExpectancy)).toFixed(2));
                                    spouseTableValue.push("75%");
                                    check75 = false;
                                }
                            }
                            if (check50) {
                                if (self.getPercent(initialValue, less, more, .50) != false) {
                                    number = self.getPercent(initialValue, less, more, .50);
                                    spouseTableAge.push((parseInt(age) + number + parseFloat(spouseResults.overallLifeExpectancy)).toFixed(2));
                                    spouseTableValue.push("50%");

                                    spouseResults.finalLifeExpectancy = (parseInt(age) + number + parseFloat(spouseResults.overallLifeExpectancy)).toFixed(2);
                                    check50 = false;
                                }
                            }
                            if (check25) {
                                if (self.getPercent(initialValue, less, more, .25) != false) {
                                    number = self.getPercent(initialValue, less, more, .25);
                                    spouseTableAge.push((parseInt(age) + number + parseFloat(spouseResults.overallLifeExpectancy)).toFixed(2));
                                    spouseTableValue.push("25%");
                                    check25 = false;
                                }
                            }
                            if (check10) {
                                if (self.getPercent(initialValue, less, more, .10) != false) {
                                    number = self.getPercent(initialValue, less, more, .10);
                                    spouseTableAge.push((parseInt(age) + number + parseFloat(spouseResults.overallLifeExpectancy)).toFixed(2));
                                    spouseTableValue.push("10%");
                                    check10 = false;
                                }
                            }
                        }

                        if (parseInt(value.Age) + spouseResults.overallLifeExpectancy < spouse.age) {} else spouseTuples.push([parseInt(value.Age) + Math.trunc(spouseResults.overallLifeExpectancy), parseInt(value.Number)]);
                    } else if (parseInt(value.Age) < spouse.age) {
                            if (spouse.gender == 'male' || spouse.gender == 'Male') {
                                if (parseInt(value.Age) >= 28 && parseInt(value.Age) <= 70) {
                                    difference = parseInt(spouseResultsData[i - 1].Number) - parseInt(spouseResultsData[i].Number);
                                    var ageAtMarriage = parseInt(value.Age) - spouse.yearsOfMarriage;

                                    if (spouse.maritalStatus == 'Single/Never Married') value.Number -= difference * .32;else if (spouse.maritalStatus == 'Married/Cohabitated') {
                                            if (ageAtMarriage > parseInt(value.Age)) value.Number -= difference * .32;else value.Number += difference * .15;
                                        } else if (spouse.maritalStatus == 'Widowed') {
                                            ageAtMarriage -= spouse.yearsSinceSpousePassing;
                                            var ageAtPassing = parseInt(value.Age) - spouse.yearsSinceSpousePassing;

                                            if (ageAtMarriage - 28 > 0) value.Number -= difference * .32;else if (ageAtMarriage < ageAtPassing) value.Number += difference * .15;else {
                                                        if (parseInt(value.Age) == ageAtPassing) {
                                                            value.Number -= difference * .32;
                                                            value.Number -= difference * .66;
                                                        } else if (parseInt(value.Age) == ageAtPassing + 1) {
                                                            value.Number -= difference * .32;
                                                            value.Number -= difference * .30;
                                                        } else value.Number -= difference * .32;
                                                    }
                                        } else if (spouse.maritalStatus == 'Divorced') {
                                            ageAtMarriage -= spouse.yearsOfDivorce;
                                            var ageAtDivorce = parseInt(value.Age) - spouse.yearsOfDivorce;

                                            if (ageAtMarriage - 28 > 0) value.Number -= difference * .32;else if (ageAtMarriage < ageAtDivorce) value.Number += difference * .15;else value.Number -= difference * .32;
                                        }
                                }
                            } else if (spouse.gender == 'Female') {
                                if (parseInt(value.Age) >= 25 && parseInt(value.Age) <= 70) {
                                    difference = parseInt(spouseResultsData[i - 1].Number) - parseInt(spouseResultsData[i].Number);
                                    var ageAtMarriage = parseInt(value.Age) - spouse.yearsOfMarriage;

                                    if (spouse.maritalStatus == 'Single/Never Married') value.Number -= difference * .32;else if (spouse.maritalStatus == 'Married/Cohabitated') {
                                            if (ageAtMarriage > parseInt(value.Age)) value.Number -= difference * .32;else value.Number += difference * .15;
                                        } else if (spouse.maritalStatus == 'Widowed') {
                                            ageAtMarriage -= spouse.yearsSinceSpousePassing;
                                            var ageAtPassing = parseInt(value.Age) - spouse.yearsSinceSpousePassing;

                                            if (ageAtMarriage - 25 > 0) value.Number -= difference * .32;else if (ageAtMarriage < ageAtPassing) value.Number += difference * .15;else {
                                                        if (parseInt(value.Age) == ageAtPassing) {
                                                            value.Number -= difference * .32;
                                                            value.Number -= difference * .66;
                                                        } else if (parseInt(value.Age) == ageAtPassing + 1) {
                                                            value.Number -= difference * .32;
                                                            value.Number -= difference * .30;
                                                        } else value.Number -= difference * .32;
                                                    }
                                        } else if (spouse.maritalStatus == 'Divorced') {
                                            ageAtMarriage -= spouse.yearsOfDivorce;
                                            var ageAtDivorce = parseInt(value.Age) - spouse.yearsOfDivorce;

                                            if (ageAtMarriage - 25 > 0) value.Number -= difference * .32;else if (ageAtMarriage < ageAtDivorce) value.Number += difference * .15;else value.Number -= difference * .32;
                                        }
                                }
                            }
                        }
                    if (parseInt(value.Age) + spouseResults.overallLifeExpectancy > spouse.age && i <= spouse.age + spouseResults.overallLifeExpectancy) {
                        spouseTuples.push([spouse.age + Math.abs(spouse.age - i), parseInt(value.Number)]);
                    }
                });
            }

            clientResults.clientTuples = clientTuples;
            spouseResults.spouseTuples = spouseTuples;
            clientResults.averageTuples = averageTuples;
            spouseResults.spouseAverageTuples = spouseAverageTuples;

            clientResults.clientTableAge = clientTableAge;
            spouseResults.spouseTableAge = spouseTableAge;
            clientResults.averageTableAge = averageTableAge;
            spouseResults.spouseAverageTableAge = spouseAverageTableAge;

            clientResults.clientTableValue = clientTableValue;
            spouseResults.spouseTableValue = spouseTableValue;
            clientResults.averageTableValue = averageTableValue;
            spouseResults.spouseAverageTableValue = spouseAverageTableValue;
        };

        CalculateResults.prototype.calculateSpouseDiesEarly = function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(client, clientResults, spouse, spouseResults) {
                var clientEthnicityExpectancy, clientResultsData, spouseEthnicityExpectancy, spouseResultsData;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.httpClient.fetch('/api/life-table/' + client.race.toLowerCase() + '-' + client.gender.toLowerCase() + '.json');

                            case 2:
                                clientEthnicityExpectancy = _context2.sent;
                                _context2.next = 5;
                                return clientEthnicityExpectancy.json();

                            case 5:
                                clientResultsData = _context2.sent;
                                _context2.next = 8;
                                return this.httpClient.fetch('/api/life-table/' + spouse.race.toLowerCase() + '-' + spouse.gender.toLowerCase() + '.json');

                            case 8:
                                spouseEthnicityExpectancy = _context2.sent;
                                _context2.next = 11;
                                return spouseEthnicityExpectancy.json();

                            case 11:
                                spouseResultsData = _context2.sent;


                                this.getTestTuples(clientResultsData, client, clientResults, spouseResultsData, spouse, spouseResults);

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function calculateSpouseDiesEarly(_x5, _x6, _x7, _x8) {
                return _ref2.apply(this, arguments);
            }

            return calculateSpouseDiesEarly;
        }();

        return CalculateResults;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"css/styles.css\"></require><div id=\"app\"><div id=\"content\"><div id=\"home\"><h1 style=\"font-size:36px;text-align:center\"><b>Life Expectancy Calculator<b></b></b></h1></div><hr><router-view></router-view></div><br><br><br><footer id=\"footer\"><div class=\"footer-copyright\"><div class=\"container-fluid\"><br>©2017, PIEtech, Inc. All rights reserved.</div></div></footer></div></template>"; });
define('text!css/drag-and-drop.css', ['module'], function(module) { module.exports = "#drag-and-drop-container {\r\n    margin: 0 auto;\r\n    width: 1600px;\r\n    margin-left: -30%;\r\n}\r\n\r\n#first-drag-group, #drop-box {\r\n    border: solid .5px black;\r\n    text-align: center;\r\n    height: 600px;\r\n    overflow: scroll;\r\n}\r\n\r\n#spouse-drop-box {\r\n    border: solid .5px black;\r\n    text-align: center;\r\n    height: 600px;\r\n    overflow: scroll;\r\n}\r\n\r\n\r\n#buttons {\r\n    background-color: #4CAF50; /* Green */\r\n    border: none;\r\n    color: white;\r\n    padding: 5px 10px;\r\n    margin: 0 auto;\r\n    margin-right: 8px;\r\n    margin-left: 8px;\r\n    text-align: center;\r\n    width: 180px;\r\n    height: 70px;\r\n    text-decoration: none;\r\n    display: inline-block;\r\n    font-size: 16px;\r\n    border-radius: 4px;\r\n    margin-bottom:10px;\r\n}"; });
define('text!aboutyou/personalinfo.html', ['module'], function(module) { module.exports = "<template><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><require from=\"./capitalize-converter\"></require><form id=\"personalinfo\" submit.delegate=\"submit()\"><div style=\"margin-left:38.5%\"><label style=\"padding-right:10px\" for=\"checkspouse\">Do you have a spouse?</label><div class=\"btn-group\" click.delegate=\"checkspouse()\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientPersonalInfo.checkspouse ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><div id=\"client-spouse-container\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h2 id=\"clientorspouse\" style=\"text-align:center\">Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"age\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"gender(user.clientPersonalInfo)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.clientPersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.race\"><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"race\">Highest Level of Education</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.education\"><option>Please Select</option><option>Didn't complete high school</option><option>Graduated high school/trade school</option><option>Graduated college or higher</option></select></div><div class=\"form-group\"><label for=\"race\">Marital Status</label><select class=\"form-control\" value.bind=\"user.clientPersonalInfo.maritalStatus\" change.delegate=\"checkMaritalStatus(user.clientPersonalInfo)\"><option>Please Select</option><option>Single/Never Married</option><option>Married/Cohabitated</option><option>Widowed</option><option>Divorced</option></select></div><div show.bind=\"user.clientPersonalInfo.isMarried\" class=\"form-group\"><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div><div show.bind=\"user.clientPersonalInfo.isWidowed\" class=\"form-group\"><label for=\"income\">Years since ex-spouse passed:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsSinceSpousePassing\" class=\"form-control\" placeholder=\"10\"></div><div show.bind=\"user.clientPersonalInfo.isWidowed\" class=\"form-group\"><label for=\"income\">Length of marriage in years:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div><div show.bind=\"user.clientPersonalInfo.isDivorced\" class=\"form-group\"><label for=\"income\">Years since divorce:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfDivorce\" class=\"form-control\" placeholder=\"10\"></div><div show.bind=\"user.clientPersonalInfo.isDivorced\" class=\"form-group\"><label for=\"income\">Length of marriage in years:</label><input type=\"text\" value.bind=\"user.clientPersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div><hr><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState(user.clientPersonalInfo)\" value.bind=\"user.clientPersonalInfo.state\"><option>Please Select</option><option repeat.for=\"state of stateData.stateSet\">${state | capitalize}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancy(user.clientPersonalInfo)\" value.bind=\"user.clientPersonalInfo.county\"><option>Please Select</option><option repeat.for=\"county of user.clientPersonalInfo.currentCountyArray\">${county | capitalize}</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h2 style=\"text-align:center\">Co-Client</h2><div class=\"form-group\"><label for=\"age\">Age:</label><input style=\"width:400px\" id=\"spouseage\"></div><label style=\"padding-right:10px\" for=\"gender\">Gender:</label><div class=\"btn-group\" click.delegate=\"gender(user.spousePersonalInfo)\" data-toggle=\"buttons\"><label class=\"btn ${user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Male</label><label class=\"btn ${!user.spousePersonalInfo.checkgender ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Female</label></div><br><br><br><div class=\"form-group\"><label for=\"race\">Race</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.race\"><option>White</option><option>Black</option><option>Hispanic</option><option>Asian</option></select></div><div class=\"form-group\"><label for=\"race\">Highest Level of Education</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.education\"><option>Please Select</option><option>Didn't complete high school</option><option>Graduated high school/trade school</option><option>Graduated college or higher</option></select></div><div class=\"form-group\"><label for=\"race\">Marital Status</label><select class=\"form-control\" value.bind=\"user.spousePersonalInfo.maritalStatus\" change.delegate=\"checkMaritalStatus(user.spousePersonalInfo)\"><option>Please Select</option><option>Single/Never Married</option><option>Married/Cohabitated</option><option>Widowed</option><option>Divorced</option></select></div><div show.bind=\"user.spousePersonalInfo.isMarried\" class=\"form-group\"><label for=\"income\">Years since current marriage/cohabitation began:</label><input type=\"text\" value.bind=\"user.spousePersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div><div show.bind=\"user.spousePersonalInfo.isWidowed\" class=\"form-group\"><label for=\"income\">Years since ex-spouse passed:</label><input type=\"text\" value.bind=\"user.spousePersonalInfo.yearsSinceSpousePassing\" class=\"form-control\" placeholder=\"10\"></div><div show.bind=\"user.spousePersonalInfo.isWidowed\" class=\"form-group\"><label for=\"income\">Length of marriage in years:</label><input type=\"text\" value.bind=\"user.spousePersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div><div show.bind=\"user.spousePersonalInfo.isDivorced\" class=\"form-group\"><label for=\"income\">Years since divorce:</label><input type=\"text\" value.bind=\"user.spousePersonalInfo.yearsOfDivorce\" class=\"form-control\" placeholder=\"10\"></div><div show.bind=\"user.spousePersonalInfo.isDivorced\" class=\"form-group\"><label for=\"income\">Length of marriage in years:</label><input type=\"text\" value.bind=\"user.spousePersonalInfo.yearsOfMarriage\" class=\"form-control\" placeholder=\"10\"></div><hr><div class=\"form-group\"><label for=\"state\">State</label><select class=\"form-control\" change.delegate=\"checkState(user.spousePersonalInfo)\" value.bind=\"user.spousePersonalInfo.state\"><option>Please Select</option><option repeat.for=\"state of stateData.stateSet\">${state | capitalize}</option></select></div><div class=\"form-group\"><label for=\"county\">County</label><select class=\"form-control\" change.delegate=\"checkLifeExpectancy(user.spousePersonalInfo)\" value.bind=\"user.spousePersonalInfo.county\"><option>Please Select</option><option repeat.for=\"county of user.spousePersonalInfo.currentCountyArray\">${county | capitalize}</option></select></div></div></div><hr style=\"clear:both\"><div class=\"additional-information-container\"><h1 style=\"text-align:center\">Input More Information:</h1><div style=\"margin:0 auto\"><button style=\"float:left\" class=\"btn btn-primary col-md-4\" click.delegate=\"myhealth()\">My Health</button> <button style=\"float:right\" class=\"btn btn-primary col-md-4\" click.delegate=\"occupation()\">My Occupation</button></div></div><br><br><hr style=\"clear:both\"><div id=\"submit-button-div-home\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!css/styles.css', ['module'], function(module) { module.exports = "/*========================GLYPHICON COLOR========================*/\r\n\r\n.glyphicon-question-sign {\r\n    color: #006dcc;\r\n\tmargin:5px;\r\n}\r\n\r\n/*========================END GLYPHICON COLOR========================*/\r\n\r\n.hasSpouse {\r\n\twidth: 45%;\r\n\tfloat: left;\r\n}\r\n\r\n.noSpouse {\r\n\twidth: 100%;\r\n\tfloat: none;\r\n}\r\n\r\n.additional-information-container {\r\n\tclear: both;\r\n\tmargin: 0 auto;\r\n\twidth: 600px;\r\n}\r\n\r\n/*========================BACK BUTTON========================*/\r\n#back-button-div-home {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n\tmargin-left: 46%;\r\n}\r\n\r\n#back-button-div {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#back {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n/*========================SUBMIT BUTTON========================*/\r\n#submit-button-div-home {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n\tmargin-left: 46%;\r\n}\r\n\r\n#submit-button-div {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#submit {\r\n\tmargin: 0 auto;\r\n    bottom: 0;\r\n}\r\n\r\n#personalinfo, #myhealth, #occupation, #results {    \r\n    margin: 0 auto;\r\n    width: 1000px;\r\n}\r\n\r\n/*===========================FOOTER STYLING==========================*/\r\nhtml, body {\r\n\tmargin:0;\r\n\tpadding:0;\r\n\theight:100%;\r\n}\r\n\r\n#app {\r\n\tmin-height:100%;\r\n\tposition:relative;\r\n}\r\n\r\n#content {\r\n\tpadding-bottom:100px; /* Height of the footer element */\r\n}\r\n\r\n#footer {\r\n\tclear: both;\r\n\tbackground:#ededed;\r\n\twidth:100%;\r\n\theight:60px;\r\n\tposition:absolute;\r\n\tbottom:0;\r\n\tleft:0;\r\n    text-align: center;\r\n}\r\n/*============================END FOOTER STYLING===========================*/"; });
define('text!occupation/occupation.html', ['module'], function(module) { module.exports = "<template><require from=\"../css/drag-and-drop.css\"></require><form id=\"occupation\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">Occupation - Client</h1><hr><label style=\"padding-right:10px\" for=\"income\">Do you have an income?</label><div class=\"btn-group\" click.delegate=\"income(user.clientOccupation)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientOccupation.checkincome ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientOccupation.checkincome ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div show.bind=\"user.clientOccupation.checkincome\" class=\"form-group\"><label for=\"income\">Annual Income</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.clientOccupation.income\" class=\"form-control\" placeholder=\"50000\"></div></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">Occupation - Co-Client</h1><hr><label style=\"padding-right:10px\" for=\"income\">Do you have an income?</label><div class=\"btn-group\" click.delegate=\"income(user.spouseOccupation)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseOccupation.checkincome ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseOccupation.checkincome ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div show.bind=\"user.spouseOccupation.checkincome\" class=\"form-group\"><label for=\"income\">Annual Income</label><div class=\"input-group mb-2 mr-sm-2 mb-sm-0\"><div class=\"input-group-addon\">$</div><input type=\"text\" value.bind=\"user.spouseOccupation.income\" class=\"form-control\" placeholder=\"50000\"></div></div></div><div id=\"drag-and-drop-container\" style=\"clear:both\"><div class=\"${user.clientPersonalInfo.checkspouse ? 'col-md-6' : 'col-md-8'}\" id=\"first-drag-group\" drop.trigger=\"drop($event)\" dragover.trigger=\"allowDrop($event)\"><nav class=\"navbar navbar-default\"><div class=\"container-fluid\"><div class=\"navbar-header\"><a class=\"navbar-brand\">Occupations</a></div><ul repeat.for=\"type of user.clientOccupation.occupationType\" class=\"nav navbar-nav\"><li><a click.delegate=\"checkOccupation(user.clientOccupation, {type})\">${type}</a></li></ul></div></nav><h3><b>${user.clientOccupation.type}</b></h3><br><div class=\"row\" draggable=\"true\" dragstart.trigger=\"drag($event)\" class=\"col-md-4\"><div class=\"col\" id=\"button-div\"><button class=\"current-buttons\" click.delegate=\"removeDrop()\" draggable=\"true\" id=\"buttons\" repeat.for=\"job of occupationData.currentJobArray\">${job}</button></div></div></div><div class=\"${user.clientPersonalInfo.checkspouse ? 'col-md-3' : 'col-md-4'}\" id=\"drop-box\" drop.trigger=\"drop($event)\" dragstart.trigger=\"drag($event)\" dragover.trigger=\"allowDrop($event)\"><h3><b>Client Occupation(s)<b></b></b></h3><button class=\"current-buttons\" click.delegate=\"removeDrop()\" draggable=\"true\" id=\"buttons\" repeat.for=\"job of user.clientOccupation.occupationArray\">${job}</button></div><div show.bind=\"user.clientPersonalInfo.checkspouse\" class=\"${user.clientPersonalInfo.checkspouse ? 'col-md-3' : 'none'}\" id=\"spouse-drop-box\" drop.trigger=\"drop($event)\" dragstart.trigger=\"drag($event)\" dragover.trigger=\"allowDrop($event)\"><h3><b>Co-Client Occupation(s)<b></b></b></h3><button class=\"current-buttons\" click.delegate=\"removeDrop()\" draggable=\"true\" id=\"buttons\" repeat.for=\"job of user.spouseOccupation.occupationArray\">${job}</button></div></div><br><br><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\" click.delegate=\"submit()\">Submit</button></div></form></template>"; });
define('text!health/myhealth.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><form id=\"myhealth\" submit.delegate=\"submit()\"><div id=\"client\" class=\"${user.clientPersonalInfo.checkspouse ? 'hasSpouse' : 'noSpouse'}\"><h1 style=\"text-align:center\">My Health - Client</h1><div show.bind=\"validHeight\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div><div class=\"${user.clientMyHealth.formHeightWeight ? 'col-md-8' : 'none'}\"><div class=\"form-group ${user.clientMyHealth.heightError}\"><label for=\"height\">Height</label><span id=\"height-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.clientMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight(user.clientMyHealth)\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><span id=\"weight-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.clientMyHealth.weight\" class=\"form-control\" placeholder=\"155\" change.trigger=\"calculateBMI(user.clientMyHealth)\"></div><div id=\"client-bmi-alert\" class=\"alert alert-success\" show.bind=\"user.clientMyHealth.validBMI\"><strong>BMI: ${user.clientMyHealth.bmi}</strong></div></div><div show.bind=\"user.clientMyHealth.validBMI\" class=\"${user.clientMyHealth.formHeightWeight ? 'col-md-2' : 'none'}\"><img src.bind=\"user.clientMyHealth.iconType\" style=\"width:150px;height:220px\"></div></div><div class=\"form-group\" style=\"clear:both\"><label for=\"healthRank\">How many hours do you exercise per week?</label><span id=\"exercise-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.clientMyHealth.exercisePerWeek\"><option data-hidden=\"true\">Please Select</option><option>0</option><option>Less than 2.5 hours</option><option>Approximately 2.5 hours</option><option>More than 2.5 hours</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><span id=\"health-rank-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.clientMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>I'm in great health</option><option>I'm in ok health</option><option>I'm in poor health</option></select></div><hr><h2 style=\"text-align:center\">Conditions</h2><label style=\"padding-right:10px\" for=\"diabetes\">Do you have diabetes?</label><div class=\"btn-group\" click.delegate=\"diabetes(user.clientMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checkdiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checkdiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label for=\"mentalCondition\">Are you currently diagnosed with a serious mental condition?</label><span id=\"mental-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><div class=\"btn-group\" click.delegate=\"mental(user.clientMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checkmental ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checkmental ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><hr><h2 style=\"text-align:center\">Habits</h2><div class=\"form-group\"><label for=\"healthRank\">How many alcoholic drinks do you consume per week?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.alcoholPerWeek\"><option data-hidden=\"true\">Please Select</option><option>None</option><option>Less than 2</option><option>Between 2 and 7</option><option>8 or more</option></select></div><label style=\"padding-right:10px\" for=\"smoking\">Have you ever smoked?</label><div class=\"btn-group\" click.delegate=\"smoking(user.clientMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div show.bind=\"user.clientMyHealth.checksmoking\"><label style=\"padding-right:10px\" for=\"smoking\">Do you still smoke?</label><div class=\"btn-group\" click.delegate=\"stillSmoking(user.clientMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><br><div show.bind=\"user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker are you?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light: less than 10 cigarretes per day</option><option>Average: between 10 and 20 cigarretes per day</option><option>Heavy: more than 20 cigarretes per day</option></select></div><div show.bind=\"!user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker were you?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light: less than 10 cigarretes per day</option><option>Average: between 10 and 20 cigarretes per day</option><option>Heavy: more than 20 cigarretes per day</option></select></div><div show.bind=\"!user.clientMyHealth.checkStillSmoking && user.clientMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">At what age did you quit smoking?</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.ageQuitSmoking\"><option data-hidden=\"true\">Please Select</option><option>Before 25</option><option>25-34</option><option>35-44</option><option>45-59</option><option>60+</option></select></div><hr><h2 style=\"text-align:center\">Parent's Health</h2><div class=\"form-group\"><label for=\"race\">Age of parents at passing:</label><select class=\"form-control\" value.bind=\"user.clientMyHealth.ageOfParents\"><option>Please Select</option><option>Both after the age of 75</option><option>Both before the age of 75</option><option>Only one after the age of 75</option><option>Only one is still alive and older than 75</option><option>Only one is still alive and younger than 75</option><option>They are both still alive and older than 75</option><option>They are both still alive and younger than 75</option><option>They are both still alive and one is older than 75</option></select></div></div><div id=\"spouse\" style=\"width:45%;float:right\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h1 style=\"text-align:center\">My Health - Co-Client</h1><div show.bind=\"validHeightSpouse\" class=\"alert alert-danger\" role=\"alert\"><strong>Uh oh!</strong> Please be sure to enter a valid height in the format: feet ' inches.</div><div><div class=\"${user.spouseMyHealth.formHeightWeight ? 'col-md-8' : 'none'}\"><div class=\"form-group ${user.spouseMyHealth.heightError}\"><label for=\"height\">Height</label><span id=\"height-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.spouseMyHealth.height\" class=\"form-control\" placeholder=\"5'7\" change.trigger=\"checkHeight(user.spouseMyHealth)\"></div><div class=\"form-group\"><label for=\"weight\">Weight</label><span id=\"weight-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span> <input type=\"text\" value.bind=\"user.spouseMyHealth.weight\" class=\"form-control\" placeholder=\"155\" change.trigger=\"calculateBMI(user.spouseMyHealth)\"></div><div id=\"spouse-bmi-alert\" class=\"alert alert-success\" show.bind=\"user.spouseMyHealth.validBMI\"><strong>BMI: ${user.spouseMyHealth.bmi}</strong></div></div><div show.bind=\"user.spouseMyHealth.validBMI\" class=\"${user.spouseMyHealth.formHeightWeight ? 'col-md-2' : 'none'}\"><img src.bind=\"user.spouseMyHealth.iconType\" style=\"width:150px;height:220px\"></div></div><div class=\"form-group\"><label for=\"healthRank\">How many hours do you exercise per week?</label><span id=\"spouse-exercise-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.spouseMyHealth.exercisePerWeek\"><option data-hidden=\"true\">Please Select</option><option>0</option><option>Less than 2.5 hours</option><option>Approximately 2.5 hours</option><option>More than 2.5 hours</option></select></div><div class=\"form-group\"><label for=\"healthRank\">How would you rank your health?</label><span id=\"spouse-health-rank-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><select class=\"form-control\" value.bind=\"user.spouseMyHealth.healthRank\"><option data-hidden=\"true\">Please Select</option><option>I'm in great health</option><option>I'm in ok health</option><option>I'm in poor health</option></select></div><hr><h2 style=\"text-align:center\">Conditions</h2><label style=\"padding-right:10px\" for=\"diabetes\">Do you have diabetes?</label><div class=\"btn-group\" click.delegate=\"diabetes(user.spouseMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checkdiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checkdiabetes ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><label for=\"mentalCondition\">Are you currently diagnosed with a serious mental condition?</label><span id=\"spouse-mental-tooltip\" title=\"\" class=\"glyphicon glyphicon-question-sign\"></span><div class=\"btn-group\" click.delegate=\"mental(user.spouseMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checkmental ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checkmental ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><hr><h2 style=\"text-align:center\">Habits</h2><div class=\"form-group\"><label for=\"healthRank\">How many alcoholic drinks do you consume per week?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.alcoholPerWeek\"><option data-hidden=\"true\">Please Select</option><option>0-1</option><option>2-7</option><option>8+</option></select></div><label style=\"padding-right:10px\" for=\"gender\">Have you ever smoked?</label><div class=\"btn-group\" click.delegate=\"smoking(user.spouseMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checksmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div><br><br><div show.bind=\"user.spouseMyHealth.checksmoking\"><label style=\"padding-right:10px\" for=\"smoking\">Do you still smoke?</label><div class=\"btn-group\" click.delegate=\"stillSmoking(user.spouseMyHealth)\" data-toggle=\"buttons\"><label class=\"btn ${user.spouseMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.spouseMyHealth.checkStillSmoking ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><br><div show.bind=\"user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker are you?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light: less than 10 cigarretes per day</option><option>Average: between 10 and 20 cigarretes per day</option><option>Heavy: more than 20 cigarretes per day</option></select></div><div show.bind=\"!user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">What kind of smoker were you?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.kindOfSmoker\"><option data-hidden=\"true\">Please Select</option><option>Light: less than 10 cigarretes per day</option><option>Average: between 10 and 20 cigarretes per day</option><option>Heavy: more than 20 cigarretes per day</option></select></div><div show.bind=\"!user.spouseMyHealth.checkStillSmoking && user.spouseMyHealth.checksmoking\" class=\"form-group\"><label for=\"healthRank\">At what age did you quit smoking?</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.ageQuitSmoking\"><option data-hidden=\"true\">Please Select</option><option>Before 25</option><option>25-34</option><option>35-44</option><option>45-59</option><option>60+</option></select></div><hr><h2 style=\"text-align:center\">Parent's Health</h2><div class=\"form-group\"><label for=\"race\">Age of parents at passing:</label><select class=\"form-control\" value.bind=\"user.spouseMyHealth.ageOfParents\"><option>Please Select</option><option>Both after the age of 75</option><option>Both before the age of 75</option><option>Only one after the age of 75</option><option>Only one is still alive and older than 75</option><option>Only one is still alive and younger than 75</option><option>They are both still alive and older than 75</option><option>They are both still alive and younger than 75</option><option>They are both still alive and one is older than 75</option></select></div><br><br><br></div><br><hr style=\"clear:both\"><div id=\"back-button-div\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div><div id=\"submit-button-div\" class=\"col-md-2\"><button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">Submit</button></div></form></template>"; });
define('text!results/results.html', ['module'], function(module) { module.exports = "<template><require from=\"highcharts/css/highcharts.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.css\"></require><require from=\"ion-rangeslider/css/ion.rangeSlider.skinHTML5.css\"></require><require from=\"ion-rangeslider/css/normalize.css\"></require><div id=\"results\"><h1 style=\"text-align:center\">Results</h1><div id=\"chart-container\" style=\"width:100%;height:400px\"></div><div id=\"client\"><hr><h3 style=\"text-align:center\">Client Results - Life Expectancy is: <b>${user.clientResults.finalLifeExpectancy}</b></h3><div class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Probability to Reach Age</th><th repeat.for=\"num of user.clientResults.clientTableValue.length\">${user.clientResults.clientTableValue[num]}</th></tr></thead><tbody><tr><th>Age</th><td repeat.for=\"age of user.clientResults.clientTableAge.length\">${user.clientResults.clientTableAge[age]}</td></tr></tbody></table></div></div><div id=\"average\"><h3 style=\"text-align:center\">Average Results for ${user.clientPersonalInfo.race} ${user.clientPersonalInfo.gender} at age ${user.clientPersonalInfo.age}</h3><div class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Probability to Reach Age</th><th repeat.for=\"num of user.clientResults.averageTableValue.length\">${user.clientResults.averageTableValue[num]}</th></tr></thead><tbody><tr><th>Age</th><td repeat.for=\"age of user.clientResults.averageTableAge.length\">${user.clientResults.averageTableAge[age]}</td></tr></tbody></table></div></div><div id=\"spouse\" show.bind=\"user.clientPersonalInfo.checkspouse\"><hr><br><br><h3 style=\"text-align:center\">Spouse Results - Life Expectancy is: <b>${user.spouseResults.finalLifeExpectancy}</b></h3><div class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Probability to Reach Age</th><th repeat.for=\"num of user.spouseResults.spouseTableValue.length\">${user.spouseResults.spouseTableValue[num]}</th></tr></thead><tbody><tr><th>Age</th><td repeat.for=\"age of user.spouseResults.spouseTableAge.length\">${user.spouseResults.spouseTableAge[age]}</td></tr></tbody></table></div></div><div id=\"spouse\" show.bind=\"user.clientPersonalInfo.checkspouse\"><h3 style=\"text-align:center\">Average Results for ${user.spousePersonalInfo.race} ${user.spousePersonalInfo.gender} at age ${user.spousePersonalInfo.age}</h3><div class=\"table-outter\"><table class=\"table table-hover table-bordered search-table\"><thead><tr><th>Probability to Reach Age</th><th repeat.for=\"num of user.spouseResults.spouseTableValue.length\">${user.spouseResults.spouseAverageTableValue[num]}</th></tr></thead><tbody><tr><th>Age</th><td repeat.for=\"age of user.spouseResults.spouseTableAge.length\">${user.spouseResults.spouseAverageTableAge[age]}</td></tr></tbody></table></div></div><div show.bind=\"user.clientPersonalInfo.checkspouse\"><hr><label style=\"padding-right:10px\" for=\"ifSpouseDies\">Check scenarios if my spouse dies?</label><div class=\"btn-group\" click.delegate=\"checkSpouseDeath(user.clientResults)\" data-toggle=\"buttons\"><label class=\"btn ${user.clientResults.checkSpouseDeath ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">Yes</label><label class=\"btn ${!user.clientResults.checkSpouseDeath ? 'active btn-primary' : 'btn-secondary'}\"><input type=\"radio\">No</label></div></div><br><br><div show.bind=\"user.clientResults.checkSpouseDeath && user.clientPersonalInfo.checkspouse\" class=\"form-group\"><label for=\"age\">Age of passing:</label><input style=\"width:400px\" id=\"spouseDies\"></div><hr style=\"clear:both\"><div id=\"back-button-div-home\" class=\"col-md-10\"><button id=\"back\" class=\"btn btn-secondary\" click.delegate=\"back()\">Back</button></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map