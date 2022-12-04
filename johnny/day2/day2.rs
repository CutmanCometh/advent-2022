//
//  day2 : Rock, paper, scissors
//  
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::collections::HashMap;

fn welcome_message(welcome: &str) {
    println!("Day 2: {}", welcome);
}

fn main() {
    let mut round_scores: HashMap<u32, u32> = HashMap::new();

    let prompt = "What is your RPS total score?";
    welcome_message(prompt);

    let file_path = "./input2.txt";
    setup_data(&mut round_scores, file_path);

    println!("Total Score is {sum}", sum=sum_scores(&mut round_scores));
}

fn sum_scores(round_scores: &mut HashMap<u32, u32>) -> u32 {
    let mut sum = 0;
    for key in round_scores.keys() {
        sum += round_scores[key];
    }

    return sum;
}

fn setup_data(round_scores: &mut HashMap<u32, u32>, file_path: &str) {
    let mut round_count = 1;

    if let Ok(lines) = read_lines(file_path) {
        for line in lines {

            if let Ok(round) = line {
                let score = calculate_score(&round);
                round_scores.insert(round_count, score);

                // println!("{ind}:{round} = {score}", ind=round_count, round=round, score=score);
                round_count += 1;
            }
        }
    }

}

fn calculate_score(round: &str) -> u32 {
    let mut curr_score = 0;
    let split: Vec<&str> = round.split(' ').collect();

    curr_score += score_outcome(split[1]);
    curr_score += score_hand(split[0], split[1]);
    return curr_score;
}

fn get_hand_val(hand: &str) -> u32 {
    if hand == "A" {
        return 0;
    } else if hand == "B" {
        return 1;
    } else {
        return 2;
    }
}

fn score_hand(opp: &str, hand: &str) -> u32 {
    let score;
    if hand == "X" {
        score = (get_hand_val(&opp) + 2) % 3;
    } else if hand == "Y" {
        score = get_hand_val(&opp);
    } else {
        score = (get_hand_val(&opp) + 1) % 3;
    }

    return score + 1;
}

fn score_outcome(hand: &str) -> u32 {
    // draw
    if hand == "Y" {
        return 3;
    }

    // winning states
    if hand == "Z" {
        return 6;
    }

    // lose
    return 0;
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
