export default class TypeItem {
  constructor(
    name,
    ability,
    priority = 0,
    discription = "-",
    isPerTurn = true,
    isAttack = false,
    picture = null
  ) {
    this.name = name;
    this.priority = priority;
    this.isPerTurn = isPerTurn;
    this.isAttack = isAttack;
    this.ability = ability;
    this.discription = discription;
    this.picture = picture;
  }

  addAbility(newAbility) {
    this.ability = newAbility;
  }
}
