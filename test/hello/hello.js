const headStr = '1';
const tailStr = '2';
const nums = 4;
const count = '6';

function sayName(name) {
  return $t('hello, {{name}}', { name });
}

const str = $t('{{headStr}}你好{{sayName}} {{nums}}个国家, {{count}}个苹果{{tailStr}}', {
  headStr,
  sayName: sayName('lock'),
  nums,
  count,
  tailStr,
});
