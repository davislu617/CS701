import { TravelPlan } from './travelPlan';
import { TravelDay } from './travelDay';
import { Transport } from './transport';
import { Attraction } from './attraction';
import { Hotel } from './hotel';
import { Other } from './other';

var travelPlan: TravelPlan = new TravelPlan();
travelPlan.id = '1000a';

travelPlan.destination = 'Boston';

travelPlan.travelDayList = [new TravelDay()];
travelPlan.travelDayList[0].date = new Date('09/01/2017');

travelPlan.travelDayList[0].transportList = [new Transport()];
travelPlan.travelDayList[0].transportList[0].name = 'Flight NYC-BOS';
travelPlan.travelDayList[0].transportList[0].detail = "Delta 2233, 08:30am";

travelPlan.travelDayList[0].attractionList = [new Attraction()];
travelPlan.travelDayList[0].attractionList[0].name = 'Boston Common';
travelPlan.travelDayList[0].attractionList[0].location = 'Downtown Boston';

travelPlan.travelDayList[0].hotel = new Hotel();
travelPlan.travelDayList[0].hotel.name = 'Marriott Downtown';
travelPlan.travelDayList[0].hotel.location = 'Downtown Boston';

travelPlan.travelDayList[0].otherList = [new Other()];
travelPlan.travelDayList[0].otherList[0].name = 'Grill 23 & Bar';
travelPlan.travelDayList[0].otherList[0].detail = 'Steakhouse';
travelPlan.travelDayList[0].otherList[0].location = '161 Berkeley Street, Boston, MA';

var travelDay = new TravelDay();
travelDay.date = new Date('09/02/2017');

travelDay.transportList = [new Transport()];
travelDay.transportList[0].name = 'Flight NYC-BOS';
travelDay.transportList[0].detail = "Delta 2233, 08:30am";

travelDay.attractionList = [new Attraction()];
travelDay.attractionList[0].name = 'Boston Common';
travelDay.attractionList[0].location = 'Downtown Boston';




travelPlan.travelDayList.push(travelDay);

var travelPlan1: TravelPlan = new TravelPlan();
travelPlan1.id = '1000b';

travelPlan1.destination = 'NYC';

travelPlan1.travelDayList = [new TravelDay()];
travelPlan1.travelDayList[0].date = new Date('08/02/2017');

travelPlan1.travelDayList[0].transportList = [new Transport()];
travelPlan1.travelDayList[0].transportList[0].name = 'Flight BOS-NYC';
travelPlan1.travelDayList[0].transportList[0].detail = "Delta 2234, 08:30am";

travelPlan1.travelDayList[0].attractionList = [new Attraction()];
travelPlan1.travelDayList[0].attractionList[0].name = 'Times Square';
travelPlan1.travelDayList[0].attractionList[0].location = 'Midtown';

travelPlan1.travelDayList[0].hotel = new Hotel();
travelPlan1.travelDayList[0].hotel.name = 'Marriott Manhattan';
travelPlan1.travelDayList[0].hotel.location = 'Midtown';

travelPlan1.travelDayList[0].otherList = [new Other()];
travelPlan1.travelDayList[0].otherList[0].name = 'Dance Parade';
travelPlan1.travelDayList[0].otherList[0].detail = 'Event';
travelPlan1.travelDayList[0].otherList[0].location = 'Downtown';

var travelPlanList: TravelPlan[] = [travelPlan, travelPlan1]
export default travelPlanList;