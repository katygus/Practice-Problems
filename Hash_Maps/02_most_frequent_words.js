// ============================================================
// MOST FREQUENT WORDS
// Difficulty: Easy
// Pattern: Hash Map / Frequency Map
// ============================================================
//
// Given an array of lowercase words and a number k, return the
// k most frequently occurring words, sorted by frequency
// (highest first). Break ties alphabetically (a before b).
//
// Examples:
//   topKWords(["the","cat","sat","the","cat","the"], 2)
//     => ["the", "cat"]
//
//   topKWords(["one","two","one","two","three"], 3)
//     => ["one", "two", "three"]
//
//   topKWords(["apple","banana","apple","banana"], 1)
//     => ["apple"]       (tie broken alphabetically)
//
// Constraints:
//   - 1 <= words.length <= 10,000
//   - 1 <= k <= number of unique words
//   - All words are lowercase letters only
// ============================================================

function topKWords(words, k) {
  
  // create freqMap of words -> first loop
  const wordMap = new Map();
  // create result array the length of k, init with empty strings
  
  for (const word of words) {
    // fill the result array with the first string
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  } 
  
  // create an array from the map keys
 const sorted = Array.from(wordMap.keys());
 
 // sort the array, finding the freq value from the map and localeCompare (called on one string, pass in the other -> takes case and accents into account);
 sorted.sort((a, b) => {
  // if the values are the same, sort alphabetically
  if (wordMap.get(a) === wordMap.get(b)) {
    return a.localeCompare(b);
  }
  //then sort by value;
  return wordMap.get(b) - wordMap.get(a);
 })
  
 // then slice off all but the first k sorted elements
  return sorted.slice(0, k);

}

// ============================================================
// TEST RUNNER — do not edit below this line
// ============================================================

let passed = 0;
let failed = 0;

function arraysEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function test(description, words, k, expected) {
  const result = topKWords(words, k);
  const pass = arraysEqual(result, expected);
  if (pass) {
    console.log(`  ✅ PASS — ${description}`);
    passed++;
  } else {
    console.log(`  ❌ FAIL — ${description}`);
    console.log(`       Words:    [${words.map(w => `"${w}"`).join(", ")}]`);
    console.log(`       k:        ${k}`);
    console.log(`       Expected: [${expected.map(w => `"${w}"`).join(", ")}]`);
    console.log(`       Got:      [${(result || []).map(w => `"${w}"`).join(", ")}]`);
    failed++;
  }
}

console.log("\n📊 Most Frequent Words Tests\n");

test('Basic case, clear winner',
  ["the","cat","sat","the","cat","the"], 2,
  ["the", "cat"]
);
test('Three-way result, k=3',
  ["one","two","one","two","three"], 3,
  ["one", "two", "three"]
);
test('Tie broken alphabetically',
  ["apple","banana","apple","banana"], 1,
  ["apple"]
);
test('All words appear once — alphabetical order',
  ["zebra","mango","apple"], 2,
  ["apple", "mango"]
);
test('k equals total unique words',
  ["hi","hi","bye"], 2,
  ["hi", "bye"]
);
test('Single word repeated',
  ["go","go","go"], 1,
  ["go"]
);
test('Mixed frequencies, pick top 1',
  ["a","b","b","c","c","c"], 1,
  ["c"]
);
test('Mixed frequencies, pick top 2',
  ["a","b","b","c","c","c"], 2,
  ["c", "b"]
);
test('All same frequency — fully alphabetical',
  ["dog","cat","ant"], 3,
  ["ant","cat","dog"]
);
test('k=1 with clear winner',
  ["x","x","x","y","y","z"], 1,
  ["x"]
);

console.log(`\n${passed} passed, ${failed} failed\n`);
