// ============================================================
// FIRST UNIQUE CHARACTER
// Difficulty: Easy
// Pattern: Hash Map / Frequency Map
// ============================================================
//
// Given a string of lowercase letters, return the index of the
// first character that appears exactly once in the string.
// If no such character exists, return -1.
//
// Examples:
//   firstUniqueChar("abacabad")  => 6   ('d' at index 6)
//   firstUniqueChar("aabbcc")    => -1  (all repeat)
//   firstUniqueChar("z")         => 0   (single char is unique)
//
// Constraints:
//   - 1 <= s.length <= 10,000
//   - s consists of lowercase English letters only
// ============================================================

function firstUniqueChar(s) {
  // create freqMap of s - how many times each ch occurs
  const freqMap = new Map();
  // create idx map of s - index of each ch
  const idxMap = new Map();
  const cleanedS = s.split(' ').join('');

  for (let i = 0; i < cleanedS.length; i++) {
    freqMap.set(cleanedS[i], (freqMap.get(cleanedS[i]) || 0) + 1);
  }
  for (let i = 0; i < cleanedS.length; i++) {
    let curr = cleanedS[i];
    if (freqMap.get(curr) === 1) {
      return i;
    }
  }
  return -1;


}

// ============================================================
// TEST RUNNER — do not edit below this line
// ============================================================

let passed = 0;
let failed = 0;

function test(description, input, expected) {
  const result = firstUniqueChar(input);
  const pass = result === expected;
  if (pass) {
    console.log(`  ✅ PASS — ${description}`);
    passed++;
  } else {
    console.log(`  ❌ FAIL — ${description}`);
    console.log(`       Input:    "${input}"`);
    console.log(`       Expected: ${expected}`);
    console.log(`       Got:      ${result}`);
    failed++;
  }
}

console.log("\n🔤 First Unique Character Tests\n");

test('Unique char at end',             "abacabad",   3);
test('No unique chars',                "aabbcc",     -1);
test('Single character string',        "z",          0);
test('All unique — returns first',     "abcde",      0);
test('Unique char at start',           "abba",       -1);
test('Unique char in the middle',      "aabcca",     2);
test('Two unique chars — first wins',  "xxyzz",      2);
test('Long repeated prefix',           "aaaaaab",    6);
test('Repeated pairs, one odd one out',"ccddeeaf",   6);
test('Single repeated char',           "aaaa",       -1);

console.log(`\n${passed} passed, ${failed} failed\n`);
