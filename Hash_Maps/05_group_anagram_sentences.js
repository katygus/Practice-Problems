// ============================================================
// GROUP ANAGRAM SENTENCES
// Difficulty: Medium
// Pattern: Hash Map / Frequency Map
// ============================================================
//
// You are given an array of sentences (each a single string of
// lowercase words separated by spaces). Group the sentences
// together if they are "word anagrams" of each other — meaning
// they contain exactly the same words with the same frequencies,
// just possibly in a different order.
//
// Return an array of groups. Within each group, sentences must
// appear in the same order they appeared in the input. The
// groups themselves must be sorted by the index of their
// first sentence in the input (i.e. the group whose first
// sentence appeared earliest comes first).
//
// Examples:
//   Input: [
//     "the cat sat",
//     "hello world",
//     "sat the cat",
//     "world hello",
//     "cat sat the"
//   ]
//   Output: [
//     ["the cat sat", "sat the cat", "cat sat the"],
//     ["hello world", "world hello"]
//   ]
//
//   Input: ["go home", "go go", "home go", "stop"]
//   Output: [
//     ["go home", "home go"],
//     ["go go"],
//     ["stop"]
//   ]
//
// Note: "go home" and "home go" are word-anagrams (same words,
// different order). "go go" has two "go"s — different frequency,
// so it is its own group.
//
// Constraints:
//   - 1 <= sentences.length <= 10,000
//   - Each sentence contains 1–10 words
//   - All characters are lowercase letters or spaces
//   - No leading, trailing, or double spaces
// ============================================================


//input: flat array of strings (sentences)
//output: nested arrays of strings (anagram sentences)

// look for frequencies of combinations of letters
// save all possible combinations of the same letters to an array
// return those arrays as subarrays
function groupAnagramSentences(sentences) {
  // freq map with key of the string, split, sorted, joined and val of array of all string els that match
  const freq = new Map();
  for (const sent of sentences) {
    const key = sent.split('').sort().join('');
    const val = freq.get(key) || [];
    val.push(sent);
    freq.set(key, val);
  }
  const result = [];
  for (const [key, val] of freq) {
    result.push(val);
  }
  return result;
}

// ============================================================
// TEST RUNNER — do not edit below this line
// ============================================================

let passed = 0;
let failed = 0;

function groupsEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((group, i) => {
    if (group.length !== b[i].length) return false;
    return group.every((s, j) => s === b[i][j]);
  });
}

function test(description, sentences, expected) {
  const result = groupAnagramSentences(sentences);
  const pass = groupsEqual(result, expected);
  if (pass) {
    console.log(`  ✅ PASS — ${description}`);
    passed++;
  } else {
    console.log(`  ❌ FAIL — ${description}`);
    console.log(`       Input:    ${JSON.stringify(sentences)}`);
    console.log(`       Expected: ${JSON.stringify(expected)}`);
    console.log(`       Got:      ${JSON.stringify(result)}`);
    failed++;
  }
}

console.log("\n🗂️  Group Anagram Sentences Tests\n");

test('Three-way and two-way group',
  ["the cat sat", "hello world", "sat the cat", "world hello", "cat sat the"],
  [["the cat sat", "sat the cat", "cat sat the"], ["hello world", "world hello"]]
);
test('Frequency matters — go go is its own group',
  ["go home", "go go", "home go", "stop"],
  [["go home", "home go"], ["go go"], ["stop"]]
);
test('All sentences are unique groups',
  ["one two", "three four", "five six"],
  [["one two"], ["three four"], ["five six"]]
);
test('All sentences are one group',
  ["a b c", "b c a", "c a b"],
  [["a b c", "b c a", "c a b"]]
);
test('Single word sentences',
  ["cat", "dog", "cat", "dog", "fish"],
  [["cat", "cat"], ["dog", "dog"], ["fish"]]
);
test('Single sentence input',
  ["hello world"],
  [["hello world"]]
);
test('Order within group preserved',
  ["z y x", "a b c", "y z x", "c a b"],
  [["z y x", "y z x"], ["a b c", "c a b"]]
);
test('Repeated word changes group',
  ["a a b", "a b a", "a b b"],
  [["a a b", "a b a"], ["a b b"]]
);

console.log(`\n${passed} passed, ${failed} failed\n`);
