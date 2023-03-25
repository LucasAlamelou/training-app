export class MemberHealth {
    constructor(idMember, weight, height, hourSleep) {
        this.idMember = idMember;
        this.weight = weight;
        this.height = height;
        this.hourSleep = hourSleep;
    }
    getIdMember() {
        return this.idMember;
    }
    setIdMember(idMember) {
        this.idMember = idMember;
    }
    getWeight() {
        return this.weight;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
}
