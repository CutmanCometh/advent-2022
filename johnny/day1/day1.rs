//
//  day1 : Which elf has the most calories?
//  
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::collections::HashMap;

fn main() {
    let mut elf_calories: HashMap<u32, u32> = HashMap::new();

    let prompt = "What are the highest caloric sums?";
    welcome_message(prompt);

    let file_path = "./input1.txt";
    setup_data(&mut elf_calories, file_path);

    let mut all_summed_calories: Vec<u32> = elf_calories.values().cloned().collect();
    all_summed_calories.sort();
    let arr_len = all_summed_calories.len() - 1;

    let first = all_summed_calories[arr_len];
    let second = all_summed_calories[arr_len-1];
    let third = all_summed_calories[arr_len-2];
    let max_of_three = first+second+third;
    println!("Top 3 are {first}, {second}, {third}", first=first, second=second, third=third);
    println!("Max of Top 3: {max}", max=max_of_three);
}

fn welcome_message(welcome: &str) {
    println!("Day 1: {}", welcome);
}

fn setup_data(elf_calories: &mut HashMap<u32, u32>, file_path: &str) {
    let mut elf_count = 1;
    let mut calorie_sum = 0;

    if let Ok(lines) = read_lines(file_path) {
        for line in lines {
            if let Ok(calorie) = line {
                if calorie.to_string().is_empty() {
                    elf_calories.insert(elf_count, calorie_sum);
                    //println!("{elf} has {sum}", elf=elf_count, sum=calorie_sum);

                    elf_count += 1;
                    calorie_sum = 0;
                    continue;
                } else {
                    let current_calorie = calorie.parse::<u32>().unwrap();

                    //println!("{curr} + {next}", curr=calorie_sum, next=current_calorie);
                    calorie_sum += current_calorie;
                }
            }
        }

        elf_calories.insert(elf_count, calorie_sum);
        // println!("{elf} has {sum}", elf=elf_count, sum=calorie_sum);
    }

}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
