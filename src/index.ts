type Alphabet = Map<number, string>;

interface Trie {
    isWord: boolean
    next: Map<string, Trie>
}


// const testAlpha = new Map("abcdefghijklmnopqrstuvwxyz -".split("").map((char, i) => [i, char]));


function getem(n: number, stack: Array<{ currentString: string, trie: Trie }>, result: Array<string>): Array<string> {
    const item = stack.pop();

    if (result.length === n || item === undefined) {
        return result;
    }

    if (item.trie.isWord) {
        result.push(item.currentString);
    }
    
    for (let [char, trie] of item.trie.next.entries()) {
        stack.push({ currentString: item.currentString + char, trie: trie });
    }

    return getem(n, stack, result);
}

function findSuggestions(n: number, s: string, t: Trie): Array<string> {
    return getem(n, [{ currentString: "", trie: t }], []).map(suffix => s.concat(suffix));
}

function getTo(s: string, trieRoot: Trie): Trie | null {
    const end = s.length - 1;
    const loop = (i: number, currentTrie: Trie): Trie | null => {
        if (i > end) {
            return currentTrie;
        }
        const next = currentTrie.next.get(s.charAt(i));
        return next === undefined 
            ? null 
            : loop(i + 1, next);
    };

    return loop(0, trieRoot);
}

function guessOTron(s: string, t: Trie): Array<string> {
    const currentTrie = getTo(s, t);
    return currentTrie === null 
        ? [] 
        : findSuggestions(3, s, currentTrie);
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

function test(): Trie {
    return buildTrie(["she", "sells", "sea", "shells", "by", "the", "sea", "shore", "short", "of", "a", "seq", "or", "sequence"]);
}
