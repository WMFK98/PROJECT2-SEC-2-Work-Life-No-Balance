export default class TypeItem {
  constructor(
    name,
    ability,
    priority = 0,
    discription = '-',
    isPerTurn = true,
    isAttack = false
  ) {
    this.name = name;
    this.priority = priority;
    this.isPerTurn = isPerTurn; //oneTime,oneTurn
    this.isAttack = isAttack;
    this.ability = ability;
    this.discription = discription;
  }
}
