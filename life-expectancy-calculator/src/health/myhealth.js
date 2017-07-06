import $ from 'jquery';
import 'jquery-ui-dist';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {User} from '../services/user';
import {CalculateMyHealth} from '../utilities/calculations/calculateMyHealth';

@inject(Router, User, CalculateMyHealth)
export class myhealth {
    heightError = "";
    formHeightWeight = "";

    constructor(router, user, calculateMyHealth) {
        this.calculateMyHealth = calculateMyHealth;
        this.router = router;
        this.user = user;
    }

    //Checks for valid height for the client.
    checkHeight(person) {
        var valid = /^[2-9]' ?(?:\d|1[0-1])"?$/.test(this.user.clientMyHealth.height);
        person.validHeight = valid;
        this.heightError = valid ? "" : "has-error";
        if(valid) {
            var feetAndInches = person.height.split("'");
            person.heightInInches = parseInt(feetAndInches[0]) * 12 + parseInt(feetAndInches[1]);
        }
        //This handles the case where they first entered their weight
        if(person.validWeight) {
            this.calculateBMI(person);
        }
    }

    //This calculates the BMI once both of the height and weight have been entered
    calculateBMI(person) {
        if(person.validHeight) {
            this.calculateMyHealth.calculateBMI(person);
            person.validBMI = true;
            this.setIconType(person, false)
            person.iconType = "./src/health/images" + person.iconType + ".jpg";
        }
        person.validWeight = true;
        person.formHeightWeight = true;
    }

    //Determines the icon types give the client/spouse. If client is passed in then, spouse = false.
    setIconType(person, spouse) {
        console.log(person.bmi);
        switch(true) {
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
        console.log(person.iconType);
        return person;
    }

    //CHECK SMOKING
    smoking(person) {
        person.checksmoking = !person.checksmoking;
    }

    stillSmoking(person) {
        person.checkStillSmoking = !person.checkStillSmoking;
    }

    back() {
        this.router.navigate('#/personalinfo');  
    }

    submit() {
        //BMI AND EXERCISE CALCULATIONS
        this.calculateMyHealth.calculateBMI(this.user.clientMyHealth);

        if(this.user.clientMyHealth.exercisePerWeek && this.user.clientMyHealth.exercisePerWeek != "Please Select") {
            if(this.user.clientMyHealth.bmi) this.calculateMyHealth.calculateExercise(this.user.clientMyHealth);
            else alert("We need a BMI");
            this.user.clientResults.exercise = this.user.clientMyHealth.exerciseLifeExpectancy;
        }

            this.calculateMyHealth.calculateExercise(this.user.clientMyHealth);
        this.user.clientResults.exercise = this.user.clientMyHealth.exerciseLifeExpectancy;

        //SMOKER CALCULATIONS
        this.calculateMyHealth.calculateSmoker(this.user.clientMyHealth);
        this.user.clientResults.smoker = this.user.clientMyHealth.smokerLifeExpectancy;

        console.log(this.user.clientMyHealth);

        if(this.user.clientPersonalInfo.checkspouse) {
            //BMI AND EXERCISE CALCULATIONS
            this.calculateMyHealth.calculateBMI(this.user.spouseMyHealth);
            this.calculateMyHealth.calculateExercise(this.user.spouseMyHealth);
            this.user.spouseResults.exercise = this.user.spouseMyHealth.exerciseLifeExpectancy;
            
            //SMOKER CALCULATIONS
            this.calculateMyHealth.calculateSmoker(this.user.spouseMyHealth);
            this.user.spouseResults.smoker = this.user.spouseMyHealth.smokerLifeExpectancy;
            console.log(this.user.spouseMyHealth);
        }
        this.router.navigate('#/personalinfo');  
    }

    //This takes care of setting up the content for the tooltips
    attached() {
        //=====================CLIENT TOOLTIPS============================
        $('#height-tooltip').tooltip( {
            content: "Your height is used to calculate your <b>Body Mass Index (BMI)</b>."
        });

        $('#weight-tooltip').tooltip( {
            content: "Your weight is used to calculate your <b>Body Mass Index (BMI)</b>."
        });

        $('#exercise-tooltip').tooltip( {
            content: "For every 1 minute of exercise, you get 7 minutes of extra life.<br><b>- National Institute of Health</b>"
        });

        $('#health-rank-tooltip').tooltip({
            content: "How you view your health impacts your life expectancy."
        })

        //=====================SPOUSE TOOLTIPS============================
        $('#spouse-height-tooltip').tooltip( {
            content: "Your height is used to calculate your <b>Body Mass Index (BMI)</b>."
        });

        $('#spouse-weight-tooltip').tooltip( {
            content: "Your weight is used to calculate your <b>Body Mass Index (BMI)</b>."
        });

        $('#spouse-exercise-tooltip').tooltip( {
            content: "For every 1 minute of exercise, you get 7 minutes of extra life.<br><b>- National Institute of Health</b>"
        });

        $('#spouse-health-rank-tooltip').tooltip({
            content: "How you view your health impacts your life expectancy."
        })
    }
}