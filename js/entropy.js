// The MIT License (MIT)

// Copyright (c) Autonomous Software

// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Original source is (should be) available here:
// https://github.com/autonomoussoftware/fast-password-entropy


/**
 * Calculate the entropy of a string based on the size of the charset used and
 * the length of the string.
 *
 * Based on:
 * http://resources.infosecinstitute.com/password-security-complexity-vs-length/
 */

const calcEntropy = (charset, length) =>
  Math.round(length * Math.log(charset) / Math.LN2)

/**
 * Standard character sets list.
 *
 * It assumes the `uppercase` and `lowercase` charsets to have 26 chars as in
 * the English alphabet. Numbers are 10 characters long. Symbols are the rest
 * of the 33 remaining chars in the 7-bit ASCII table.
 */

const stdCharsets = [{
  name: 'lowercase',
  re: /[a-z]/, // abcdefghijklmnopqrstuvwxyz
  length: 26
}, {
  name: 'uppercase',
  re: /[A-Z]/, // ABCDEFGHIJKLMNOPQRSTUVWXYZ
  length: 26
}, {
  name: 'numbers',
  re: /[0-9]/, // 1234567890
  length: 10
}, {
  name: 'symbols',
  re: /[^a-zA-Z0-9]/, //  !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ (and any other)
  length: 33
}]

/**
 * Creates a function to calculate the total charset length of a string based on
 * the given charsets.
 */

const calcCharsetLengthWith = charsets =>
  string =>
    charsets.reduce((length, charset) =>
      length + (charset.re.test(string) ? charset.length : 0), 0)

/**
 * Helper function to calculate the total charset lengths of a given string
 * using the standard character sets.
 */

const calcCharsetLength = calcCharsetLengthWith(stdCharsets)

/**
 * Calculate the given password entropy.
 */

export const passwordEntropy = string =>
  string ? calcEntropy(calcCharsetLength(string), string.length) : 0
