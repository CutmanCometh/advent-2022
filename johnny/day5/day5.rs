//
//  Advent of Code 2022
//

mod utils;
use std::collections::HashMap;
use std::convert::TryInto;

struct Movement {
    count: u32,
    from: u32,
    to: u32,
}

fn main() {
    // Initialize
    let day = 5;
    let prompt = "What do the top of these boxes look like?";
    let file_path = format!("./inputs/input{}.txt", day);
    utils::welcome_message(day, prompt);

    // Data processing
    let mut line_results: HashMap<u32, Vec<char>> = HashMap::new();
    // initialize_basic(&mut line_results);

    let part1 = false;
    line_processing(&mut line_results, file_path.as_str(), &part1);
    print_all(&mut line_results);
}

fn get_index(stack_number: &u32) -> usize {
    return ((stack_number-1)*4 + 1).try_into().unwrap();
}

fn line_processing(line_results: &mut HashMap<u32, Vec<char>>, file_path: &str, part1: &bool) {
    let mut line_storage: Vec<String> = Vec::new();

    if let Ok(lines) = utils::read_lines(file_path) {
        for line in lines {
            if let Ok(value) = line {
                if value.chars().nth(0) == Some('m') {
                    // handle movement
                    if *part1 {
                        make_move(&value, line_results);
                    } else {
                        make_move_9001(&value, line_results);
                    }
                } else if value.chars().nth(1) == Some('1') {
                    // create stack!
                    let stack_values: Vec<String> = value.split_whitespace().map(|s| s.to_string()).collect();

                    for val in stack_values {
                        let mut vec = vec![];
                        let stack_number = val.parse::<u32>().unwrap();

                        for stored_line in line_storage.iter().rev() {
                            let box_value = stored_line.chars().nth(get_index(&stack_number));
                            if box_value != Some(' ') {
                                vec.push(box_value.unwrap())
                            }
                        }

                        line_results.insert(stack_number, vec);
                    }
                } else {
                    line_storage.push(value);
                }
            }
        }
    }
} 

fn make_move(line: &str, line_results: &mut HashMap<u32, Vec<char>>) {
    let action = parse_move(&line);
    for i in 0..action.count {
        let a = line_results.get_mut(&action.from).unwrap().pop();

        line_results.get_mut(&action.to).unwrap().push(a.unwrap());
    }
}

fn make_move_9001(line: &str, line_results: &mut HashMap<u32, Vec<char>>) {
    let action = parse_move(&line);
    let mut vec1 = vec![];
    for i in 0..action.count {
        let a = line_results.get_mut(&action.from).unwrap().pop();

        vec1.push(a.unwrap());
    }

    for c in vec1.iter().rev() {
        line_results.get_mut(&action.to).unwrap().push(*c);
    }

}

fn parse_move(line: &str) -> Movement {
    let line_split: Vec<String> = line.split(" ").map(|s| s.to_string()).collect();

    let count = line_split[1].parse::<u32>().unwrap();
    let from = line_split[3].parse::<u32>().unwrap();
    let to = line_split[5].parse::<u32>().unwrap();

    let result = Movement { count, from, to };

    return result;
}

fn print_all(line_results: &mut HashMap<u32, Vec<char>>) {
    let mut result = String::from("");
    for i in 1..10 {
        result.push(*line_results[&i].last().unwrap());
    }

    println!("Result is {}", result);
}

/*
   fn initialize_basic(line_results: &mut HashMap<u32, Vec<char>>) {
   let vec1 = vec!['R', 'P', 'C', 'D', 'B', 'G'];
   let vec2 = vec!['H', 'V', 'G'];
   let vec3 = vec!['N', 'S', 'Q', 'D', 'J', 'P', 'M'];
   let vec4 = vec!['P', 'S', 'L', 'G', 'D', 'C', 'N', 'M'];
   let vec5 = vec!['J', 'B', 'N', 'C', 'P', 'F', 'L', 'S'];
   let vec6 = vec!['Q', 'B', 'D', 'Z', 'V', 'G', 'T', 'S'];
   let vec7 = vec!['B', 'Z', 'M', 'H', 'F', 'T', 'Q'];
   let vec8 = vec!['C', 'M', 'D', 'B', 'F'];
   let vec9 = vec!['F', 'C', 'Q', 'G'];

   line_results.insert(1, vec1);
   line_results.insert(2, vec2);
   line_results.insert(3, vec3);
   line_results.insert(4, vec4);
   line_results.insert(5, vec5);
   line_results.insert(6, vec6);
   line_results.insert(7, vec7);
   line_results.insert(8, vec8);
   line_results.insert(9, vec9);
   }
   */
