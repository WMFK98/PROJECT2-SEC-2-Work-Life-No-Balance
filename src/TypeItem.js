export default class TypeItem {
  static nextid = 1;
  constructor(
    name,
    ability,
    priority = 0,
    discription = "-",
    isPerTurn = true,
    isAttack = false,
    picture = null,
    isEnable = true
  ) {
    this.id = TypeItem.nextid++;
    this.name = name;
    this.priority = priority;
    this.isPerTurn = isPerTurn;
    this.isAttack = isAttack;
    this.ability = ability;
    this.discription = discription;
    this.picture = picture;
    this.isEnable = isEnable;
  }
  toggleEnable() {
    this.isEnable = !this.isEnable;
    console.log(this.isEnable);
  }
  addAbility(newAbility) {
    this.ability = newAbility;
  }
}
