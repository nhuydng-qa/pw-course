/**
* Cân nặng lý tưởng = Số lẻ của chiều cao (tính bằng cm) x 9 rồi chia 10
* Mức cân tối đa = Bằng số lẻ của chiều cao (tính bằng cm)
* Mức cân tối thiểu = Số lẻ của chiều cao (tính bằng cm) x 8 rồi chia 10
* Như vậy, nếu bạn cao 1,7m, tức 170cm thì :
* Cân cân nặng lý tưởng của bạn là: 70 x 9: 10 = 63 kg
* Cân nặng tối đa là: 70kg
* Cân nặng tối thiểu là: 70 x 8 :10 = 56 kg
* Phạm vi áp dụng: Công thức áp dụng cho 100 < chiều cao < 200
*/
const height = 150;
let idealWeight = (height - 100) * 9 / 10;
let maxWeight = height - 100;
let minWeight = (height - 100) * 8 / 10;

console.log(`Cân nặng lý tưởng: ${idealWeight}; Cân nặng tối đa: ${maxWeight}; Cân nặng tối thiểu: ${minWeight}`);