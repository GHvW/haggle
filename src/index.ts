type Alphabet = Map<number, string>;

interface Trie {
    isWord: boolean
    next: Map<string, Trie>
}


const testAlpha = new Map("abcdefghijklmnopqrstuvwxyz -".split("").map((char, i) => [i, char]));


function getem(lookup: Alphabet, n: number, next: string, stack: Array<{ x: number, trie: Trie }>, result: Array<string>): Array<string> {
    const t = stack.pop();

    if (result.length === n || t === undefined) {
        return result;
    }

    if (t.trie.isWord) {
        result.push(next + lookup.get(t.x))
        return getem(lookup, n, "", stack, result);
    }
    
    return getem(lookup, n, next + lookup.get(t.x), stack, result)
}

function addWord(trieRoot: Trie, chars: string, index: number): void {
    if (chars.charAt(index) === "") {
        trieRoot.isWord = true;
        return;
    }

    const nextChar = chars.charAt(index);
    const nextTries = trieRoot.next;
    const trie = { isWord: false, next: new Map() };
    nextTries.set(nextChar, trie);

    return addWord(trie, chars, index + 1);
};

// since JavaScript doesn't have a char, we have to use 'strings' to represent characters
// function buildTrie(lookup: Alphabet, dictionary: Map<number, string>): Trie {


//     const root = { isWord: false, next: [] };
//     const arrSize = dictionary.size;
//     const entries = dictionary.values();
// }