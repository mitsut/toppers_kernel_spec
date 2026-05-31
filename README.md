TOPPERS Kernel Specification for HTML(richtext).
====

## Aim
[TOPPERS](https://www.toppers.jp/)カーネル統合仕様書のリッチテキスト表示を行います。

TOPPERS新世代カーネル統合仕様書はASCIIDOC形式でリライトして、リッチテキスト形式に変換をしています。

第3世代カーネル統合仕様書についてはリッチテキスト対応を行っているので、HTML出力の結果をGithubPagesに出力します。

## TOPPERS第3世代カーネル（ITRON系）統合仕様書

* [Release 3.7.0](https://mitsut.github.io/toppers_kernel_spec/spec?s=tgki) (最新)
* [Release 3.6.0](https://mitsut.github.io/toppers_kernel_spec/spec?s=tgki&v=3.6.0)
* [Release 3.5.0](https://mitsut.github.io/toppers_kernel_spec/spec?s=tgki&v=3.5.0)
* [Release 3.4.2](https://mitsut.github.io/toppers_kernel_spec/spec?s=tgki&v=3.4.2)
* [Release 3.4.1](https://mitsut.github.io/toppers_kernel_spec/spec?s=tgki&v=3.4.1)
* [Release 3.4.0](https://mitsut.github.io/toppers_kernel_spec/spec?s=tgki&v=3.4.0)
* [Release 3.3.0](https://mitsut.github.io/toppers_kernel_spec/spec?s=tgki&v=3.3.0)
* [Release 3.2.1](https://mitsut.github.io/toppers_kernel_spec/spec?s=tgki&v=3.2.1)

## TOPPERS新世代カーネル統合仕様書

* [Release 1.7.1](https://mitsut.github.io/toppers_kernel_spec/spec?s=ngki) (最新)

## 免責
本資料はTOPPERSプロジェクトが公開している統合仕様書のPDFからリライトしています。修正・追加の事項があれば、[Issue](https://github.com/mitsut/toppers_kernel_spec/issues)への登録をお願いします。

公式のリリースはTOPPERSプロジェクトから[PDF形式で公開](https://www.toppers.jp/documents.html)されています。

## References
本プロジェクトは [第6回TOPPERS活用アイデア・アプリケーション開発コンテスト](https://www.toppers.jp/contest.html#2016) の活用アイデア部門として応募していますので、
詳しくはコンテスト応募資料をご覧ください。

活用アイデア部門にて銀賞を受賞しました!

## Requirement

* Ruby
* asciidoctor

## Usage

    git checkout <branches>
    asciidoctor -b html book.asciidoc
    asciidoctor-pdf -b pdf book.asciidoc

## Install

    sudo gem install asciidoctor
    sudo gem install asciidoctor-pdf
    or
    sudo gem install asciidoctor
    sudo gem install asciidoctor-pdf-cjk

## Contribution

## Output(Github Pages)

* [html](https://mitsut.github.io/toppers_kernel_spec/)
* [pdf](https://mitsut.github.io/toppers_kernel_spec/specs/book.pdf)

## Licence

TOPPERS Licence (http://www.toppers.jp/license.html)

## Author

[mitsut](https://github.com/mitsut)
