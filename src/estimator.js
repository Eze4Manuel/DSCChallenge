
function convertTime(time, value) {
  if (time === 'days') {
    return value;
  } if (time === 'weeks') {
    return value / 7;
  } else {
    return value / 30;
    }
  }

const covid19ImpactEstimator = (data) => {
   return {
       data: { ...data },
       impact: {
           currentlyInfected: data.reportedCases * 10,
           infectionsByRequestedTime: function(){
                                      let temp = 2 ** Math.floor(convertTime(data.periodType, data.timeToElapse) / 3);
                                      return this.currentlyInfected * temp;
                                    },
           severeCasesByRequestedTime: function(){
                                      return this.infectionsByRequestedTime() * 0.15;
                                    },
           hospitalBedsByRequestedTime: function(){
                                      let availableBeds = Math.floor(data.totalHospitalBeds * 0.35);
                                      return availableBeds - this.severeCasesByRequestedTime();
                                    },
           casesForICUByRequestedTime: function(){
                                        return Math.floor(this.infectionsByRequestedTime() * 0.05)
                                      },
           casesForVentilatorsByRequestedTime: function(){
                                                  return Math.floor(this.infectionsByRequestedTime() * 0.02)
                                                },
           dollarsInFlight: function(){
                              return (this.infectionsByRequestedTime() * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * Math.floor(convertTime(data.periodType, data.timeToElapse)))
                            }
       },
       severeImpact: {
           currentlyInfected: data.reportedCases * 50,
           infectionsByRequestedTime: function(){
                                      let temp = 2 ** Math.floor(convertTime(data.periodType, data.timeToElapse) / 3);
                                      return this.currentlyInfected * temp;
                                    },
           severeCasesByRequestedTime: function(){
                                      return this.infectionsByRequestedTime() * 0.15;
                                    },
           hospitalBedsByRequestedTime: function(){
                                      let availableBeds = Math.floor(data.totalHospitalBeds * 0.35);
                                      return availableBeds - this.severeCasesByRequestedTime();
                                    },
           casesForICUByRequestedTime: function(){
                                        return this.infectionsByRequestedTime() * 0.05
                                      },
           casesForVentilatorsByRequestedTime: function(){
                                                  return this.infectionsByRequestedTime() * 0.02
                                                },
           dollarsInFlight: function(){
                              return (this.infectionsByRequestedTime() * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD * Math.floor(convertTime(data.periodType, data.timeToElapse)))
                            }
         }
      }
};
export default covid19ImpactEstimator;
