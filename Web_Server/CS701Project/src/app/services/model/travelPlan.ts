import { TravelDay } from './travelDay';

export class TravelPlan {
    id: string;
    destination: string;
    travelDayList: TravelDay[];
    public getSortedDays(): TravelDay[]{
        this.travelDayList.sort((a:TravelDay, b:TravelDay)=>{
            return a.date.getTime() - b.date.getTime();
        })
        return this.travelDayList;
    }
}