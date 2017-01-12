# app, polyfill, device

CHIRIMENのI2C機能を改善すべく実験中のアプリ、Polyfill、対抗デバイスのコードです。

## 改善項目

下記改善について検討試作中です。

- [x] 1. I2CSlaveDevice生成後に呼び出すwrite,read系APIの実行時、I2CSlaveDevice生成時に指定したSlaveAddressを保証するよう修正（アプリ側で異なるデバイスのアクセス時に毎回I2CSlaveDeviceの生成からやり直さなくて良くなる）
- [x] 2. [Web I2C API仕様](https://rawgit.com/browserobo/WebI2C/master/index.html)にあるエラー発生時のDOMExpectionの発行と、Polyfill側でのCatch処理追加によりPromise.reject(err)の呼び出し
- [x] 3. [Polyfillのメモリリーク fork元 issue#24](https://github.com/club-wot/WebGPIO/issues/24)の修正
- [x] 4. (同一ポートに接続された異なるデバイスに対して同一レジスター指定でwriteやreadなど同じAPIを同期的に呼び出すと、呼び出した回数最初のCallbackで得られた値、結果をI2CSlaveDevice呼び出し元にCallbackされる問題の修正
- [x] 5. 4.に関連して、同一デバイスに対して同一レジスター指定で同期的に複数回呼び出しを行なっても正しく呼び出したAPIの戻り値が得られるよう修正

- [修正版ソースコード(検証用app, polyfill)](./i2ctest-multiRead/)
- [SRF02のサンプル修正版](./i2ctest-SRF02/)
- [対抗デバイスコード(Canzasi用スケッチ)](./Canzasi/)

※[野良イメージ](../img/) の最新版と併せて利用する必要があります。

下記は、2017.01.05現在の公式リリースイメージである[CMN2015-1_B2GOS-20160808](https://github.com/chirimen-oh/release/releases) での上記改善項目の比較確認用に作成したバージョンです。
PolyFillはオリジナル [club-wot/WebGPIO](https://github.com/club-wot/WebGPIO)の[last commit (6493b0d)版のwebi2c.js, worker.js]を同梱しています。

- [野良イメージ適用前の不具合確認用ソースコード](./i2ctest-multiRead_old/)

### Licence

- [修正版ソースコード(検証用app, polyfill)](./i2ctest-multiRead/)及び[野良イメージ適用前の不具合確認用ソースコード](./i2ctest-multiRead_old/)に含まれるPolyfill(webi2c.js,worker.js,webi2c-p1.js,worker-p1.js,webi2c-p2.js,worker.i2c-p2.js)のライセンスについては、[club-wot/WebGPIO](https://github.com/club-wot/WebGPIO)を参照ください。

- [修正版ソースコード(検証用app, polyfill)](./i2ctest-multiRead/)及び[野良イメージ適用前の不具合確認用ソースコード](./i2ctest-multiRead_old/)に含まれるminified.jsは [minified.js](http://minifiedjs.com/)で配布されているものです。ライセンスについては配布元でご確認願います。

- <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="クリエイティブ・コモンズ・ライセンス" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br />上記以外のファイルについては、<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">クリエイティブ・コモンズ 表示 4.0 国際 ライセンスの下に提供されています。</a>
