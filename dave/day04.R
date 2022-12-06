library(purrr);

input <- readLines("input-04") |>
  strsplit("[-,]") |>
  map(as.integer);

# Part 1
contain <- function(x) {
  seq1 <- seq(x[1], x[2]);
  seq2 <- seq(x[3], x[4]);
  
  length(setdiff(seq1, seq2)) == 0 ||
    length(setdiff(seq2, seq1)) == 0;
}

map_lgl(input, contain) |>
  sum();

# Part 2
overlap <- function(x) {
  seq1 <- seq(x[1], x[2]);
  seq2 <- seq(x[3], x[4]);
  
  length(intersect(seq1, seq2)) > 0;
}

map_lgl(input, overlap) |>
  sum();
