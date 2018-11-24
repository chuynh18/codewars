// https://www.codewars.com/kata/playing-with-digits

package kata

import (
	"strconv"
	"math"
)

func DigPow(n, p int) int {
	nString := strconv.Itoa(n)
	nList := make([]int, 0)
	var sum int = 0

	// turn number n into a list of numbers (each member of the list corresponds to a digit of n)
	for _, val := range nString {
		i, _ := strconv.Atoi(string(val))
		nList = append(nList, i)
	}

	// apply the appropriate power to each member of the list
	for i, _ := range nList {
		nList[i] = int(math.Pow(float64(nList[i]), float64(p)))
		p++
	}

	// calculate the sum of the list of digits
	for _, val := range nList {
		sum += val
	}

	// if the sum is divisible by the original number n, return sum/n
	if (sum % n == 0) {
		return sum/n
	}

	// else return -1
	return -1
}