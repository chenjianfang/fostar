const getName = () => {};
const $t = () => {};

const aa = 1;
// eslint-disable-next-line no-unused-vars
const a = getName(`中文1 ${aa} ${$t('中文')}1`);
const b = $t('中文2');
const c = getName('中文2');
const d = $t('中文2');
const e = '中文3 中文3';
const f = `中文4 ${d} 中文4`;

const arr = [`中文5`, '中文6'];

function Hello() {
  return (
    <div attr="中文1">
      <div attr="中文2">
        <div attr={getName('中文3')}></div>
        <div attr={getName('中文3')}></div>
        <div attr={getName(`中文4 ${$t('中文4')} 中文4`)}></div>

        <div>

          中文5

          中文5


        </div>

        <div>

          中文6
          {
            aa
          }
          中文6


        </div>

        <div>

          中文7
          {
            '中文7'
          }
          中文7

          <Trans>中文8</Trans>
          <Trans>

            <div>中文9</div>

          </Trans>
        </div>
      </div>
    </div>
  );
}

const headStr = '1';
const head2Str = '1';
const tailStr = '1';
const nums = 4;
const count = '6';

const ao = `${headStr}${head2Str}你好 ${nums}个国家, ${count}个苹果${tailStr}`;


function foo(name) {
  return ('11' + name)
}

const xxx = '88';

const ax = `你好${foo('lock', xxx)}世界`;

