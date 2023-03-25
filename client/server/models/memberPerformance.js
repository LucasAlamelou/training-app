export class MemberPerformance {
    constructor(idMember, vo2max, seuilLactateFC, seuilLactate, fcRest, fcMax, vma, favoriteSport) {
        this.idMember = idMember;
        this.vo2max = vo2max;
        this.seuilLactateFC = seuilLactateFC;
        this.seuilLactate = seuilLactate;
        this.fcRest = fcRest;
        this.fcMax = fcMax;
        this.vma = vma;
        this.favoriteSport = favoriteSport;
    }

    // TODO validation des données
}
