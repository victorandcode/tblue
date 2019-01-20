// @flow
import colors from 'colors';

const fail = (str: string) => console.log(colors.red(str));
const instructions = (str: string) => console.log(colors.underline(str));
const success = (str: string) => console.log(colors.green(str));
const warning = (str: string) => console.log(colors.yellow(str));


export default {
    fail,
    instructions,
    success,
    warning,
};
