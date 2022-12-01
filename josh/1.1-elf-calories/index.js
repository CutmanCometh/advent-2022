import fs from "fs";

const caloriesText = fs.readFileSync("calories.txt", "utf8");

const [maxCalorieCount] = caloriesText
    .split("\n\n")
    .map((elfCalories) => {
        const calories = elfCalories
            .split("\n")
            .map(Number)
            .reduce((a, b) => a + b, 0);
        return calories;
    })
    .sort((a, b) => b - a);

console.log(maxCalorieCount);
