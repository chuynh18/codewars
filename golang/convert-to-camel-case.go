package kata

import (
	"strings"
	"unicode"
)

func ToCamelCase(s string) string {
	var sSlice []string

	if strings.Contains(s, "-") {
		sSlice = strings.Split(s, "-")
	} else if strings.Contains (s, "_") {
		sSlice = strings.Split(s, "_")
	} else {
		return s
	}
	
	for i := 1; i < len(sSlice); i++ {
		toRune := []rune(sSlice[i])
		toRune[0] = unicode.ToUpper(toRune[0])
		sSlice[i] = string(toRune)
	}

	return strings.Join(sSlice, "")
}