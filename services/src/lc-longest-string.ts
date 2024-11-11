/**
 * Finds the longest substring without repeating characters
 * @param str Input string (up to 10k characters)
 */
import prompt from 'prompt-sync';

function lengthOfLongestSubstring(str: string) {
    let left: number, right: number, maxLength: number;
    left = right = maxLength = 0;

    // const n = str.length;
    // const set = new Set();
    const map = new Map();

    // while (right < n) {
    //     if (!set.has(str[right])) {
    //         set.add(str[right]);
    //         right++;
    //         maxLength = Math.max(maxLength, set.size);
    //     } else {
    //         set.delete(str[left]);
    //         left++;
    //     }
    //     console.log(set.values());
    // }

    for (let right = 0; right < str.length; right++) {
        if (map.has(str[right])) {
            left = Math.max(map.get(str[right]), left)
        }
        map.set(str[right], right);
        maxLength = Math.max(maxLength, right - left);
    }
    console.log(map);
    console.log(`maxLength: ${maxLength}`);
}

const strVal = prompt()("Enter a string: ");
lengthOfLongestSubstring(strVal);

