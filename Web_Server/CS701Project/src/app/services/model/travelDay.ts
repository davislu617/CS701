import { Transport } from './transport';
import { Attraction } from './attraction';
import { Hotel } from './hotel';
import { Other } from './other';

export class TravelDay {
    date: Date;
    formattedDate: string;
    transportList: Transport[];
    attractionList: Attraction[];
    hotel: Hotel;
    otherList: Other[];
}