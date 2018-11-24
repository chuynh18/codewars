// https://www.codewars.com/kata/57339a5226196a7f90001bcf

package kata

import "sort"

// function to check if value exists in slice
func intInSlice(inputInt int, inputSlice []int) bool {
	for _, value := range inputSlice {
		if inputInt == value {
			return true
		}
	}
	return false
}

// ns : slice of indices
// xs, ys : chromosomes as slices of ints
func Crossover(ns []int, xs []int,ys []int) ([]int, []int) {
	// variables that will store...
	// deduplicated and sorted ns, and crossed over chromosomes xs and ys
	var (
		dedupedNs, crossXs, crossYs []int = make([]int, 0), make([]int, 0), make([]int, 0)
		flipped bool = false
	)	

	// sort ns
	sort.Ints(ns)

	// if ns is not empty, put its first index into dedupedNs
	if len(ns) > 0 {
		dedupedNs = []int{ns[0]}
	}

	// build out rest of dedupedNs by adding non-dupe values
	for i := 1; i < len(ns); i++ {
		if (ns[i-1] != ns[i]) {
			dedupedNs = append(dedupedNs, ns[i])
		}
	}

	// build crossed-over chromosomes
	for i := 0; i < len(xs); i++ {
		if flipped {
			if intInSlice(i, dedupedNs) {
				flipped = false
			}
		} else {
			if intInSlice(i, dedupedNs) {
				flipped = true
			}
		}

		if flipped {
			crossXs = append(crossXs, ys[i])
			crossYs = append(crossYs, xs[i])
		} else {
			crossXs = append(crossXs, xs[i])
			crossYs = append(crossYs, ys[i])
		}
	}

	return crossXs, crossYs
}