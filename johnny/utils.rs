//
//  utils : common functions
//

use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::collections::HashMap;


pub fn sum_results<T>(line_results: &mut HashMap<u32, T>, convert_item: &dyn Fn(T) -> u32)
where T: Copy
{
    let mut sum = 0;
    for key in line_results.keys() {
        sum += convert_item(line_results[key]);
    }

    println!("{}", sum);
}

pub fn welcome_message(day: i32, welcome: &str) {
    println!("Day {day}: {welcome}", day=day, welcome=welcome);
}

pub fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
