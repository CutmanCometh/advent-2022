input <- readLines("input-06")
input <- strsplit(input, "")[[1]]

# Part 1
tar_length <- 4
offset <- tar_length - 1

for (i in seq_len(length(input) - offset)) {
  if (length(unique(input[seq(i, i + offset)])) == tar_length) {
    break
  }
}
i + offset

# Part 2
tar_length <- 14
offset <- tar_length - 1

for (i in seq_len(length(input) - offset)) {
  if (length(unique(input[seq(i, i + offset)])) == tar_length) {
    break
  }
}
i + offset
