package kata

import "reflect"

func ChooseBestSum(t, k int, ls []int) int {
	if len(ls) < k {
		return -1
	}

	maxNum, sum := len(ls)-1, 0
	var iterator, final []int

	for i := 0; i < k; i++ {
		iterator = append(iterator, i)
		final = append(final, len(ls) - k + i)
	}

	for true {
		currentSum := 0
		for i := 0; i < len(iterator); i++ {
			currentSum += ls[iterator[i]]
		}

		if currentSum > sum && currentSum < t {
			sum = currentSum
		} else if currentSum == t {
			return currentSum
		}
		
		if reflect.DeepEqual(iterator, final) {
			if sum == 0 {
				return -1
			}
			return sum
		}

		// advance iterator
		for i, j := len(iterator)-1, 0; i >= 0; i, j = i-1, j+1 {
			iterator[i] = iterator[i] + 1

			if (iterator[i] <= maxNum - j) {
				break;
			}
		}

		// fix out of bounds iterator
		for i, j := 1, len(iterator)-2; i < len(iterator); i, j = i+1, j-1 {
			if (iterator[i] > maxNum - j) {
				iterator[i] = iterator[i-1] + 1
			}
		}
	}

	return sum
}