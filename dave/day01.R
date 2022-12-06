input <- readLines("input-01");
input <- as.numeric(input);
  
split(input, cumsum(is.na(input))) |>
  vapply(sum, na.rm = TRUE, FUN.VALUE = numeric(1)) |>
  max();

# Part 2
split(input, cumsum(is.na(input))) |>
  vapply(sum, na.rm = TRUE, FUN.VALUE = numeric(1)) |>
  sort() |>
  tail(3) |>
  sum();
