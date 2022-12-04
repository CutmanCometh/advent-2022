//
//  day3 : What is the sum of the ruck sack priorities?
//

use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::collections::HashSet;
use std::collections::HashMap;

fn main() {
    let mut wrong_items: HashMap<u32, char> = HashMap::new();

    let prompt = "What is the sum of ruck sack priorities?";
    welcome_message(prompt);

    let file_path = "./input2.txt";
    //setup_data_part1(&mut wrong_items, file_path);
    setup_data_part2(&mut wrong_items, file_path);

    sum_priorities(&mut wrong_items);
}

fn convert_char(ch: char) -> u32 {
    let val = ch as u32;
    if val > 96 {
        return val-96;
    } else {
        return val-38;
    }
}

fn welcome_message(welcome: &str) {
    println!("Day 3: {}", welcome);
}

fn sum_priorities(wrong_items: &mut HashMap<u32, char>) {
    let mut sum = 0;
    for key in wrong_items.keys() {
        sum += convert_char(wrong_items[key]);
    }

    println!("{}", sum);
}

fn setup_data_part1(wrong_items: &mut HashMap<u32, char>, file_path: &str) {
    let mut sack_count = 1;

    let mut sack1: HashSet<char> = HashSet::new();

    if let Ok(lines) = read_lines(file_path) {
        // Consumes the iterator, returns an (Optional) String
        for line in lines {

            if let Ok(sack) = line {
                for (i, item) in sack.chars().enumerate() {
                    if (sack.len() / 2) >= (i+1) {
                        sack1.insert(item);
                    } else {
                        if sack1.contains(&item) {
                            wrong_items.insert(sack_count, item);
                            //println!("{sack} has {item} on {line}", sack=sack_count, item=item, line=sack);

                            sack_count += 1;
                            sack1.clear();
                            break;
                        }
                    }
                }

                continue;
            }
        }
    }
}

fn setup_data_part2(wrong_items: &mut HashMap<u32, char>, file_path: &str) {
    let mut sack_count = 1;
    let mut elf_count = 1;

    let mut sack1: HashSet<char> = HashSet::new();
    let mut sack2: HashSet<char> = HashSet::new();

    if let Ok(lines) = read_lines(file_path) {
        for line in lines {

            if let Ok(sack) = line {
                for item in sack.chars() {
                    if elf_count == 1 {
                        sack1.insert(item);
                    } else if elf_count == 2 {
                        sack2.insert(item);
                    } else {
                        if sack1.contains(&item) && sack2.contains(&item) {
                            wrong_items.insert(sack_count, item);
                            //println!("{sack} has {item} on {line}", sack=sack_count, item=item, line=sack);

                            sack_count += 1;
                            sack1.clear();
                            sack2.clear();
                            break;
                        }
                    }

                }

                elf_count += 1;

                if elf_count > 3 {
                    elf_count = 1;
                }

                continue;
            }
        }
    }
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
