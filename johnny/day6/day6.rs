//
//  Advent of Code 2022
//

mod utils;
use std::collections::HashSet;

struct Movement {
    count: u32,
    from: u32,
    to: u32,
}

fn main() {
    // Initialize
    let day = 6;
    let prompt = "How much character noise before the signal starts?";
    let file_path = format!("./inputs/input{}.txt", day);
    utils::welcome_message(day, prompt);

    let part1 = true;
    line_processing(file_path.as_str(), &part1);
}

fn all_different(vec: &mut Vec<char>) -> bool {
    let mut results: HashSet<char> = HashSet::new();

    for i in vec {
        if results.contains(&i) {
            return false;
        } else {
            results.insert(*i);
        }
    }

    return true;
}

fn line_processing(file_path: &str, part1: &bool) {
    let mut counter: u32 = 0;

    let mut qu: Vec<char> = vec![];

    let length: usize;
    if *part1 {
        length = 4;
    } else {
        length = 14;
    }

    if let Ok(lines) = utils::read_lines(file_path) {
        for line in lines {
            if let Ok(value) = line {
                for (i, item) in value.chars().enumerate() {
                    if qu.len() == length {
                        if all_different(&mut qu) {
                            println!("Answer is {}", i);
                            break;
                        } else {
                            qu.remove(0);
                            qu.push(item);
                        }
                    } else {
                        qu.push(item);
                    }
                }
            }
        }
    }
} 
