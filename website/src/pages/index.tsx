import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

interface SpecSeries {
  id: string;
  title: string;
  subtitle: string;
  latestVersion: string;
  latestDate: string;
  versionCount: number;
}

const specSeries: SpecSeries[] = [
  {
    id: 'tgki',
    title: '第3世代カーネル（ITRON系）統合仕様書',
    subtitle: 'TOPPERS/ASP3, TOPPERS/FMP3, TOPPERS/HRP3, TOPPERS/HRMP3',
    latestVersion: '3.7.0',
    latestDate: '2024-05-28',
    versionCount: 8,
  },
  {
    id: 'ngki',
    title: '新世代カーネル統合仕様書',
    subtitle: 'TOPPERS/ASP, TOPPERS/FMP, TOPPERS/HRP2, TOPPERS/SSP',
    latestVersion: '1.7.1',
    latestDate: '2019-10-07',
    versionCount: 1,
  },
];

function SpecSeriesCard({id, title, subtitle, latestVersion, latestDate, versionCount}: SpecSeries): ReactNode {
  return (
    <div className={styles.seriesCard}>
      <div>
        <Heading as="h3" className={styles.seriesTitle}>{title}</Heading>
        <p className={styles.seriesSubtitle}>{subtitle}</p>
        <p className={styles.seriesMeta}>
          最新: Release {latestVersion}（{latestDate}）/ 全{versionCount}バージョン
        </p>
      </div>
      <div className={styles.seriesActions}>
        <Link className="button button--primary button--md" to={`/spec?s=${id}`}>
          最新版を読む
        </Link>
        <Link className="button button--outline button--secondary button--md" to={`/spec?s=${id}`}>
          バージョン一覧
        </Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="ホーム"
      description="TOPPERSカーネル統合仕様書のリッチテキスト表示">
      <header className={styles.heroBanner}>
        <div className="container">
          <Heading as="h1" className={styles.heroTitle}>
            TOPPERS カーネル統合仕様書
          </Heading>
          <p className={styles.heroSubtitle}>
            TOPPERS新世代カーネル・第3世代カーネルの統合仕様書を
            <br />
            リッチテキスト形式でブラウザから閲覧できます
          </p>
        </div>
      </header>
      <main className="container">
        <section className={styles.seriesSection}>
          {specSeries.map((s) => (
            <SpecSeriesCard key={s.id} {...s} />
          ))}
        </section>
        <section className={styles.noticeSection}>
          <Heading as="h2">免責事項</Heading>
          <p>
            本資料はTOPPERSプロジェクトが公開している統合仕様書のPDFからリライトしています。
            修正・追加の事項があれば、
            <a href="https://github.com/mitsut/toppers_kernel_spec/issues">Issue</a>
            への登録をお願いします。
          </p>
          <p>
            公式のリリースはTOPPERSプロジェクトから
            <a href="https://www.toppers.jp/documents.html">PDF形式で公開</a>
            されています。
          </p>
        </section>
      </main>
    </Layout>
  );
}
