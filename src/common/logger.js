// @flow
import colors from 'colors';
import figures from 'figures';

const base = (str: string) => console.log(figures(str));

const fail = (str: string) => base(colors.red(str));
const instructions = (str: string) => base(colors.italic(str));
const success = (str: string) => base(colors.green(str));
const warning = (str: string) => base(colors.yellow(str));


export default {
    base,
    fail,
    instructions,
    success,
    warning,
};
