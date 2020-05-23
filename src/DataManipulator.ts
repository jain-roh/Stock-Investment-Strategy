import { ServerRespond } from './DataStreamer';

// var avg_ratio=0;
// var count=0;
// var upperBound=1+0.05;
// var lowerBound=1-0.05;
// var flag=false;
var day_avg_50=0;
var day_avg_25=0;
var day_avg_10=0;
var day_avg_3=0;
var i=0;
var ij=0;
var ji=0;
export interface Row {
  price_abc:number,
  price_def:number,
  ratio:number,
  timestamp:Date,
  lower_bound:number,
  upper_bound:number,
  trigger_alert:number|undefined,
  trigger_alert_50_day:number|undefined,
  trigger_alert_25_day:number|undefined,
  trigger_alert_10_day:number|undefined,
  trigger_alert_3_day:number|undefined,
}


export class DataManipulator {

  static generateRow(serverResponds: ServerRespond[]): Row{
    const priceABC=(serverResponds[0].top_ask.price+serverResponds[0].top_bid.price)/2;
    const priceDEF=(serverResponds[1].top_ask.price+serverResponds[1].top_bid.price)/2;
    const ratio=priceABC/priceDEF;
    var triggerVal=0;
    if(day_avg_50==0)
    {
      day_avg_50=ratio;
      day_avg_25=ratio;
      day_avg_10=ratio;
      day_avg_3=ratio;

      
    }
    else{
    day_avg_50=0.98*day_avg_50+0.02*ratio;
    day_avg_25=0.96*day_avg_25+0.04*ratio;
    day_avg_10=0.90*day_avg_10+0.10*ratio;
    day_avg_3=0.66*day_avg_3+0.34*ratio;
    }
    // if(ratio>1.03)
    // {
    //   ij=ij+1;
    //   ji=ji-1;
    //   day_avg_3[]=ratio
    //   if(ij==3)
    //   {
    //     triggerVal=ij;
    //     ij=0;
    //     ji=0;
    //   }
    // }
    // else if(ratio<0.97){
    //   ji=ji+1;
    //   ij=ij-1;

    //   if(ji==3)
    //   {
    //     triggerVal=ji;
    //     ij=0;
    //     ji=0
    //   }
    // }
    // var ts=serverResponds[0].timestamp>serverResponds[1].timestamp ?
    // serverResponds[0].timestamp:serverResponds[1].timestamp;
    // if(lower_timestamp=null)
    // {
    //   lower_timestamp=serverResponds[0].timestamp>serverResponds[1].timestamp ?
    //   serverResponds[0].timestamp:serverResponds[1].timestamp;
    //   flag=true
    // }
    
    // var upper_timestamp=serverResponds[0].timestamp>serverResponds[1].timestamp ?
    // serverResponds[0].timestamp:serverResponds[1].timestamp;
    

    // if((upper_timestamp.getMonth()-ts.getMonth())<12)
    // {
    //   avg_ratio=avg_ratio+ratio;
    //   count=count+1;
    // }
    // else{
    //   avg_ratio=avg_ratio/count;
    //   upperBound=avg_ratio*1.10;
    //   lowerBound=avg_ratio*0.05;
    // }
    const upperBound=1+0.05;
    const lowerBound=1-0.05;
    return {
      price_abc:priceABC,
      price_def:priceDEF,
      ratio,
      timestamp:serverResponds[0].timestamp>serverResponds[1].timestamp ?
      serverResponds[0].timestamp:serverResponds[1].timestamp,
      upper_bound:upperBound,
      lower_bound:lowerBound,
      trigger_alert:(ratio>upperBound||ratio<lowerBound) ? ratio:undefined,
      trigger_alert_50_day:day_avg_50,
      trigger_alert_25_day:day_avg_25,
      trigger_alert_10_day:day_avg_10,
      trigger_alert_3_day:day_avg_3,

    };
  }
}
//     return serverResponds.map((el: any) => {
//       return {
//         stock: el.stock,
//         top_ask_price: el.top_ask && el.top_ask.price || 0,
//         timestamp: el.timestamp,
//       };
//     })
//   }
// }
