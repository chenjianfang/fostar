const getName = () => {};
const $t = () => {};

const aa = 1;
// eslint-disable-next-line no-unused-vars
const a = getName($t('中文1 {{aa}} {{$t}}1', { aa, $t: $t('中文') }));
const b = $t('中文2');
const c = getName('中文2');
const d = $t('中文2');
const e = $t('中文3 中文3');
const f = $t('中文4 {{d}} 中文4', { d });

const arr = [$t('中文5', {}), $t('中文6')];

function Hello() {
  return (
    <div attr={$t('中文1')}>
      <div attr={$t('中文2')}>
        <div attr={getName('中文3')}></div>
        <div attr={getName('中文3')}></div>
        <div attr={getName($t('中文4 {{$t}} 中文4', { $t: $t('中文4') }))}></div>

        <div>{$t('中文5          中文5')}</div>

        <div>
          {$t('中文6')}

          {aa}
          {$t('中文6')}
        </div>

        <div>
          {$t('中文7')}

          {$t('中文7')}
          {$t('中文7')}

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

const ao = $t('{{headStr}}{{head2Str}}你好 {{nums}}个国家, {{count}}个苹果{{tailStr}}', {
  headStr,
  head2Str,
  nums,
  count,
  tailStr,
});

function foo(name) {
  return '11' + name;
}

const xxx = '88';

const ax = $t('你好{{foo}}世界', { foo: foo('lock', xxx) });
