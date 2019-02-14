package kata

import "strings"

type letter struct {
	count, index int
}

// FirstNonRepeating takes in a string and returns the first non-repeating character it finds as a string
func FirstNonRepeating(str string) string {
	stringsMap := make(map[string]*letter)
	lowerStr := strings.ToLower(str)

	for i, c := range lowerStr {
		_, ok := stringsMap[string(c)]
		if ok {
			stringsMap[string(c)].count++
		} else {
			stringsMap[string(c)] = &letter{1, i}
		}
	}

	nonDupes := getNonDuplicates(stringsMap)

	if len(nonDupes) == 0 {
		return ""
	}

	return string(str[returnMin(nonDupes)])
}

func getNonDuplicates(stringsMap map[string]*letter) []int {
	var answer []int

	for _, v := range stringsMap {
		if v.count == 1 {
			answer = append(answer, v.index)
		}
	}

	return answer
}

func returnMin(array []int) int {
	var answer = array[0]

	for _, v := range array {
		if v < answer {
			answer = v
		}
	}

	return answer
}