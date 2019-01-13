package kata

func ValidParentheses(parens string) bool {
	counter := 0

	for _, char := range parens {
		if string(char) == "(" {
			counter++
		} else if string(char) == ")" {
			counter--
			
			if counter < 0 {
				return false
			}
		}
	}

	return counter == 0
}