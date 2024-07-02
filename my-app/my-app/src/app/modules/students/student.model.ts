import { Absence } from "src/app/models/subject-model/absence.model";


export class Student {
    id!: number;
    firstN?: string;
    lastN?: string;
    address?: string;
    phone?: string;
    status?: boolean;
    avg?: number;
    dateL?: Date;
    idSubject?:number
    semester?:Semester
    absence?:Absence []
    
    constructor(
        firstN: string,
        lastN: string,
        address: string,
        phone: string,
        status: boolean,
        avg: number,
        dateL: Date,
        idSubject:number,
        semester?:Semester
    )
        {
            this.id=0;
            this.firstN=firstN;
            this.lastN=lastN;
            this.address=address;
            this.phone=phone;
            this.status=status;
            this.avg=avg;
            this.dateL=dateL;
           this.idSubject=idSubject;
           this.semester=semester;
           this.absence=[];
        }

}

export enum Semester {
    SemesterA=1,
    SemesterB=2,
    SemesterC=3,
}
// אם עושים עם סימן שאלה צריך לבדוק בשימוש שהוא לא ריק אבל כאשר עושים עם סימן קריאה אין צורך לבדוק זאת