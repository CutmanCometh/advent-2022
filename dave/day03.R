library(purrr);

input <- readLines("input-03") |>
  strsplit(split = "");

# Part 1
score <- c(letters, LETTERS)

common_split <- function(x) {
  half <- length(x) / 2;
  intersect(
    head(x, half), tail(x, half)
  );
}

map_chr(input, common_split) |>
  match(score) |>
  sum();

# Part 2
input_group <- split(input, rep(seq_len(length(input) / 3), each = 3));

score <- c(letters, LETTERS);

common_group <- function(x) {
  x[[1]] |>
    intersect(x[[2]]) |>
    intersect(x[[3]]);
}

map_chr(input_group, common_group) |>
  match(score) |>
  sum();
