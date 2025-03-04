/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    semi: false,
    singleAttributePerLine: true,
    bracketSpacing: true, // 括号内不不要出现空格
    endOfLine: 'lf', //行结束符使用 Unix 格式
    printWidth: 100, // 行宽
    proseWrap: 'preserve', // 换行方式
    singleQuote: true, //使用单引号
    tabWidth: 2, //使用 tab 缩进
    useTabs: true, // 使用 tab 缩进
    printWidth: 100,
    trailingComma: 'all', // 后置逗号， 多行对象， 数组在最后一行增加逗号
    // parser: 'typescript'
}
module.exports = config
