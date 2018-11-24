// https://www.codewars.com/kata/multiples-of-3-or-5

package kata

func Multiple3And5(number int) int {
	var sum int = 0

	for i := 0; i < number; i++ {
		if i % 3 == 0 || i % 5 == 0 {
			sum += i
		}
	}

	return sum
}