// @flow
import colors from 'colors';

const success = (str: string) => console.log(colors.green(str));

const fail = (str: string) => console.log(colors.red(str));

export default {
    success,
    fail,
};
