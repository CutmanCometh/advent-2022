//
//  Advent of Code 2022
//

mod utils;
use std::cell::RefCell;
use std::rc::Rc;

fn main() {
    // Initialize
    let day = 7;
    let prompt = "File system sizing";
    let file_path = format!("./inputs/input{}.txt", day);
    utils::welcome_message(day, prompt);

    let part1 = true;
    let root: Rc<RefCell<TreeNode>> = line_processing(file_path.as_str(), &part1);

    let result: Storage = get_dir_sum(root);

    println!("Directory is {curr}, Overall is {ovr}", curr=result.current_total, ovr=result.overall_total);
}

fn line_processing(file_path: &str, part1: &bool) -> Rc<RefCell<TreeNode>> {
    let root = Rc::new(RefCell::new(TreeNode::new()));
    let mut current = Rc::clone(&root);

    let length: usize;
    if *part1 {
        length = 4;
    } else {
        length = 14;
    }

    if let Ok(lines) = utils::read_lines(file_path) {
        for line in lines {
            if let Ok(value) = line {
                let line_split: Vec<String> = value.split(" ").map(|s| s.to_string()).collect();
                if &line_split[0] == "$" {
                    let line_split: Vec<String> = value.split(" ").map(|s| s.to_string()).collect();

                    if &line_split[1] == "cd" {
                        if &line_split[2] == "/" {
                            //println!("Reset");
                            let current_clone = Rc::clone(&root);
                            current = current_clone;
                        } else if &line_split[2] == ".." {
                            //println!("Go Up");
                            let current_clone = Rc::clone(&current);
                            current = Rc::clone(current_clone.borrow().parent.as_ref().unwrap());
                        } else {
                            //println!("Go In");
                            let current_clone = Rc::clone(&current.borrow_mut().get_child(line_split[2].to_string()).unwrap());
                            current = Rc::clone(&current_clone);
                        }
                    } else {
                        continue;
                    }
                } else if &line_split[0] == "dir" {
                    let child = Rc::new(RefCell::new(TreeNode::new()));
                    current.borrow_mut().children.push(Rc::clone(&child));
                    {
                        let mut mut_child = child.borrow_mut();
                        mut_child.parent = Some(Rc::clone(&current));
                        mut_child.name = Some(line_split[1].to_string());
                        mut_child.value = Some(0);
                        mut_child.is_file = false;
                    }
                } else {
                    let child = Rc::new(RefCell::new(TreeNode::new()));
                    current.borrow_mut().children.push(Rc::clone(&child));
                    {
                        let mut mut_child = child.borrow_mut();
                        mut_child.parent = Some(Rc::clone(&current));
                        mut_child.name = Some(line_split[1].to_string());
                        mut_child.value = Some(line_split[0].parse::<u32>().unwrap());
                        mut_child.is_file = true;
                    }
                }
            }
        }
    }

    return root;
} 


struct Storage {
    pub current_total: u32,
    pub overall_total: u32,
}

fn get_dir_sum(current: Rc<RefCell<TreeNode>>) -> Storage {
    let mut curr = Rc::clone(&current);
    let mut stack: Vec<TreeNode> = vec![];

    let mut file_sum: u32 = 0;
    let mut directory_sum: u32 = 0;
    let mut total_sum: u32 = 0;

    for child in &curr.borrow().children {
        if child.borrow().is_file {
            file_sum += child.borrow().value.unwrap();
        } else {
            let results: Storage = get_dir_sum(Rc::clone(&child));

            directory_sum = results.current_total;
            total_sum = results.overall_total;
        }
    }

    //println!("File is {file}, Directory is {dir}", file=file_sum, dir=directory_sum);

    if true {
    //if (file_sum + directory_sum) < 100000 {
        let current_total: u32 = file_sum + directory_sum;
        let overall_total: u32 = file_sum + total_sum + directory_sum;
        println!("Current is {file}, Overall is {dir}", file=current_total, dir=overall_total);
        return Storage {current_total, overall_total}
    } else {
        //println!("Too High: {file}, {dir}", file=file_sum, dir=directory_sum);
        let current_total: u32 = 0;
        let overall_total: u32 = total_sum;
        return Storage {current_total, overall_total}; 
    }
}

#[derive(PartialEq)]
struct TreeNode {
    pub value: Option<u32>,
    pub name: Option<String>,
    pub children: Vec<Rc<RefCell<TreeNode>>>,
    pub parent: Option<Rc<RefCell<TreeNode>>>,
    pub is_file: bool,
}

impl TreeNode {
    pub fn new() -> TreeNode {
        return TreeNode {
            value: None,
            name: None,
            children: vec![],
            parent: None,
            is_file: false,
        };
    }

    pub fn add_child(&mut self, new_node: Rc<RefCell<TreeNode>>) {
        self.children.push(new_node);
    }

    pub fn get_child(&mut self, node_name: String) -> Option<Rc<RefCell<TreeNode>>> {
        for child in &self.children {
            if !child.borrow().is_file && child.borrow().name == Some(node_name.to_string()) {
                return Some(Rc::clone(&child));
            }
        }

        return None;
    }
}
