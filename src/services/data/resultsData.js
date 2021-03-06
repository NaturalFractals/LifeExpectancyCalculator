import {transient} from 'aurelia-framework';

@transient()
export class ResultsData {
    constructor() {
        this.checkSpouseDeath = false;
        this.spouseDeath;
        
        //PERSONAL INFO EXPECTANCIES
        this.education = 0;
        this.marital = 0;
        this.county = 0;

        //MY HEALTH EXPECTANCIES
        this.exercise = 0;
        this.smoker = 0;
        this.healthrank = 0;
        this.diabetes = 0;
        this.mental = 0;
        this.parentAges = 0;
        this.alcohol = 0;

        //OCCUPATION EXPECTANCIES
        this.income = 0;

        //OVERALL EXPECTANCY
        this.overallLifeExpectancy = 0;

        //TUPLES
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
    }
}