// this is also horrible

package kata

import (
	// "fmt"
	"reflect"
)

func ChooseBestSum(t, k int, ls []int) int {
	// fmt.Println("");
	// fmt.Println("t:", t, "k:", k, "ls:", ls)

	if len(ls) < k {
		// fmt.Println("returning -1")
		return -1
	}

	maxNum := len(ls)-1
	iterator := make([]int, 0)
	final := make([]int, 0)
	sum := 0

	for i := 0; i < k; i++ {
		iterator = append(iterator, i)
		final = append(final, len(ls) - k + i)
	}

	for true {
		currentSum := 0

		// fmt.Println("testing the following indices:", iterator)

		for i := 0; i < len(iterator); i++ {
			// fmt.Println("iterator:", i, "adding", ls[iterator[i]], "currentSum:", currentSum)
			currentSum += ls[iterator[i]]
		}

		if currentSum > sum && currentSum < t {
			// fmt.Println("new largest sum:", currentSum)
			sum = currentSum
		} else if currentSum > sum && currentSum == t {
			// fmt.Println("sum is equal to maximum possible value; returning currentSum:", currentSum)
			return currentSum
		}
		
		if reflect.DeepEqual(iterator, final) {
			// fmt.Println("iterator is in final state")
			if sum == 0 {
				// fmt.Println("returning -1")
				return -1
			}
			// fmt.Println("returning sum:", sum)
			return sum
		}

		// advance iterator
		stop := false
		for i, j := len(iterator)-1, 0; i >= 0; i, j = i-1, j+1 {

			stop = true
			iterator[i] = iterator[i] + 1

			if (iterator[i] > maxNum - j) {
				stop = false
			}

			if (stop) {
				break
			}
		}

		// fix out of bounds iterator
		for i, j := 1, len(iterator)-2; i < len(iterator); i,j = i+1,j-1 {
			// fmt.Println("iterator[i]:", iterator[i], "maxNum - j:", maxNum-j)
			if (iterator[i] > maxNum - j) {
				// fmt.Println("preventing out-of-bounds index at index", i)
				iterator[i] = iterator[i-1] + 1
			}
		}
	}

	// fmt.Println("returning sum:", sum)
	return sum
}