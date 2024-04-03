import TypeItem from "./TypeItem";
import Diceplus from "/images/Icon_Dice_1/DicePlus.png";
import DelDice from "/images/Icon_Dice_1/DelDice.png";
import DelTenSC from "/images/Icon_Dice_1/DelTenSC.png";
import OddAndEven from "/images/Icon_Dice_1/ODDEVENT.png";
import SixOneTime from "/images/Icon_Dice_1/OneSixTM.png";
import PlusTwo from "/images/Icon_Dice_1/PlusTwo.png";
import SqureTwo from "/images/Icon_Dice_1/SqureTwo.png";
const G6 = new TypeItem(
  "G6",
  null,
  6,
  "การันตีลูกเต๋า 1 ลูกจะทอยได้ 6 ",
  false,
  false,
  SixOneTime
);
const N10C = new TypeItem(
  "N10C",
  null,
  0,
  "ลบ 10 คะแนนของผู้เล่นฝ่ายตรงข้าม สามารถลดจนเหลือ 0",
  false,
  true,
  DelTenSC
);
const addDice = new TypeItem(
  "Dice+",
  null,
  1,
  "เพิ่มลูกเต๋า 1 ลูกให้เจ้าของเทิร์น ได้สูงสุด 5 ลูก",
  false,
  false,
  Diceplus
);
const X2P50 = new TypeItem(
  "X2>3",
  null,
  8,
  "แต้มที่ได้จากการทอยจะ คูณ 2 ลูกเต่าทุกหน้าต้องมากกว่า 3 มิฉะนั้นจะโมฆะ",
  true,
  false,
  SqureTwo
);
const OAE = new TypeItem(
  "O&E",
  null,
  9,
  'เมื่อผู้เล่นทอยได้ผลรวมเป็น "คู่" จะขโมยคะแนนของผู้เล่นของฝ่ายตรงข้ามเเต่ถ้าผลรวมเป็น "คี่" จะแบ่งครึ่งของแต้มลูกเต๋าไปเพิ่มคะแนนฝ่ายตรงข้าม',
  false,
  true,
  OddAndEven
);
const popDice = new TypeItem(
  "Dice-",
  null,
  1,
  "ลดลูกเต๋า 1 ลูกให้เจ้าของเทิร์น ได้ต่ำสุด 1 ลูก",
  false,
  false,
  DelDice
);
const plus2Point = new TypeItem(
  "+2",
  null,
  7,
  "ทุกครั้งที่ทอยจะได้โบนัส +2 แต้มทั้งเทิร์น",
  true,
  false,
  PlusTwo
);
export default { X2P50, addDice, popDice, plus2Point, G6, OAE, N10C };
