//
//  Advent of Code 2022
//

mod utils;
use std::collections::HashMap;

fn main() {
    // Initialize
    let day = 4;
    let prompt = "Overlapping Ranges";
    let file_path = format!("./inputs/input{}.txt", day);
    utils::welcome_message(day, prompt);

    // Data processing
    let mut line_results: HashMap<u32, char> = HashMap::new();
    line_processing(&mut line_results, file_path.as_str());

    // Conclusion
    //utils::sum_results(&mut line_results);
}

fn partially_contained(first: &str, second: &str) -> bool {
    let f_split: Vec<String> = first.split("-").map(|s| s.to_string()).collect();
    let s_split: Vec<String> = second.split("-").map(|s| s.to_string()).collect();
    let f1 = f_split[0].parse::<u32>().unwrap();
    let f2 = f_split[1].parse::<u32>().unwrap();
    let s1 = s_split[0].parse::<u32>().unwrap();
    let s2 = s_split[1].parse::<u32>().unwrap();

    if (f1 <= s1 && f2 >= s1) || (s1 <= f1 && s2 >= f1) {
        return true;
    } else {
        return false;
    }
}

fn fully_contained(first: &str, second: &str) -> bool {
    let f_split: Vec<String> = first.split("-").map(|s| s.to_string()).collect();
    let s_split: Vec<String> = second.split("-").map(|s| s.to_string()).collect();
    let f1 = f_split[0].parse::<u32>().unwrap();
    let f2 = f_split[1].parse::<u32>().unwrap();
    let s1 = s_split[0].parse::<u32>().unwrap();
    let s2 = s_split[1].parse::<u32>().unwrap();

    if (f1 <= s1 && f2 >= s2) || (s1 <= f1 && s2 >= f2) {
        return true;
    } else {
        return false;
    }
}

fn line_processing(line_results: &mut HashMap<u32, char>, file_path: &str) {
    let mut line_count = 0;

    if let Ok(lines) = utils::read_lines(file_path) {
        for line in lines {
            if let Ok(value) = line {
                let res: Vec<String> = value.split(",").map(|s| s.to_string()).collect();
                // println!("{first} and {second}", first=res[0], second=res[1]);

                // println!("{first} and {second} -> {contained}", first=res[0], second=res[1], contained=fully_contained(&res[0], &res[1]));
                if partially_contained(&res[0], &res[1]) {
                    line_count += 1;
                }
            }
        }
    }

    println!("Count is {}", line_count);
}
