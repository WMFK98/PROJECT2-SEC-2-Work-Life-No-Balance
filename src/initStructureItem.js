import TypeItem from "./TypeItem";
import Diceplus from "./assets/Icon_Dice_1/DicePlus.png";
import DelDice from "./assets/Icon_Dice_1/DelDice.png";
import DelTenSC from "./assets/Icon_Dice_1/DelTenSC.png";
import OddAndEven from "./assets/Icon_Dice_1/ODDEVENT.png";
import SixOneTime from "./assets/Icon_Dice_1/OneSixTM.png";
import PlusTwo from "./assets/Icon_Dice_1/PlusTwo.png";
import SqureTwo from "./assets/Icon_Dice_1/SqureTwo.png";
const G6 = new TypeItem(
  "6",
  null,
  6,
  "การันตีว่าลูกเต๋า 1 ลูกจะทอยได้ 6",
  false,
  false,
  SixOneTime
);
const N10C = new TypeItem(
  "-10",
  null,
  0,
  "ลบ 10 “คะแนนของผู้เล่น” ฝ่ายตรงข้าม สามารถลดจนเหลือ 0",
  false,
  true,
  DelTenSC
);
const addDice = new TypeItem(
  "Dice+",
  null,
  1,
  "เพิ่มลูกเต๋า 1 ลูกในทั้งตานั้น สามารถเพิ่มได้สูงสุด 5 ลูก",
  false,
  false,
  Diceplus
);
const X2P50 = new TypeItem(
  "X2>3",
  null,
  8,
  "เเต้มที่ได้จากการทอยจะ คูณ2 เเต่ละหน้าของทุกลูกเต๋าต้องมากกว่า 3 ไม่งั้นจะสลับฝั่งผู้เล่นทันที",
  true,
  false,
  SqureTwo
);
const OAE = new TypeItem(
  "O&E",
  null,
  9,
  'เมื่อผู้เล่นทอยได้ผลรวมเป็น "คู่" จะขโมย “คะแนนของผู้เล่น” ของฝ่ายตรงข้ามเเต่ถ้าผลรวมเป็น "คี่" จะเเบ่งครึ่งนึงของที่ทอยได้ไปเพิ่ม “คะแนนของผู้เล่น” ให้ฝ่ายตรงข้าม',
  false,
  true,
  OddAndEven
);
const popDice = new TypeItem(
  "Dice-",
  null,
  1,
  "ลดลูกเต๋า 1 ลูกในทั้งตานั้น สามารถลดได้จนเหลือ 1 ลูก",
  false,
  false,
  DelDice
);
const plus2Point = new TypeItem(
  "+2",
  null,
  7,
  "ทุกการทอยจะเพิ่ม “คะแนนในตานั้น” 2 เเต้ม",
  false,
  false,
  PlusTwo
);
export default { X2P50, addDice, popDice, G6, plus2Point, OAE, N10C };

//   checkSelectedItems = reactive(new Array(pollItem.length).fill(true));
//   pollSelectedItems.push(X2P50, addDice, G6, N10C, OAE, popDice, plus2Point);
