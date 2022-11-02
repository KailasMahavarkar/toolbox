import base62 from "base62";

const alphabets = "abcdefghijklmnopqrstuvwxyz";
const upperAlphabets = alphabets.toUpperCase();
const digits = "0123456789";

const base62Charset =  alphabets + upperAlphabets + digits;
const base64Charset = base62Charset + "+/";

// encoder
export function encoder(inputText, charset) {
	switch (charset) {
		case "base64":
			base62.setCharacterSet(base62Charset);
			return base62.encode(inputText);
		case "base62":
			base62.setCharacterSet(base64Charset);
			return base62.encode(inputText);
		default:
			return "";
	}
}

// decoder
export const decoder = (inputText, charset) => {
	switch (charset) {
		case "base64":
			base62.setCharacterSet(base62Charset);
			return base62.decode(inputText);
		case "base62":
			base62.setCharacterSet(base64Charset);
			return base62.decode(inputText);
		default:
			return "";
	}
};

// string to number
export const strToNumber = (str) => {
	let num = 0;
	for (let i = 0; i < str.length; i++) {
		num += str.charCodeAt(i) * Math.pow(256, str.length - i - 1);
	}
	return num;
};

// number to string
export const numberToStr = (num) => {
	let str = "";
	while (num > 0) {
		str = String.fromCharCode(num % 256) + str;
		num = Math.floor(num / 256);
	}
	return str;
};


// we need to use this since if we use (Function).toString() webpack will minify the code
// and we will not be see code correctly
export const codeString = `
import base62 from "base62";

const alphabets = "abcdefghijklmnopqrstuvwxyz";
const upperAlphabets = alphabets.toUpperCase();
const digits = "0123456789";

const base62Charset =  alphabets + upperAlphabets + digits;
const base64Charset = base62Charset + "+/";

// encoder
export function encoder(inputText, charset) {
	switch (charset) {
		case "base64":
			base62.setCharacterSet(base62Charset);
			return base62.encode(inputText);
		case "base62":
			base62.setCharacterSet(base64Charset);
			return base62.encode(inputText);
		default:
			return "";
	}
}

// decoder
export const decoder = (inputText, charset) => {
	switch (charset) {
		case "base64":
			base62.setCharacterSet(base62Charset);
			return base62.decode(inputText);
		case "base62":
			base62.setCharacterSet(base64Charset);
			return base62.decode(inputText);
		default:
			return "";
	}
};

// string to number
export const strToNumber = (str) => {
	let num = 0;
	for (let i = 0; i < str.length; i++) {
		num += str.charCodeAt(i) * Math.pow(256, str.length - i - 1);
	}
	return num;
};

// number to string
export const numberToStr = (num) => {
	let str = "";
	while (num > 0) {
		str = String.fromCharCode(num % 256) + str;
		num = Math.floor(num / 256);
	}
	return str;
};
`;