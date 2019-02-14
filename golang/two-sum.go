package kata

import "fmt"

// TwoSum takes in a slice of integers and returns a slice containing two integers that sum to the target integer
func TwoSum(numbers []int, target int) [2]int {
	fmt.Println(numbers, target)

	for i, v := range numbers {
		for j := i+1; j < len(numbers); j++ {
			if v + numbers[j] == target {
				return [2]int{i, j}
			}
		}
	}

	return [2]int{};
}