# 野良イメージ

実験中のCHIRIMEN用イメージです。現在主にi2c機能の拡張を実験中です。
十分動作確認できたら、本家([githubリポジトリ](https://github.com/chirimen-oh/gecko-dev))にプルリクする際にソースコードも含めて登録予定です。
実験終了、本家マージまでの一時的な期間限定で公開します。

## CHRMN-dfm20170103 (2017/01/03更新)

CHRMN-dfm20170103 は、[CMN2015-1_B2GOS-20160808](https://github.com/chirimen-oh/release/releases)をベースに、下記修正を加えたものです。

- [gecko Last Commit (9e91fe4) の反映](https://github.com/chirimen-oh/gecko-dev) 
- I2CManager.open,SetDeviceAddress,Write,Read等でエラー発生時にDOMExceptionを発生させるよう修正

[CHRMN-dfm20170103.img (ダウンロード)](http://chrmn.dfm.lrv.jp/img/CHRMN-dfm20170103.img.zip)

## CHRMN-dfm20170104 (2017/01/04更新)

CHRMN-dfm20170104 は、CHRMN-dfm20170103をベースに下記修正を加えたものです。

- I2CManager.Write,ReadにaDeviceAddressパラメータを追加。
- I2CService.Write,ReadのパラメータにもaDeviceAddressを追加。これらのAPI呼び出し時にI2CServiceが最後に利用したSlaveAddressと指定されたaDeviceAddressが異なる場合、SetDeviceAddressを実行してからWrite,Readを実施するように修正

I2CManagerのNative側実装のAPIパラメータを追加しているため、本バージョンを利用するには併せてPolyfill側の修正も必要です。

[CHRMN-dfm20170104.img (ダウンロード)](http://chrmn.dfm.lrv.jp/img/CHRMN-dfm20170104.img.zip)

## CHRMN-dfm20170104p (2017/01/16更新)

CHRMN-dfm20170104に対して下記課題の修正を実施したものです。

https://github.com/chirimen-oh/any-issues/issues/163

WindowsからandroidToolsを利用してアップロードができるようになりました。

[CHRMN-dfm20170104p.img (ダウンロード)](http://chrmn.dfm.lrv.jp/img/CHRMN-dfm20170104p.img.zip)

## CHRMN-dfm20170117-2p (2017/01/17更新(2回目))

CHRMN-dfm20170104に残っていたテスト用のコード（従来のAPIとは異なる新規APIのテスト）部分を削除したイメージです。

本Ver.で

> 1. I2CSlaveDevice生成後に呼び出すwrite,read系APIの実行時、I2CSlaveDevice生成時に指定したSlaveAddressを保証するよう修正（アプリ側で異なるデバイスのアクセス時に毎回I2CSlaveDeviceの生成からやり直さなくて良くなる）

の修正が一部不完全だった問題を修正しています。

このバイナリもWindowsからandroidToolsを利用してアップロードが可能です。

[CHRMN-dfm20170117-2p.img (ダウンロード)](http://chrmn.dfm.lrv.jp/img/CHRMN-dfm20170117-2p.img.zip)

### Licence

本バイナリは「[chirimen-oh](https://github.com/chirimen-oh)」で公開されているソフトウエアに改変を加え生成したものです。

ライセンスについても、[chirimen-oh](https://github.com/chirimen-oh/release/blob/master/LICENSE)に準じます。



