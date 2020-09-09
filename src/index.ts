type Alphabet = Map<number, string>;

interface Trie {
    isWord: boolean
    next: Map<string, Trie>
}


const testAlpha = new Map("abcdefghijklmnopqrstuvwxyz -".split("").map((char, i) => [i, char]));


function getem(n: number, currentString: string, stack: Array<{ char: string, trie: Trie}>, result: Array<string>): Array<string> {
    const item = stack.pop();

    if (result.length === n || item === undefined) {
        return result;
    }

    const newString = currentString + item.char;
    if (item?.trie.isWord) {
        result.push(newString)
    }

    if (item.trie.next.size === 0) {
        return getem(n, newString.substring(0, newString.length - 1), stack, result);
    }
    
    const letters = item.trie.next.entries();
    for (let [char, trie] of letters) {
        stack.push({ char, trie });
    }

    return getem(n, newString, stack, result);
}

function findSuggestions(n: number, s: string, t: Trie): Array<string> {
    return getem(n, "", [{ char: "", trie: t }], []).map(suffix => s.concat(suffix));
}

function makeNode(): Trie {
    return { isWord: false, next: new Map() };
}

function addWord(trieRoot: Trie, chars: string, index: number): void {
    const nextChar = chars.charAt(index);
    if (nextChar === "") {
        trieRoot.isWord = true;
        return;
    }

    const nextTries = trieRoot.next;
    const nextNode = nextTries.get(nextChar);
    if (nextNode !== undefined) {
        return addWord(nextNode, chars, index + 1);
    }

    const trie = { isWord: false, next: new Map() };
    nextTries.set(nextChar, trie);

    return addWord(trie, chars, index + 1);
};


// since JavaScript doesn't have a char, we have to use 'strings' to represent characters
function buildTrie(words: Array<string>): Trie {
    const root = makeNode();

    for (let word of words) {
        addWord(root, word, 0);
    }

    return root;
}